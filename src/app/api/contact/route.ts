import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export const RESEND_API_KEY = "re_dLNK5gor_HDsAn9s9zfdrNhC5HfDnUQub"
export const CONTACT_TO_EMAIL = "adal.medicine.company@gmail.com"
//export const CONTACT_TO_EMAIL = "fagutlaxabit@gmail.com"
export const CONTACT_FROM_EMAIL = "onboarding@resend.dev"

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const apiKey = RESEND_API_KEY;
    const to = CONTACT_TO_EMAIL;
    const from = CONTACT_FROM_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is missing" },
        { status: 500 },
      );
    }

    const body = (await req.json()) as Partial<ContactPayload>;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Введите имя (минимум 2 символа)." },
        { status: 400 },
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Введите корректный email." },
        { status: 400 },
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          error: "Сообщение слишком короткое (минимум 10 символов).",
        },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const subject = `Новая заявка с сайта: ${name}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system; line-height: 1.5;">
        <h2 style="margin:0 0 12px;">Новая заявка с формы</h2>

        <p style="margin:0 0 6px;"><b>Имя:</b> ${escapeHtml(name)}</p>
        <p style="margin:0 0 6px;"><b>Email:</b> ${escapeHtml(email)}</p>
        <p style="margin:0 0 12px;"><b>Телефон:</b> ${escapeHtml(phone || "-")}</p>

        <div style="padding:12px; border:1px solid #e5e7eb; border-radius:10px; background:#fafafa;">
          <div style="white-space:pre-wrap;">${escapeHtml(message)}</div>
        </div>

        <p style="margin:12px 0 0; color:#6b7280; font-size:12px;">
          Отправлено с контактной формы сайта.
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
