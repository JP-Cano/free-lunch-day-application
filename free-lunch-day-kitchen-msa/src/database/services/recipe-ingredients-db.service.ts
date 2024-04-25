import { eq } from 'drizzle-orm';
import { DatabaseConfig } from '../../config/database.config';
import { RecipeIngredients } from '../entities/kitchen.entity';

const repository = new DatabaseConfig().instance().getRepository();

export const getRecipeIngredientsDb = async (recipeId: number) => repository
    .select({
      ingredientId: RecipeIngredients.ingredientId,
      quantity: RecipeIngredients.quantity,
    })
    .from(RecipeIngredients)
    .where(eq(RecipeIngredients.recipeId, recipeId));
