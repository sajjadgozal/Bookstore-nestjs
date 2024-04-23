import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AssignBookDto {
  @ApiProperty({
    description: 'The id of the book',
  })
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({
    description: 'The id of store',
  })
  @IsNotEmpty()
  store_id: number;

  @ApiProperty({
    description: 'The quantity of the book',
    default: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'The price of the book',
    default: 0,
  })
  price: number;
}
