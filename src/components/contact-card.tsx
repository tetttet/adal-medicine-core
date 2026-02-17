"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapIcon, PhoneIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Свяжитесь с нами",
  description = "Если у вас есть вопросы по нашим услугам или вам нужна помощь, пожалуйста, заполните форму здесь.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      id="contact-card"
      className={cn(
        "relative grid h-full w-full border md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      <DecorIcon position="top-left" />
      <DecorIcon position="top-right" />
      <DecorIcon position="bottom-left" />
      <DecorIcon position="bottom-right" />

      <div className="col-span-1 flex flex-col justify-between bg-secondary/50 lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h1 className="font-semibold text-primary text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-muted-foreground text-[12px] md:text-[14px] lg:text-[16px]">
            {description}
          </p>
          <div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info) => (
              <ContactInfo key={info.label} {...info} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "col-span-1 flex h-full w-full items-center border-t bg-card px-4 py-8 md:border-t-0 md:border-l",
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)} {...props}>
      <div className="rounded-full border bg-card p-3 shadow [&_svg]:size-5">
        {icon}
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  );
}

export const ContactCardDemo = () => {
  const [pending, startTransition] = useTransition();
  const t = useTranslations("Contact");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; text: string }
    | { type: "error"; text: string }
  >({ type: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "idle" });

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        });

        const data = (await res.json()) as { ok: boolean; error?: string };

        if (!res.ok || !data.ok) {
          setStatus({
            type: "error",
            text: data.error || "Не удалось отправить сообщение.",
          });
          return;
        }

        setStatus({
          type: "success",
          text: "Сообщение отправлено! Мы ответим в течение 1 рабочего дня.",
        });

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch (err) {
        setStatus({
          type: "error",
          text: err instanceof Error ? err.message : "Ошибка сети.",
        });
      }
    });
  }

  return (
    <ContactCard
      contactInfo={[
        {
          icon: <MailIcon className="size-5" />,
          label: t("mail"),
          value: "adal.medicine.company@gmail.com",
        },
        {
          icon: <PhoneIcon className="size-5" />,
          label: t("phone"),
          value: "+7 (___) ___-__-__",
        },
        {
          icon: <MapIcon className="size-5" />,
          label: t("address"),
          value: "Казахстан",
          className: "col-span-2",
        },
      ]}
      description={t("contactUsDescription")}
      title={t("contactUs")}
    >
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <div className="flex flex-col gap-2">
          <Label>{t("name")}</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Ваше имя"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("mail")}</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@email.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("phone")}</Label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="+7..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("message")}</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("messagePlaceholder")!}
          />
        </div>

        {status.type === "error" && (
          <p className="text-sm text-red-600">{status.text}</p>
        )}
        {status.type === "success" && (
          <p className="text-sm text-green-600">{status.text}</p>
        )}

        <Button className="w-full rounded-2xl" type="submit" disabled={pending}>
          {pending ? t("sending") : t("submit")}
        </Button>
      </form>
    </ContactCard>
  );
};
