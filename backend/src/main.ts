import * as crypto from 'crypto';

if (!global.crypto) {
  // @ts-ignore
  global.crypto = crypto;
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Required for Stripe webhook signature verification
  });

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('GasLance API')
    .setDescription(`
## Gas Price Sniper for Smart Contract Deployments

GasLance monitors Ethereum gas prices 24/7 and broadcasts your pre-signed transactions 
when network conditions match your target gas price.

### Key Features
- **Non-custodial**: We never hold your private keys
- **EIP-1559 Compatible**: Set maxFeePerGas as your target
- **Multi-chain**: Supports Mainnet and Sepolia

### Authentication
All endpoints use wallet addresses for user identification. 
Connect your wallet via the frontend to interact with the API.
    `)
    .setVersion('1.0')
    .addTag('Sniper', 'Contract deployment order management')
    .addTag('Payments', 'Credit purchases via Stripe')
    .addTag('Health', 'API health and status checks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'GasLance API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 GasLance API running on http://localhost:${port}`);
  console.log(`📚 API Docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
