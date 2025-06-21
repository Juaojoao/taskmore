"use client";

import { Textarea } from "@/components/ui/Textarea";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaShare, FaTrash } from "react-icons/fa";

export default function DashboardPage() {
  const [submitLoading, setSubmitLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session?.user);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Mostra loading enquanto verifica a sessão
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen animate-pulse">
        <div>Carregando...</div>
      </div>
    );
  }

  // Se não estiver autenticado, mostra loading (vai redirecionar)
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecionando...</div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // await fetch ou alguma promessa aqui
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Enviado!");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="h-full">
      <Head>
        <title>Dashboard</title>
      </Head>

      <section>
        <div className="bg-background  max-w-5xl m-auto mt-8">
          <h1 className="font-bold text-4xl pb-2">QUAL SUA TAREFA?</h1>
          <form onSubmit={handleSubmit}>
            <Textarea className="border-white" />
            <div className="flex items-center mt-4">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
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
              className="bg-blue-500 text-white px-4 py-2 rounded text-center flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4"
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
              {submitLoading ? "Carregando..." : "Registrar"}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white pt-16 mt-10 h-full">
        <div className="max-w-5xl mx-auto py-4">
          <h1 className="font-bold text-4xl text-background mb-8">
            MINHAS TAREFAS
          </h1>

          <article className="border border-gray-300 py-2 px-4 rounded-md mb-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 text-[10px] rounded-md"
                >
                  PUBLICO
                </button>
                <button type="button">
                  <FaShare className="text-base text-blue-500" />
                </button>
              </div>

              <button type="button">
                <FaTrash className="text-red-500 text-base" />
              </button>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-background font-extralight">
                Estudar javascript com sujeito programador
              </p>
            </div>
          </article>

          <article className="border border-gray-300 py-2 px-4 rounded-md">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 text-[10px] rounded-md"
                >
                  PUBLICO
                </button>
                <button type="button">
                  <FaShare className="text-base text-blue-500" />
                </button>
              </div>

              <button type="button">
                <FaTrash className="text-red-500 text-base" />
              </button>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-background font-extralight">
                Estudar javascript com sujeito programador
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
