import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '../generated/client/enums';
import type { SniperRequestModel } from '../generated/client/models/SniperRequest';

@Injectable()
export class WatcherService {
    private readonly logger = new Logger(WatcherService.name);
    private provider: ethers.JsonRpcProvider;

    constructor(private prisma: PrismaService) {
        const rpcUrl = process.env.RPC_URL;
        if (!rpcUrl) {
            this.logger.warn('RPC_URL not set, watcher will not function');
        }
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async checkGasPrice() {
        try {
            const feeData = await this.provider.getFeeData();
            const currentGasPrice = feeData.gasPrice; // in wei

            if (!currentGasPrice) {
                this.logger.warn('Could not fetch gas price');
                return;
            }

            const currentGwei = parseFloat(ethers.formatUnits(currentGasPrice, 'gwei'));
            this.logger.debug(`Current Gas Price: ${currentGwei.toFixed(2)} Gwei`);

            // Find orders where target is >= current gas (user willing to pay at least this much)
            const pendingRequests = await this.prisma.sniperRequest.findMany({
                where: {
                    status: OrderStatus.PENDING,
                    targetGwei: {
                        gte: currentGwei,
                    },
                },
            });

            if (pendingRequests.length > 0) {
                this.logger.log(`Found ${pendingRequests.length} actionable requests at ${currentGwei.toFixed(2)} Gwei`);
                for (const req of pendingRequests) {
                    await this.executeTransaction(req);
                }
            }
        } catch (error) {
            this.logger.error('Error in gas price check cycle', error);
        }
    }

    private async executeTransaction(req: SniperRequestModel) {
        this.logger.log(`Executing transaction for Request ID: ${req.id}`);

        try {
            await this.prisma.sniperRequest.update({
                where: { id: req.id },
                data: { status: OrderStatus.BROADCASTED },
            });

            const txResponse = await this.provider.broadcastTransaction(req.rawTx);
            const txHash = txResponse.hash;

            this.logger.log(`Transaction broadcasted: ${txHash}`);

            // Wait for confirmation (1 block) with timeout
            const receipt = await txResponse.wait(1);

            if (receipt && receipt.status === 1) {
                // Transaction confirmed successfully
                await this.prisma.sniperRequest.update({
                    where: { id: req.id },
                    data: {
                        status: OrderStatus.EXECUTED,
                        txHash: txHash,
                    },
                });
                this.logger.log(`Transaction confirmed: ${txHash}`);
            } else {
                // Transaction reverted
                await this.prisma.sniperRequest.update({
                    where: { id: req.id },
                    data: {
                        status: OrderStatus.FAILED,
                        txHash: txHash,
                        error: 'Transaction reverted on-chain',
                    },
                });
                this.logger.warn(`Transaction reverted: ${txHash}`);
            }
        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during broadcast';
            this.logger.error(`Failed to execute request ${req.id}: ${errorMessage}`);

            // nonce already used means user cancelled
            const isCancelled = errorMessage.includes('nonce') || errorMessage.includes('replacement');

            await this.prisma.sniperRequest.update({
                where: { id: req.id },
                data: {
                    status: isCancelled ? OrderStatus.CANCELLED : OrderStatus.FAILED,
                    error: errorMessage.substring(0, 500), // Truncate long errors
                },
            });
        }
    }
}
