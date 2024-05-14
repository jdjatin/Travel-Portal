/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsEmail, IsIn, MaxLength, MinLength } from "class-validator";

class name {
    
    @ApiProperty({enum:['MR','MRS','MS']})
    @IsNotEmpty()
    title:string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(56)
    @MinLength(1)
    firstName:string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(57)
    @MinLength(1)
    lastName:string;
}

class contact {
    @ApiProperty({example: +33679278416})
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(6)
    phone:string;

    @ApiProperty({example: 'bob.smith@email.com'})
    @IsNotEmpty()
    @MaxLength(90)
    @MinLength(3)
    email:string;
    
}


class guests {

    @ApiProperty()
    @IsNotEmpty()
    id:number;

    @ValidateNested({ each: true })
    @Type(() => name)
    @ApiProperty({ type: name })
    name:name;

    @ValidateNested({ each: true })
    @Type(() => contact)
    @ApiProperty({ type: contact })
    contact:contact;

}

class card {

    @MaxLength(2)
    @MinLength(2)
    @ApiProperty({enum:['CA','VI','AX']})
    @IsNotEmpty()
    vendorCode:string;

    @MaxLength(22)
    @MinLength(2)
    @ApiProperty()
    @IsNotEmpty()
    cardNumber:string;

    @MaxLength(7)
    @MinLength(7)
    @ApiProperty({format:'Date',example:'2023-01'})
    @IsNotEmpty()
    expiryDate:string;
}

class payments {

    @ApiProperty()
    @IsNotEmpty()
    id:number;

    @ApiProperty({enum:['creditCard']})
    @IsNotEmpty()
    method:string;
    
    @ValidateNested({ each: true })
    @Type(() => card)
    @ApiProperty({ type: card })
    card:card;

}



class data {

    @ApiProperty()
    @IsNotEmpty()
    offerId:string;

    @ValidateNested({ each: true })
    @Type(() => guests)
    @ApiProperty({ type: [guests] })
    guests:guests[];

    @ValidateNested({ each: true })
    @Type(() => payments)
    @ApiProperty({ type: [payments] })
    payments:payments[];
  
}

export class hotelBookingDto {

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => data)
    @ApiProperty({ type: data })
    data:data

}
