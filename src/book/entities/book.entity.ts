import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @ManyToOne(() => Bookstore, (bookstore) => bookstore.books)
  bookstore: Bookstore;
}
