"use client";

import * as React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CommentItemsEn,
  CommentItemsKz,
  CommentItemsRu,
} from "@/constant/Info";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "next-intl";

type Review = {
  text: string;
  rating: number;
  author: string;
  role?: string;
  procedure?: string;
  date?: string;
};

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating ?? 0));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < r;
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              filled ? "text-amber-400 fill-amber-400" : "text-white/25",
            )}
          />
        );
      })}
      <span className="ml-2 text-xs text-white/70">{r.toFixed(1)}</span>
    </div>
  );
}

export default function Comments() {
  const locale = useLocale();
  let CommentItems = CommentItemsRu;
  if (locale === "en") {
    CommentItems = CommentItemsEn;
  }
  if (locale === "kz") {
    CommentItems = CommentItemsKz;
  }
  const items = React.useMemo(
    () => (CommentItems as Review[]) ?? [],
    [CommentItems],
  );
  const duplicated = React.useMemo(() => [...items, ...items], [items]);
  const t = useTranslations("All.comments");

  // autoscroll via motion value (smoother + controllable)
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // half of track = one "set" width
    const oneSetWidth = track.scrollWidth / 2;
    if (!oneSetWidth || !Number.isFinite(oneSetWidth)) return;

    // reset start
    x.set(0);

    const controls = animate(x, [0, -oneSetWidth], {
      ease: "linear",
      duration: 55,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [x, duplicated.length]);

  React.useEffect(() => {
    // pause/resume on hover
    // We'll simply re-animate via animate() approach by toggling reduced speed:
    // Instead of messing with internal controls, we just rely on hover overlay (user can read) + keep speed constant.
    // If you want true pause: wrap cards in motion and stop controls (requires storing controls in state).
  }, [hovered, x]);

  return (
    <section className="relative overflow-hidden py-16 text-white">
      {/* Medical-ish background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-r from-[#0EA5A4] via-[#0B7285] to-[#0B5C66]" />
        <div className="absolute inset-0 opacity-[0.35]">
          <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        </div>
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.18) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/20" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur"
          >
            <Badge variant="secondary" className="bg-white/15 text-white">
              {t("reply")}
            </Badge>
            <span className="text-xs text-white/80">{t("real")}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("title")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative mt-8 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-black/20 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black/20 to-transparent" />

          <motion.div
            style={{ x }}
            className="flex w-max gap-6 will-change-transform"
            ref={trackRef}
          >
            {duplicated.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className={cn(
                  "group",
                  hovered ? "cursor-default" : "cursor-pointer",
                )}
              >
                <Card
                  className={cn(
                    "w-94 border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md",
                    "rounded-2xl transition",
                    "hover:border-white/25 hover:bg-white/12",
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                          <Quote className="h-4.5 w-4.5 text-white/90" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {item.author}
                          </p>
                          <p className="truncate text-xs text-white/70">
                            {item.role ?? "Пациент"}
                          </p>
                        </div>
                      </div>

                      <Stars rating={item.rating} />
                    </div>
                  </CardHeader>

                  <CardContent className="pb-5">
                    <p className="text-sm leading-relaxed text-white/85">
                      <span className="opacity-90">“</span>
                      {item.text}
                      <span className="opacity-90">”</span>
                    </p>

                    {(item.procedure || item.date) && (
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        {item.procedure && (
                          <Badge className="bg-white/15 text-white hover:bg-white/20">
                            {item.procedure}
                          </Badge>
                        )}
                        {item.date && (
                          <Badge
                            variant="outline"
                            className="border-white/25 text-white/80"
                          >
                            {item.date}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex w-full items-center justify-between text-xs text-white/70">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/90" />
                        {t("verified")}
                      </span>
                      <span className="opacity-0 transition group-hover:opacity-100">
                        {t("more")}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
