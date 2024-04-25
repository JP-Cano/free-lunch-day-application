import { RedisClientOptions } from 'redis';
import { Config } from './app.config';

export const redisConfig: RedisClientOptions = {
  url: Config.REDIS_URL,
  socket: {
    host: Config.REDIS_HOST,
    port: Config.PORT,
  },
  username: Config.REDIS_USERNAME,
  password: Config.REDIS_PASSWORD,
};