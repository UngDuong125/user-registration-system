import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid Email.' })
  @IsNotEmpty({ message: 'Email no empty.' })
  email: string;

  @IsNotEmpty({ message: 'Password no empty.' })
  @MinLength(6, { message: 'Password length >= 6.' })
  password: string;
}
