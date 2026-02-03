import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSniperRequestDto {
    @IsString()
    @IsNotEmpty()
    rawTx: string;

    @IsNumber()
    @IsNotEmpty()
    targetGwei: number;

    @IsNumber()
    @IsNotEmpty()
    chainId: number;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
