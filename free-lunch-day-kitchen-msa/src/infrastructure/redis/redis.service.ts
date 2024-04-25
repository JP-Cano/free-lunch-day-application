import { createClient } from 'redis';
import { redisConfig } from '../../config/redis.config';
import { ONE_HOUR } from '../utils/constants/constants';
import { Catch } from '../utils/decorators/catch.decorator';
import { logger } from '../utils/logger/logger';

export class RedisService {
  private readonly client;
  private static instance: RedisService;

  constructor() {
    this.client = createClient(redisConfig);
  }

  instance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
      return RedisService.instance;
    }
    return RedisService.instance;
  }

  @Catch()
  async connect() {
    logger.info('Connecting to Redis client');
    await this.client.connect();
    logger.info('Connected to Redis client successfully');
  }

  @Catch()
  async set(key: string, value: any) {
    const stringifyValue = JSON.stringify(value);
    logger.info(`Setting data with key: ${key}`);
    await this.client.set(key, stringifyValue, { EX: ONE_HOUR });
  }

  @Catch()
  async get(key: string) {
    logger.info(`Obtaining data from redis with key ${key}`);
    const value = await this.client.get(key);
    logger.info(`Value found with key: ${key}`);
    return value ? JSON.parse(value) : '';
  }
}