import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const tasksTable = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  public: boolean(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
});
