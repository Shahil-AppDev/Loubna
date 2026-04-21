"use client";

import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typedemande: string;
  statut: string;
  sujet: string;
  message: string;
  rgpd: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialData: FormData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  typedemande: "",
  statut: "",
  sujet: "",
  message: "",
  rgpd: false,
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!formData.typedemande) newErrors.typedemande = "Veuillez choisir un type de demande.";
    if (!formData.statut) newErrors.statut = "Veuillez préciser votre statut.";
    if (!formData.sujet.trim()) newErrors.sujet = "Le sujet est requis.";
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Votre message doit contenir au moins 20 caractères.";
    }
    if (!formData.rgpd) newErrors.rgpd = "Vous devez accepter la politique de confidentialité.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      // API Route Next.js — prête à connecter à Resend, Nodemailer, etc.
      // Pour Formspree : remplacez l'URL par "https://formspree.io/f/VOTRE_ID"
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          typedemande: formData.typedemande,
          statut: formData.statut,
          sujet: formData.sujet,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData(initialData);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-encre-100 rounded-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-rouge-50 border-2 border-rouge-800 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-rouge-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-encre-950 mb-3">
          Message envoyé avec succès
        </h3>
        <p className="text-encre-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Merci pour votre message. Je prends connaissance de votre demande et
          vous contacte dans les meilleurs délais, généralement sous 24 à 48h ouvrées.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary text-xs"
        >
          Envoyer un nouveau message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Nom / Prénom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="label-premium">
            Nom <span className="text-rouge-700">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Dupont"
            className={cn("input-premium", errors.nom && "border-rouge-600 focus:border-rouge-600")}
            autoComplete="family-name"
          />
          {errors.nom && <p className="mt-1.5 text-rouge-600 text-xs">{errors.nom}</p>}
        </div>
        <div>
          <label htmlFor="prenom" className="label-premium">
            Prénom <span className="text-rouge-700">*</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Marie"
            className={cn("input-premium", errors.prenom && "border-rouge-600 focus:border-rouge-600")}
            autoComplete="given-name"
          />
          {errors.prenom && <p className="mt-1.5 text-rouge-600 text-xs">{errors.prenom}</p>}
        </div>
      </div>

      {/* Email / Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="label-premium">
            Email <span className="text-rouge-700">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="marie@exemple.fr"
            className={cn("input-premium", errors.email && "border-rouge-600 focus:border-rouge-600")}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1.5 text-rouge-600 text-xs">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="telephone" className="label-premium">
            Téléphone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="06 XX XX XX XX"
            className="input-premium"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Type de demande / Statut */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="typedemande" className="label-premium">
            Type de demande <span className="text-rouge-700">*</span>
          </label>
          <select
            id="typedemande"
            name="typedemande"
            value={formData.typedemande}
            onChange={handleChange}
            className={cn(
              "input-premium appearance-none cursor-pointer",
              errors.typedemande && "border-rouge-600",
              !formData.typedemande && "text-encre-400"
            )}
          >
            <option value="" disabled>Sélectionner...</option>
            <option value="conseil">Conseil juridique</option>
            <option value="contrat">Contrat de travail</option>
            <option value="licenciement">Licenciement</option>
            <option value="rupture">Rupture conventionnelle</option>
            <option value="harcelement">Harcèlement / Conflit</option>
            <option value="disciplinaire">Procédure disciplinaire</option>
            <option value="relecture">Relecture de document</option>
            <option value="autre">Autre</option>
          </select>
          {errors.typedemande && <p className="mt-1.5 text-rouge-600 text-xs">{errors.typedemande}</p>}
        </div>
        <div>
          <label htmlFor="statut" className="label-premium">
            Vous êtes <span className="text-rouge-700">*</span>
          </label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className={cn(
              "input-premium appearance-none cursor-pointer",
              errors.statut && "border-rouge-600",
              !formData.statut && "text-encre-400"
            )}
          >
            <option value="" disabled>Sélectionner...</option>
            <option value="salarie">Salarié(e)</option>
            <option value="employeur">Employeur / DRH</option>
            <option value="autre">Autre</option>
          </select>
          {errors.statut && <p className="mt-1.5 text-rouge-600 text-xs">{errors.statut}</p>}
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="sujet" className="label-premium">
          Sujet <span className="text-rouge-700">*</span>
        </label>
        <input
          type="text"
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
          placeholder="Objet de votre demande en quelques mots"
          className={cn("input-premium", errors.sujet && "border-rouge-600 focus:border-rouge-600")}
        />
        {errors.sujet && <p className="mt-1.5 text-rouge-600 text-xs">{errors.sujet}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label-premium">
          Message <span className="text-rouge-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          placeholder="Décrivez votre situation, le contexte et ce sur quoi vous souhaitez être accompagné(e)..."
          className={cn(
            "input-premium resize-none",
            errors.message && "border-rouge-600 focus:border-rouge-600"
          )}
        />
        <div className="flex justify-between items-center mt-1.5">
          {errors.message ? (
            <p className="text-rouge-600 text-xs">{errors.message}</p>
          ) : (
            <span />
          )}
          <p className="text-encre-400 text-xs">{formData.message.length} caractères</p>
        </div>
      </div>

      {/* RGPD */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              name="rgpd"
              checked={formData.rgpd}
              onChange={handleChange}
              className="sr-only"
            />
            <div
              className={cn(
                "w-5 h-5 border-2 rounded-sm transition-all duration-200 flex items-center justify-center",
                formData.rgpd
                  ? "bg-rouge-800 border-rouge-800"
                  : errors.rgpd
                  ? "border-rouge-600 bg-rouge-50"
                  : "border-encre-300 bg-white group-hover:border-rouge-700"
              )}
            >
              {formData.rgpd && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-encre-600 text-xs leading-relaxed">
            J&apos;accepte que mes données personnelles soient collectées et traitées
            dans le cadre de ma demande, conformément à la{" "}
            <a
              href="/politique-de-confidentialite"
              className="text-rouge-700 hover:underline"
              target="_blank"
            >
              politique de confidentialité
            </a>
            . <span className="text-rouge-700">*</span>
          </span>
        </label>
        {errors.rgpd && <p className="mt-1.5 ml-8 text-rouge-600 text-xs">{errors.rgpd}</p>}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "btn-primary w-full justify-center text-sm py-4",
            status === "loading" && "opacity-70 cursor-not-allowed"
          )}
        >
          {status === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer ma demande
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
        {status === "error" && (
          <p className="mt-3 text-rouge-600 text-xs text-center">
            Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
          </p>
        )}
        <p className="mt-4 text-encre-400 text-xs text-center">
          Réponse garantie sous 24–48h ouvrées · Confidentialité assurée
        </p>
      </div>
    </form>
  );
}
