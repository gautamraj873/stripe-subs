import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
