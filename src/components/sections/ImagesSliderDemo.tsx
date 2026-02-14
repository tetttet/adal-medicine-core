"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useTranslations } from "next-intl";
import { WHATSAPP_NUMBER } from "@/constant/links";

export function ImagesSliderDemo() {
  const t = useTranslations("ImageSlider");

  const images = [
    "/images/hero/IMG_6458.DNG",
    "/images/hero/1.DNG",
    "/images/hero/2.DNG",
  ];
  return (
    <ImagesSlider className="h-160" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p
          className="text-3xl! font-bold max-w-xl! mx-auto! md:text-6xl text-center bg-clip-text text-transparent bg-linear-to-b from-white via-neutral-100 to-neutral-400 py-4"
          dangerouslySetInnerHTML={{ __html: t("title") }}
        />
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/20 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
        >
          <span>{t("button")}</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-linear-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </a>
      </motion.div>
    </ImagesSlider>
  );
}
