import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';



export class CreateUsersDto {

    @IsEmail({}, { message: 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' })
    email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @Matches(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).{8,32}$/, { message: 'Password is too weak' })
    password: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(32)
    @Matches(/^[a-zA-Z ]*$/, { message: 'Invalid FirstName' })
    @Transform(({ value }: TransformFnParams) => value.trim())
    firstName: string;


    @MaxLength(32)
    @Matches(/^[a-zA-Z ]*$/, { message: 'Invalid LastName' })
    @Transform(({ value }: TransformFnParams) => value.trim())
    lastName: string;

    @Length(4)
    @IsNotEmpty()
    token: string;

    @ApiProperty({enum:[1,0], default:0})
    isVerified: boolean;

    @ApiProperty({enum:[1,0],default:1})
    isActive: boolean;

}