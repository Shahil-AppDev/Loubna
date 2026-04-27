"use client";

import { useState } from "react";
import { DEMAND_TYPES, STATUTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  typeDemande: string;
  statut: string;
  sujet: string;
  message: string;
  rgpd: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_DATA: FormData = {
  nom: "",
  prenom: "",
  email: "",
  tel: "",
  typeDemande: "",
  statut: "",
  sujet: "",
  message: "",
  rgpd: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_REGEX   = /^[\d\s+\-().]{8,20}$/;

export default function ContactForm() {
  const [form, setForm]     = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─── Validation ──────────────────────────────────────────
  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case "nom":
        return !(value as string).trim() ? "Le nom est obligatoire." : "";
      case "prenom":
        return !(value as string).trim() ? "Le prénom est obligatoire." : "";
      case "email":
        if (!(value as string).trim()) return "L'adresse email est obligatoire.";
        if (!EMAIL_REGEX.test(value as string)) return "Veuillez saisir une adresse email valide.";
        return "";
      case "tel":
        if ((value as string) && !TEL_REGEX.test(value as string)) return "Numéro de téléphone invalide.";
        return "";
      case "sujet":
        return !(value as string).trim() ? "Le sujet est obligatoire." : "";
      case "message":
        if (!(value as string).trim()) return "Le message est obligatoire.";
        if ((value as string).trim().length < 20) return "Le message doit contenir au moins 20 caractères.";
        return "";
      case "rgpd":
        return !value ? "Vous devez accepter la politique de confidentialité." : "";
      default:
        return "";
    }
  };

  const validateAll = (): FormErrors => {
    const fields: (keyof FormData)[] = ["nom", "prenom", "email", "tel", "sujet", "message", "rgpd"];
    const errs: FormErrors = {};
    fields.forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) errs[field] = err;
    });
    return errs;
  };

  // ─── Handlers ────────────────────────────────────────────
  const handleChange = (name: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    const err = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);
    if (Object.keys(errs).filter((k) => errs[k]).length > 0) {
      const firstErrEl = document.querySelector(".form-control.error, .form-error-field");
      if (firstErrEl) (firstErrEl as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    try {
      // ─────────────────────────────────────────────────────
      // CONNECTEZ VOTRE SERVICE ICI
      //
      // Option 1 — Formspree :
      // const res = await fetch("https://formspree.io/f/VOTRE_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error();
      //
      // Option 2 — EmailJS :
      // import emailjs from "@emailjs/browser";
      // await emailjs.send("SERVICE_ID", "TEMPLATE_ID", form, "PUBLIC_KEY");
      //
      // Option 3 — API Route Next.js :
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error();
      // ─────────────────────────────────────────────────────

      // Simulation (à retirer en production)
      await new Promise((r) => setTimeout(r, 1400));

      setSuccess(true);
      setForm(INITIAL_DATA);
    } catch {
      setErrors({ global: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement." });
    } finally {
      setLoading(false);
    }
  };

  // ─── Success state ────────────────────────────────────────
  if (success) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-6">✅</div>
        <h3 className="font-serif text-3xl text-encre-800 mb-3">Message envoyé !</h3>
        <p className="text-encre-500 text-[0.95rem] leading-7 mb-8">
          Merci pour votre message. Je vous réponds personnellement
          <br />
          sous <strong className="text-encre-700">48h ouvrées</strong>.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn btn-ghost-dark text-sm"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="font-serif text-2xl text-encre-800 mb-1.5">Votre demande</h3>
      <p className="text-xs text-encre-400 mb-9">
        Les champs marqués <span className="text-rouge-800">*</span> sont obligatoires.
      </p>

      {/* Global error */}
      {errors.global && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-4 rounded-sm mb-6">
          {errors.global}
        </div>
      )}

      {/* ─── NOM / PRÉNOM ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormGroup label="Nom" required error={errors.nom}>
          <input
            type="text"
            id="nom"
            autoComplete="family-name"
            placeholder="Votre nom"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
            onBlur={() => handleBlur("nom")}
            className={cn("form-control", errors.nom && "error")}
          />
        </FormGroup>
        <FormGroup label="Prénom" required error={errors.prenom}>
          <input
            type="text"
            id="prenom"
            autoComplete="given-name"
            placeholder="Votre prénom"
            value={form.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
            onBlur={() => handleBlur("prenom")}
            className={cn("form-control", errors.prenom && "error")}
          />
        </FormGroup>
      </div>

      {/* ─── EMAIL / TEL ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormGroup label="Email" required error={errors.email}>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="votre@email.fr"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={cn("form-control", errors.email && "error")}
          />
        </FormGroup>
        <FormGroup label="Téléphone" error={errors.tel}>
          <input
            type="tel"
            id="tel"
            autoComplete="tel"
            placeholder="+33 6 00 00 00 00"
            value={form.tel}
            onChange={(e) => handleChange("tel", e.target.value)}
            onBlur={() => handleBlur("tel")}
            className={cn("form-control", errors.tel && "error")}
          />
        </FormGroup>
      </div>

      {/* ─── TYPE / STATUT ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormGroup label="Type de demande" error={errors.typeDemande}>
          <select
            id="typeDemande"
            value={form.typeDemande}
            onChange={(e) => handleChange("typeDemande", e.target.value)}
            className={cn("form-control appearance-none", !form.typeDemande && "text-encre-400")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px" }}
          >
            <option value="">Choisissez…</option>
            {DEMAND_TYPES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Vous êtes" error={errors.statut}>
          <select
            id="statut"
            value={form.statut}
            onChange={(e) => handleChange("statut", e.target.value)}
            className={cn("form-control appearance-none", !form.statut && "text-encre-400")}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px" }}
          >
            <option value="">Votre statut…</option>
            {STATUTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </FormGroup>
      </div>

      {/* ─── SUJET ─── */}
      <FormGroup label="Sujet de votre demande" required error={errors.sujet}>
        <input
          type="text"
          id="sujet"
          placeholder="Résumez votre demande en quelques mots"
          value={form.sujet}
          onChange={(e) => handleChange("sujet", e.target.value)}
          onBlur={() => handleBlur("sujet")}
          className={cn("form-control", errors.sujet && "error")}
        />
      </FormGroup>

      {/* ─── MESSAGE ─── */}
      <FormGroup label="Votre message" required error={errors.message}>
        <textarea
          id="message"
          rows={6}
          placeholder="Décrivez votre situation en détail. Plus vous m'apportez d'informations, plus ma réponse sera précise et adaptée à votre situation…"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          className={cn("form-control resize-y min-h-[140px]", errors.message && "error")}
        />
      </FormGroup>

      {/* ─── RGPD ─── */}
      <div className="flex gap-3 items-start mb-7 mt-1">
        <input
          type="checkbox"
          id="rgpd"
          checked={form.rgpd}
          onChange={(e) => handleChange("rgpd", e.target.checked)}
          className="w-[17px] h-[17px] flex-shrink-0 mt-0.5 accent-rouge-800 cursor-pointer"
        />
        <div>
          <label htmlFor="rgpd" className="text-[0.83rem] text-encre-500 leading-relaxed cursor-pointer">
            J'accepte que mes données personnelles soient utilisées pour traiter ma demande,
            conformément à la{" "}
            <Link href="/politique-de-confidentialite" className="text-rouge-800 underline" target="_blank">
              politique de confidentialité
            </Link>.
            Mes informations ne seront jamais transmises à des tiers.{" "}
            <span className="text-rouge-800">*</span>
          </label>
          {errors.rgpd && (
            <p className="text-[0.75rem] text-red-500 mt-1.5">⚠ {errors.rgpd}</p>
          )}
        </div>
      </div>

      {/* ─── SUBMIT ─── */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full py-4 font-sans text-[0.85rem] font-bold tracking-[0.12em] uppercase",
          "bg-rouge-800 text-white border-2 border-rouge-800 rounded-sm",
          "shadow-rouge-md transition-all duration-300",
          "hover:bg-rouge-900 hover:border-rouge-900 hover:shadow-rouge-lg hover:-translate-y-0.5",
          loading && "opacity-70 cursor-not-allowed hover:translate-y-0"
        )}
      >
        {loading ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      <p className="text-center text-[0.72rem] text-encre-400 mt-4 leading-relaxed">
        🔒 Vos données sont traitées de manière strictement confidentielle et sécurisée.
      </p>
    </form>
  );
}

// ─── Helper ───────────────────────────────────────────────
function FormGroup({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="form-label">
        {label}
        {required && <span className="text-rouge-800 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="form-error-msg">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
