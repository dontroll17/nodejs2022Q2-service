import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private customLogger: customLogger) {}

    use(req: Request, res: Response, next: NextFunction ) {
        const { ip, url, query, body} = req;
        const { statusCode } = res;

        this.customLogger.log(
            `From ${ip}
            Request url: ${url}
            Response code: ${statusCode}\n`
        );
        this.customLogger.log('Request query: ', query);
        this.customLogger.log('Request body: ', body);
        next();
    }
}