import { TaskService } from "@/services/tasks/task.service";
import { RiEarthquakeFill } from "react-icons/ri";

const { create, Delete, getById } = new TaskService();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.description || !body.userId) {
      return new Response("Descrição ou Usuário ausente");
    }

    const task = await create(body);

    return Response.json(task, { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Erro interno ao criar task", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response("Task não encontrado!", { status: 400 });
    }

    const sucess = await Delete(id);

    if (!sucess) {
      return new Response("Task não encontrado!", { status: 400 });
    }

    return Response.json({ message: "Excluído com sucesso!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Erro ao excluir a task!", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("Task não encontrado", { status: 400 });
    }

    const tasks = await getById(id);

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return new Response("Erro ao buscar os tasks", { status: 500 });
  }
}
