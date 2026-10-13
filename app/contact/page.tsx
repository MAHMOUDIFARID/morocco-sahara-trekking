"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  "Trek",
  "Général",
  "Sur-mesure",
  "Famille",
  "Autre",
];

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Trek");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          country,
          inquiryType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setCountry("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error("Contact form error:", err);
      setErrorMessage(err.message || "Erreur lors de l'envoi du message.");
      setStatus("error");
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] lg:min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">
      {/* LEFT SIDE: Google Map Embed */}
      <div className="relative h-full w-full min-h-[400px] lg:min-h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.4!2d-6.1343235!3d31.3844657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdbcb7ee6700dacd%3A0x3798a5762cea4efa!2sTrekking%20Vall%C3%A9e%20des%20Roses%20Tour%20Guide%20Mohamed!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Trekking Vallée des Roses Tour Guide Mohamed - Kelaat M'Gouna"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* RIGHT SIDE: Form Card */}
      <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center h-full">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="font-sans font-bold text-xl md:text-2xl text-[#1a1a1a]">
            Dites-nous ce dont vous avez besoin
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 mt-1.5 mb-6 leading-relaxed">
            Notre équipe est prête à vous accompagner pour chaque détail, petit ou
            grand.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Row 1: Prénom & Nom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent transition bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Row 2: Pays & Téléphone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <input
                  type="text"
                  placeholder="Pays"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent transition bg-white"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Row 3: Adresse email */}
            <div>
              <input
                type="email"
                required
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent transition bg-white"
              />
            </div>

            {/* Row 4: Type de demande */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Type de demande
              </label>
              <div className="flex flex-wrap gap-2">
                {INQUIRY_TYPES.map((type) => {
                  const isSelected = inquiryType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition cursor-pointer select-none border ${
                        isSelected
                          ? "bg-[#C0462F] text-white border-[#C0462F] shadow-sm"
                          : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 5: Message */}
            <div>
              <textarea
                rows={4}
                required
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 px-5 py-3 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0462F] focus:border-transparent resize-none transition bg-white"
              />
            </div>

            {/* Row 6: Newsletter iOS Toggle Switch */}
            <div className="flex items-center justify-between gap-4 py-1">
              <span className="text-xs sm:text-sm text-gray-600 transition-colors select-none">
                Je souhaite recevoir des offres exclusives et des mises à jour.
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={newsletter}
                onClick={() => setNewsletter(!newsletter)}
                className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-300 ease-in-out border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#C0462F] focus-visible:ring-offset-2 cursor-pointer ${
                  newsletter ? "bg-[#C0462F]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
                    newsletter ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm">
                <p className="font-semibold">Message envoyé avec succès !</p>
                <p className="mt-1 text-xs text-green-700">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais (généralement sous 2h).
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm">
                <p className="font-semibold">{errorMessage || "Erreur lors de l'envoi."}</p>
                <p className="mt-1 text-xs text-red-700">
                  Veuillez réessayer ou nous contacter directement via WhatsApp au +212 672 058 267.
                </p>
              </div>
            )}

            {/* Row 7: Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full border-2 border-gray-900 py-3 text-sm sm:text-base font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition duration-200 active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
