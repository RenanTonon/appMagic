import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {cardsDto} from '../../DTO/Cards.dto';
import { CardsService } from 'src/Services/cards/cards.service';
import { Cards } from 'src/Mongo/Interfaces/cards.interface';

@Controller('cards')
export class CardsController {
    constructor(
        private readonly CardsService: CardsService
    ){}

    @Get()
    async getAllCards(): Promise<Cards[]> {
        return this.CardsService.getAllCards() ;
    }

    @Get(':idCards')
    async getCardsId(@Param('idCards') idCards: string): Promise<Cards>{
        return await this.CardsService.getCardsId(idCards);
    }
    @Get('apiy')
    async criaDeck(): Promise<object>{
        console.log('acessando cardsapi');
        return await this.CardsService.criaDeck();
    }
    

    
    @Post()
    async saveCards(@Body() newCard:cardsDto): Promise<Cards> {
        return await this.CardsService.saveCard(newCard);
    }
    @Delete(':idCards')
    async deleteCardsId(@Param('idCards') idCards:string): Promise<string>{
        return await this.CardsService.deleteCardsId(idCards);

    }
}
