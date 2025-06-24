"use client";

import { Tasks } from "@/types/task.type";

import { Textarea } from "@/components/ui/Textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaComment, FaShare, FaTrash } from "react-icons/fa";

export default function DashboardPage() {
  const [tasksData, setTasksData] = useState<Tasks[] | []>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [inputDescription, setInputDescription] = useState("");
  const [inputCheck, SetInputCheck] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTask = async () => {
      if (!session?.user?.email) return;

      try {
        setLoadingTask(true);

        const res = await fetch(
          `/api/tasks/email?email=${encodeURIComponent(session.user.email)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data: Tasks[] = await res.json();

        setTasksData(data);

        setLoadingTask(false);
      } catch (error) {
        setLoadingTask(false);
        console.error(error);
      } finally {
        setLoadingTask(false);
      }
    };

    fetchTask();
  }, [session?.user?.email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitStatus === "loading") return;
    if (inputDescription.trim() === "") return;

    setSubmitStatus("loading");

    try {
      const data = {
        userId: session?.user.id,
        description: inputDescription,
        public: inputCheck,
      };

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const newTask: Tasks = await res.json();
      setTasksData((prev) => [...prev, newTask]);
      setInputDescription(""); // limpa
      setSubmitStatus("success"); // mostra "Cadastrado!"
    } catch (error) {
      console.error(error);
      setSubmitStatus("idle"); // erro → volta ao normal
    } finally {
      // Volta para "Registrar" depois de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }
  };

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    SetInputCheck(e.target.checked);
  };

  const handleInputDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputDescription(e.target.value);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen animate-pulse">
        <div>Carregando...</div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecionando...</div>
      </div>
    );
  }

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

  const handleDeleteTask = async (id: string) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta tarefa?");
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (confirmed) {
      if (res.ok) {
        alert(data.message);

        setTasksData((prev) => prev.filter((task) => task.id !== id));
      }
    } else {
      alert("Erro ao Exluir esta task!");
    }
  };

  return (
    <div className="h-full">
      <section>
        <div className="bg-background  max-w-5xl m-auto mt-8">
          <h1 className="font-bold text-4xl pb-2">QUAL SUA TAREFA?</h1>
          <form onSubmit={handleSubmit}>
            <Textarea
              className="border-white"
              onChange={handleInputDesc}
              value={inputDescription}
            />
            <div className="flex items-center mt-4">
              <input
                id="link-checkbox"
                type="checkbox"
                checked={inputCheck}
                onChange={handleCheckBox}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                className="ms-2 text-sm font-medium text-white"
              >
                Tarefa pública
              </label>
            </div>

            <button
              type="submit"
              className={`cursor-pointer ease-in-out transition-colors text-white px-4 py-2 rounded text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4 ${
                submitStatus === "loading"
                  ? "bg-yellow-500 hover:bg-yellow-500/50"
                  : submitStatus === "success"
                  ? "bg-green-500 hover:bg-green-500/50"
                  : "bg-blue-500 hover:bg-blue-500/50"
              }`}
              disabled={submitLoading}
            >
              {submitLoading && (
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
              )}
              {submitStatus === "loading"
                ? "Carregando..."
                : submitStatus === "success"
                ? "Cadastrado!"
                : "Registrar"}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white pt-16 mt-10 h-full">
        <div className="max-w-5xl mx-auto py-4">
          <h1 className="font-bold text-4xl text-background mb-8">
            MINHAS TAREFAS
          </h1>

          {loadingTask ? (
            <div className="flex items-center justify-center mt-32">
              <svg
                className="w-24 h-24 animate-spin text-gray-700/30"
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
            </div>
          ) : tasksData.length > 0 ? (
            tasksData.map((task) => (
              <article
                key={task.id}
                className="border border-gray-300 py-2 px-4 rounded-md mb-4 shadow-md hover:shadow-xl transition-all ease-in"
              >
                <div
                  className={`flex ${
                    task.public ? "justify-between" : "justify-end"
                  }`}
                >
                  {task.public && (
                    <div className="flex gap-4 items-center">
                      <span className="bg-blue-500 text-white px-3 py-1 text-[10px] rounded-md">
                        PUBLICO
                      </span>
                      <button type="button">
                        <FaShare className="text-base text-blue-500" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => router.push(`/task/${task.id}`)}
                    >
                      <FaComment className="cursor-pointer text-blue-500 text-base" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrash className="text-red-500 text-base cursor-pointer" />
                    </button>
                  </div>
                </div>

                {task.createdAt && (
                  <div className="mt-2">
                    <p className="text-background/50 text-sm">
                      {getDate(task.createdAt.toString())}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center mt-6">
                  <p className="text-background font-extralight">
                    {task.description ?? "Sem descrição"}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="flex items-center justify-center border border-background/10 p-4 rounded-md">
              <p className="text-background">Nenhuma task encontrada</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
