/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ValidateNested, IsDateString, MinLength, MaxLength } from "class-validator";




class Travelers{
    @IsNotEmpty()
    @ApiProperty()
    id:string;

    @IsNotEmpty()
    @ApiProperty({ enum: [ "ADULT", "CHILD", "SENIOR", "YOUNG", "HELD_INFANT", "SEATED_INFANT", "STUDENT" ]})
    travelerType:string;
    
    @IsNotEmpty()
    // @ApiProperty({type:[FareOptions]})
    @ApiProperty({ enum: [ "STANDARD", "INCLUSIVE_TOUR", "SPANISH_MELILLA_RESIDENT", "SPANISH_CEUTA_RESIDENT", "SPANISH_CANARY_RESIDENT", "SPANISH_BALEARIC_RESIDENT", "AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS", "AIR_FRANCE_DOM_DISCOUNT_PASS", "AIR_FRANCE_COMBINED_DISCOUNT_PASS", "AIR_FRANCE_FAMILY", "ADULT_WITH_COMPANION", "COMPANION" ],
      type:[]})
    fareOptions: string[];


} 

class departureDateTimeRange {
  @ApiProperty({ format: 'date', example: '2023-01-15' })
  date:string;

  @ApiProperty({ format:'time', example:'18:00:00'})
  time:string;

}

class OriginDestinations {
    @IsNotEmpty()
    @ApiProperty()
    id:string;


    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(3)
    originLocationCode:string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(3)
    destinationLocationCode:string;

    @ApiProperty({type:departureDateTimeRange})
    // @IsDateString()
    @IsNotEmpty()
    departureDateTimeRange:departureDateTimeRange;


    // @ApiProperty()
    // @IsNotEmpty()
    // adults:string;


}

class cabinRestrictions {

  @ApiPropertyOptional({enum:[ 'ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST' ],example: 'PREMIUM_ECONOMY', description:'quality of service offered in the cabin where the seat is located in this flight. Economy, premium economy, business or first class'})
  cabin:string;

  @ApiPropertyOptional({enum:[ 'MOST_SEGMENTS', 'AT_LEAST_ONE_SEGMENT', 'ALL_SEGMENTS' ],example: 'MOST_SEGMENTS', description:'part of the trip covered by the travel class restriction (ALL_SEGMENTS if ommited)'})
  coverage:string;

  @ApiPropertyOptional({example:["1"], description:'The list of originDestination identifiers for which the cabinRestriction applies'})
  originDestinationIds:string[];

}

class carrierRestrictions {

  @ApiPropertyOptional({description:'This flag enable/disable filtering of blacklisted airline by EU. The list of the banned airlines is published in the Official Journal of the European Union, where they are included as annexes A and B to the Commission Regulation. The blacklist of an airline can concern all its flights or some specific aircraft types pertaining to the airline'})
  blacklistedInEUAllowed:boolean;

  @ApiPropertyOptional({description:'This option ensures that the system will only consider these airlines.'})
  excludedCarrierCodes:string[];


  @ApiPropertyOptional({description:'This option ensures that the system will only consider these airlines.'})
  includedCarrierCodes:string[];

}

class flightFilters {

  @ApiPropertyOptional({description:'Allows to search a location outside the borders when a radius around a location is specified. Default is false.'})
  crossBorderAllowed:boolean;

  @ApiPropertyOptional({description:'This flag enables/disables the possibility to have more overnight flights in Low Fare Search'})
  moreOvernightsAllowed:boolean;

  @ApiPropertyOptional({description:'This option force to retrieve flight-offer with a departure and a return in the same airport'})
  returnToDepartureAirport:boolean;

  @ApiPropertyOptional({description:'This flag enable/disable filtering of rail segment (TGV AIR, RAIL ...)'})
  railSegmentAllowed:boolean;

  @ApiPropertyOptional({description:'This flag enable/disable filtering of bus segment'})
  busSegmentAllowed:boolean;

  @ApiPropertyOptional({description:'Maximum flight time as a percentage relative to the shortest flight time available for the itinerary'})
  maxFlightTime:number;

  @ApiPropertyOptional({type:carrierRestrictions})
  carrierRestrictions:carrierRestrictions;

  @ValidateNested({ each: true })
  @Type(() => cabinRestrictions)
  @ApiPropertyOptional({ type: [cabinRestrictions] })
  cabinRestrictions:cabinRestrictions[];

}

class additionalInformation{
  @ApiPropertyOptional({description:'If true, returns the price of the first additional bag when the airline is an "Amadeus Ancillary Services" member.'})
  chargeableCheckedBags:boolean;

  @ApiPropertyOptional({description:'If true, returns the fare family name for each flight-offer which supports fare family'})
  brandedFares:boolean;
}

class pricingOptions {
  @ApiPropertyOptional({description:'If true, returns the flight-offers with included checked bags only'})
  includedCheckedBagsOnly:boolean;

  @ApiPropertyOptional({description:'If true, returns the flight-offers with refundable fares only'})
  refundableFare:boolean;

  @ApiPropertyOptional({description:'If true, returns the flight-offers with no restriction fares only'})
  noRestrictionFare:boolean;

  @ApiPropertyOptional({description:'If true, returns the flight-offers with no penalty fares only'})
  noPenaltyFare:boolean;
}

class searchCriteria {

  @ApiPropertyOptional({description:'This option allows to exclude the isAllotment flag associated to a booking class in the search response when it exist.'})
  excludeAllotments:boolean;

  @ApiPropertyOptional({description:'This option allows activate the one-way combinable feature.'})
  addOneWayOffers:boolean;

  @ApiPropertyOptional({description:'Maximum number of flight offers returned (Max 250)'})
  maxFlightOffers:number;

  @ApiPropertyOptional({description:'maximum price per traveler. By default, no limit is applied. If specified, the value should be a positive number with no decimals'})
  maxPrice:number;

  @ApiPropertyOptional({description:'This option allows to default to a standard fareOption if no offers are found for the selected fareOption.'})
  allowAlternativeFareOptions:boolean;

  @ApiPropertyOptional({description:'Requests the system to find at least one flight-offer per day, if possible, when a range of dates is specified. Default is false.'})
  oneFlightOfferPerDay:boolean;

  @ApiPropertyOptional({type:additionalInformation})
  additionalInformation:additionalInformation;

  @ApiPropertyOptional({type:pricingOptions})
  pricingOptions:pricingOptions;

  @ApiPropertyOptional({type:flightFilters})
  flightFilters:flightFilters;



}


export class originDestinationsDto{

  @ApiProperty()
  @MinLength(3)
  @MaxLength(3)
  currencyCode:string;

  @ValidateNested({ each: true })
  @Type(() => OriginDestinations)
  @ApiProperty({ type: [OriginDestinations] })
  originDestinations:OriginDestinations[];


  @ValidateNested({ each: true })
  @Type(() => Travelers)
  @ApiProperty({ type: [Travelers] })
  travelers:Travelers[];


  @IsNotEmpty()
  @ApiProperty()
  sources:string[];

  @ApiPropertyOptional({type:searchCriteria})
  searchCriteria:searchCriteria;

}