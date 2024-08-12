import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async updateUserStatus(userEmail: string) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user)
      throw new HttpException("Couldn't find user.", HttpStatus.BAD_REQUEST);
    user.status = !user.status;
    return await this.userRepository.save(user);
  }

  async approveUser(userEmail: string) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user)
      throw new HttpException("Couldn't find user.", HttpStatus.BAD_REQUEST);
    Object.assign(user, { isOwnerApproved: !user.isOwnerApproved });
    // user.isOwnerApproved = !user.isOwnerApproved;
    return await this.userRepository.save(user);
  }
}
