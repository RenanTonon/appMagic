import { Module } from '@nestjs/common';
import { CardsController } from './Controllers/cards/cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from './Services/cards/cards.service';
import { CardsRepository } from './Mongo/Repository/cards.repository';
import { cardsShema } from './Mongo/Schemas/cards.schema';


@Module({
  imports: [

  MongooseModule.forRoot('mongodb://localhost/deckcards'),

  MongooseModule.forFeature([
    {name: "cards", schema: cardsShema}])

  ],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
})
export class AppModule {}
