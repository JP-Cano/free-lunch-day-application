export type RecipeIngredientsDto = {
  ingredientId: number;
  quantity: number;
}

export type OrderToPrepare = {
  orderId: number;
  ingredients: Array<RecipeIngredientsDto>
}