import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to the Product Configurator
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Answer a few questions to help us understand your project requirements
          and generate a tailored configuration.
        </p>
        <Link href="/industry-focus" passHref>
          <Button size="lg" className="mt-4">
            Start Configuration
          </Button>
        </Link>
      </main>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Powered by Next.js and Shadcn UI</p>
      </footer>
    </div>
  );
}
