import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatcherService {
    private readonly logger = new Logger(WatcherService.name);
    private provider: ethers.JsonRpcProvider;

    constructor(private prisma: PrismaService) {
        this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
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
            this.logger.log(`Current Gas Price: ${currentGwei.toFixed(2)} Gwei`);

            const pendingRequests = await this.prisma.sniperRequest.findMany({
                where: {
                    status: 'PENDING',
                    targetGwei: {
                        gte: currentGwei,
                    },
                },
            });

            if (pendingRequests.length > 0) {
                this.logger.log(`Found ${pendingRequests.length} actionable requests!`);
                for (const req of pendingRequests) {
                    await this.executeTransaction(req);
                }
            }
        } catch (error) {
            this.logger.error('Error fetching gas price', error);
        }
    }

    private async executeTransaction(req: any) {
        this.logger.log(`Executing transaction for Request ID: ${req.id}`);

        // In a real scenario, we would broadcast the rawTx here.
        // await this.provider.broadcastTransaction(req.rawTx);

        // For now, simulated success:
        await this.prisma.sniperRequest.update({
            where: { id: req.id },
            data: {
                status: 'EXECUTED',
                txHash: '0xSIMULATED_HASH_' + Date.now(),
            },
        });

        this.logger.log(`Transaction executed and marked as EXECUTED.`);
    }
}
