import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { isIP } from "node:net";
import nodemailer from "nodemailer";
import { createContactLimiter, escapeHtml, readContactBody, validateContact } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.moroccosaharatrekking.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  requireTLS: Number(process.env.SMTP_PORT) !== 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: true },
  connectionTimeout: 10_000,
  socketTimeout: 15_000,
});

const limitRequests = createContactLimiter();
const limitMessages = createContactLimiter();
const fingerprint = (value: string) => createHash("sha256").update(value).digest("hex");

function tooManyRequests(seconds: number) {
  return NextResponse.json(
    { error: "Trop de demandes. Veuillez réessayer dans quelques minutes ou nous contacter sur WhatsApp." },
    { status: 429, headers: { "Retry-After": String(seconds) } },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin && origin !== SITE_URL) {
    return NextResponse.json({ error: "Origine de la demande non autorisée." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Format de demande non valide." }, { status: 415 });
  }

  // Trust only a hosting-provided IP, never arbitrary forwarding headers.
  const ipHeader = process.env.VERCEL === "1"
    ? "x-vercel-forwarded-for"
    : process.env.CONTACT_TRUSTED_IP_HEADER;
  const rawIp = ipHeader ? request.headers.get(ipHeader)?.split(",")[0].trim() : null;
  const ip = rawIp && isIP(rawIp) ? fingerprint(rawIp.toLowerCase()) : null;
  // No shared anonymous bucket: one sender must not exhaust everyone else's quota.
  if (ip) {
    const requestRetry = limitRequests([{ key: `requests:${ip}`, max: 30 }]);
    if (requestRetry) return tooManyRequests(requestRetry);
  }

  let body: unknown;
  try {
    body = await readContactBody(request);
  } catch (error) {
    const oversized = error instanceof Error && error.message === "BODY_TOO_LARGE";
    return NextResponse.json(
      { error: oversized ? "Votre message est trop volumineux." : "Format de demande non valide." },
      { status: oversized ? 413 : 400 },
    );
  }

  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ success: true });
  }
  const contact = validateContact(body);
  if (!contact) {
    return NextResponse.json({ error: "Veuillez vérifier votre nom, votre adresse email et votre message (5 000 caractères maximum)." }, { status: 400 });
  }

  const limits = [
    // Scope unverified emails to the IP so other visitors cannot consume their quota.
    { key: `email:${ip || "no-ip"}:${fingerprint(contact.email)}`, max: 3 },
  ];
  if (ip) limits.push({ key: `ip:${ip}`, max: 5 });
  const messageRetry = limitMessages(limits);
  if (messageRetry) return tooManyRequests(messageRetry);

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return NextResponse.json({ error: "Le formulaire est momentanément indisponible. Contactez-nous sur WhatsApp." }, { status: 503 });
  }

  const { name, email, phone, country, inquiryType, message, newsletter } = contact;
  const receivedAt = new Date().toISOString();
  const newsletterPreference = newsletter ? `Oui — accord reçu le ${receivedAt}` : "Non";
  const from = `"MOROCCO SAHARA TREKKING" <${process.env.SMTP_USER}>`;
  try {
    await transporter.sendMail({
      from,
      to: process.env.MAIL_TO || "m_assi_ni@hotmail.fr",
      replyTo: email,
      subject: `Nouveau message de ${name} — ${inquiryType}`,
      text: `Nom : ${name}\nEmail : ${email}\nTéléphone : ${phone || "—"}\nPays : ${country || "—"}\nType de demande : ${inquiryType}\nOffres et mises à jour par email : ${newsletterPreference}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C0462F;">Nouveau message depuis le site</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone || "—")}</p>
          <p><strong>Pays :</strong> ${escapeHtml(country || "—")}</p>
          <p><strong>Type de demande :</strong> ${escapeHtml(inquiryType)}</p>
          <p><strong>Offres et mises à jour par email :</strong> ${escapeHtml(newsletterPreference)}</p>
          <h3>Message :</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>`,
    });
  } catch {
    console.error("Contact: delivery to the team failed.");
    return NextResponse.json({ error: "Erreur lors de l'envoi du message. Veuillez réessayer ou nous contacter sur WhatsApp." }, { status: 500 });
  }

  // A missing visitor receipt must not turn an already delivered request into an error.
  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: "Merci pour votre message — Morocco Sahara Trekking",
      text: "Merci pour votre message. Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais. Vous pouvez aussi nous contacter sur WhatsApp : https://wa.me/212672058267\n\nMohamed & l'équipe Morocco Sahara Trekking",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C0462F;">Merci ${escapeHtml(name)} !</h2>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais (généralement sous 2h).</p>
          <p>Vous pouvez aussi nous contacter directement sur <a href="https://wa.me/212672058267">WhatsApp</a>.</p>
          <p>Mohamed & l'équipe Morocco Sahara Trekking<br><a href="${SITE_URL}">${SITE_URL.replace("https://", "")}</a></p>
        </div>`,
    });
  } catch {
    console.error("Contact: visitor receipt could not be delivered; the team received the request.");
  }
  return NextResponse.json({ success: true });
}
