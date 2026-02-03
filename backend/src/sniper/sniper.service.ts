import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSniperRequestDto } from './dto/create-sniper-request.dto';

@Injectable()
export class SniperService {
    private readonly logger = new Logger(SniperService.name);

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSniperRequestDto) {
        this.logger.log(`Creating new sniper request for user ${dto.userId}`);
        return this.prisma.sniperRequest.create({
            data: {
                rawTx: dto.rawTx,
                targetGwei: dto.targetGwei,
                chainId: dto.chainId,
                userId: dto.userId,
                status: 'PENDING',
            },
        });
    }

    async findAll() {
        return this.prisma.sniperRequest.findMany();
    }
}
