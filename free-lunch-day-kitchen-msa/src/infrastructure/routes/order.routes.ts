import { HttpStatusCode } from 'axios';
import { Hono } from 'hono';
import { KafkaService } from '../kafka/kafka.service';
import { DISPATCH_ORDER } from '../kafka/topics/topics';
import { OrderService } from '../../domain/services/order/order.service';
import { logger } from '../utils/logger/logger';

export const orderRoutes = new Hono();
const kafkaService = new KafkaService().instance();
const orderService = new OrderService();

orderRoutes.get('/', async (c) => {
  const orders = await orderService.getAllPendingOrders();
  return c.json(orders, HttpStatusCode.Ok);
});

orderRoutes.get('/history', async (c) => {
  const orders = await orderService.getOrderHistory();
  return c.json(orders, HttpStatusCode.Ok);
});

orderRoutes.post('/', async (c) => {
  const result = await orderService.createOrder();
  return c.json(result, HttpStatusCode.Created);
});


kafkaService.consume(DISPATCH_ORDER, async (value: string) => {
  logger.info(`Subscribing to message --> ${value}`);
  await orderService.updateOrder(+value);
}).then();