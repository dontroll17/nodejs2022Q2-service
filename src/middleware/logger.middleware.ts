import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private customLogger: customLogger) {}

    use(req: Request, res: Response, next: NextFunction ) {
        const { ip, originalUrl, query, body} = req;
        //res.statusCode always 200!
        const { statusCode } = res;

        this.customLogger.log(
            `From ${ip}
            Request url: ${originalUrl}
            Request query: ${JSON.stringify(query)}
            Request body: ${JSON.stringify(body)}
            Response code: ${statusCode}`
        );
        next();
    }
}