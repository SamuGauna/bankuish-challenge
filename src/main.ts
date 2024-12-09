import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './utils/filters/allException.filter';
import { TimestampInterceptor } from './utils/interceptors/timestamp.interceptor';
import { ResponseWrapperInterceptor } from './utils/interceptors/responseWrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });

  const logger = app.get<Logger>(Logger);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix(config.get('APP_PREFIX'));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(logger, config));
  app.useGlobalInterceptors(
    new TimestampInterceptor(),
    new ResponseWrapperInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle(config.get('npm_package_name'))
    .setDescription('NodeJS Code-Challenge')
    .setVersion(config.get('npm_package_version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(config.get('APP_PORT'), '0.0.0.0', () =>
    logger.log(
      `microservice ${config.get(
        'npm_package_name',
      )} is listening on port ${config.get(
        'APP_PORT',
      )} with prefix path '/${config.get(
        'APP_PREFIX',
      )} in the environment ${config.get('NODE_ENV')} 🚀`,
      'AppStart',
    ),
  );
}
bootstrap();
