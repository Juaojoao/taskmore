import { db } from "@/db/db";
import { tasksTable } from "@/db/schema";

import { eq } from "drizzle-orm";

export class TaskService {
  async create(data: { title: string; description?: string; userId: string }) {
    const [task] = await db.insert(tasksTable).values(data).returning();
    return task;
  }

  async getAll() {
    return db.select().from(tasksTable);
  }

  async getById(id: string) {
    const [task] = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));
    return task;
  }

  async update(
    id: string,
    data: Partial<{ title: string; description: string }>
  ) {
    const [task] = await db
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning();
    return task;
  }

  async delete(id: string) {
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
  }
}
