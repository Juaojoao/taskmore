"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center py-4 max-w-5xl mx-auto">
      <Link href="/" className="flex items-center">
        <h1 className="text-xl font-bold pr-1">Tarefas</h1>
        <span className="text-red-500 text-3xl">+</span>
      </Link>

      {status === "loading" ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
      ) : session?.user ? (
        <div className="flex items-center gap-2">
          <Image
            src={session.user.image as string}
            alt={session.user.name as string}
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <span className="font-medium">Olá, {session.user.name} !</span>
        </div>
      ) : null}
      <nav>
        <ul>
          <li>
            {status === "loading" ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              </div>
            ) : session ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="primary">Dashboard</Button>
                </Link>
                <Button variant="primary" onClick={() => signOut()}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
