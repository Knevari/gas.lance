import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Transaction } from 'ethers';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSniperRequestDto } from './dto/create-sniper-request.dto';
import { OrderStatus } from '../generated/client/enums';

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

        // Optional: Verify the sender matches the userId (wallet address)
        if (sender.toLowerCase() !== dto.userId.toLowerCase()) {
            throw new BadRequestException(
                `Sender address mismatch: transaction is signed by ${sender}, but userId is ${dto.userId}`,
            );
        }

        this.logger.log(`Validated tx from ${sender}, nonce: ${tx.nonce}, chainId: ${tx.chainId}`);

        return this.prisma.sniperRequest.create({
            data: {
                rawTx: dto.rawTx,
                targetGwei: dto.targetGwei,
                chainId: dto.chainId,
                userId: sender.toLowerCase(), // Normalize to lowercase
                nonce: dto.nonce,
                status: OrderStatus.PENDING,
            },
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
}
