import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of a book',
    minimum: 2,
    default: 'Book Title',
  })
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The author of a book',
    minimum: 2,
    default: 'Author Name',
  })
  @IsString()
  @MinLength(2, { message: 'Author must have at least 2 characters.' })
  @IsNotEmpty()
  author: string;
}
