import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CreateCustomer } from './entities/createCustomer.entity';
import { Repository } from 'typeorm';
import { TravelBookings } from './../flight-booking/entities/bookingToken.entity'
import { FlightBookingService } from '../flight-booking/flight-booking.service';



@Injectable()
export class RazorpayService {
    processedValidResponse: any;
    constructor(
        @InjectRepository(CreateCustomer)
        private readonly customerRepo: Repository<CreateCustomer>,
        @InjectRepository(TravelBookings)
        private readonly bookingReq: Repository<TravelBookings>,

        private readonly flightService: FlightBookingService

    ) { }

    async createCustomer(customerData, user) {

        try {
            const username = process.env.RP_API_ID;
            const password = process.env.RP_API_SECRET;
            const auth = Buffer.from(`${username}:${password}`).toString('base64');
            console.log(auth)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.razorpay.com/v1/customers',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                },
                data: JSON.stringify(customerData)
            };
            const res = await axios.request(config);
            const save_db = await this.customerRepo.save({ userId: user.userId, customer_info: res.data });

            return save_db;



        } catch (error) {
            return error;
        }


    }



    async saveOrderData(orderData, user) {
        try {

            const amount = Number(orderData.data.flightOffers[0].price.total) * 10
            const reqPaymentData = {
                "amount": amount,
                "currency": orderData.data.flightOffers[0].price?.currency,
                "callback_url": 'http://localhost:3000/thankyoupage',
                "callback_method": 'get'
            }


            const paymentRes = await this.createPaymentLink(reqPaymentData, user);
            if (paymentRes.status === 'created') {
                const saveToDb = await this.bookingReq.save({ 'userId': user.userId, 'booking_request': orderData, 'payment_id': paymentRes.id });
                return {
                    payment_url:paymentRes.short_url,
                    id:saveToDb.id
                };
            }

            else {
                return "XXX Unable to process payment XXX "
            };





        } catch (error) {
            throw error;
        }
    }


    async createPaymentLink(linkData, user) {
        try {
            // Generate a webhook URL for this payment link
            // const webhookUrl = 'https://eovduabnz85iqvs.m.pipedream.net'; // Replace with your actual webhook URL
            // linkData['callback_url'] = webhookUrl;
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.razorpay.com/v1/payment_links',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + process.env.RP_BASIC_AUTH

                },
                data: JSON.stringify(linkData)
            };
            const res = await axios.request(config);
            console.log(res.data)
            const save_db = await this.customerRepo.save({ userId: user.userId, link_response: res.data });
            return res.data;
            return {
                id: res.data.id,
                amount: res.data.amount,
                callback_url: res.data.callback_url,
                currency: res.data.currency,
                customer_number: res.data.customer.contact,
                customer_name: res.data.customer.name,
                customer_email: res.data.customer.email,
                description: res.data.description,
                first_min_partial_amount: res.data.first_min_partial_amount,
                notes: res.data.notes,
                reference_id: res.data.reference_id,
                short_url: res.data.short_url
            };
        }
        catch (error) {
            return error;

        }
    }


    async handlePaymentAndBooking(webhookData) {
        try {

            console.log("servicesssssssss", webhookData);

            if (Object.keys(webhookData).length === 0) {
                return;
            };

            const data = await webhookData;
            if (data.event === 'payment_link.paid') {
                console.log("1st if aa rha h", data)
                const payload = data.payload;
                if (payload && payload.payment_link) {
                    console.log("2nd if bhi aa rha h", payload);
                    const webhook_id = payload.payment_link.entity.id;
                    console.log("id hai ye webhook ki", webhook_id);
                    const booking = await this.bookingReq.findOne({ where: { 'payment_id': webhook_id } });
                    console.log("Database se ye booking aai h", booking);
                    const flightPayload = booking.booking_request;
                    // const userId = booking.userId;
                    const id= booking.id;

                    if (booking.Status=='Booked') {
                        return 'Booking is already Done!!!';
                    } else {
                        const res = await this.flightService.flightCreateOrder(flightPayload, id);
                        console.log("booking response", res);

                        return res.data;
                        ;
                    }
                }
            }
        } catch (error) {
            throw error;
        }
    }


    async findOne(id): Promise<TravelBookings> {
        const startTime = new Date().getTime(); // get current time
        const timeout = 30000; // timeout after 30 seconds
      
        while (new Date().getTime() - startTime < timeout) {
          const bookingReq = await this.bookingReq.findOne({ where: { id: id } });
          if (bookingReq.Status === 'Booked') {
            return bookingReq;
          }
          await new Promise(resolve => setTimeout(resolve, 100)); // wait for 0.1 seconds
        }
      
        throw new Error('Unable to fetch booking');
      }


      async refund () {}

}



