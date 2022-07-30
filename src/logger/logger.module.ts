import { Module } from '@nestjs/common';
import { customLogger } from './logger.service';

@Module({
    providers: [customLogger],
    exports: [customLogger]
})
export class LoggerModule {}
