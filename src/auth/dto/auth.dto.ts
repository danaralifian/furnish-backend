import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @Expose()
  id: number;

  @Expose()
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  @Exclude()
  password: string;

  @Expose()
  accessToken?: string;
}
