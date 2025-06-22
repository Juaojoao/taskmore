// /api/(private)/tasks/[email]/route.ts

import { TaskService } from "@/services/tasks/task.service";

const { getByUserEmail } = new TaskService();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;

    if (!email) {
      return new Response("Usuário não encontrado", { status: 400 });
    }

    const tasks = await getByUserEmail(email);

    return Response.json(tasks, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Erro ao buscar os tasks", { status: 500 });
  }
}
