// /* eslint-disable no-var */
// /* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable prettier/prettier */
import { Injectable, Body, HttpException } from '@nestjs/common';
import { TravelBookings } from './entities/bookingToken.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import * as Amadeus from 'amadeus';
import * as NodeCache from 'node-cache';


@Injectable()
export class FlightBookingService {
  private readonly cache: NodeCache;
  private readonly amadeus: Amadeus;

  constructor(
    @InjectRepository(TravelBookings)
    private readonly travelBookingsRepo: Repository<TravelBookings>
  ) {
    this.amadeus = new Amadeus({
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET
    });
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
  }

  private getAmadeus() {
    const amadeus = this.cache.get("amadeus");
    if (amadeus) {
      return amadeus;
    }
    this.cache.set("amadeus", this.amadeus);
    return this.amadeus;
  }

  async flightSearchGet(data: any) {
    const startTime = Date.now();
    try {
      const amadeus = this.getAmadeus();
      const res = await amadeus.shopping.flightOffersSearch.get(data);
      const endTime = Date.now();
      console.log(endTime - startTime);
      return res.result.data;
    } catch (error) {
      const endTime = Date.now();
      console.log(endTime - startTime);
      return error.response;
    }
  }

  async flightSearch(data: any) {
    try {

      var amadeus = new Amadeus({
        clientId: process.env.API_KEY,
        clientSecret: process.env.API_SECRET
      });
      console.log('amadeus', amadeus);
      const res = await amadeus.shopping.flightOffersSearch.post(JSON.stringify
        (data)).catch((error: any) => {
          throw error;
        });
      // console.log('res',res)
      return res.result;

    } catch (error) {
      // console.log('error',error);
      return error.response;

    }
  }

  async priceCheck(data: any) {
    try {
      var amadeus = new Amadeus({
        clientId: process.env.API_KEY,
        clientSecret: process.env.API_SECRET
      });


      console.log('BODY------->', data)


      const verified_data = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          "data": {
            "type": "flight-offers-pricing",
            "flightOffers": [data]
          }
        })
      ).catch((error: any) => {
        throw error;
      });
      console.log('new', data)
      return verified_data.data;

    } catch (error) {
      return error.response;
    }
  }



  async flightCreateOrder(data: any, id) {
    try {
      var amadeus = new Amadeus({
        clientId: process.env.API_KEY,
        clientSecret: process.env.API_SECRET
      });

      // const reqObject={
      //   "data": {
      //     "type": "flight-order",
      //     "flightOffers": [
      //       data.flightOffers
      //     ],
      //     "travelers": [
      //       {
      //         "id": data.id,
      //         "dateOfBirth":data.dateOfBirth ,
      //         "gender": data.gender,
      //         "name": {
      //           "firstName": data.name.firstName,
      //           "lastName": data.name.lastName,
      //           "middleName": data.name.middleName,
      //           "secondLastName": data.name.secondLastName
      //         },
      //         "documents": [
      //           {
      //             "number": data.number,
      //             "issuanceDate": data.issuanceDate,
      //             "expiryDate": data.expiryDate,
      //             "issuanceCountry": data.issuanceCountry,
      //             "issuanceLocation": data.issuanceLocation,
      //             "nationality": data.nationality,
      //             "birthPlace": data.birthPlace,
      //             "documentType": data.documentType,
      //             "validityCountry": data.validityCountry,
      //             "birthCountry": data.birthCountry,
      //             "holder": data.holder
      //           }
      //         ],
      //         "emergencyContact": {
      //           "addresseeName": "string",
      //           "countryCode": "US",
      //           "number": "+1-7878787878",
      //           "text": "Write Additional Information Here"
      //         },
      //         "loyaltyProgram": [
      //           {
      //             "programOwner": "AF",
      //             "id": "12357466574"
      //           }
      //         ],
      //         "discountEligibility": [
      //           {
      //             "subType": "SPANISH_RESIDENT",
      //             "cityName": "Madrid",
      //             "travelerType": "SPANISH_CITIZEN",
      //             "cardNumber": "12568215Z",
      //             "certificateNumber": "12568215Z"
      //           }
      //         ]
      //       }
      //     ],
      //     "remarks": {
      //       "discountEligibility": [
      //         {
      //           "subType": "GENERAL_MISCELLANEOUS",
      //           "category": "Z",
      //           "text": "PASSENGER NEED ASSISTANCE",
      //           "travelerIds": [
      //             "string"
      //           ],
      //           "flightOfferIds": [
      //             "string"
      //           ]
      //         }
      //       ],
      //       "airline": [
      //         {
      //           "subType": "KEYWORD",
      //           "keyword": "PARK",
      //           "airlineCode": "AF",
      //           "text": "CAR PARK",
      //           "travelerIds": [
      //             "string"
      //           ],
      //           "flightOfferIds": [
      //             "string"
      //           ]
      //         }
      //       ]
      //     },
      //     "ticketingAgreement": {
      //       "option": "DELAY_TO_QUEUE",
      //       "delay": "string"
      //     },
      //     "contact": [
      //       {
      //         "addresseeName": {
      //           "firstName": "string",
      //           "lastName": "string",
      //           "middleName": "string",
      //           "secondLastName": "string"
      //         },
      //         "address": {
      //           "lines": [
      //             "string"
      //           ],
      //           "postalCode": "74130",
      //           "countryCode": "string",
      //           "cityName": "Dublin",
      //           "stateName": "string",
      //           "postalBox": "BP 220"
      //         },
      //         "language": "string",
      //         "purpose": "STANDARD",
      //         "phones": [
      //           {
      //             "deviceType": "MOBILE",
      //             "countryCallingCode": "\"1\" for US & \"371\" for Latvia",
      //             "number": "string"
      //           }
      //         ],
      //         "companyName": "Master Infotech",
      //         "emailAddress": "support@mail.com"
      //       }
      //     ]
      //   }
      // }
        
      

      const res = await amadeus.booking.flightOrders.post(
        JSON.stringify(data)
      ).catch(error => {
        throw error;
      });
      console.log(id);
      const reqData= {
        booking_id:res.data.id,
        departure_date:res.data.flightOffers[0].itineraries[0].segments[0].departure.at,
        primary_traveller:res.data.travelers[0].name.firstName + ' ' + res.data.travelers[0].name.lastName
      }
      
      // const booking_data=JSON.stringify(res.data, null, 2).replace(/["{}]/g, '').replace(/,/g, '\n')
      
      const saveToDb= await this.travelBookingsRepo.update(id,{  'booking_response': res.data, 'Status': 'Booked', 'flight_date':res.data.flightOffers[0].itineraries[0].segments[0].departure.at });
      return res.data;
    } catch (error) {

      return error.response;
    }
  }

  async flightOrderHistory(user) {

    return this.travelBookingsRepo.find({ where: { 'userId': user.userId } })

  }






  async flightCancel(flightOrderId) {

    var amadeus = await new Amadeus({
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET
    });
    try {
      const output = await this.travelBookingsRepo.findOne({ select: { booking_response: true }, where: { id: flightOrderId } });
      console.log(output);
      const bookingId= output.booking_response['id'];
      let amadeusResponse= amadeus.booking.flightOrder(bookingId).delete();
      if(amadeusResponse.Status=200 || 204) {
        this.travelBookingsRepo.createQueryBuilder().update().set({Status:'Cancelled'}).where({id:flightOrderId}).execute();
        return "Deleted Sucessfully";
      }



    } catch (error) {
      return error;
    }

  

  }



}