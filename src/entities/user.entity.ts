import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
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
}
