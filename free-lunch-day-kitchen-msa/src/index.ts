import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Config } from './config/app.config';
import { RedisService } from './infrastructure/redis/redis.service';
import { healthCheckRoute } from './infrastructure/routes/health-check/health-check.route';
import { orderRoutes } from './infrastructure/routes/order.routes';
import { recipeRoutes } from './infrastructure/routes/recipe.routes';
import { logger } from './infrastructure/utils/logger/logger';

const defaultPort = 3001;
const port = Config.PORT || defaultPort;

const redisService = new RedisService().instance();
redisService.connect().then();

const app = new Hono().basePath('/kitchen');

app.use(cors());

app.route('/health', healthCheckRoute);
app.route('/recipes', recipeRoutes);
app.route('/order', orderRoutes);

logger.info(`Microservice is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
