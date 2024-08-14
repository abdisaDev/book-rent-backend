import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRegistrationType } from 'src/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async registerUser(registerUserPayload: UserRegistrationType) {
    const { password, ...rest } = registerUserPayload;
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userInstance = this.userRepository.create({
      password: hashedPassword,
      ...rest,
    });
    return this.userRepository.save(userInstance);
  }

  async fetchUsers() {
    const owners = (
      await this.userRepository.find({ relations: ['books'] })
    ).filter((user) => user.role !== 'admin');
    return owners;
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
