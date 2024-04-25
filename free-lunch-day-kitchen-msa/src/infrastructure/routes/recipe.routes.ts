import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { getAllRecipes } from '../../domain/services/recipe/recipe.service';

export const recipeRoutes = new Hono();

recipeRoutes.get('/', async (c) => {
  const recipes = await getAllRecipes()
  return c.json(recipes, HttpStatusCode.Ok);
});