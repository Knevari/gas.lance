import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SniperService } from './sniper.service';
import { CreateSniperRequestDto } from './dto/create-sniper-request.dto';

@ApiTags('Sniper')
@Controller('sniper')
export class SniperController {
    constructor(private readonly sniperService: SniperService) { }

    @Post()
    @ApiOperation({
        summary: 'Create a new deployment order',
        description: 'Submit a pre-signed transaction to be broadcast when gas prices drop to your target.',
    })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid transaction or insufficient credits' })
    create(@Body() createSniperRequestDto: CreateSniperRequestDto) {
        return this.sniperService.create(createSniperRequestDto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all orders',
        description: 'Retrieve all sniper orders in the system (admin use).',
    })
    findAll() {
        return this.sniperService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({
        summary: 'Get user orders',
        description: 'Retrieve all orders for a specific wallet address.',
    })
    @ApiParam({ name: 'userId', description: 'Wallet address (0x...)' })
    findByUser(@Param('userId') userId: string) {
        return this.sniperService.findByUser(userId);
    }

    @Get('credits/:userId')
    @ApiOperation({
        summary: 'Get user credits',
        description: 'Check the credit balance for a wallet address.',
    })
    @ApiParam({ name: 'userId', description: 'Wallet address (0x...)' })
    @ApiResponse({ status: 200, description: 'Returns { credits: number }' })
    getCredits(@Param('userId') userId: string) {
        return this.sniperService.getCredits(userId);
    }
}
