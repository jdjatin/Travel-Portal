import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Amadeus from 'amadeus';
import { FlightData } from '../flight-data/entity/flightData.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import axios, { AxiosRequestConfig } from 'axios';
import { access } from 'fs';


@Injectable()
export class FlightAnalyticsService {
    private amadeus: Amadeus;

    constructor(
        @InjectRepository(FlightData)
        private readonly flightData: Repository<FlightData>
    ) {
        this.amadeus = new Amadeus({
            clientId: process.env.API_KEY,
            clientSecret: process.env.API_SECRET,
        });
    }


    async cheapest_flights(data) {
        try {
            const popular_destinations = await this.flightData.find();
            const dataArray = [];
            for (const item of popular_destinations) {
                const res = await this.amadeus.analytics.itineraryPriceMetrics.get({
                    originIataCode: item.origin_iata,
                    destinationIataCode: item.destination_iata,
                    departureDate: moment().format('YYYY-MM-DD')
                });

                dataArray.push(res.result.data);
            }
            // return created array
            return dataArray;

        }
        catch (error) {
            return error;
        }


    }

    async flight_inspiration(data) {  // What are the cheapest places to fly from Boston?

        try {
            const res = await this.amadeus.shopping.flightDestinations.get({
                origin: data.origin,
                departureDate: data.departureDate

            })
            return res.result;

        } catch (error) {
            return error;
        }


    }

    async directDestination(data) { //Get the percentage of on-time flight departures from a given airport
        try {
            const res = await this.amadeus.airport.directDestinations.get({
                departureAirportCode: data.departureAirportCode,
                max: data.max
            })
            return res.result.data;
        } catch (error) {
            return error;
        }
    }

    async airlineRoutes(data) { //find all destinations served by a given airline
        try {
            const res = await this.amadeus.airline.destinations.get({
                airlineCode: data.airlineCode,
                max: data.max
            });
            return res.result.data;
        }
        catch (error) {
            return error;
        }
    }

    async getToken() {
        try {
            const qs = require('qs');
            const clientId = process.env.API_KEY;
            const clientSecret = process.env.API_SECRET;
            const data = qs.stringify({
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': 'client_credentials'
            });

            const config: AxiosRequestConfig = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            const response = await axios.request(config);
            const accessToken = response.data.access_token;
            return accessToken;

        } catch (error) {
            return error;
        }
    }

    async mostBooked(data) {  //Returns a list of air traffic reports based on the number of bookings.
        try {
            
            const accessToken = await this.getToken();

            const config: AxiosRequestConfig  = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://test.api.amadeus.com/v1/travel/analytics/air-traffic/booked',
                headers: { 
                  'Authorization': 'Bearer '+ accessToken,
                },
                params:{
                    originCityCode:data.originCityCode,
                    period:data.period
                }
                
              };

              const res=await axios.request(config)
              return res.data;
     
        } catch (error) {
            return error;
        }
    }


    async airlineCode(airlineCode) {  //Returns the airline name and code.
        try {
            const res=await this.amadeus.referenceData.airlines.get(airlineCode)
            return res.data;
        } catch (error) {
            return error;
        }
    }

}
