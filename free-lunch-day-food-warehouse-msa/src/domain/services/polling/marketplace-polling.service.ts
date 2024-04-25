import { buyIngredientAdapter } from '../../../infrastructure/adapters/marketplace/maketplace.adapter';
import { logger } from '../../../infrastructure/utils/logger/logger';
import { MarketplaceBuyDto } from '../../dtos/marketplace.dto';

const stopPolling = (intervalId: NodeJS.Timeout): void => {
  clearInterval(intervalId);
  logger.info('Polling finished');
};

const buyIngredientAndStopPolling = async (intervalId: NodeJS.Timeout, ingredient: string): Promise<MarketplaceBuyDto | undefined> => {
  const data = await buyIngredientAdapter(ingredient);
  if (data.quantitySold) {
    stopPolling(intervalId);
    return data;
  }
  return undefined;
};

export const buyIngredientPolling = async (ingredient: string): Promise<MarketplaceBuyDto> => {
  logger.info('Init polling ingredient');
  return new Promise((resolve) => {
    const intervalId: NodeJS.Timeout = setInterval(async () => {
      const isBuyOK = await buyIngredientAndStopPolling(intervalId, ingredient);
      if (isBuyOK) {
        logger.info(`Finished purchasing ingredient with polling with result --> ${isBuyOK.quantitySold}`);
        resolve(isBuyOK);
      }
    }, 1000);
  });
};