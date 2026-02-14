"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/logo";
import { useScroll } from "@/hooks/use-scroll";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// icons (обычно ставят lucide-react в shadcn проектах)
import { ChevronDown, Languages } from "lucide-react";
import Link from "next/link";

const LOCALES = ["en", "ru", "kz"] as const;
type Locale = (typeof LOCALES)[number];

const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  kz: "Қазақша",
};

function stripLocalePrefix(pathname: string) {
  // Удаляем первый сегмент, если это locale
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && LOCALES.includes(first as Locale)) {
    segments.shift();
  }
  // возвращаем путь без локали
  return "/" + segments.join("/");
}

function buildPathWithLocale(opts: {
  pathname: string;
  locale: Locale;
  searchParams: URLSearchParams;
}) {
  const rest = stripLocalePrefix(opts.pathname);
  const qs = opts.searchParams.toString();
  // если rest === "/" то не дублируем слэш
  const base = `/${opts.locale}${rest === "/" ? "" : rest}`;
  return qs ? `${base}?${qs}` : base;
}

function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = useLocale() as Locale;

  const onSelect = React.useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      const nextPath = buildPathWithLocale({
        pathname,
        locale: newLocale,
        searchParams,
      });
      router.push(nextPath);
    },
    [locale, pathname, router, searchParams]
  );

  // (опционально) короткая метка на кнопке
  const short = locale.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 rounded-md"
          aria-label="Switch language"
        >
          <Languages className="h-4 w-4" />
          <span className="text-sm font-medium">{short}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[180px]">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => onSelect(l)}
            className={cn(
              "flex items-center justify-between",
              l === locale && "font-semibold"
            )}
          >
            <span>{LOCALE_LABEL[l]}</span>
            <span className="text-xs opacity-70">{l.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-transparent bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl":
            scrolled,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-18 md:transition-all md:ease-out",
          { "md:px-2": scrolled }
        )}
      >
        <Link
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
          href="/"
        >
          <Logo />
        </Link>

        {/* shadcn locale switcher */}
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
