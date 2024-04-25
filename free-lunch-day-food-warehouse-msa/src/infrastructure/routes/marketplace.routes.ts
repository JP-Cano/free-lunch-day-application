import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { MarketplaceService } from '../../domain/services/marketplace/marketplace.service';

export const marketPurchaseRoute = new Hono();
const marketplaceService = new MarketplaceService();

marketPurchaseRoute.get('/history', async (c) => {
  const marketPlacePurchaseHistory = await marketplaceService.getMarketPlacePurchaseHistory();
  return c.json(marketPlacePurchaseHistory, HttpStatusCode.Ok);
});