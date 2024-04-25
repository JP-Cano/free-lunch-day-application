import {
  createOrderDb,
  getAllPendingOrdersDb,
  getOrderHistoryDb,
  updateOrderDb,
} from '../../../database/services/order-db.service';
import { Catch } from '../../../infrastructure/utils/decorators/catch.decorator';
import { logger } from '../../../infrastructure/utils/logger/logger';
import { KafkaService } from '../../../infrastructure/kafka/kafka.service';
import { CREATE_ORDER } from '../../../infrastructure/kafka/topics/topics';
import { RecipeIngredientsService } from '../recipe-ingredients/recipe-ingredients.service';
import { getRandomRecipe } from '../recipe/recipe.service';

export class OrderService {
  private kafkaService: KafkaService;
  private recipeIngredientsService: RecipeIngredientsService;

  constructor() {
    this.kafkaService = new KafkaService().instance();
    this.recipeIngredientsService = new RecipeIngredientsService();
  }

  @Catch()
  async getAllPendingOrders() {
    logger.info('Init calling database to get all pending orders');
    return await getAllPendingOrdersDb();
  };

  @Catch()
  async getOrderHistory() {
    logger.info('Init calling database to get orders history');
    return await getOrderHistoryDb();
  };

  @Catch()
  async createOrder() {
    const recipeId = getRandomRecipe();
    logger.info(`Init creating a random order with id --> ${recipeId}`);
    const createdOrder = await createOrderDb(recipeId);
    const recipeIngredients = await this.recipeIngredientsService.getRecipeIngredients(recipeId);
    const publishIngredients = {
      orderId: createdOrder[0].id,
      ingredients: recipeIngredients,
    };
    await this.kafkaService.produce(CREATE_ORDER, JSON.stringify(publishIngredients));
    return { message: 'Order received successfully' };
  };

  @Catch()
  async updateOrder(orderId: number) {
    logger.info(`Init calling db service to update the order #${orderId} status`);
    await updateOrderDb(orderId, 'completed');
    logger.info(`Finished calling db service to update the order #${orderId} status`);
  };
}

