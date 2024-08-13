import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Book Rent Project For TWO F Capital!';
  }
}
