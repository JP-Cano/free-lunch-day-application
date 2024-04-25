import { getAllRecipesDb } from '../../../database/services/recipe-db.service';
import { getAllIngredients } from '../../../infrastructure/adapters/food-warehouse/food-warehouse.adapter';
import { RedisService } from '../../../infrastructure/redis/redis.service';
import { GROUPED_RECIPE_INGREDIENT, MAX_SIX_RECIPES } from '../../../infrastructure/utils/constants/constants';
import { AllIngredientsDto } from '../../dtos/ingredients.dto';
import { GroupRecipesDto, RecipeIngredientsDto } from '../../dtos/recipe-ingredients.dto';

const redisService = new RedisService().instance();

export const getRandomRecipe = () => Math.floor(Math.random() * MAX_SIX_RECIPES) + 1;

export const getAllRecipes = async (): Promise<RecipeIngredientsDto[]> => {
  const recipesInCache = await redisService.get(GROUPED_RECIPE_INGREDIENT);
  if (recipesInCache) {
    return recipesInCache;
  }
  const [recipes, ingredients] = await Promise.all([
    getAllRecipesDb(), getAllIngredients(),
  ]);
  const groupedRecipes: { [recipeId: string]: RecipeIngredientsDto } = {};

  return groupRecipeAndIngredients(recipes, groupedRecipes, ingredients);
};

const groupRecipeAndIngredients = async (
    recipes: GroupRecipesDto[],
    groupedRecipes: {
      [p: string]: RecipeIngredientsDto
    }, ingredients: AllIngredientsDto[]): Promise<RecipeIngredientsDto[]> => {
  recipes.forEach((recipe) => {
    const { recipeId, name, ingredientId, quantity } = recipe;
    if (!groupedRecipes[recipeId]) {
      groupedRecipes[recipeId] = {
        id: recipeId,
        name,
        ingredients: [],
      };
    }
    groupedRecipes[recipeId].ingredients.push({
      id: ingredientId,
      name: getIngredientName(ingredients, ingredientId),
      quantity,
    });
  });

  const grouped = Object.values(groupedRecipes);
  await redisService.set(GROUPED_RECIPE_INGREDIENT, grouped);
  return grouped;
};

const getIngredientName = (
    ingredients: AllIngredientsDto[],
    ingredientId: number,
) => ingredients.find(({ id }) => id === ingredientId)?.name ?? '';