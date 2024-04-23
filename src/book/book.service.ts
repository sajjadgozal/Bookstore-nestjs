import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    const item: Book = new Book();
    item.title = createBookDto.title;
    item.author = createBookDto.author;
    return this.repo.save(item);
  }

  findAll(): Promise<Book[]> {
    return this.repo.find({ relations: ['bookstore'] });
  }

  findOne(id: number): Promise<Book> {
    return this.repo.findOneBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const item: Book = new Book();
    item.title = updateBookDto.title;
    item.author = updateBookDto.author;
    item.id = id;
    return this.repo.save(item);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }
}
