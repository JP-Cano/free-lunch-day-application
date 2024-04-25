import { IngredientsDto } from './ingredients.dto';

export type RecipeIngredientsDto = {
  id: number;
  name: string;
  ingredients: Array<IngredientsDto>;
}

export type GroupRecipesDto = {
  recipeId: number,
  name: string,
  ingredientId: number,
  quantity: number,
}