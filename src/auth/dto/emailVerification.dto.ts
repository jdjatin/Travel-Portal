import {  IsNotEmpty } from 'class-validator';



export class EmailVerificationDto {
    @IsNotEmpty()
    token: string;


}