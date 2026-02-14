"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Route,
  HeartHandshake,
  BadgeCheck,
  Receipt,
  Landmark,
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

type Advantage = {
  title: string;
  Icon: React.ElementType;
  tone: "mint" | "blue" | "peach" | "lilac" | "sand";
};

const advantages: Advantage[] = [
  {
    title:
      "Чёткий маршрут без лишнего стресса. Мы заранее выстраиваем весь процесс: документы, сроки, организация и логистика объединены в понятную систему без суеты и неожиданностей.",
    Icon: Route,
    tone: "mint",
  },
  {
    title:
      "Поддержка в моменты тревоги и неопределённости. Мы рядом на каждом этапе: спокойно объясняем, что ждёт дальше, как подготовиться и на что важно обратить внимание — именно этого чаще всего не хватает пациентам.",
    Icon: HeartHandshake,
    tone: "blue",
  },
  {
    title:
      "Осознанный выбор клиник и специалистов. Мы опираемся на подтверждённый опыт, а не случайные рекомендации: работаем только с врачами и клиниками, проверенными личной практикой и результатами пациентов.",
    Icon: BadgeCheck,
    tone: "peach",
  },
  {
    title:
      "Прозрачная стоимость и понятный процесс. Никаких «уточним позже», неожиданных доплат или скрытых пунктов — все расходы и этапы обсуждаются заранее, ещё до вылёта.",
    Icon: Receipt,
    tone: "lilac",
  },
  {
    title:
      "Глубокое знание системы здравоохранения Турции. Мы понимаем, как всё устроено на практике: куда обращаться с конкретным диагнозом, как проходит госпитализация, какие документы понадобятся и на что важно обратить внимание — это экономит время, деньги и нервы.",
    Icon: Landmark,
    tone: "sand",
  },
];

const toneClasses: Record<Advantage["tone"], string> = {
  mint: "bg-emerald-50 border-emerald-100 text-slate-900",
  blue: "bg-sky-50 border-sky-100 text-slate-900",
  peach: "bg-orange-50 border-orange-100 text-slate-900",
  lilac: "bg-violet-50 border-violet-100 text-slate-900",
  sand: "bg-amber-50 border-amber-100 text-slate-900",
};

export function AdalMedicineAdvantages({ className }: { className?: string }) {
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
          Преимущества лечение с Adal Medicine
        </motion.h2>

        {/* Карточки */}
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
              {advantages.map((item, i) => {
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
                            <Icon className="size-5" />
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

            {/* Кнопки листания (desktop) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
              <div className="pointer-events-auto">
                <CarouselPrevious className="shadow-sm" />
              </div>
              <div className="pointer-events-auto">
                <CarouselNext className="shadow-sm" />
              </div>
            </div>
          </Carousel>

          {/* Подсказка свайпа */}
          <div className="mt-3 text-xs text-muted-foreground md:hidden">
            Свайпните влево/вправо, чтобы посмотреть все пункты
          </div>
        </div>
      </div>
    </section>
  );
}
