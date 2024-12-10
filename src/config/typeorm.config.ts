import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: parseInt(config.get<string>('DB_PORT'), 10),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
  logging: ['error', 'warn'],
});
