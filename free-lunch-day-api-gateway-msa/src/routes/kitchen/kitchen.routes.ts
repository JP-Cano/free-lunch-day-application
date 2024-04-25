import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { KitchenAdapter } from '../../adapters/kitchen/kitchen.adapter';

export const kitchenRoutes = new Hono();

const kitchenAdapter = new KitchenAdapter();

kitchenRoutes.get('/recipes', async (c) => {
  const data = await kitchenAdapter.getAllRecipes();
  return c.json(data, HttpStatusCode.Ok);
});

kitchenRoutes.get('/orders', async (c) => {
  const data = await kitchenAdapter.getAllPendingOrders();
  return c.json(data, HttpStatusCode.Ok);
});

kitchenRoutes.get('/history', async (c) => {
  const data = await kitchenAdapter.getOrderHistory();
  return c.json(data, HttpStatusCode.Ok);
});

kitchenRoutes.post('/', async (c) => {
  const data = await kitchenAdapter.createOrder();
  return c.json(data, HttpStatusCode.Ok);
});