import { Global, Logger, Module } from '@nestjs/common';
import {
  REDIS_CONFIGURATION_TOKEN,
  RedisConfigurations,
} from '../common/redis/redis.conf';
import { RedisService } from '../common/redis/redis.service';

@Global()
@Module({})
export class RedisModule {
  public static register(configurations: RedisConfigurations) {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CONFIGURATION_TOKEN,
          useValue: configurations,
        },
        Logger,
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
