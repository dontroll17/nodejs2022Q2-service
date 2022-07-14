import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/Users.interface';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User> {
    const result =  this.users.find(item => item.id === id);

    if(!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.users.push(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const filterUser = this.users.filter(item => item.id !== id);

    if(this.users === filterUser) {
      throw new NotFoundException('User not found');
    }

    this.users = filterUser;

  }
}