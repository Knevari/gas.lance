import { IsString, IsNumber, IsNotEmpty, Min, IsInt } from 'class-validator';

export class CreateSniperRequestDto {
    @IsString()
    @IsNotEmpty()
    rawTx: string;

    @IsNumber()
    @Min(0.1)
    targetGwei: number;

    @IsInt()
    @IsNotEmpty()
    chainId: number;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsInt()
    @Min(0)
    nonce: number;
}
