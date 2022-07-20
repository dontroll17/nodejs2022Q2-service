import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create(createUserDto);
    createdUser.version = 1;
    createdUser.createdAt = Date.now();
    createdUser.updatedAt = Date.now();
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async getAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.toResponse();
  }

  async changePass(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    user.version++;
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();

    await this.userRepository.save(user);

    return user.toResponse();
  }

  async deleteUser(id: string) {
    const res = await this.userRepository.delete(id);

    if (res.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
