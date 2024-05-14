import { IsEmail } from 'class-validator';

export class ForgotPasswordLinkDto {
  @IsEmail()
  email: string;
}