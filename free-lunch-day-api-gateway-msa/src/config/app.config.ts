import { config } from 'dotenv';
import { logger } from '../utils/logger/logger';

const IS_LOCAL = process.env.ENVIRONMENT?.trim() === 'local';

logger.info(`IS_LOCAL: ${IS_LOCAL}`);

config({
  path: `${__dirname}/../../environments/.${IS_LOCAL ? 'env.local' : 'env'}`,
});

export class Config {
  private static readonly ProcessEnv = process.env;
  public static readonly PORT = Number(Config.ProcessEnv.PORT);
  public static readonly AXIOS_TIMEOUT = Number(Config.ProcessEnv.AXIOS_TIMEOUT);
  public static readonly RATE_LIMITER_WINDOW_MS = Number(Config.ProcessEnv.RATE_LIMITER_WINDOW_MS);
  public static readonly RATE_LIMITER_LIMIT = Number(Config.ProcessEnv.MINUTES) * Number(Config.ProcessEnv.HOURS) * 100;
  public static readonly KITCHEN_MSA_URL = Config.ProcessEnv.KITCHEN_MSA_URL;
  public static readonly FOOD_MARKETPLACE_URL = Config.ProcessEnv.FOOD_MARKETPLACE_URL;
}