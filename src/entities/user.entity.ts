import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  role: string;

  @Column()
  status: boolean;

  @Column()
  isOwnerApproved: boolean;

  @Column()
  revenue: number;

  @OneToMany('book', 'user')
  books: Book[];
}
