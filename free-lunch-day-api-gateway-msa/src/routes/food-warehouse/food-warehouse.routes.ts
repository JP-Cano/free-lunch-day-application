import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { FoodWarehouseAdapter } from '../../adapters/food-warehouse/food-warehouse.adapter';

export const foodWarehouseRoutes = new Hono();

const foodWarehouseAdapter = new FoodWarehouseAdapter();

foodWarehouseRoutes.get('/history', async (c) => {
  const data = await foodWarehouseAdapter.getMarketPlacePurchaseHistory();
  return c.json(data, HttpStatusCode.Ok);
});

foodWarehouseRoutes.get('ingredients', async (c) => {
  const data = await foodWarehouseAdapter.getAllIngredients();
  return c.json(data, HttpStatusCode.Ok);
});