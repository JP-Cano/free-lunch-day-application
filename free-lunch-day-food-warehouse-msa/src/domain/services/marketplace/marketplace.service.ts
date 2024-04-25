import { updateIngredientQuantityDb } from '../../../database/services/ingredients-db.service';
import {
  getMarketplacePurchaseHistoryDb,
  saveMarketplacePurchaseDb,
} from '../../../database/services/marketplace-db.service';
import { Catch } from '../../../infrastructure/utils/decorators/catch.decorator';
import { logger } from '../../../infrastructure/utils/logger/logger';
import { buyIngredientPolling } from '../polling/marketplace-polling.service';

export class MarketplaceService {

  @Catch()
  async saveMarketPurchase(ingredientId: number, quantity: number) {
    logger.info('Init saving market purchase to database');
    const result = await saveMarketplacePurchaseDb(ingredientId, quantity);
    logger.info(`Finished saving market purchase to database with result --> ${!!result}`);
    return result;
  };

  @Catch()
  async buyIngredient(ingredientIndDatabase: {
    id: number,
    name: string,
    availableQuantity: number
  }, requestedQuantity: number) {
    logger.info(`Init purchasing ingredient in marketplace --> ${ingredientIndDatabase.name}`);
    let updatedIngredient = ingredientIndDatabase.availableQuantity;
    while (updatedIngredient < requestedQuantity) {
      const { quantitySold } = await buyIngredientPolling(ingredientIndDatabase.name);
      await this.saveMarketPurchase(ingredientIndDatabase.id, quantitySold);
      updatedIngredient += quantitySold;
      await updateIngredientQuantityDb(ingredientIndDatabase.id, updatedIngredient);
    }
    return updatedIngredient;
  };

  @Catch()
  async getMarketPlacePurchaseHistory() {
    logger.info('Init getting purchase history');
    return getMarketplacePurchaseHistoryDb();
  };
}
