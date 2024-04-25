import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Ingredient = pgTable('ingredients', {
  id: serial('id').notNull().primaryKey(),
  name: text('name').notNull(),
  availableQuantity: integer('available_quantity').notNull().default(5),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const MarketPurchases = pgTable('market_purchases', {
  id: serial('id').notNull().primaryKey(),
  ingredientId: integer('ingredient_id').references(() => Ingredient.id),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});