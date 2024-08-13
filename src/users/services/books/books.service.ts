import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { NewBookType } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async uploadBook(userEmail: string, bookData: NewBookType[]) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    console.log(await this.userRepository.find());

    if (!user)
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);

    return bookData.map((books) => {
      const book = { status: false, ...books };
      const bookInstance = this.bookRepository.create({
        ...book,
        user,
      });

      return this.bookRepository.save(bookInstance);
    });
  }
}
