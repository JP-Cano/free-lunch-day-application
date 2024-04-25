import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const Status = pgEnum('status', ['completed', 'pending', 'failed']);

export const Recipe = pgTable('recipes', {
  id: serial('id').notNull().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const Order = pgTable('orders', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => Recipe.id),
  status: Status('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const RecipeIngredients = pgTable('recipe_ingredients', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => Recipe.id).notNull(),
  ingredientId: integer('ingredient_id').notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});