"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  AlarmClock,
  Stethoscope,
  Cpu,
  FileSearch,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";

type Reason = {
  title: string;
  Icon: React.ElementType;
  tone: "blue" | "mint" | "peach" | "lilac" | "sand";
};

const reasons: Reason[] = [
  {
    title:
      "Есть сомнения в диагнозе — нужно второе независимое мнение и точная диагностика",
    Icon: HelpCircle,
    tone: "blue",
  },
  {
    title:
      "Необходима срочная операция, а в стране ожидание растягивается на недели или месяцы.",
    Icon: AlarmClock,
    tone: "mint",
  },
  {
    title:
      "Пациенту нужен комплексный подход: диагностика, консилиум, план действий в короткие сроки.",
    Icon: Stethoscope,
    tone: "peach",
  },
  {
    title:
      "Требуется высокотехнологичное вмешательство (катетерные операции, роботизированные методы, гибридные процедуры).",
    Icon: Cpu,
    tone: "lilac",
  },
  {
    title:
      "Есть желание получить более детальное и расширенное мнение по поводу диагноза или плана лечения.",
    Icon: FileSearch,
    tone: "sand",
  },
];

const toneClasses: Record<Reason["tone"], string> = {
  blue: "bg-sky-50 border-sky-100 text-slate-900",
  mint: "bg-emerald-50 border-emerald-100 text-slate-900",
  peach: "bg-orange-50 border-orange-100 text-slate-900",
  lilac: "bg-violet-50 border-violet-100 text-slate-900",
  sand: "bg-amber-50 border-amber-100 text-slate-900",
};

export function WhenTreatmentAbroadRecommended({
  className,
}: {
  className?: string;
}) {
  return (
    <section className={cn("w-full", className)}>
      <Separator className="my-20" />
      <div className="my-20">
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-balance text-xl font-semibold tracking-tight md:text-2xl"
        >
          Когда рекомендуется лечение за границей ?
        </motion.h2>

        {/* Листающие блоки */}
        <div className="relative mt-5">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reasons.map((item, i) => {
                const Icon = item.Icon;

                return (
                  <CarouselItem
                    key={i}
                    className="pl-4 basis-[85%] sm:basis-[55%] lg:basis-[40%]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: i * 0.03,
                      }}
                      whileHover={{ y: -4 }}
                      className="h-full"
                    >
                      <Card
                        className={cn(
                          "h-full rounded-2xl border p-5 shadow-sm transition-shadow",
                          "hover:shadow-md",
                          toneClasses[item.tone],
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid p-2 place-items-center rounded-full bg-white/70 ring-1 ring-black/5">
                            <Icon className="size-5 rounded-full" />
                          </div>

                          <p className="text-pretty text-[14px] leading-relaxed md:text-[16px]">
                            {item.title}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Кнопки листания (как в shadcn), на мобилке можно скрыть */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
              <div className="pointer-events-auto">
                <CarouselPrevious className="shadow-sm" />
              </div>
              <div className="pointer-events-auto">
                <CarouselNext className="shadow-sm" />
              </div>
            </div>
          </Carousel>

          {/* Подсказка свайпа на мобилке */}
          <div className="mt-3 text-xs text-muted-foreground md:hidden">
            Свайпните влево/вправо, чтобы посмотреть все пункты
          </div>
        </div>
      </div>
    </section>
  );
}
