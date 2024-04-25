import { getRecipeIngredientsDb } from '../../../database/services/recipe-ingredients-db.service';
import { RECIPE_NUMBER } from '../../../infrastructure/utils/constants/constants';
import { Catch } from '../../../infrastructure/utils/decorators/catch.decorator';
import { logger } from '../../../infrastructure/utils/logger/logger';
import { RedisService } from '../../../infrastructure/redis/redis.service';

export class RecipeIngredientsService {
  private redisService: RedisService;

  constructor() {
    this.redisService = new RedisService().instance();
  }

  @Catch()
  async getRecipeIngredients(recipeId: number) {
    logger.info('Init getting recipe ingredients');
    let recipeIngredients = await this.redisService.get(`${RECIPE_NUMBER}${recipeId}`);
    if (!recipeIngredients) {
      recipeIngredients = await getRecipeIngredientsDb(recipeId);
      await this.redisService.set(`${RECIPE_NUMBER}${recipeId}`, recipeIngredients);
    }
    return recipeIngredients;
  };
}