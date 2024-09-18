import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { cardsDto } from "src/DTO/Cards.dto";
import { Cards } from "../Interfaces/cards.interface";

@Injectable()
export class CardsRepository {
    constructor(@InjectModel('cards') private readonly  cardModel: Model<Cards>){}

    async saveCard(newCard: cardsDto): Promise<Cards>{
        const savedCard = new this.cardModel(newCard);
        return await savedCard.save();
    }

    async getAllCards(): Promise<Cards[]>{
        return await this.cardModel.find({},{_v: false}).sort({commander : +1}).exec();
    }

    async getCardsId(idCards: string): Promise<Cards>{
        return await this.cardModel.findById(idCards, {__v:false});
    }

    async deleteCardsId(idCards: string): Promise<string> {
        const cardsId = await this.cardModel.findByIdAndDelete(idCards);
        return `this ${cardsId} was deleted`;
    }
}