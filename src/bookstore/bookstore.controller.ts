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
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('bookstore')
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @ApiTags('bookstore')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new bookstore',
    description: 'Create a new bookstore.',
  })
  @Post()
  create(@Body() createBookstoreDto: CreateBookstoreDto) {
    return this.bookstoreService.create(createBookstoreDto);
  }

  @ApiTags('bookstore')
  @ApiOperation({
    summary: 'Get all bookstores',
    description: 'Retrieve a list of all bookstores.',
  })
  @Public()
  @Get()
  findAll() {
    return this.bookstoreService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get a bookstore by ID',
    description: 'Retrieve a bookstore by ID.',
  })
  @ApiTags('bookstore')
  findOne(@Param('id') id: string) {
    return this.bookstoreService.find(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateBookstoreDto: UpdateBookstoreDto,
  ) {
    return this.bookstoreService.update(+id, updateBookstoreDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.bookstoreService.remove(+id);
  }
}
