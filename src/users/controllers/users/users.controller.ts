import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserRegistrationDto } from 'src/dtos/userRegistration.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userRegistrationPayload: UserRegistrationDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = userRegistrationPayload;
    try {
      await this.userService.registerUser({
        status: false,
        revenue: 0,
        isOwnerApproved: false,
        role: 'owner',
        ...rest,
      });
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Registred Successfuly.',
      };
    } catch (error) {
      throw new HttpException(
        'Error While Registering User',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async fetchUsers() {
    try {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Fetched Successfuly.',
        data: await this.userService.fetchUsers(),
      };
    } catch (error) {
      throw new HttpException(
        'Error While Fetching Owners',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
