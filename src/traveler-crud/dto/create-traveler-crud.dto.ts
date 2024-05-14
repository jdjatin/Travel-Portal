import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";



// class documents {

//     @ApiPropertyOptional({ example: 'QFU514563221J', description: 'The document number (shown on the document)' })
//     number: string;

//     @ApiProperty({ example: '2018-05-22', format: 'YYY-MM-DD' })
//     issuanceDate: string;

//     @ApiProperty({ example: '2023-05-22', format: 'YYY-MM-DD' })
//     expiryDate: string;

//     @ApiProperty()
//     issuanceCountry: string;

//     @ApiProperty({ description: 'A more precise information concerning the place where the document has been issued, when available. It may be a country, a state, a city or any other type of location. e.g. New-York' })
//     issuanceLocation: string;

//     @ApiProperty()
//     nationality: string;

//     @ApiProperty()
//     birthPlace: string;

//     @ApiProperty({ enum: ['VISA', 'PASSPORT', 'IDENTITY_CARD', 'KNOWN_TRAVELER', 'REDRESS'] })
//     documentType: string;

//     @ApiProperty()
//     validityCountry: string;

//     @ApiProperty()
//     birthCountry: string;

//     @ApiProperty({ description: 'boolean to specify if the traveler is the holder of the document' })
//     holder: boolean;

// }

// class emergencyContact {

//     @ApiPropertyOptional({ description: 'Adressee name (e.g. in case of emergency purpose it corresponds to name of the person to be contacted).' })
//     addresseeName: string;

//     @ApiProperty({ example: 'US' })
//     countryCode: string;

//     @ApiPropertyOptional({ example: '+1-7878787878', description: 'Phone number. Composed of digits only. The number of digits depends on the country.' })
//     number: string;

//     @ApiPropertyOptional({ example: 'Write Additional Information Here' })
//     text: string;

// }

// class loyaltyProgram {

//     @ApiPropertyOptional({ example: 'AF', description: 'loyalty program airline code' })
//     programOwner: string;

//     @ApiPropertyOptional({ example: '12357466574', description: 'loyalty program number' })
//     id: string;
// }

// class discountEligibility {
//     @ApiPropertyOptional({ enum: ['SPANISH_RESIDENT', 'AIR_FRANCE_DOMESTIC', 'AIR_FRANCE_COMBINED', 'AIR_FRANCE_METROPOLITAN'], description: 'type of discount applied' })
//     subType: string;

//     @ApiPropertyOptional({ example: 'Madrid', description: 'city of residence' })
//     cityName: string;

//     @ApiPropertyOptional({ description: 'type of discount applied', enum: ['SPANISH_CITIZEN', 'EUROPEAN_CITIZEN', 'GOVERNMENT_WORKER', 'MILITARY', 'MINOR_WITHOUT_ID'] })
//     travelerType: string;

//     @ApiPropertyOptional({ example: '12568215Z', description: 'resident card number' })
//     cardNumber: string;

//     @ApiPropertyOptional({ example: '12568215Z' })
//     certificateNumber: string;

// }

// class name {
//     @ApiProperty()
//     firstName: string;

//     @ApiProperty()
//     lastName: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     middleName?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     secondLastName?: string;
// }

export class CreateTravelerCrudDto {


    @ApiPropertyOptional({ example: '1992-06-23', format: 'YYYY-MM-DD' })
    @IsOptional()
    dateOfBirth?: string;

    @ApiPropertyOptional({ enum: ['MALE', 'FEMALE', 'UNSPECIFIED', 'UNDISCLOSED'], title: 'Gender' })
    @IsOptional()
    gender?: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    middleName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    secondLastName?: string;

    @ApiPropertyOptional({ example: 'QFU514563221J', description: 'The document number (shown on the document)' })
    @IsOptional()
    documents_number?: string;

    @ApiPropertyOptional({ example: '2018-05-22', format: 'YYY-MM-DD' })
    @IsOptional()
    documents_issuanceDate?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '2023-05-22', format: 'YYY-MM-DD' })
    documents_expiryDate?: string;

    @IsOptional()
    @ApiPropertyOptional()
    documents_issuanceCountry?: string;

    @IsOptional()
    @ApiPropertyOptional({ description: 'A more precise information concerning the place where the document has been issued, when available. It may be a country, a state, a city or any other type of location. e.g. New-York' })
    documents_issuanceLocation?: string;

    @IsOptional()
    @ApiPropertyOptional()
    documents_nationality?: string;

    @IsOptional()
    @ApiPropertyOptional()
    documents_birthPlace?: string;

    @IsOptional()
    @ApiPropertyOptional({ enum: ['VISA', 'PASSPORT', 'IDENTITY_CARD', 'KNOWN_TRAVELER', 'REDRESS'] })
    documents_documentType?: string;

    @IsOptional()
    @ApiPropertyOptional()
    documents_validityCountry?: string;

    @IsOptional()
    @ApiPropertyOptional()
    documents_birthCountry?: string;

    @IsOptional()
    @ApiPropertyOptional({ description: 'boolean to specify if the traveler is the holder of the document' })
    documents_holder?: boolean;

    @IsOptional()
    @ApiPropertyOptional({ description: 'Adressee name (e.g. in case of emergency purpose it corresponds to name of the person to be contacted).' })
    emergencyContact_addresseeName?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'US' })
    emergencyContact_countryCode?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '+1-7878787878', description: 'Phone number. Composed of digits only. The number of digits depends on the country.' })
    emergencyContact_number?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Write Additional Information Here' })
    emergencyContact_text?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'AF', description: 'loyalty program airline code' })
    loyaltyProgram_programOwner?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '12357466574', description: 'loyalty program number' })
    loyaltyProgram_id?: string;

    @IsOptional()
    @ApiPropertyOptional({ enum: ['SPANISH_RESIDENT', 'AIR_FRANCE_DOMESTIC', 'AIR_FRANCE_COMBINED', 'AIR_FRANCE_METROPOLITAN'], description: 'type of discount applied' })
    discountEligibility_subType?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'Madrid', description: 'city of residence' })
    discountEligibility_cityName?: string;

    @IsOptional()
    @ApiPropertyOptional({ description: 'type of discount applied', enum: ['SPANISH_CITIZEN', 'EUROPEAN_CITIZEN', 'GOVERNMENT_WORKER', 'MILITARY', 'MINOR_WITHOUT_ID'] })
    discountEligibility_travelerType?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '12568215Z', description: 'resident card number' })
    discountEligibility_cardNumber?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '12568215Z' })
    discountEligibility_certificateNumber?: string;
}



