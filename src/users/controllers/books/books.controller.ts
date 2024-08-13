import { Body, Controller, Param, Post } from '@nestjs/common';
import { BookRegistrationDto } from 'src/dtos/bookRegistration.dto';
import { BooksService } from 'src/users/services/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksSrevice: BooksService) {}

  @Post(':email/upload')
  uploadBook(
    @Param('email') userEmail: string,
    @Body() bookData: BookRegistrationDto[],
  ) {
    return this.booksSrevice.uploadBook(userEmail, bookData);
  }
}
