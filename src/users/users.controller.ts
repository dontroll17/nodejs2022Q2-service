import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/Users.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string
  ) {
    return this.usersService.deleteUser(id);
  }
}
