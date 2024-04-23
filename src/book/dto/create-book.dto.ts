import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(2, { message: 'Author must have at least 2 characters.' })
  @IsNotEmpty()
  author: string;
}
