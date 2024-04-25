import { desc, eq } from 'drizzle-orm';
import { DatabaseConfig } from '../../config/database.config';
import { Ingredient, MarketPurchases } from '../entities/food-warehouse.entity';

const repository = new DatabaseConfig().instance().getRepository();

export const saveMarketplacePurchaseDb = async (ingredientId: number, quantity: number) => repository
    .insert(MarketPurchases)
    .values({
      ingredientId,
      quantity,
    })
    .returning();

export const getMarketplacePurchaseHistoryDb = async () => repository
    .select({
      name: Ingredient.name,
      quantity: MarketPurchases.quantity,
      createdAt: MarketPurchases.createdAt,
      updatedAt: MarketPurchases.updatedAt,
    })
    .from(MarketPurchases)
    .innerJoin(Ingredient, eq(MarketPurchases.ingredientId, Ingredient.id))
    .orderBy(desc(MarketPurchases.createdAt));