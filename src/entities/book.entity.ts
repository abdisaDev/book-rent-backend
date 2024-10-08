import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  quantity: number;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  status: boolean;

  @Column()
  cover_page: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
