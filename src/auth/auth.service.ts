import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthValidationType } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(authPayload: AuthValidationType) {
    const user = await this.userRepository.findOne({
      where: { email: authPayload.email },
    });

    if (!user)
      throw new HttpException("User Doesn't Exist", HttpStatus.BAD_REQUEST);

    if (authPayload.password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = authPayload;
      return this.jwtService.sign(user);
    }
  }
}
