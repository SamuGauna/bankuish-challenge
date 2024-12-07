import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';

export const AppImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', 'staging', 'production')
        .default('development'),
      APP_PORT: Joi.number().default(3000),
      LOGGER_LEVEL: Joi.string()
        .valid('error', 'warn', 'info', 'debug', 'log', 'silent')
        .default('debug'),

      /**FIREBASE */
      FIREBASE_CLIENT_EMAIL: Joi.string(),
      FIREBASE_PROJECT_ID: Joi.string(),
      FIREBASE_PRIVATE_KEY: Joi.string(),
    }),
  }),
  LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      return {
        pinoHttp: {
          reqCustomProps: (req: Request) => ({
            body: req.body,
          }),
          redact: {
            paths: [],
            censor: '********',
          },
          name: process.env.npm_package_name,
          level: config.get('LOGGER_LEVEL'),
          prettyPrint: false,
        },
      };
    },
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => TypeOrmConfig(config),
  }),
];
