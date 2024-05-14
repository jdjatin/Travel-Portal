import { IsNotEmpty } from "class-validator";


export class AdminLoginDto {

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string
}