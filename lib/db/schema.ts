import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tabela de Usuários
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  permission: text("permission").notNull(),
  passwordHash: text("password_hash").notNull(),
});

// Tabela de Registros
export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: varchar("date", { length: 30 }).notNull(), // Agora é string
});

// Relações entre Usuários e Registros
export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}));

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));

// Tabela de Solicitações
export const requests = pgTable("requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  targetDate: varchar("target_date", { length: 30 }).notNull(), // Agora é string
  finalized: boolean("finalized").notNull().default(false),
  createdAt: varchar("created_at", { length: 30 }).notNull()
});

// Relações entre Usuários e Solicitações
export const requestsRelations = relations(requests, ({ one }) => ({
  user: one(users, {
    fields: [requests.userId],
    references: [users.id],
  }),
}));
