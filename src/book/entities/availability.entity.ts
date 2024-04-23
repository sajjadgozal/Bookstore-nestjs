import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(() => Book, (book) => book.availabilities)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Bookstore, (bookstore) => bookstore.availabilities)
  @JoinColumn({ name: 'bookstoreId' })
  bookstore: Bookstore;
}
