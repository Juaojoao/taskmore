import type { Metadata } from "next";
import "./globals.css";
import { SessionWrapper } from "@/components/SessionWrapper";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Estudo Next",
  description: "Estudo Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="antialiased h-full">
        <SessionWrapper>
          <Header />
          <div className="h-full flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
