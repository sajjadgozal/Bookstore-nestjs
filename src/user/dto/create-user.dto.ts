import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(user|admin|manager)$/, {
    message: 'ًole must be either user, admin or manager',
  })
  role: string = 'user';

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters`,
  })
  password: string;
}
