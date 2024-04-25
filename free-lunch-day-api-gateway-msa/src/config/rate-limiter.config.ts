import { rateLimiter } from 'hono-rate-limiter';
import { Config } from './app.config';

export const rateLimiterConfig = rateLimiter({
  windowMs: Config.RATE_LIMITER_WINDOW_MS,
  limit: Config.RATE_LIMITER_LIMIT,
});