import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsEmail, IsIn, MaxLength, MinLength, IsOptional } from "class-validator";

export class HotelSearch {

    @IsNotEmpty()
    @ApiProperty({example:'PAR'})
    cityCode : string;

    @IsOptional()
    @ApiPropertyOptional()
    radius?:number;

    @IsOptional()
    @ApiPropertyOptional({enum:['KM', 'MILE']})
    radiusUnit?:string;

    @IsOptional()
    @ApiPropertyOptional({description:'Array of hotel chain codes. Each code is a string consisted of 2 capital alphabetic characters.'})
    chainCodes?:string[];

    @IsOptional()
    @ApiPropertyOptional({enum:['SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'AIR_CONDITIONING', 'RESTAURANT', 'PARKING', 'PETS_ALLOWED', 'AIRPORT_SHUTTLE', 'BUSINESS_CENTER', 'DISABLED_FACILITIES', 'WIFI', 'MEETING_ROOMS', 'NO_KID_ALLOWED', 'TENNIS', 'GOLF', 'KITCHEN', 'ANIMAL_WATCHING', 'BABY-SITTING', 'BEACH', 'CASINO', 'JACUZZI', 'SAUNA', 'SOLARIUM', 'MASSAGE', 'VALET_PARKING', 'BAR or LOUNGE', 'KIDS_WELCOME', 'NO_PORN_FILMS', 'MINIBAR', 'TELEVISION', 'WI-FI_IN_ROOM', 'ROOM_SERVICE', 'GUARDED_PARKG', 'SERV_SPEC_MENU']})
    amenities?:string[];

    @IsOptional()
    @ApiPropertyOptional({enum:['1','2','3','4','5']})
    ratings?:string[];

    @IsOptional()
    @ApiPropertyOptional({enum:['BEDBANK', 'DIRECTCHAIN', 'ALL'], description:'Hotel source with values BEDBANK for aggregators, DIRECTCHAIN for GDS/Distribution and ALL for both.'})
    hotelSource?:string;

}