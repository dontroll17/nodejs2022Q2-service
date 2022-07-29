import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRep: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  private async findUser(login: string) {
    return await this.authRep.findOne({
      where: {
        login: login,
      },
    });
  }

  private async genToken(user: CreateUserDto) {
    const payload = { login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.findUser(userDto.login);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const passCheck = await bcrypt.compare(userDto.password, user.password);
    if (user && passCheck) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.findUser(createUserDto.login);

    if (user) {
      throw new HttpException('login already exist', HttpStatus.CONFLICT);
    }

    const passHash = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT),
    );

    const createUser = this.authRep.create({
      ...createUserDto,
      password: passHash,
    });

    await this.authRep.save(createUser);
    return this.genToken(createUser);
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.genToken(user);
  }
}
