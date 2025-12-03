/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: Omit<User, 'password'> }> {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User registered successfully!',
      user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: any) {
    return { message: 'User logged in successfully' };
  }
}
