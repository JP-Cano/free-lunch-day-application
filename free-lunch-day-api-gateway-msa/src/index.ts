import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Config } from './config/app.config';
import { rateLimiterConfig } from './config/rate-limiter.config';
import { foodWarehouseRoutes } from './routes/food-warehouse/food-warehouse.routes';
import { kitchenRoutes } from './routes/kitchen/kitchen.routes';
import { logger } from './utils/logger/logger';

const app = new Hono().basePath('/api/gateway');

const defaultPort = 80;
const port = Config.PORT || defaultPort;

app.use(cors());

app.use(rateLimiterConfig);
app.route('/kitchen', kitchenRoutes);
app.route('/food-warehouse', foodWarehouseRoutes);

logger.info(`Microservice is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
