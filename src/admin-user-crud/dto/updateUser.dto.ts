import { IsNotEmpty, IsOptional } from "class-validator";


export class UpdateUserDto {

    @IsNotEmpty()
    @IsOptional()
    firstName?: string;

    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @IsNotEmpty()
    @IsOptional()
    email?: string;
    
    @IsNotEmpty()
    @IsOptional()
    token?: string;

    @IsNotEmpty()
    @IsOptional()
    isActive?: boolean;

    @IsNotEmpty()
    @IsOptional()
    isVerified?: boolean;


}