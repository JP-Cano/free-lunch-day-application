import { Config } from '../../../config/app.config';
import { httpService } from '../../../config/http.config';
import { AllIngredientsDto } from '../../../domain/dtos/ingredients.dto';
import { logger } from '../../utils/logger/logger';

export const getAllIngredients = async (): Promise<Array<AllIngredientsDto>> => {
  try {
    logger.info('Init calling food-warehouse service to get all ingredients');
    const { data } = await httpService.get<Array<AllIngredientsDto>>(`${Config.FOOD_WAREHOUSE_URL}/ingredients`);
    logger.info(`Finish calling food-warehouse service to get all ingredients with response --> ${JSON.stringify(data)}`);
    return data;
  } catch (err: any) {
    logger.error('Error calling food-warehouse service', JSON.stringify(err));
    throw new Error(err.message);
  }
};