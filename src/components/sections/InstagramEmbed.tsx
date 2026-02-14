"use client";

import { useEffect } from "react";
import Script from "next/script";

type Props = {
  permalink: string; // например: https://www.instagram.com/reel/DUpmZ94DLpR/
  captioned?: boolean;
  className?: string;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export default function InstagramEmbed({
  permalink,
  captioned = true,
  className,
}: Props) {
  // На каждом маунте/смене permalink пробуем “пропроцессить” embed
  useEffect(() => {
    const tryProcess = () => {
      window.instgrm?.Embeds?.process?.();
    };

    // сразу
    tryProcess();

    // и чуть позже (иногда нужно, если script грузится позже)
    const t = window.setTimeout(tryProcess, 300);
    return () => window.clearTimeout(t);
  }, [permalink]);

  return (
    <div className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
        {...(captioned ? { "data-instgrm-captioned": "" } : {})}
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 3,
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px auto",
          maxWidth: 540,
          minWidth: 326,
          padding: 0,
          width: "99.375%",
        }}
      />

      {/* ВАЖНО: грузим скрипт через next/script */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.instgrm?.Embeds?.process?.();
        }}
      />
    </div>
  );
}
