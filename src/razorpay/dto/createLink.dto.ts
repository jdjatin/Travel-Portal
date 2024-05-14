import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EmailAddress } from "@sendgrid/helpers/classes";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, Length, MaxLength, MinLength, ValidateNested } from "class-validator";


class customer {
    @IsOptional()
    @MinLength(3)
    @MaxLength(50)
    @ApiPropertyOptional({example:'Jatin'})
    name:string;

    @MaxLength(15)
    @IsOptional()
    @ApiPropertyOptional({example:'+919876543210'})
    contact:string;

    @MaxLength(50)
    @IsOptional()
    @ApiPropertyOptional({example:'mail@test.com'})
    email:string;
}

class notify {

    @ApiProperty({default:true, description:'Defines who handles the SMS notification. Possible values: true: Razorpay handles the notification. false: You handle the notification.'})
    @IsNotEmpty()
    sms:boolean;

    @ApiPropertyOptional({default:true, description:'Defines who handles the SMS notification. Possible values: true: Razorpay handles the notification. false: You handle the notification.'})
    @IsOptional()
    email:boolean;

}

export class CreateLink {


    @ApiProperty({description:'Amount to be paid using the Payment Link. Must be in the smallest unit of the currency.'})
    @IsNotEmpty()
    amount:number;

    @IsOptional()
    @ApiPropertyOptional({enum:[ 'AED', 'ALL', 'AMD', 'ARS', 'AUD', 'AWG', 'BBD', 'BDT', 'BMD', 'BND', 'BOB', 'BSD', 'BWP', 'BZD','CAD',  'GMD', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'JMD', 'KES', 'KGS', 'KHR', 'KYD', 'KZT', 'LAK', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MKD', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'PEN', 'PGK', 'PHP', 'PKR', 'QAR', 'RUB', 'SAR', 'SCR', 'SEK', 'SGD', 'SLL', 'SOS', 'SSP', 'SVC', 'SZL', 'THB', 'TTD', 'TZS', 'USD', 'UYU', 'UZS', 'YER', 'ZAR']})
    currency?:string;

    @IsOptional()
    @ApiPropertyOptional({default:false,description:'Indicates whether customers can make partial payments using the Payment Link.'})
    accept_partial?:boolean;

    @IsOptional()
    @ApiPropertyOptional({default:100, description:'Minimum amount, in currency subunits, that must be paid by the customer as the first partial payment. Default value is 100. Default currency is INR. For example, if an amount of ₹700.00 is to be received from the customer in two installments of #1 - ₹500.00, #2 - ₹200.00, then you can set this value as 500000. Must be passed along with accept_partial parameter.'})
    first_min_partial_amount?:number;

    @IsOptional()
    @ApiPropertyOptional({description:'Must be set to true for creating UPI Payment Link.'})
    upi_link?:boolean;

    @IsOptional()
    @ApiPropertyOptional({description:'A brief description of the Payment Link. The maximum character limit supported is 2048.'})
    description?:string;

    @ApiPropertyOptional({description:'Reference number tagged to a Payment Link. Must be a unique number for each Payment Link.'})
    @IsOptional()
    @MaxLength(40)
    reference_id?:string;

    @ApiPropertyOptional({type:customer})
    @IsOptional()
    customer?:customer;

    @ApiPropertyOptional({description:'Timestamp, in Unix, at which the Payment Link will expire. By default, a Payment Link will be valid for six months from the date of creation. Please note that the expire by date cannot exceed more than six months from the date of creation.'})
    @IsOptional()
    expire_by?:number;

    @ApiPropertyOptional({type:[notify]})
    @ValidateNested({ each: true })
    @Type(() => notify)
    @IsOptional()
    notify?:notify[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    notes?: Record<string, string>;

    @IsOptional()
    @ApiPropertyOptional({description:'If specified, adds a redirect URL to the Payment Link. Once customers completes the payment, they are redirected to the specified URL.'})
    callback_url?:string;

    @ApiPropertyOptional()
    @IsOptional()
    callback_method?:string;

    @ApiPropertyOptional({example:true, description:'Used to send reminders for the Payment Link. Possible values: true: To send reminders. false: To disable reminders.'})
    @IsOptional()
    reminder_enable?:boolean;
    


    


}