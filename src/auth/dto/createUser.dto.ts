import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';



export class CreateUserDto {

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


}