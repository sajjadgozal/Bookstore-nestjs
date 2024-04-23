import { Availability } from 'src/book/entities/availability.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @OneToMany(() => Availability, (availability) => availability.bookstore)
  availabilities: Availability[];
}
