/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as Amadeus from 'amadeus';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as qs from 'qs';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';
import { Repository } from 'typeorm';


@Injectable()
export class HotelBookingService {
  constructor(
    @InjectRepository(HotelBooking)
    private readonly hotelRepo:Repository<HotelBooking>
  ) {}
  
    async getToken(): Promise<{access_token: string}> {
      try {


        const data = qs.stringify({
          client_id: process.env.API_KEY,
          client_secret: process.env.API_SECRET,
          grant_type: 'client_credentials' 
        });
        
        const config:AxiosRequestConfig = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
        };
        
        return await axios(config)
          .then((response) => {
            return((response.data));
          })
          .catch((error) => {
            console.log(error);
          });
        
      } catch (error) {
        return error;
      }
    }

  
    async hotelSearch(data) {
      try {
        const tokenData=await this.getToken()
        const refreshToken='Bearer '+ ( tokenData).access_token
        console.log('token', refreshToken)
        const config:AxiosRequestConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
          params: data,
          headers: {'Authorization':refreshToken},
          
        };
        
        console.log(data)
        return await axios((config)).then((response) => {
          return((response.data));
        })
        .catch((error) => {
          return(error);
        }); 
      


      } catch (error) {
        return error;
      }
    }


    async hotelOffer(data) {
      try {
        var amadeus = await new Amadeus({
          clientId: process.env.API_KEY,
          clientSecret: process.env.API_SECRET
        });
        console.log(data);
        const res= await amadeus.shopping.hotelOffersSearch.get(data);
        console.log(res.data)
        return res.data;
        
      } catch (error) {
        return error;
      }
      
    }

    async hotelBooking(data, user) {
      try {
        var amadeus = await new Amadeus({
          clientId: process.env.API_KEY,
          clientSecret: process.env.API_SECRET
        });
        console.log(data)
        let res= await amadeus.booking.hotelBookings.post(JSON.stringify(data))
         res= res.result;
          console.log(res);
          let save_data= await this.hotelRepo.save({ 'userId': user.userId, 'booking_response': res, 'Status': 'Booked' })
          return save_data;
      } catch (error) {
        return error;
      }
    }

    async hotelOrderHistory(user) {
      return this.hotelRepo.find({ where: { 'userId': user.userId } });
    }
  


}
