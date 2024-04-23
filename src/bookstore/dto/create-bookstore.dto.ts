import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookstoreDto {
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;
}
