import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),

  email: text("email"),
  phoneNumber: text("phone_number"),

  linkedId: integer("linked_id"),

  linkPrecedence: varchar("link_precedence")
    .$type<"primary" | "secondary">()
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  deletedAt: timestamp("deleted_at"),
});
