import { asc, eq } from 'drizzle-orm';
import { DatabaseConfig } from '../../config/database.config';
import { Ingredient } from '../entities/food-warehouse.entity';

const repository = new DatabaseConfig().instance().getRepository();

export const getAllIngredientsDb = async () => repository
    .select({
      id: Ingredient.id,
      name: Ingredient.name,
      availableQuantity: Ingredient.availableQuantity
    })
    .from(Ingredient)
    .orderBy(asc(Ingredient.createdAt));


export const findIngredientByIdDb = async (ingredientId: number) => repository
    .select({
      id: Ingredient.id,
      name: Ingredient.name,
      availableQuantity: Ingredient.availableQuantity,
    })
    .from(Ingredient)
    .where(eq(Ingredient.id, ingredientId));


export const updateIngredientQuantityDb = async (ingredientId: number, quantity: number) => repository
    .update(Ingredient)
    .set({ availableQuantity: quantity })
    .where(eq(Ingredient.id, ingredientId))
    .returning();