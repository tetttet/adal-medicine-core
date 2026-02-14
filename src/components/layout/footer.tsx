"use client";

import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import type { ReactNode } from "react";
import Logo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "next-social-icons";
import { useTranslations } from "next-intl";

type FooterLink = {
  title: string;
  href: string;
  icon?: ReactNode;
};
type FooterLinkGroup = {
  label: string;
  links: FooterLink[];
};

export function StickyFooter() {
  const t = useTranslations("Header.footer");

  return (
    <footer
      className="relative h-(--footer-height) w-full border-t [--footer-height:400px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-(--footer-height) w-full">
        <div className="sticky top-[calc(100vh-var(--footer-height))] h-full overflow-y-auto">
          <div
            aria-hidden
            className="absolute inset-0 isolate z-0 opacity-50 contain-strict dark:opacity-60"
          >
            <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
            <div className="absolute top-0 left-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
            <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
          </div>

          <div className="relative mx-auto flex size-full max-w-6xl flex-col justify-between gap-5">
            <div className="grid grid-cols-1 gap-8 px-4 pt-12 md:grid-cols-2 lg:grid-cols-4">
              <AnimatedContainer className="w-full space-y-4">
                <Logo />
                <p className="mt-8 text-muted-foreground text-sm md:mt-0">
                  {t("brand.description")}
                </p>

                <div className="flex gap-2">
                  {socialLinks.map((link, index) => (
                    <Button
                      asChild
                      key={`social-${link.key}-${index}`}
                      size="icon-sm"
                      variant="outline"
                    >
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              </AnimatedContainer>

              {footerLinkGroups(t).map((group, index) => (
                <AnimatedContainer
                  className="w-full"
                  delay={0.1 + index * 0.1}
                  key={group.label}
                >
                  <div className="mb-10 md:mb-0">
                    <h3 className="text-sm uppercase">{group.label}</h3>
                    <ul className="mt-4 space-y-2 text-muted-foreground text-sm md:text-xs lg:text-sm">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            className="inline-flex items-center hover:text-foreground [&_svg]:me-1 [&_svg]:size-4"
                            href={link.href}
                          >
                            {link.icon}
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-2 border-t p-4 text-muted-foreground text-sm md:flex-row">
              <p>
                {t("bottom.copyright", {
                  year: new Date().getFullYear(),
                  rights: t("bottom.rights"),
                })}
              </p>
              <a className="hover:text-foreground" href="#">
                {t("bottom.privacy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    key: "tiktok",
    href: "https://www.tiktok.com/@adal.medicine?_r=1&_t=ZS-93rAySDr4Hy",
    icon: <SocialIcon size={36} platform="tiktok" />,
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/adal_medicine?igsh=MXJ3cmd3aTJ3b2o2aA==",
    icon: <SocialIcon size={36} platform="instagram" />,
  },
  {
    key: "youtube",
    href: "https://youtube.com/@adalmedicine?si=AfcSvBhwv2otGHME",
    icon: <SocialIcon size={36} platform="youtube" />,
  },
  {
    key: "mail",
    href: "mailto:adal.medicine.company@gmail.com",
    icon: <SocialIcon size={36} platform="email" />,
  },
] as const;

function footerLinkGroups(t: ReturnType<typeof useTranslations>): FooterLinkGroup[] {
  return [
    {
      label: t("groups.about.label"),
      links: [
        { title: t("groups.about.links.services"), href: "#" },
        { title: t("groups.about.links.prices"), href: "#" },
        { title: t("groups.about.links.support"), href: "#" },
        { title: t("groups.about.links.reviews"), href: "#" },
      ],
    },
    {
      label: t("groups.info.label"),
      links: [
        { title: t("groups.info.links.howItWorks"), href: "#" },
        { title: t("groups.info.links.media"), href: "#" },
        { title: t("groups.info.links.updates"), href: "#" },
        { title: t("groups.info.links.news"), href: "#" },
      ],
    },
    {
      label: t("groups.community.label"),
      links: [
        { title: t("groups.community.links.joinChat"), href: "#" },
        { title: t("groups.community.links.followInstagram"), href: "#" },
        { title: t("groups.community.links.newsletter"), href: "#" },
        { title: t("groups.community.links.forum"), href: "#" },
        { title: t("groups.community.links.joinCommunity"), href: "#" },
      ],
    },
  ];
}

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  // IMPORTANT: return a fragment so types always match ReactNode
  if (shouldReduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
