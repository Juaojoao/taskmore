"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Google } from "@deemlol/next-icons";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Bem-vindo
            </h1>
            <p className="text-gray-400 text-lg">
              Faça login para organizar seus estudos e tarefas
            </p>
          </div>

          <div className="space-y-6">
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("google")}
            >
              <Google size={24} color="#0f0f0f" />
              Continuar com Google
            </Button>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Voltar para a página inicial
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Ao fazer login, você concorda com nossos{" "}
              <Link
                href="/terms"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link
                href="/privacy"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
