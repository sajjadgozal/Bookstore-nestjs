import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
import { Availability } from './entities/availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Bookstore, Availability])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
