import { eq } from 'drizzle-orm';
import { DatabaseConfig } from '../../config/database.config';
import { Recipe, RecipeIngredients } from '../entities/kitchen.entity';

const repository = new DatabaseConfig().instance().getRepository();

export const getAllRecipesDb = async () => repository
    .select({
      recipeId: RecipeIngredients.recipeId,
      name: Recipe.name,
      ingredientId: RecipeIngredients.ingredientId,
      quantity: RecipeIngredients.quantity,
    })
    .from(RecipeIngredients)
    .innerJoin(Recipe, eq(RecipeIngredients.recipeId, Recipe.id));