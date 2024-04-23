import { Module } from '@nestjs/common';
import { BookstoreService } from './bookstore.service';
import { BookstoreController } from './bookstore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from './entities/bookstore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookstore])],
  controllers: [BookstoreController],
  providers: [BookstoreService],
})
export class BookstoreModule {}
