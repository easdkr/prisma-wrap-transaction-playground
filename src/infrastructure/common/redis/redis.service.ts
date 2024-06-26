import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { REDIS_CONFIGURATION_TOKEN, RedisConfigurations } from './redis.conf';
import { Redis } from 'ioredis';
import Redlock from 'redlock';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  #redisClient: Redis;
  #lock: Redlock;

  public constructor(
    @Inject(REDIS_CONFIGURATION_TOKEN)
    private readonly redisConfig: RedisConfigurations,
    private logger: Logger,
  ) {
    this.#redisClient = new Redis({
      host: this.redisConfig.host,
      port: this.redisConfig.port,
      password: this.redisConfig.password,
      db: this.redisConfig.db,
    });
    this.#lock = new Redlock([this.#redisClient]);
  }

  public async onModuleDestroy() {
    this.#redisClient.disconnect();
  }

  public onModuleInit() {
    this.logger.debug('Connected to Redis', RedisService.name);
  }

  public get client(): Redis {
    return this.#redisClient;
  }

  public get lock(): Redlock {
    return this.#lock;
  }
}
