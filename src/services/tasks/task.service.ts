import { db } from "@/db/db";
import { tasksTable } from "@/db/schema/tasks";
import { usersTable } from "@/db/schema/user";
import { Tasks } from "@/types/task.type";
import { eq } from "drizzle-orm";

export class TaskService {
  async create(data: Tasks) {
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

  async getByUserEmail(email: string) {
    const tasks = await db
      .select({
        id: tasksTable.id,
        description: tasksTable.description,
        createdAt: tasksTable.createdAt,
        public: tasksTable.public,
      })
      .from(tasksTable)
      .innerJoin(usersTable, (on) => eq(tasksTable.userId, usersTable.id))
      .where(eq(usersTable.email, email));

    return tasks;
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
