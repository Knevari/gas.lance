import { Controller, Post, Body, Get, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExcludeEndpoint, ApiProperty } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentService } from './payment.service';

class CreateCheckoutDto {
    @ApiProperty({
        description: 'Wallet address of the user',
        example: '0x742d35Cc6634C0532925a3b844Bc9e7595f8E910',
    })
    userId: string;

    @ApiProperty({
        description: 'Credit package ID to purchase',
        example: 'credits_15',
        enum: ['credits_5', 'credits_15', 'credits_50'],
    })
    packageId: string;
}

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('packages')
    @ApiOperation({
        summary: 'List credit packages',
        description: 'Returns all available credit packages with pricing.',
    })
    @ApiResponse({ status: 200, description: 'List of available packages' })
    getPackages() {
        return this.paymentService.getPackages();
    }

    @Post('checkout')
    @ApiOperation({
        summary: 'Create checkout session',
        description: 'Creates a Stripe Checkout session for purchasing credits. Returns a URL to redirect the user to.',
    })
    @ApiResponse({ status: 201, description: 'Returns { sessionId, url }' })
    @ApiResponse({ status: 400, description: 'Invalid package ID' })
    createCheckout(@Body() dto: CreateCheckoutDto) {
        return this.paymentService.createCheckoutSession(dto.userId, dto.packageId);
    }

    @Post('webhook')
    @ApiExcludeEndpoint() // Hide from docs - internal use only
    async handleWebhook(
        @Req() req: RawBodyRequest<Request>,
        @Headers('stripe-signature') signature: string,
    ) {
        const payload = req.rawBody;
        if (!payload) {
            throw new Error('No raw body available');
        }
        return this.paymentService.handleWebhook(payload, signature);
    }
}
