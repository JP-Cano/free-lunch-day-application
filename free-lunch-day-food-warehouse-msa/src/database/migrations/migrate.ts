import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DatabaseConfig } from '../../config/database.config';
import { logger } from '../../infrastructure/utils/logger/logger';

const database = new DatabaseConfig().instance().getRepository();

const executeMigration = () => {
  migrate(database, {
    migrationsFolder: 'drizzle',
  }).then(() => {
    logger.info('Migration successfully executed');
  }).catch((err) => {
    logger.error(`Error during migration execution --> ${JSON.stringify(err.message)}`);
    process.exit(1);
  });
};

executeMigration();