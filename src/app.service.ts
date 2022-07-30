import { Injectable } from '@nestjs/common';
import { customLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(private customLogger: customLogger) {
    this.customLogger.setContext(AppService.name);
  }
  getHello(): string {
    this.customLogger.debug('Hello log');
    return 'Hello World!';
  }
}
