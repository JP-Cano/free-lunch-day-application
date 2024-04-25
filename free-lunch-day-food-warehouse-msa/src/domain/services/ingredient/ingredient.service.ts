import {
  findIngredientByIdDb,
  getAllIngredientsDb,
  updateIngredientQuantityDb,
} from '../../../database/services/ingredients-db.service';
import { Catch } from '../../../infrastructure/utils/decorators/catch.decorator';
import { logger } from '../../../infrastructure/utils/logger/logger';
import { waitTwoSeconds } from '../../../infrastructure/utils/utils';
import { RecipeIngredientsDto } from '../../dtos/ingredient.dto';
import { KafkaService } from '../../../infrastructure/kafka/kafka.service';
import { DISPATCH_ORDER } from '../../../infrastructure/kafka/topics/topics';
import { MarketplaceService } from '../marketplace/marketplace.service';

export class IngredientService {
  private kafkaService: KafkaService;
  private marketplaceService: MarketplaceService;

  constructor() {
    this.kafkaService = new KafkaService().instance();
    this.marketplaceService = new MarketplaceService();
  }

  @Catch()
  async getAllIngredients() {
    logger.info('Init calling DB service to get all ingredients');
    return getAllIngredientsDb();
  };

  @Catch()
  async findIngredientById(ingredientId: number) {
    logger.info(`Init calling DB service to find an ingredient with id --> ${ingredientId}`);
    return findIngredientByIdDb(ingredientId);
  };

  @Catch()
  async prepareRecipeIngredients(ingredients: RecipeIngredientsDto[], orderId: number) {
    await waitTwoSeconds();
    logger.info('Init preparing the recipe`s ingredients');
    for (let ingredient = 0; ingredient < ingredients.length; ingredient++) {
      const ingredientInDatabase = await this.findIngredientById(ingredients[ingredient].ingredientId);
      const currentIngredient = ingredients[ingredient];
      let availableQuantity = ingredientInDatabase[0].availableQuantity;
      if (currentIngredient.quantity > availableQuantity) {
        availableQuantity = await this.marketplaceService.buyIngredient(ingredientInDatabase[0], currentIngredient.quantity);
      }
      logger.info(`Available quantity --> ${availableQuantity}`);
      if (currentIngredient.quantity <= availableQuantity) {
        const updatedQuantity = availableQuantity - currentIngredient.quantity;
        logger.info(`Updating ${ingredientInDatabase[0].name}'s quantity: ${updatedQuantity}`);
        await updateIngredientQuantityDb(ingredientInDatabase[0].id, updatedQuantity);
      }
    }
    await this.kafkaService.produce(DISPATCH_ORDER, orderId.toString());
  };
}

