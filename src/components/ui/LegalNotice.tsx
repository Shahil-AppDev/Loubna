/**
 * Composant réutilisable pour afficher les disclaimers juridiques
 */

interface LegalNoticeProps {
  variant?: "default" | "services" | "suisse" | "detail";
  className?: string;
}

export default function LegalNotice({ variant = "default", className = "" }: LegalNoticeProps) {
  if (variant === "default") {
    return (
      <div className={`p-5 bg-white border border-encre-100 border-l-[3px] border-l-or-500 rounded-sm ${className}`}>
        <p className="text-[0.82rem] text-encre-700 leading-[1.8]">
          <span className="font-semibold text-encre-700 block mb-1">ℹ️ Note importante</span>
          Les informations fournies sur ce site ont une vocation informative et ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.
        </p>
      </div>
    );
  }

  if (variant === "services") {
    return (
      <div className={`p-8 md:p-10 border border-rouge-800/20 rounded-sm bg-rouge-50/40 ${className}`}>
        <h3 className="font-serif text-[1.3rem] text-encre-800 mb-5 flex items-center gap-2">
          <span className="text-rouge-800">ℹ️</span>
          Note importante
        </h3>
        <div className="text-[0.9rem] text-encre-700 leading-[1.85] space-y-3">
          <p>J'interviens dans une démarche de prévention, d'accompagnement et de sécurisation des situations en droit du travail.</p>
          <p className="font-semibold">Mes prestations portent notamment sur :</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">l'analyse et la compréhension des situations</li>
            <li className="list-disc">la structuration des démarches</li>
            <li className="list-disc">la sécurisation des pratiques et des documents (notamment contrats de travail)</li>
          </ul>
          <p>Elles ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.</p>
          <p>En tant que juriste, mon intervention se situe en amont des procédures. Lorsque la situation nécessite une action contentieuse ou une représentation en justice, je vous oriente vers Maître Lahlouh, avocate à Paris, partenaire de confiance.</p>
        </div>
      </div>
    );
  }

  if (variant === "suisse") {
    return (
      <div className={`p-8 md:p-10 border border-rouge-800/20 rounded-sm bg-rouge-50/40 ${className}`}>
        <h3 className="font-serif text-[1.3rem] text-encre-800 mb-5 flex items-center gap-2">
          <span className="text-rouge-800">ℹ️</span>
          Important
        </h3>
        <div className="text-[0.97rem] text-encre-700 leading-[1.85] space-y-4">
          <p>Je n'exerce pas comme avocate en Suisse et je ne fournis aucun conseil juridique suisse.</p>
          <p>Mon rôle consiste exclusivement à vous accompagner dans la rédaction et la reformulation de vos écrits, à partir des éléments que vous me transmettez ou d'informations déjà validées par un professionnel compétent en Suisse.</p>
          <p>Pour toute analyse juridique, stratégie de défense ou représentation devant une autorité ou un tribunal, il convient de consulter un avocat, un juriste suisse ou une organisation compétente.</p>
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className={`p-5 bg-white border border-encre-100 border-l-[3px] border-l-or-500 rounded-sm ${className}`}>
        <p className="text-[0.82rem] text-encre-700 leading-[1.8]">
          <span className="font-semibold text-encre-700 block mb-1">Note importante</span>
          Prestations d'accompagnement, d'information et de prévention — hors consultation juridique réglementée. Les prestations proposées ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.
        </p>
      </div>
    );
  }

  return null;
}
