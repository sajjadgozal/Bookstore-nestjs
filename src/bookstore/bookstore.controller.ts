import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookstoreService } from './bookstore.service';
import { CreateBookstoreDto } from './dto/create-bookstore.dto';
import { UpdateBookstoreDto } from './dto/update-bookstore.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('bookstore')
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Post()
  create(@Body() createBookstoreDto: CreateBookstoreDto) {
    return this.bookstoreService.create(createBookstoreDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.bookstoreService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookstoreService.find(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookstoreDto: UpdateBookstoreDto,
  ) {
    return this.bookstoreService.update(+id, updateBookstoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookstoreService.remove(+id);
  }
}
