export interface RedisConfigurations {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

export const REDIS_CONFIGURATION_TOKEN = '__REDIS_CONFIG__';
