import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRegistrationType } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  registerUser(registerUserPayload: UserRegistrationType) {
    const userInstance = this.userRepository.create(registerUserPayload);
    return this.userRepository.save(userInstance);
  }

  fetchUsers() {
    return this.userRepository.find();
  }
}
