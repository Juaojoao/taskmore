// /api/(private)/tasks/email/route.ts

import { TaskService } from "@/services/tasks/task.service";

const { getByUserEmail } = new TaskService();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response("Usuário não encontrado", { status: 400 });
    }

    const tasks = await getByUserEmail(email);

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return new Response("Erro ao buscar os tasks", { status: 500 });
  }
}
