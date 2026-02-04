import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

// Credit packages available for purchase
export const CREDIT_PACKAGES = [
    { id: 'credits_5', credits: 5, price: 500, name: '5 Credits' },      // $5
    { id: 'credits_15', credits: 15, price: 1200, name: '15 Credits' },  // $12 (20% bonus)
    { id: 'credits_50', credits: 50, price: 3500, name: '50 Credits' },  // $35 (30% bonus)
] as const;

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private stripe: Stripe;

    constructor(private prisma: PrismaService) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            this.logger.warn('STRIPE_SECRET_KEY not set - payments will fail');
        }
        this.stripe = new Stripe(secretKey || '', {
            apiVersion: '2026-01-28.clover',
        });
    }

    async createCheckoutSession(userId: string, packageId: string) {
        const creditPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
        if (!creditPackage) {
            throw new BadRequestException(`Invalid package: ${packageId}`);
        }

        const normalizedUserId = userId.toLowerCase();

        // Ensure user exists
        await this.prisma.user.upsert({
            where: { id: normalizedUserId },
            create: { id: normalizedUserId, credits: 1 },
            update: {},
        });

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: creditPackage.name,
                            description: `${creditPackage.credits} deployment credits for GasLance`,
                        },
                        unit_amount: creditPackage.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/app?payment=success`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/app?payment=cancelled`,
            metadata: {
                userId: normalizedUserId,
                packageId: creditPackage.id,
                credits: creditPackage.credits.toString(),
            },
        });

        this.logger.log(`Created checkout session ${session.id} for user ${normalizedUserId}`);
        return { sessionId: session.id, url: session.url };
    }

    async handleWebhook(payload: Buffer, signature: string) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new BadRequestException('Webhook secret not configured');
        }

        let event: Stripe.Event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (err: any) {
            this.logger.error(`Webhook signature verification failed: ${err.message}`);
            throw new BadRequestException('Invalid webhook signature');
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            await this.fulfillCredits(session);
        }

        return { received: true };
    }

    private async fulfillCredits(session: Stripe.Checkout.Session) {
        const userId = session.metadata?.userId;
        const credits = parseInt(session.metadata?.credits || '0', 10);

        if (!userId || credits <= 0) {
            this.logger.error(`Invalid metadata in session ${session.id}`);
            return;
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: credits } },
        });

        this.logger.log(`Added ${credits} credits to user ${userId}`);
    }

    getPackages() {
        return CREDIT_PACKAGES.map(pkg => ({
            id: pkg.id,
            credits: pkg.credits,
            price: pkg.price / 100, // Convert cents to dollars
            name: pkg.name,
        }));
    }
}
