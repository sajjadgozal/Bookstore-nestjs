import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AssignBookDto } from './dto/assign-book.dto';
import { Availability } from './entities/availability.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
    @InjectRepository(Bookstore)
    private readonly storeRepo: Repository<Bookstore>,
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const item: Book = new Book();

    item.title = createBookDto.title;
    item.author = createBookDto.author;

    return this.repo.save(item);
  }

  async findAll(): Promise<any[]> {
    const res = await this.repo.find({
      relations: ['availabilities', 'availabilities.bookstore'],
    });

    return res.map((book) => {
      return {
        id: book.id,
        title: book.title,
        stores: book.availabilities.map((quantity) => ({
          id: quantity.bookstore.id,
          title: quantity.bookstore.title,
          quantity: quantity.quantity,
          price: quantity.price,
        })),
      };
    });
  }

  findOne(id: number): Promise<Book> {
    return this.repo.findOne({
      where: { id },
      relations: ['availabilities', 'availabilities.bookstore'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
      relations: ['bookstores'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;

    return this.repo.save(book);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }

  async assignBook(assignBookDto: AssignBookDto): Promise<any[]> {
    const book = await this.repo.findOne({
      where: { id: assignBookDto.book_id },
      relations: ['availabilities', 'availabilities.bookstore'],
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const store = await this.storeRepo.findOne({
      where: { id: assignBookDto.store_id },
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const availability = book.availabilities.find(
      (item) => item.bookstore.id === assignBookDto.store_id,
    );

    if (availability) {
      if (assignBookDto.quantity === 0) {
        await this.availabilityRepository.remove(availability);
        return;
      }
      availability.quantity = assignBookDto.quantity;
      availability.price = assignBookDto.price;
      await this.availabilityRepository.save(availability);
      return;
    } else {
      if (assignBookDto.quantity === 0) {
        return;
      }
      const availability = new Availability();
      availability.bookstore = store;
      availability.quantity = assignBookDto.quantity;
      availability.price = assignBookDto.price;

      book.availabilities.push(availability);

      await this.availabilityRepository.save(availability);
      await this.repo.save(book);
    }
  }
}
