import { Controller, Post, Body, Get, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';

class CreateCheckoutDto {
    userId: string;
    packageId: string;
}

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('packages')
    getPackages() {
        return this.paymentService.getPackages();
    }

    @Post('checkout')
    createCheckout(@Body() dto: CreateCheckoutDto) {
        return this.paymentService.createCheckoutSession(dto.userId, dto.packageId);
    }

    @Post('webhook')
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
