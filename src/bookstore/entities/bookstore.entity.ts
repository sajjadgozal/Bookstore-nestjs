import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @OneToMany(() => Book, (book) => book.bookstore)
  books: Book[];
}
