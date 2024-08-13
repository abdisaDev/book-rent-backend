import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthValidationType } from 'src/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    const isValidPassword = await bcrypt.compare(
      authPayload.password,
      user.password,
    );

    if (isValidPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return { access_token: this.jwtService.sign(rest), logged_user: rest };
    }
  }
}
