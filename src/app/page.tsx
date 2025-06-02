import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Welcome to the SOC Product Configurator
        </h1>
        <p className="text-lg text-muted-foreground">
          Answer a few questions to help us understand your project requirements
          and generate a tailored configuration.
        </p>
        <Link href="/industry-focus" passHref>
          <Button size="lg" className="mt-6">
            Start Configuration
          </Button>
        </Link>
      </div>
    </div>
  );
}
