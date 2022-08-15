import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CustomException extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        super.catch(exception, host);
    }
}