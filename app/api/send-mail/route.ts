import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.moroccosaharatrekking.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // for cPanel self-signed certificates
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, inquiryType, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      );
    }

    // Email to you (admin)
    await transporter.sendMail({
      from: `"MOROCCO SAHARA TREKKING" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'm_assi_ni@hotmail.fr',
      replyTo: email,
      subject: `Nouveau message de ${name} — ${inquiryType || 'Général'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C0462F; border-bottom: 2px solid #C0462F; padding-bottom: 8px;">Nouveau message depuis le site</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; width: 140px;"><strong>Nom :</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Email :</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0;"><strong>Téléphone :</strong></td><td>${phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Pays :</strong></td><td>${country || '—'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Type de demande :</strong></td><td>${inquiryType || '—'}</td></tr>
          </table>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <h3 style="color: #1a1a1a; margin-bottom: 8px;">Message :</h3>
          <p style="white-space: pre-wrap; color: #444; background: #f9f9f9; padding: 15px; border-radius: 8px; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    // Confirmation email to the visitor
    await transporter.sendMail({
      from: `"MOROCCO SAHARA TREKKING" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Merci pour votre message — Morocco Sahara Trekking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #C0462F;">Merci ${name} !</h2>
          <p style="line-height: 1.6;">Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais (généralement sous 2h).</p>
          <p style="line-height: 1.6;">En attendant, n'hésitez pas à nous contacter directement sur WhatsApp :</p>
          <p style="margin: 25px 0;">
            <a href="https://wa.me/212672058267" style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold;">
              Discuter sur WhatsApp
            </a>
          </p>
          <p style="color: #888; font-size: 13px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            Mohamed & l'équipe Morocco Sahara Trekking<br>
            <a href="https://moroccosaharatrekking.com" style="color: #C0462F; text-decoration: none;">moroccosaharatrekking.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
