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
  registerUser(@Body() userRegistrationPayload: UserRegistrationDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = userRegistrationPayload;
    try {
      this.userService.registerUser({
        status: false,
        revenue: 0,
        role: 'owner',
        ...rest,
      });
    } catch (error) {
      throw new HttpException(
        'Error While Registering User',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Registred Successfuly.',
      };
    }
  }

  @Get()
  async fetchUsers() {
    try {
      this.userService.fetchUsers();
    } catch (error) {
      throw new HttpException(
        'Error While Fetching Owners',
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Fetched Successfuly.',
        data: await this.userService.fetchUsers(),
      };
    }
  }
}
