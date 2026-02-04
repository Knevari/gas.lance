import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Transaction } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSniperRequestDto } from './dto/create-sniper-request.dto';
import { OrderStatus } from '../generated/client/enums';

const CREDITS_PER_DEPLOYMENT = 1;
const FREE_TRIAL_CREDITS = 1;

@Injectable()
export class SniperService {
    private readonly logger = new Logger(SniperService.name);

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSniperRequestDto) {
        this.logger.log(`Creating new sniper request for user ${dto.userId}`);

        // Decode and validate the raw transaction
        let tx: Transaction;
        try {
            tx = Transaction.from(dto.rawTx);
        } catch (error) {
            throw new BadRequestException('Invalid raw transaction hex');
        }

        // Validate the nonce matches
        if (tx.nonce !== dto.nonce) {
            throw new BadRequestException(
                `Nonce mismatch: transaction has ${tx.nonce}, but ${dto.nonce} was provided`,
            );
        }

        // Recover the sender's address from the signature
        const sender = tx.from;
        if (!sender) {
            throw new BadRequestException('Could not recover sender address from transaction');
        }

        // Verify the sender matches the userId (wallet address)
        if (sender.toLowerCase() !== dto.userId.toLowerCase()) {
            throw new BadRequestException(
                `Sender address mismatch: transaction is signed by ${sender}, but userId is ${dto.userId}`,
            );
        }

        const normalizedUserId = sender.toLowerCase();
        this.logger.log(`Validated tx from ${sender}, nonce: ${tx.nonce}, chainId: ${tx.chainId}`);

        // Get or create user with atomic transaction for credit deduction
        return this.prisma.$transaction(async (prisma) => {
            // Upsert user (create if not exists with free trial credits)
            let user = await prisma.user.findUnique({
                where: { id: normalizedUserId },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        id: normalizedUserId,
                        credits: FREE_TRIAL_CREDITS,
                    },
                });
                this.logger.log(`Created new user ${normalizedUserId} with ${FREE_TRIAL_CREDITS} free credits`);
            }

            // Check credit balance
            if (user.credits < CREDITS_PER_DEPLOYMENT) {
                throw new BadRequestException(
                    `Insufficient credits. You have ${user.credits} credits, but need ${CREDITS_PER_DEPLOYMENT}. Please top up.`,
                );
            }

            // Deduct credits
            await prisma.user.update({
                where: { id: normalizedUserId },
                data: { credits: { decrement: CREDITS_PER_DEPLOYMENT } },
            });

            // Create the sniper request
            const request = await prisma.sniperRequest.create({
                data: {
                    rawTx: dto.rawTx,
                    targetGwei: dto.targetGwei,
                    chainId: dto.chainId,
                    userId: normalizedUserId,
                    nonce: dto.nonce,
                    status: OrderStatus.PENDING,
                    feeCredits: CREDITS_PER_DEPLOYMENT,
                },
            });

            this.logger.log(`Deducted ${CREDITS_PER_DEPLOYMENT} credit(s) from user ${normalizedUserId}`);
            return request;
        });
    }

    async findAll() {
        return this.prisma.sniperRequest.findMany();
    }

    async findByUser(userId: string) {
        return this.prisma.sniperRequest.findMany({
            where: { userId: userId.toLowerCase() },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getCredits(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId.toLowerCase() },
        });
        return { credits: user?.credits ?? FREE_TRIAL_CREDITS };
    }
}
