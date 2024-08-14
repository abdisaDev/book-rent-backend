import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRegistrationDto } from 'src/dtos/userRegistration.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userRegistrationPayload: UserRegistrationDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, email, ...rest } = userRegistrationPayload;
    try {
      await this.userService.registerUser({
        status: false,
        revenue: 0,
        isOwnerApproved: false,
        role: 'owner',
        email: email.toLowerCase(),
        ...rest,
      });
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Registred Successfuly.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error While Registering User',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetchUsers() {
    try {
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Owner Fetched Successfuly.',
        data: await this.userService.fetchUsers(),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('activate')
  @UseGuards(AuthGuard('jwt'))
  async updateUserStatus(@Body() userEmail: { email: string }) {
    try {
      await this.userService.updateUserStatus(userEmail.email.toLowerCase());
      return {
        status: HttpStatus.ACCEPTED,
        data: 'User Status Has Been Updated.',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('approve')
  @UseGuards(AuthGuard('jwt'))
  async approveUser(@Body() userEmail: { email: string }) {
    try {
      await this.userService.approveUser(userEmail.email.toLowerCase());
      return {
        status: HttpStatus.ACCEPTED,
        data: 'User Status Has Been Updated.',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
