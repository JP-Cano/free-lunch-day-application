import { HttpStatusCode } from 'axios';
import { Config } from '../../../config/app.config';
import { httpService } from '../../../config/http.config';
import { MarketplaceBuyDto } from '../../../domain/dtos/marketplace.dto';
import { DomainException } from '../../../domain/exceptions/models/domain.exception';
import { logger } from '../../utils/logger/logger';

export const buyIngredientAdapter = async (ingredient: string) => {
  try {
    logger.info(`Init calling marketplace api to buy ingredient with name --> ${ingredient}`);
    const { data } = await httpService.get<MarketplaceBuyDto>(Config.MARKETPLACE_URL, {
      params: {
        ingredient,
      },
    });
    logger.info(`Finish calling Marketplace api with response --> ${JSON.stringify(data)}`);
    return data;
  } catch (err: any) {
    logger.error('Error calling marketplace api to buy ingredient', JSON.stringify(err));
    throw new DomainException(err.message, HttpStatusCode.InternalServerError);
  }
};