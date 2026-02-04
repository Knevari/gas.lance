import { IsString, IsNumber, IsNotEmpty, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSniperRequestDto {
    @ApiProperty({
        description: 'The signed raw transaction hex (EIP-1559 format)',
        example: '0x02f87001808459682f008459682f0082520894...',
    })
    @IsString()
    @IsNotEmpty()
    rawTx: string;

    @ApiProperty({
        description: 'Target maximum gas price in Gwei. Transaction will be broadcast when base fee drops to this level.',
        example: 15,
        minimum: 0.1,
    })
    @IsNumber()
    @Min(0.1)
    targetGwei: number;

    @ApiProperty({
        description: 'Chain ID (1 for Mainnet, 11155111 for Sepolia)',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    chainId: number;

    @ApiProperty({
        description: 'Wallet address of the user (must match transaction signer)',
        example: '0x742d35Cc6634C0532925a3b844Bc9e7595f8E910',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Transaction nonce (must match the nonce in the signed transaction)',
        example: 42,
        minimum: 0,
    })
    @IsInt()
    @Min(0)
    nonce: number;
}
