"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, User2, Briefcase, MapPin } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/constant/links";

type Stat = { label: string; value: string };

export default function FounderStoryTeaserClient(props: {
  locale: string;
  cover: string;
  name: string;
  title: string;
  role: string;
  teaser: string;
  buttonText: string;
  tags?: string[];
  location?: string;
  highlights?: string[];
  stats?: Stat[];
}) {
  const {
    locale,
    cover,
    name,
    title,
    role,
    teaser,
    buttonText,
    tags = [],
    location,
    highlights = [],
    stats,
  } = props;

  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden rounded-[28px]">

      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* LEFT: image card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* halo */}
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.10),transparent_55%)]" />
          <div className="relative overflow-hidden rounded-[26px] border border-black/10 bg-white/20 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={cover}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority={false}
              />
            </div>

            {/* overlay label */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span>История основателя</span>
            </div>

            {/* bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          {/* stats row (optional) */}
          {stats?.length ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.slice(0, 3).map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/10 bg-white/50 px-4 py-3 backdrop-blur"
                >
                  <div className="text-lg font-semibold tracking-tight text-black">
                    {s.value}
                  </div>
                  <div className="text-xs text-black/60">{s.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>

        {/* RIGHT: content */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.06 }}
          className="relative"
        >
          {/* small eyebrow */}
          {title ? (
            <div className="flex flex-wrap items-center gap-2 text-sm text-black/60">
              <span className="inline-flex items-center gap-2">
                <User2 className="h-4 w-4" />
                <span>{title}</span>
              </span>
              {location ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/50 px-2.5 py-1 text-xs text-black/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </span>
              ) : null}
            </div>
          ) : null}

          <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
            {name}
          </h3>

          {role ? (
            <div className="mt-2 inline-flex items-center gap-2 text-black/70">
              <Briefcase className="h-4 w-4" />
              <p className="text-sm sm:text-base">{role}</p>
            </div>
          ) : null}

          {/* tags */}
          {tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 6).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-full border border-black/10 bg-white/60 text-black/80"
                >
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}

          {/* teaser */}
          <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-black/85 sm:text-[15.5px]">
            {teaser}
          </p>

          {/* highlights (optional) */}
          {highlights.length ? (
            <ul className="mt-5 space-y-2">
              {highlights.slice(0, 3).map((h, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-2xl border border-black/10 bg-white/45 px-4 py-3 text-sm text-black/80 backdrop-blur"
                >
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-black/60" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* CTA */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="rounded-full">
              <Link href={`/${locale}/me`} className="inline-flex items-center">
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="rounded-full border border-black/10 bg-green-600 hover:bg-green-700 text-white"
            >
              <a
                className=""
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp +90 536 622 73 66
              </a>
            </Button>

            <div className="hidden sm:block sm:flex-1" />

            <div className="text-xs text-black/55">Читать за ~2 минуты</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
