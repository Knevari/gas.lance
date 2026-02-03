import { Module } from '@nestjs/common';
import { SniperService } from './sniper.service';
import { SniperController } from './sniper.controller';

@Module({
    controllers: [SniperController],
    providers: [SniperService],
})
export class SniperModule { }
