import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let controller: AppController;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockPrisma = {
      $queryRaw: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    prismaService = module.get(PrismaService);
  });

  describe('health', () => {
    it('should return healthy status when database is connected', async () => {
      (prismaService.$queryRaw as jest.Mock).mockResolvedValue([{ '?column?': 1 }]);

      const result = await controller.health();

      expect(result.status).toBe('ok');
      expect(result.version).toBe('1.0.0');
      expect(result.services.database).toBe('ok');
      expect(result.timestamp).toBeDefined();
    });

    it('should return database error status when DB query fails', async () => {
      (prismaService.$queryRaw as jest.Mock).mockRejectedValue(new Error('Connection failed'));

      const result = await controller.health();

      expect(result.status).toBe('ok'); // API is still ok
      expect(result.services.database).toBe('error');
    });

    it('should include timestamp in ISO format', async () => {
      (prismaService.$queryRaw as jest.Mock).mockResolvedValue([{ '?column?': 1 }]);

      const result = await controller.health();

      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});
