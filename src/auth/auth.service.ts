import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        private jwtService: JwtService
    ) {}

    private async genToken(user: CreateUserDto) {
        const payload = { login: user.login };
        return {
            token: this.jwtService.sign(payload)
        };
    }

    async signup(createUserDto: CreateUserDto) {
        const findUser = await this.authRep.findOne({
            where: {
                login: createUserDto.login
            }
        });

        if(findUser) {
            throw new HttpException('login already exist', HttpStatus.CONFLICT);
        }

        const passHash = await bcrypt.hash(createUserDto.password, Number(process.env.CRYPT_SALT));
        
        const createUser = this.authRep.create({...createUserDto, password: passHash});

        await this.authRep.save(createUser);
        return this.genToken(createUser);
    }
}
