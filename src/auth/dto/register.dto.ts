import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  username: string;
    
  @IsString()
  @IsNotEmpty()
  password: string;
}