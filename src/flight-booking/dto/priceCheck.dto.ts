import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsDateString, MinLength, MaxLength, IsCurrency } from "class-validator";

//  class data {
//     @IsNotEmpty()
//     @ApiProperty({ default: 'flight-offers-pricing' })
//     type: string;

//     @IsNotEmpty()
//     flightOffers:any;
// }

//  export class priceCheck {
//     @ApiProperty({ type: data })
//     @IsNotEmpty()
//     @ValidateNested()
//     @Type(() => data)
//     data: data;
// }

// export class priceCheck{
//     @IsNotEmpty()
//     @ApiProperty()
//     flightOffers:any;
// }
export class priceCheck{

    // @IsNotEmpty()
    // @ApiProperty({ default: 'flight-offers-pricing' })
    // type: string;


    @IsNotEmpty()
    @ApiProperty()
    flightOffers:any;

    
}