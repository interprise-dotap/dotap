import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Tabela de Usuários
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  permission: text('permission').notNull(), // Permissão do usuário
  passwordHash: text('password_hash').notNull(), // Hash da senha
})

// Tabela de Registros
export const records = pgTable('records', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // Referência ao usuário
  timestamp: timestamp('timestamp').notNull(), // Data e hora do registro
})

// Relações entre Usuários e Registros
export const usersRelations = relations(users, ({ many }) => ({
  records: many(records),
}))

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}))

// Tabela de Solicitações
export const requests = pgTable('requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(), // Referência ao usuário que fez a solicitação
  action: text('action').notNull(), // Tipo de solicitação: "add" ou "remove"
  targetDate: timestamp('target_date').notNull(), // Data alvo para o registro
  finalized: boolean('finalized').notNull().default(false), // Status da solicitação
  createdAt: timestamp('created_at').defaultNow(), // Data de criação da solicitação
})

// Relações entre Usuários e Solicitações
export const requestsRelations = relations(requests, ({ one }) => ({
  user: one(users, {
    fields: [requests.userId],
    references: [users.id],
  }),
}))
