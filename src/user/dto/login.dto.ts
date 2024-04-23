import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters`,
  })
  password: string;
}
