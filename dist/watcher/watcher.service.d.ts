import { PrismaService } from '../prisma/prisma.service';
export declare class WatcherService {
    private prisma;
    private readonly logger;
    private provider;
    constructor(prisma: PrismaService);
    checkGasPrice(): Promise<void>;
    private executeTransaction;
}
