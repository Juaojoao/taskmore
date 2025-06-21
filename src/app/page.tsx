import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen max-w-3xl mx-auto px-4">
        <Image
          src="/assets/image01.svg"
          alt="Sistema para organizar estudos"
          width={500}
          height={500}
          priority
        />
        <h1 className="font-bold text-xl md:text-4xl text-center mt-16 uppercase">
          Sistema feito para você organizar
          <br />
          seus estudos e tarefas
        </h1>
        <div className="flex gap-4 mt-10">
          <Button variant="primary" type="button">
            + 7mil posts
          </Button>
          <Button variant="primary" type="button">
            + 1 mil comentários
          </Button>
        </div>
      </div>
    </main>
  );
}
