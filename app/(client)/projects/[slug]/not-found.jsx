import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-40 pb-24 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg">
        <SearchX className="size-7" />
      </div>
      <h1 className="font-heading mt-6 text-3xl font-bold tracking-tight">
        Project not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The project you're looking for doesn't exist or may have been moved.
      </p>
      <Button asChild className="mt-6 gap-2">
        <Link href="/projects">
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>
      </Button>
    </div>
  );
}
