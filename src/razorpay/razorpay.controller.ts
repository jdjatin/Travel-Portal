import { Body, Controller, Post, UseGuards , Request, Get, Param} from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLink } from './dto/createLink.dto';

@ApiTags('RazorPay')
@Controller('razorpay')
export class RazorpayController {
//  private data: any = null;
// private resultReturned: boolean = false;
    // let resultReturned = false;
    constructor(
        private readonly razorpayServices:RazorpayService,
        
       
        
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Post('create-customer')
    async createCustomer(@Body() customerData,@Request() req){

        let userId = { userId: req.user.id };
        return await this.razorpayServices.createCustomer(customerData, userId);

    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Post('send-data')
    async saveData(@Body() data,
    @Request() req) {
        let userId = { userId: req.user.id };
        return await this.razorpayServices.saveOrderData(data, userId)
    }
    

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Post('create-payment-link')
    async createPaymentLink(@Body() linkData:CreateLink,
    @Request() req ){

        let userId = { userId: req.user.id };
        return await this.razorpayServices.createPaymentLink(linkData, userId);
    }



    @Post('payment-link-confirmation')

    async handlePaymentLinkConfirmation(@Body() webhookData: any) {
      console.log('Webhook data',webhookData);

      // If webhookData is populated and data is still null, assign its value to data
    //   if (webhookData && this.data === null && !this.resultReturned) {
    //     this.data = webhookData;
    //   }

    //   let result = null;
      if (webhookData !== "" && webhookData !== null) {
        const result = await this.razorpayServices.handlePaymentAndBooking(webhookData);
        // this.resultReturned = true;
    //   }

    //   if (result) {

        // Return the result only if a valid response has been processed
        return result;
    //   }
    }
    
    
}


@Get('booking-complete/:id')
async getBookingDetails(@Param('id') id:string) {
    return await this.razorpayServices.findOne(id);
}
    
    
    
}
