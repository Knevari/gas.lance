import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { SniperService } from './sniper.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '../generated/client/enums';

// Mock valid signed transaction (EIP-1559) for testing
// This is a mock - in real tests you'd use a valid signed tx
const MOCK_WALLET = '0x742d35cc6634c0532925a3b844bc9e7595f8e910';

describe('SniperService', () => {
    let service: SniperService;
    let prismaService: jest.Mocked<PrismaService>;

    // Mock Prisma transaction
    const mockPrismaTransaction = jest.fn();

    beforeEach(async () => {
        // Create mock Prisma service
        const mockPrisma = {
            user: {
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            sniperRequest: {
                create: jest.fn(),
                findMany: jest.fn(),
            },
            $transaction: mockPrismaTransaction,
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SniperService,
                {
                    provide: PrismaService,
                    useValue: mockPrisma,
                },
            ],
        }).compile();

        service = module.get<SniperService>(SniperService);
        prismaService = module.get(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should throw BadRequestException for invalid raw transaction', async () => {
            const dto = {
                rawTx: 'invalid-hex',
                targetGwei: 10,
                chainId: 1,
                userId: MOCK_WALLET,
                nonce: 0,
            };

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
            await expect(service.create(dto)).rejects.toThrow('Invalid raw transaction hex');
        });

        it('should throw BadRequestException for empty raw transaction', async () => {
            const dto = {
                rawTx: '',
                targetGwei: 10,
                chainId: 1,
                userId: MOCK_WALLET,
                nonce: 0,
            };

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('findAll', () => {
        it('should return all sniper requests', async () => {
            const mockRequests = [
                {
                    id: '1',
                    rawTx: '0x...',
                    targetGwei: 10,
                    chainId: 1,
                    userId: MOCK_WALLET,
                    nonce: 0,
                    status: OrderStatus.PENDING,
                    txHash: null,
                    error: null,
                    feeCredits: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];

            (prismaService.sniperRequest.findMany as jest.Mock).mockResolvedValue(mockRequests);

            const result = await service.findAll();

            expect(result).toEqual(mockRequests);
            expect(prismaService.sniperRequest.findMany).toHaveBeenCalledTimes(1);
        });

        it('should return empty array when no requests exist', async () => {
            (prismaService.sniperRequest.findMany as jest.Mock).mockResolvedValue([]);

            const result = await service.findAll();

            expect(result).toEqual([]);
        });
    });

    describe('findByUser', () => {
        it('should return orders for a specific user', async () => {
            const mockRequests = [
                {
                    id: '1',
                    userId: MOCK_WALLET.toLowerCase(),
                    status: OrderStatus.PENDING,
                    targetGwei: 10,
                    chainId: 1,
                },
            ];

            (prismaService.sniperRequest.findMany as jest.Mock).mockResolvedValue(mockRequests);

            const result = await service.findByUser(MOCK_WALLET);

            expect(result).toEqual(mockRequests);
            expect(prismaService.sniperRequest.findMany).toHaveBeenCalledWith({
                where: { userId: MOCK_WALLET.toLowerCase() },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should normalize userId to lowercase', async () => {
            (prismaService.sniperRequest.findMany as jest.Mock).mockResolvedValue([]);

            await service.findByUser('0xABCD1234');

            expect(prismaService.sniperRequest.findMany).toHaveBeenCalledWith({
                where: { userId: '0xabcd1234' },
                orderBy: { createdAt: 'desc' },
            });
        });
    });

    describe('getCredits', () => {
        it('should return user credits when user exists', async () => {
            (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
                id: MOCK_WALLET.toLowerCase(),
                credits: 5,
            });

            const result = await service.getCredits(MOCK_WALLET);

            expect(result).toEqual({ credits: 5 });
        });

        it('should return FREE_TRIAL_CREDITS when user does not exist', async () => {
            (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await service.getCredits(MOCK_WALLET);

            expect(result).toEqual({ credits: 1 }); // FREE_TRIAL_CREDITS = 1
        });

        it('should normalize userId to lowercase', async () => {
            (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

            await service.getCredits('0xABCD1234');

            expect(prismaService.user.findUnique).toHaveBeenCalledWith({
                where: { id: '0xabcd1234' },
            });
        });
    });
});
