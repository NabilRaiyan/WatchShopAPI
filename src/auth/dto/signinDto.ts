import { IsEmail, Matches, IsNotEmpty } from 'class-validator';

// sign in dto
export class SignInDto {
  @IsNotEmpty({ message: 'Please Enter Email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email must be a valid Gmail address',
  })
  email: string;

  @IsNotEmpty({ message: 'Please enter password' })
  password: string;
}
