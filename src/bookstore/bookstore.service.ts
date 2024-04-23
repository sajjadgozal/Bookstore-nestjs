import { Injectable } from '@nestjs/common';
import { CreateBookstoreDto } from './dto/create-bookstore.dto';
import { UpdateBookstoreDto } from './dto/update-bookstore.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookstore } from './entities/bookstore.entity';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(Bookstore)
    private readonly repo: Repository<Bookstore>,
  ) {}

  create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore> {
    const item: Bookstore = new Bookstore();
    item.title = createBookstoreDto.title;
    return this.repo.save(item);
  }

  async findAll(): Promise<any[]> {
    const booksWithQuantities = await this.repo.find({
      relations: ['availabilities', 'availabilities.book'],
    });

    return booksWithQuantities.map((store) => {
      return {
        id: store.id,
        title: store.title,
        books: store.availabilities.map((quantity) => ({
          id: quantity.book.id,
          title: quantity.book.title,
          author: quantity.book.author,
          quantity: quantity.quantity,
          price: quantity.price,
        })),
      };
    });
  }

  findOne(id: number): Promise<Bookstore> {
    return this.repo.findOneBy({ id });
  }

  find(id: number): Promise<Bookstore[]> {
    return this.repo.find({
      relations: ['availabilities', 'availabilities.book'],
      where: { id },
      take: 1,
    });
  }

  update(
    id: number,
    updateBookstoreDto: UpdateBookstoreDto,
  ): Promise<Bookstore> {
    const item: Bookstore = new Bookstore();
    item.title = updateBookstoreDto.title;
    item.id = id;
    return this.repo.save(item);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }
}
