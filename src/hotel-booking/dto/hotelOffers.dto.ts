import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsEmail, IsIn, MaxLength, MinLength, IsOptional, Min, Max } from "class-validator";

export class HotelOffers {

    @IsNotEmpty()
    @ApiProperty({example:"RTPAR001"})
    hotelIds:string[];


    @IsOptional()
    // @Min(1)
    // @Max(9)
    @ApiPropertyOptional({example:1,default:1})
    adults?:number;

    @IsOptional()
    @ApiPropertyOptional({example:'2023-11-22',format:'YYYY-MM-DD'})
    checkInDate?:string;

    @IsOptional()
    @ApiPropertyOptional({example:'2023-11-23',format:'YYYY-MM-DD'})
    checkOutDate?:string;

    @IsOptional()
    @ApiPropertyOptional({description:'Code of the country of residence of the traveler expressed using ISO 3166-1 format.'})
    countryOfResidence?:string;


    @IsOptional()
    // @Min(1)
    // @Max(9)
    @ApiPropertyOptional({default:1,example:1})
    roomQuantity?:number;

    @IsOptional()
    @ApiPropertyOptional({example:'200-300',description:'It is mandatory to include a currency when this field is set.'})
    priceRange?:string;

    @IsOptional()
    @ApiPropertyOptional({example:'200-300',description:'Use this parameter to request a specific currency. ISO currency code (http://www.iso.org/iso/home/standards/currency_codes.htm).If a hotel does not support the requested currency, the prices for the hotel will be returned in the local currency of the hotel.'})
    currency?:string;

    @IsOptional()
    @ApiPropertyOptional({enum:['GUARANTEE', 'DEPOSIT', 'NONE'],default:'NONE',description:'It is mandatory to include a currency when this field is set.'})
    paymentPolicy?:string;

    @IsOptional()
    @ApiPropertyOptional({enum:['ROOM_ONLY', 'BREAKFAST', 'HALF_BOARD', 'FULL_BOARD', 'ALL_INCLUSIVE'],description:'1. ROOM_ONLY = Room Only 2. BREAKFAST = Breakfast 3.HALF_BOARD = Diner & Breakfast (only for Aggregators) 4.FULL_BOARD = Full Board (only for Aggregators) 5.ALL_INCLUSIVE = All Inclusive (only for Aggregators)'})
    boardType?:string;

    @IsOptional()
    @ApiPropertyOptional({description:'Show all properties (include sold out) or available only. For sold out properties, please check availability on other dates.'})
    includeClosed?:boolean;

    @IsOptional()
    @ApiPropertyOptional({default:true,description:'Used to return only the cheapest offer per hotel or all available offers.'})
    bestRateOnly?:boolean;


    @IsOptional()
    @ApiPropertyOptional({examples: ['FR' , 'fr' , 'fr-FR'],description:'Requested language of descriptive texts.'})
    lang?:string;



}