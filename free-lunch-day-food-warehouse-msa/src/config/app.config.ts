import { config } from 'dotenv';
import { logger } from '../infrastructure/utils/logger/logger';

const IS_LOCAL = process.env.ENVIRONMENT?.trim() === 'local';

logger.info(`IS_LOCAL: ${IS_LOCAL}`);

config({
  path: `${__dirname}/../../environments/.${IS_LOCAL ? 'env.local' : 'env'}`,
});

export class Config {
  private static readonly ProcessEnv = process.env;
  public static readonly DATABASE_URL = Config.ProcessEnv.DATABASE_URL;
  public static readonly MAX_ALLOWED_CONNECTIONS = Number(Config.ProcessEnv.MAX_ALLOWED_CONNECTIONS);
  public static readonly SSL = Config.ProcessEnv.SSL === 'true';
  public static readonly PORT = Number(Config.ProcessEnv.PORT);
  public static readonly KITCHEN_URL = Config.ProcessEnv.KITCHEN_URL!;
  public static readonly MARKETPLACE_URL = Config.ProcessEnv.MARKETPLACE_URL!;
  public static readonly AXIOS_TIMEOUT = Number(Config.ProcessEnv.AXIOS_TIMEOUT);
  public static readonly KAFKA_BOOTSTRAP_SERVER = Config.ProcessEnv.KAFKA_BOOTSTRAP_SERVER!;
  public static readonly KAFKA_USERNAME = Config.ProcessEnv.KAFKA_USERNAME!;
  public static readonly KAFKA_PASSWORD = Config.ProcessEnv.KAFKA_PASSWORD!;
  public static readonly CONNECTION_TIMEOUT = Number(Config.ProcessEnv.CONNECTION_TIMEOUT);
}