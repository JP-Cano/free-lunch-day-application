import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { OrderToPrepare } from '../../domain/dtos/ingredient.dto';
import { IngredientService } from '../../domain/services/ingredient/ingredient.service';
import { KafkaService } from '../kafka/kafka.service';
import { CREATE_ORDER } from '../kafka/topics/topics';
import { logger } from '../utils/logger/logger';

export const ingredientRoutes = new Hono();
const kafkaService = new KafkaService().instance();
const ingredientService = new IngredientService();

ingredientRoutes.get('/', async (c) => {
  const ingredients = await ingredientService.getAllIngredients();
  return c.json(ingredients, HttpStatusCode.Ok);
});

kafkaService.consume(CREATE_ORDER, async (value: string) => {
  logger.info(`Subscribing to message --> ${value}`);
  const orderToPrepare = JSON.parse(value) as OrderToPrepare;
  await ingredientService.prepareRecipeIngredients(orderToPrepare.ingredients, orderToPrepare.orderId);
}).then();
