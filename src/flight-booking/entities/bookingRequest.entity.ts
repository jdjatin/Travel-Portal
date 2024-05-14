// import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity({name:'booking_request'})


// export class BookingRequest {

//     @PrimaryGeneratedColumn('uuid')
//     id:string;

//     @Column('uuid')
//     userId:string;

//     @Column({ type: 'json' })
//     booking_response: string;

//     @Column()
//     payment_id:string;

//     @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

//     @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
    
// }

@Entity({name:'booking_response'})
export class BookingResponse {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column({ type: 'json' })
    contacts: Contact[];

    @Column({ type: 'json' })
    travelers: Traveler[];

    @Column({ type: 'json' })
    flightOffers: FlightOffer[];

}

interface Contact {
    phones: Phone[];
    address: Address;
    purpose: string;
    addresseeName: {
        firstName: string;
    };
}

interface Phone {
    number: string;
    deviceType: string;
    countryCallingCode: string;
}

interface Address {
    lines: string[];
    cityName: string;
    postalCode: string;
    countryCode: string;
}

interface Traveler {
    id: string;
    name: {
        lastName: string;
        firstName: string;
    };
}

interface FlightOffer {
    id: string;
    type: string;
    price: {
        base: string;
        fees: Fee[];
        total: string;
        currency: string;
        grandTotal: string;
        billingCurrency: string;
    };
    source: string;
    itineraries: Itinerary[];
    nonHomogeneous: boolean;
    pricingOptions: {
        fareType: string[];
        includedCheckedBagsOnly: boolean;
    };
    travelerPricings: TravelerPricing[];
}

interface Fee {
    type: string;
    amount: string;
}

interface Itinerary {
    segments: Segment[];
}

interface Segment {
    id: string;
    number: string;
    arrival: {
        at: string;
        iataCode: string;
        terminal: string;
    };
    aircraft: {
        code: string;
    };
    duration: string;
    departure: {
        at: string;
        iataCode: string;
        terminal: string;
    };
    carrierCode: string;
    co2Emissions: {
        cabin: string;
        weight: number;
        weightUnit: string;
    }[];
    numberOfStops: number;
}

interface TravelerPricing {
    price: {
        base: string;
        taxes: {
            code: string;
            amount: string;
        }[];
        total: string;
        currency: string;
        refundableTaxes: string;
    };
    fareOption: string;
    travelerId: string;
    travelerType: string;
    fareDetailsBySegment: FareDetails[];
}
interface FareDetails {
    cabin: string;
    class: string;
    fareBasis: string;
    segmentId: string;
    brandedFare: string;
    includedCheckedBags: {
    quantity: number;
    };
    }
    