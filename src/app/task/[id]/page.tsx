"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Textarea } from "@/components/ui/Textarea";
import type { Tasks } from "@/types/task.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Tasks() {
  const params = useParams();
  const { id } = params;
  const [taskData, setTaskData] = useState<Tasks>();

  const { data: session } = useSession();

  useEffect(() => {
    const fecthData = async () => {
      if (!id || Array.isArray(id)) return;
      const res = await fetch(`/api/tasks?id=${encodeURIComponent(id)}`);
      const data = await res.json();

      setTaskData(data);
    };

    fecthData();
  }, [id]);

  const getDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("pt-bt", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="bg-white h-full">
      <section className="max-w-2xl m-auto pt-10">
        <article className="border border-background/30 p-4 rounded-md">
          <div className="flex justify-between">
            <p className="bg-blue-500 px-2 py-1 rounded-md text-md">
              {taskData?.username}
            </p>
            {taskData?.createdAt && (
              <p className="text-background/50">
                Publicado em: {getDate(taskData?.createdAt?.toString())}
              </p>
            )}
          </div>
          <div className="text-background">
            <p className="uppercase font-semibold pt-4 pb-2 text-sm">
              Descrição da tarefa:
            </p>
            <p>{taskData?.description}</p>
          </div>
        </article>
      </section>

      <section className="max-w-2xl m-auto pt-10">
        <h1 className="text-background font-bold">Deixar Comentário</h1>

        <form>
          <Textarea
            className="border-background/30 border text-background"
            placeholder="Digite seu comentário..."
          />
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-500/50 cursor-pointer ease-in-out transition-colors text-white px-4 py-2 rounded text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4`}
            // disabled={submitLoading}
          >
            {/* {submitLoading && (
                <svg
                  className="w-5 h-5 mr-2 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )} */}
            Enviar Comentário
          </button>
        </form>
      </section>

      <section className="max-w-2xl m-auto pt-10">
        <h1 className="text-background font-bold">Todos Comentários</h1>

        <article className="border border-background/30 p-4 rounded-md mt-4">
          <div className="flex gap-4 items-center justify-between">
            <span className="bg-blue-500/50 px-2 py-1 rounded-md text-sm">
              Lucas Silva
            </span>
            <button
              type="button"
              // onClick={() => handleDeleteTask(task.id)}
            >
              <FaTrash className="text-red-500 text-base cursor-pointer" />
            </button>
          </div>
          <div>
            <p className="text-background text-sm pt-4">bla bla bla</p>
          </div>
        </article>

        <article className="border border-background/30 p-4 rounded-md mt-4">
          <div className="flex gap-4 items-center justify-between">
            <span className="bg-blue-500/50 px-2 py-1 rounded-md text-sm">
              Lucas Silva
            </span>
            <button
              type="button"
              // onClick={() => handleDeleteTask(task.id)}
            >
              <FaTrash className="text-red-500 text-base cursor-pointer" />
            </button>
          </div>
          <div>
            <p className="text-background text-sm pt-4">bla bla bla</p>
          </div>
        </article>
      </section>
    </div>
  );
}

//   ${
//   submitStatus === "loading"
//     ? "bg-yellow-500 hover:bg-yellow-500/50"
//     : submitStatus === "success"
//     ? "bg-green-500 hover:bg-green-500/50"
//     : "bg-blue-500 hover:bg-blue-500/50"
// }
