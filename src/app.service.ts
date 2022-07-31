import { Injectable } from '@nestjs/common';
import { customLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
