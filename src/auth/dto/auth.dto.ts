import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

// auth dto
export class AuthDto {
  @IsNotEmpty({ message: 'Please enter name' })
  @IsString({ message: 'Name should be a string' })
  @Length(3, 20, { message: 'Name must be between 3 and 10 characters long' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabetic characters',
  })
  name: string;

  @IsNotEmpty({ message: 'Please enter password' })
  @Length(8, 100, { message: 'Password must be at least 8 characters long' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minNumbers: 2,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must contain at least 1 lowercase letter, 1 uppercase letter, 2 numbers, and 1 symbol',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'Please enter email' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email must be a valid Gmail address',
  })
  email: string;
}
