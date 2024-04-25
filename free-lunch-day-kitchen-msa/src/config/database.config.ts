import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Config } from './app.config';

config();

export class DatabaseConfig {
  private readonly connectionString = Config.DATABASE_URL;
  private static singleton: DatabaseConfig;

  getClient(): Pool {
    return new Pool({
      connectionString: this.connectionString,
      max: Config.MAX_ALLOWED_CONNECTIONS,
      ssl: Config.SSL,
    });
  }

  getRepository() {
    return drizzle(this.getClient(), { logger: true });
  }

  instance() {
    if (!DatabaseConfig.singleton) {
      DatabaseConfig.singleton = new DatabaseConfig();
      return DatabaseConfig.singleton;
    }
    return DatabaseConfig.singleton;
  }
}