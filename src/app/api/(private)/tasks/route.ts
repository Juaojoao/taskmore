import { TaskService } from "@/services/tasks/task.service";
import { RiEarthquakeFill } from "react-icons/ri";

const { create } = new TaskService();

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

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}
