import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Availability } from './availability.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @OneToMany(() => Availability, (availability) => availability.book)
  availabilities: Availability[];

  get stores(): Bookstore[] {
    const uniqueStores = this.availabilities?.map(
      (availability) => availability.bookstore,
    );
    return uniqueStores ? Array.from(new Set(uniqueStores)) : [];
  }
}
