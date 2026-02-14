// app/[locale]/services/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Услуга не найдена</h1>
      <p className="mt-2 text-muted-foreground">
        Проверь slug и наличие файла в{" "}
        <code className="rounded bg-muted px-2 py-1">public/markdown/&lt;locale&gt;</code>.
      </p>

      <div className="mt-6">
        <Button asChild className="rounded-full bg-teal-600 text-white hover:bg-teal-700">
          {/* если next-intl middleware стоит, locale подставится автоматически,
              но безопаснее вести на относительный путь */}
          <Link href="./services">Назад к услугам</Link>
        </Button>
      </div>
    </div>
  );
}
