import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Config } from './config/app.config';
import { cors } from 'hono/cors';
import { healthCheckRoute } from './infrastructure/routes/health-check/health-check.route';
import { ingredientRoutes } from './infrastructure/routes/ingredient.routes';
import { marketPurchaseRoute } from './infrastructure/routes/marketplace.routes';
import { logger } from './infrastructure/utils/logger/logger';

const defaultPort = 3000;
const port = Config.PORT || defaultPort;

const app = new Hono().basePath('/food-warehouse');

app.use(cors());

app.route('/ingredients', ingredientRoutes);
app.route('/buy', marketPurchaseRoute);
app.route('/health', healthCheckRoute);

logger.info(`Microservice is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
