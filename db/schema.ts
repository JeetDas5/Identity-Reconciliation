import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),

  email: text("email"),
  phoneNumber: text("phone_number"),

  linkedId: integer("linked_id"),

  linkPrecedence: integer("link_precedence").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  deletedAt: timestamp("deleted_at"),
});
