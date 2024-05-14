import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsDateString, MinLength, MaxLength } from "class-validator";

export class getFlightSearch {

    @IsNotEmpty()
    @ApiProperty({example:'SYD'})
    originLocationCode:string;

    @IsNotEmpty()
    @ApiProperty({example:'BKK'})
    destinationLocationCode :string;

    @IsNotEmpty()
    @ApiProperty({example:'2023-05-20', format:'YYYY-MM-DD'})
    departureDate : string;

    @ApiPropertyOptional({example:'2023-05-24', format:'YYYY-MM-DD'})
    returnDate:string;

    @IsNotEmpty()
    @ApiProperty({description:'The total number of seated travelers (adult and children) can not exceed 9.'})
    adults :number;

    @ApiPropertyOptional({description:'The total number of seated travelers (adult and children) can not exceed 9.'})
    children: number;

    @ApiPropertyOptional({description:'the number of infant travelers (whose age is less or equal to 2 on date of departure). Infants travel on the lap of an adult traveler, and thus the number of infants must not exceed the number of adults. If specified, this number should be greater than or equal to 0'})
    infants:number;

    @ApiPropertyOptional({enum:[ 'ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST' ]})
    travelClass:string;

    @ApiPropertyOptional()
    includedAirlineCodes:string;

    @ApiPropertyOptional()
    excludedAirlineCodes:string;

    @ApiPropertyOptional()
    nonStop: boolean;

    @ApiPropertyOptional()
    currencyCode:string;

    @ApiPropertyOptional()
    maxPrice:number;

    @ApiPropertyOptional({default:250})
    max:number;



}