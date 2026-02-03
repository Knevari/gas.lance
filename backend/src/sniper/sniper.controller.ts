import { Controller, Post, Body, Get } from '@nestjs/common';
import { SniperService } from './sniper.service';
import { CreateSniperRequestDto } from './dto/create-sniper-request.dto';

@Controller('sniper')
export class SniperController {
    constructor(private readonly sniperService: SniperService) { }

    @Post()
    create(@Body() createSniperRequestDto: CreateSniperRequestDto) {
        return this.sniperService.create(createSniperRequestDto);
    }

    @Get()
    findAll() {
        return this.sniperService.findAll();
    }
}
