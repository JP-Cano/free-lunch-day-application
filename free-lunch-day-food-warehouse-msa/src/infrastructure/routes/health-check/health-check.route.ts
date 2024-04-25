import { Hono } from 'hono';
import { SERVICE_NAME } from '../../utils/constants/constants';

export const healthCheckRoute = new Hono();

healthCheckRoute.get('/', (c) => {
  return c.text(`${SERVICE_NAME} working correctly!`);
});