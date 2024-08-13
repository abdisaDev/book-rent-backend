import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { Book } from 'src/entities/book.entity';
import { BooksController } from './controllers/books/books.controller';
import { BooksService } from './services/books/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  controllers: [UsersController, BooksController],
  providers: [UsersService, JwtStrategy, BooksService],
  exports: [UsersService],
})
export class UsersModule {}
