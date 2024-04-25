import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/entities/kitchen.entity.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;