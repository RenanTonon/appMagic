import { BadRequestException, Injectable } from '@nestjs/common';
import { cardsDto } from 'src/DTO/Cards.dto';
import { Cards } from 'src/Mongo/Interfaces/cards.interface';
import { CardsRepository } from 'src/Mongo/Repository/cards.repository';

@Injectable()
export class CardsService {

    constructor(
        private readonly cardsRepository: CardsRepository
    ){}


     async saveCard(newCard: cardsDto): Promise<Cards>{
        console.log("Chegou na Camada de serviço");
        return await this.cardsRepository.saveCard(newCard);
    }

    async getAllCards(): Promise<Cards[]>{
        const allCards =  await this.cardsRepository.getAllCards();
        if(!allCards.length)
            throw new BadRequestException("There are no Decks");
        return allCards;
    }

    async getCardsId(idCards:string): Promise<Cards>{
        try {
            return await this.cardsRepository.getCardsId(idCards);
        } catch (e) {
            throw new BadRequestException("There are no results");
        }
    }

    async deleteCardsId(idCards:string): Promise<string>{
        try {
            return await this.cardsRepository.deleteCardsId(idCards);
        } catch (e) {
            throw new BadRequestException("There are no Cards with this id");
        }
    }

    async criaDeck(): Promise<object>{
        console.log('chegou aqui');
        try {
            const apiCards = await fetch(`https://api.magicthegathering.io/v1/cards`);
            if(!apiCards.ok){
                throw new Error(`${apiCards.status}`);
            }
            const apiCardsJson = await apiCards.json();
            console.log(apiCardsJson);
            return apiCardsJson;
        } catch (error) {
            throw new BadRequestException("Return of api was {}");
        }
        
    }
}
