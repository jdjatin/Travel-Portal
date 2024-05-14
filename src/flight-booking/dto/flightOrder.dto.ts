import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsDateString, MinLength, MaxLength, IsOptional } from "class-validator";




class documents {

    @ApiPropertyOptional({example:'QFU514563221J',description:'The document number (shown on the document)'})
    number:string;

    @ApiProperty({example:'2018-05-22',format:'YYY-MM-DD'})
    issuanceDate:string;

    @ApiProperty({example:'2023-05-22',format:'YYY-MM-DD'})
    expiryDate:string;

    @ApiProperty()
    issuanceCountry:string;

    @ApiProperty({description:'A more precise information concerning the place where the document has been issued, when available. It may be a country, a state, a city or any other type of location. e.g. New-York'})
    issuanceLocation:string;

    @ApiProperty()
    nationality:string;

    @ApiProperty()
    birthPlace:string;

    @ApiProperty({enum:[ 'VISA', 'PASSPORT', 'IDENTITY_CARD', 'KNOWN_TRAVELER', 'REDRESS' ]})
    documentType:string;

    @ApiProperty()
    validityCountry:string;

    @ApiProperty()
    birthCountry:string;

    @ApiProperty({description:'boolean to specify if the traveler is the holder of the document'})
    holder:boolean;

}

class emergencyContact {

    @ApiPropertyOptional({description:'Adressee name (e.g. in case of emergency purpose it corresponds to name of the person to be contacted).'})
    addresseeName:string;

    @ApiProperty({example:'US'})
    countryCode:string;

    @ApiPropertyOptional({example:'+1-7878787878',description:'Phone number. Composed of digits only. The number of digits depends on the country.'})
    number:string;

    @ApiPropertyOptional({example:'Write Additional Information Here'})
    text:string;

}

class loyaltyProgram {

    @ApiPropertyOptional({example:'AF', description:'loyalty program airline code'})
    programOwner:string;

    @ApiPropertyOptional({example:'12357466574',description:'loyalty program number'})
    id:string;
}

class discountEligibility {
    @ApiPropertyOptional({enum:[ 'SPANISH_RESIDENT', 'AIR_FRANCE_DOMESTIC', 'AIR_FRANCE_COMBINED', 'AIR_FRANCE_METROPOLITAN' ],description:'type of discount applied'})
    subType:string;

    @ApiPropertyOptional({example:'Madrid',description:'city of residence'})
    cityName:string;

    @ApiPropertyOptional({description:'type of discount applied',enum:[ 'SPANISH_CITIZEN', 'EUROPEAN_CITIZEN', 'GOVERNMENT_WORKER', 'MILITARY', 'MINOR_WITHOUT_ID' ]})
    travelerType:string;

    @ApiPropertyOptional({example:'12568215Z',description:'resident card number'})
    cardNumber:string;

    @ApiPropertyOptional({example: '12568215Z'})
    certificateNumber:string;

}

class name {
    @ApiProperty()
    firstName:string;

    @ApiProperty()
    lastName:string;

    @ApiPropertyOptional()
    @IsOptional()
    middleName?:string;

    @ApiPropertyOptional()
    @IsOptional()
    secondLastName?:string;
}

class travelers {

    @ApiProperty()
    id:string;

    @ApiPropertyOptional({example:'1992-06-23',format:'YYYY-MM-DD'})
    @IsOptional()
    dateOfBirth?:string;

    @ApiPropertyOptional({enum:[ 'MALE', 'FEMALE', 'UNSPECIFIED', 'UNDISCLOSED' ],title:'Gender'})
    @IsOptional()
    gender?:string;

    @ApiProperty({type:name})
    name:name;

    @ValidateNested({each:true})
    @Type(()=> documents)
    @ApiPropertyOptional({type:[documents]})
    @IsOptional()
    documents?:documents[];

    @ApiPropertyOptional({type:emergencyContact})
    @IsOptional()
    emergencyContact?:emergencyContact;

    @ApiPropertyOptional({type:[loyaltyProgram]})
    @ValidateNested({each:true})
    @Type(()=> loyaltyProgram)
    @IsOptional()
    loyaltyProgram?:loyaltyProgram[];

    @ApiPropertyOptional({type:[discountEligibility]})
    @ValidateNested({each:true})
    @Type(()=> discountEligibility)
    @IsOptional()
    discountEligibility?:discountEligibility[];
}

class general {

    @ApiProperty({example:'GENERAL_MISCELLANEOUS',enum:[ 'GENERAL_MISCELLANEOUS', 'CONFIDENTIAL', 'INVOICE', 'QUALITY_CONTROL', 'BACKOFFICE', 'FULFILLMENT', 'ITINERARY', 'TICKETING_MISCELLANEOUS', 'TOUR_CODE' ]})
    subType:string;

    @ApiPropertyOptional({example:'Z'})
    category:string;

    @ApiProperty({example: 'PASSENGER NEED ASSISTANCE'})
    text:string;

    @ApiPropertyOptional()
    @IsArray()
    travelerIds:string[];

    @ApiPropertyOptional()
    @IsArray()
    flightOfferIds:string[];
}

class airline {
    @ApiProperty({example:'KEYWORD',enum:[ 'OTHER_SERVICE_INFORMATION', 'KEYWORD', 'OTHER_SERVICE', 'CLIENT_ID', 'ADVANCED_TICKET_TIME_LIMIT' ]})
    subType:string;

    @ApiPropertyOptional({example:'PARK',description:'keyword code - only applicable for subType Keyword'})
    keyword:string;

    @ApiPropertyOptional({example:'AF',description:'When it apply to any airline, value is YY.'})
    airlineCode:string;

    @ApiProperty({example: 'CAR PARK'})
    text:string;

    @ApiPropertyOptional()
    @IsArray()
    travelerIds:string[];

    @ApiPropertyOptional()
    @IsArray()
    flightOfferIds:string[];

}

class remarks {

    @ApiPropertyOptional({type:[general]})
    @ValidateNested({each:true})
    @Type(()=> general)
    discountEligibility:general[];

    @ApiPropertyOptional({type:[airline]})
    @ValidateNested({each:true})
    @Type(()=> airline)
    airline:airline[];


}

class ticketingAgreement {

    @ApiProperty({example: 'DELAY_TO_QUEUE',enum:['CONFIRM','DELAY_TO_QUEUE','DELAY_TO_CANCEL'], description:'CONFIRM, when the payment is done. DELAY_TO_QUEUE, queue the reservation at a wished date if the payment is not done. DELAY_TO_CANCEL, cancel the reservation at a wished date if the payment is not done'})
    option:string;

    @ApiPropertyOptional({description:'Delay before applying automatic process if no issuance in days'})
    delay:string;

    @IsOptional()
    @ApiPropertyOptional({example:'2017-10-23',format:'YYYY-MM-DD',readOnly:true,description:'Exact date to apply automatic process if no issuance.'})
    dateTime?:string;

    @ApiPropertyOptional({readOnly:true,description:'Ids of the impacted segments',example:'1'})
    @IsOptional()
    segmentIds?:string;
}

class address {
    @ApiProperty({description:'Line 1 = Street address, Line 2 = Apartment, suite, unit, building, floor, etc. Each line is limited to 35 characters'})
    lines:string[];

    @ApiProperty({example: '74130'})
    postalCode:string;

    @ApiProperty()
    countryCode:string;

    @ApiProperty({example: 'Dublin'})
    cityName:string;

    @ApiProperty()
    stateName:string;

    @ApiProperty({example:'BP 220'})
    postalBox:string;
}

class phones {

    @ApiProperty({enum:[ 'MOBILE', 'LANDLINE', 'FAX' ]})
    deviceType:string;

    @ApiProperty({example:'"1" for US & "371" for Latvia'})
    countryCallingCode:string;

    @ApiProperty()
    number:string;

}

class contact {
    @ApiProperty({type:name})
    addresseeName:name;

    @ApiProperty({type:address})
    address:address;

    @ApiPropertyOptional()
    @IsOptional()
    language?:string;

    @ApiProperty({enum:[ 'STANDARD', 'INVOICE', 'STANDARD_WITHOUT_TRANSMISSION' ], description:'the purpose for which this contact is to be used.'})
    purpose:string;

    @ApiProperty({type:[phones]})
    @ValidateNested({each:true})
    @Type(()=> phones)
    phones:phones[];

    @ApiPropertyOptional({example:'Master Infotech'})
    @IsOptional()
    companyName?:string;

    @ApiPropertyOptional({example:'support@mail.com'})
    @IsOptional()
    emailAddress?:string;



    

}

class data {

    @ApiProperty({default:'flight-order'})
    type:string;

    
    @ApiProperty({example: ['{{flightOfferPrice_data}}']})
    @IsNotEmpty()
    @IsArray()
    flightOffers:any;

    @ApiPropertyOptional({type:[travelers]})
    @ValidateNested({each:true})
    @Type(()=> travelers)
    travelers:travelers[];

    @ApiPropertyOptional({type:remarks})
    @IsOptional()
    remarks?:remarks;

    @ApiProperty({type:ticketingAgreement})
    ticketingAgreement:ticketingAgreement;

    @ApiPropertyOptional({type:[contact]})
    @ValidateNested({each:true})
    @Type(()=> contact)
    contact:contact[];

}



export class flightOrder {

    @IsNotEmpty()
    @ApiProperty({type:data})
    data:data;



}