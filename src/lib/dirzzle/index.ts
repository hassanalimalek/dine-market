import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { sql as drizzleSql } from 'drizzle-orm';

export let ordersTable = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: varchar('user_id'),
  order_id: varchar('order_id'),
  order_detail: varchar('order_detail'),
  payment_status: varchar('payment_status'),
  createdAt: timestamp('created_at').default(drizzleSql`now()`),
});

export type Order = InferModel<typeof ordersTable>;
export type OrderInsert = InferModel<typeof ordersTable, 'insert'>;

export const db = drizzle(sql);
