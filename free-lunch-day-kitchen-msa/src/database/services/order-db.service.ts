import { desc, eq } from 'drizzle-orm';
import { DatabaseConfig } from '../../config/database.config';
import { OrderStatus } from '../../domain/dtos/order.dto';
import { Order, Recipe } from '../entities/kitchen.entity';

const repository = new DatabaseConfig().instance().getRepository();

export const getAllPendingOrdersDb = async () => repository
    .select({
      orderId: Order.id,
      name: Recipe.name,
      status: Order.status,
      createdAt: Order.createdAt,
    })
    .from(Order)
    .innerJoin(Recipe, eq(Order.recipeId, Recipe.id))
    .where(eq(Order.status, 'pending'))
    .orderBy(desc(Order.createdAt));


export const getOrderHistoryDb = async () => repository
    .select({
      orderId: Order.id,
      name: Recipe.name,
      status: Order.status,
      createdAt: Order.createdAt,
    })
    .from(Order).innerJoin(Recipe, eq(Order.recipeId, Recipe.id))
    .orderBy(desc(Order.createdAt));

export const createOrderDb = async (recipeId: number) => repository
    .insert(Order)
    .values({
      recipeId,
    })
    .returning({ id: Order.id });

export const updateOrderDb = async (orderId: number, status: OrderStatus) => repository
    .update(Order)
    .set({ status })
    .where(eq(Order.id, orderId));