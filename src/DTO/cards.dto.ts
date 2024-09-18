import { IsArray, IsNotEmpty, IsString} from "class-validator";

export class cardsDto {
    
    @IsNotEmpty()
    @IsString()
    readonly ideck: String;
    
    @IsNotEmpty()
    @IsString()
    readonly commander: String;

    @IsNotEmpty()
    @IsArray()
    readonly deck: String[];
}