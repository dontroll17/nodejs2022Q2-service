import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private customLogger: customLogger) {}

    use(req: Request, res: Response, next: NextFunction ) {
        this.customLogger.log('Request url: ', req.url);
        this.customLogger.log('Request query: ', req.query);
        this.customLogger.log('Request body: ', req.body);
        this.customLogger.log('Response code', res.statusCode);
        next();
    }
}