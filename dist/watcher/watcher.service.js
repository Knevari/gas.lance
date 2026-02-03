"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WatcherService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const ethers_1 = require("ethers");
const prisma_service_1 = require("../prisma/prisma.service");
let WatcherService = WatcherService_1 = class WatcherService {
    prisma;
    logger = new common_1.Logger(WatcherService_1.name);
    provider;
    constructor(prisma) {
        this.prisma = prisma;
        this.provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_URL);
    }
    async checkGasPrice() {
        try {
            const feeData = await this.provider.getFeeData();
            const currentGasPrice = feeData.gasPrice;
            if (!currentGasPrice) {
                this.logger.warn('Could not fetch gas price');
                return;
            }
            const currentGwei = parseFloat(ethers_1.ethers.formatUnits(currentGasPrice, 'gwei'));
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
        }
        catch (error) {
            this.logger.error('Error fetching gas price', error);
        }
    }
    async executeTransaction(req) {
        this.logger.log(`Executing transaction for Request ID: ${req.id}`);
        await this.prisma.sniperRequest.update({
            where: { id: req.id },
            data: {
                status: 'EXECUTED',
                txHash: '0xSIMULATED_HASH_' + Date.now(),
            },
        });
        this.logger.log(`Transaction executed and marked as EXECUTED.`);
    }
};
exports.WatcherService = WatcherService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WatcherService.prototype, "checkGasPrice", null);
exports.WatcherService = WatcherService = WatcherService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WatcherService);
//# sourceMappingURL=watcher.service.js.map