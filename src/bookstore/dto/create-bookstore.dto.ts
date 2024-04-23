import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBookstoreDto {
  @ApiProperty({
    description: 'The title of the bookstore.',
    example: 'My Bookstore',
  })
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty()
  title: string;
}
