import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { CustomException } from './util/customException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dir = dirname(__dirname);
  const doc = await readFile(join(dir, 'doc', 'api.yaml'), 'utf-8');
  const swagger_api = parse(doc);

  SwaggerModule.setup('doc', app, swagger_api);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new CustomException(httpAdapter));
  await app.listen(process.env.PORT);
}
bootstrap();
