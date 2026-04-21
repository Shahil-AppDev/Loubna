import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: article.metaTitle,
    description: article.description,
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

const ARTICLES_CONTENT: Record<string, {
  intro: string;
  sections: Array<{ h2: string; content: string }>;
  faq: Array<{ q: string; a: string }>;
  cta: string;
}> = {
  "rupture-conventionnelle-procedure-indemnites-2024": {
    intro: "La rupture conventionnelle est devenue le mode de séparation amiable privilégié entre employeur et salarié en CDI. En 2024, plus de 500 000 ruptures conventionnelles ont été homologuées par l'administration. Pourtant, de nombreux salariés et employeurs ignorent encore les subtilités de cette procédure strictement encadrée par le Code du travail.",
    sections: [
      {
        h2: "Qu'est-ce qu'une rupture conventionnelle ?",
        content: `La rupture conventionnelle est un mode de rupture du contrat de travail à durée indéterminée (CDI) résultant d'un **accord mutuel** entre l'employeur et le salarié. Contrairement à la démission ou au licenciement, elle permet au salarié de bénéficier de l'allocation chômage tout en quittant l'entreprise dans des conditions négociées.

**Points clés** :
- Réservée exclusivement aux CDI (impossible en CDD, contrat d'apprentissage ou de professionnalisation)
- Nécessite le consentement libre et éclairé des deux parties
- Soumise à homologation obligatoire par la DREETS (Direction régionale de l'économie, de l'emploi, du travail et des solidarités)
- Ouvre droit aux allocations chômage pour le salarié`
      },
      {
        h2: "Les étapes de la procédure (délais 2024)",
        content: `**1. Entretien(s) préalable(s)** : Au moins un entretien doit avoir lieu. Le salarié peut se faire assister par une personne de l'entreprise ou un conseiller extérieur.

**2. Signature de la convention** : Un formulaire Cerfa doit être complété et signé par les deux parties.

**3. Délai de rétractation de 15 jours calendaires** : Chaque partie dispose d'un délai incompressible de 15 jours pour se rétracter par lettre recommandée avec AR ou remise en main propre contre décharge.

**4. Transmission à la DREETS** : L'employeur doit transmettre la demande d'homologation dans les jours suivant la fin du délai de rétractation.

**5. Homologation** : L'administration dispose de 15 jours ouvrables (instruction) pour valider ou refuser. L'absence de réponse vaut acceptation tacite.

**Délai total minimum** : Environ 1 mois entre la signature et la rupture effective du contrat.`
      },
      {
        h2: "Calcul de l'indemnité spécifique de rupture conventionnelle",
        content: `L'indemnité ne peut être **inférieure à l'indemnité légale de licenciement**, calculée selon l'ancienneté :

- **Moins de 10 ans d'ancienneté** : 1/4 de mois de salaire par année
- **Plus de 10 ans d'ancienneté** : 1/4 de mois pour les 10 premières années + 1/3 de mois au-delà

**Salaire de référence** : Le plus favorable entre :
- La moyenne des 12 derniers mois
- La moyenne des 3 derniers mois (primes incluses au prorata)

**Exemple** : Un salarié avec 8 ans d'ancienneté et un salaire brut moyen de 2 500 € percevra au minimum : 8 × (2 500 / 4) = **5 000 € brut**.

⚠️ **Attention** : Votre convention collective peut prévoir une indemnité plus favorable. Il est impératif de la vérifier avant toute signature.`
      },
      {
        h2: "Les pièges à éviter",
        content: `**Pour les salariés** :
- Ne jamais signer sous pression ou dans un contexte de harcèlement (risque de nullité)
- Vérifier le calcul de l'indemnité (erreurs fréquentes sur le salaire de référence)
- Anticiper l'impact sur la clause de non-concurrence (elle reste applicable sauf renonciation expresse de l'employeur)

**Pour les employeurs** :
- Respecter scrupuleusement les délais légaux (tout vice de procédure peut entraîner la requalification en licenciement sans cause réelle et sérieuse)
- Ne jamais imposer une rupture conventionnelle (le consentement doit être libre)
- Documenter les entretiens pour prouver la régularité de la procédure en cas de contentieux ultérieur`
      }
    ],
    faq: [
      {
        q: "Peut-on faire une rupture conventionnelle pendant un arrêt maladie ?",
        a: "Oui, la jurisprudence l'autorise expressément, y compris pendant un arrêt pour accident du travail ou maladie professionnelle, sous réserve que le consentement du salarié soit libre et éclairé."
      },
      {
        q: "L'indemnité de rupture conventionnelle est-elle imposable ?",
        a: "Elle bénéficie du même régime fiscal que l'indemnité de licenciement : exonération d'impôt sur le revenu dans la limite de 2 fois le plafond annuel de la Sécurité sociale (soit environ 88 000 € en 2024) ou du montant le plus élevé entre le salaire brut des 12 derniers mois et le double de la rémunération annuelle brute de l'année précédente."
      },
      {
        q: "Que se passe-t-il si la DREETS refuse l'homologation ?",
        a: "Le refus d'homologation rend la rupture conventionnelle nulle et non avenue. Le contrat de travail se poursuit comme si rien ne s'était passé. Les parties peuvent alors négocier une nouvelle convention en corrigeant les vices constatés."
      }
    ],
    cta: "Faire calculer mon indemnité et sécuriser ma procédure"
  },
  "comment-contester-sanction-disciplinaire-avertissement": {
    intro: "Recevoir un avertissement, un blâme ou une mise à pied disciplinaire est toujours un moment difficile dans la vie professionnelle. Pourtant, de nombreuses sanctions sont contestables, soit parce qu'elles sont disproportionnées, soit parce que la procédure n'a pas été respectée. Voici comment réagir efficacement.",
    sections: [
      {
        h2: "Les différents types de sanctions disciplinaires",
        content: `Le Code du travail distingue plusieurs niveaux de sanctions, par ordre croissant de gravité :

**Sanctions mineures** (sans convocation à entretien préalable obligatoire) :
- Avertissement (oral ou écrit)
- Blâme

**Sanctions lourdes** (nécessitant un entretien préalable) :
- Mise à pied disciplinaire (suspension temporaire du contrat sans salaire, de 1 à 8 jours généralement)
- Rétrogradation
- Mutation disciplinaire
- Licenciement pour faute (simple, grave ou lourde)

⚠️ **Principe de proportionnalité** : La sanction doit être proportionnée à la gravité de la faute commise. Une sanction excessive peut être annulée par le juge.`
      },
      {
        h2: "Les délais légaux à connaître (pour contester)",
        content: `**Délai de prescription de la faute** : L'employeur dispose de **2 mois maximum** à compter du jour où il a eu connaissance des faits fautifs pour engager une procédure disciplinaire. Passé ce délai, les faits sont prescrits.

**Délai de contestation pour le salarié** : Aucun délai légal strict n'est imposé, mais il est fortement conseillé de contester **dans les 15 jours** suivant la notification de la sanction pour préserver vos droits.

**Principe "non bis in idem"** : Un même fait ne peut donner lieu qu'à une seule sanction. Si vous avez déjà été sanctionné pour un fait, l'employeur ne peut pas vous sanctionner une seconde fois pour ce même fait.`
      },
      {
        h2: "Comment contester efficacement une sanction ?",
        content: `**Étape 1 : Analyser la régularité de la procédure**
- La sanction a-t-elle été notifiée par écrit (obligatoire pour toute sanction ayant une incidence sur la présence, la fonction, la carrière ou la rémunération) ?
- Un entretien préalable a-t-il eu lieu pour les sanctions lourdes ?
- Le délai de 2 mois a-t-il été respecté ?

**Étape 2 : Vérifier la proportionnalité**
- La sanction est-elle prévue par le règlement intérieur ou la convention collective ?
- Est-elle proportionnée à la gravité réelle des faits reprochés ?
- Existe-t-il des précédents dans l'entreprise pour des faits similaires ?

**Étape 3 : Rédiger un courrier de contestation**
Adressez un courrier recommandé avec AR à votre employeur en exposant :
- Les faits tels que vous les contestez
- Les vices de procédure constatés
- La disproportion de la sanction
- Votre demande de retrait de la sanction de votre dossier

**Étape 4 : Saisir le Conseil de prud'hommes (si nécessaire)**
Si l'employeur maintient la sanction, vous pouvez saisir le CPH pour demander l'annulation de la sanction et, le cas échéant, des dommages et intérêts pour préjudice moral.`
      },
      {
        h2: "Les conséquences d'une sanction injustifiée maintenue",
        content: `Une sanction injustifiée laissée dans votre dossier peut avoir des conséquences graves :
- Elle peut être invoquée ultérieurement pour justifier un licenciement (dans un délai de 3 ans maximum)
- Elle peut impacter votre évolution de carrière et vos augmentations
- Elle constitue une atteinte à votre réputation professionnelle

**Jurisprudence** : Les juges annulent régulièrement des sanctions lorsque :
- Le délai de 2 mois n'a pas été respecté
- La sanction est disproportionnée (ex : mise à pied pour un simple retard isolé)
- L'employeur n'a pas respecté la procédure contradictoire (pas d'entretien préalable pour une mise à pied)`
      }
    ],
    faq: [
      {
        q: "Mon employeur peut-il me sanctionner pour des faits commis en dehors du travail ?",
        a: "En principe, non. Seuls les faits ayant un lien avec l'exécution du contrat de travail ou causant un trouble objectif au fonctionnement de l'entreprise peuvent justifier une sanction disciplinaire."
      },
      {
        q: "Une sanction peut-elle être retirée de mon dossier ?",
        a: "Oui, soit à votre demande si l'employeur accepte, soit par décision du juge si vous saisissez le CPH et obtenez gain de cause. Par ailleurs, une sanction disciplinaire ne peut être invoquée au-delà de 3 ans après son prononcé."
      },
      {
        q: "Puis-je démissionner si je conteste une sanction ?",
        a: "Vous pouvez démissionner, mais cela ne vous empêche pas de contester la sanction devant le CPH. Toutefois, la démission vous prive du droit aux allocations chômage (sauf démission légitime reconnue par France Travail)."
      }
    ],
    cta: "Faire analyser ma sanction par un juriste"
  },
  "recrutement-salarie-etranger-demarches-employeur": {
    intro: "Recruter un talent étranger (hors Union européenne) est une démarche stratégique pour de nombreuses entreprises confrontées à la pénurie de compétences. Cependant, les obligations administratives et les risques juridiques liés au travail dissimulé freinent encore trop d'employeurs. Voici un guide complet des démarches 2024.",
    sections: [
      {
        h2: "Qui est concerné par l'autorisation de travail ?",
        content: `**Ressortissants dispensés d'autorisation de travail** :
- Citoyens de l'Union européenne (UE) et de l'Espace économique européen (EEE) : libre circulation
- Titulaires d'une carte de résident, carte de résident longue durée UE, ou carte de séjour "vie privée et familiale"
- Réfugiés et bénéficiaires de la protection subsidiaire

**Ressortissants soumis à autorisation de travail** :
- Tous les autres étrangers (hors UE/EEE) souhaitant travailler en France
- Étudiants étrangers souhaitant travailler au-delà de 964 heures par an (sauf changement de statut)

⚠️ **Obligation de vérification** : L'employeur doit **impérativement** vérifier le titre de séjour autorisant le travail **avant** toute embauche, sous peine de sanctions pénales.`
      },
      {
        h2: "Les démarches pour obtenir une autorisation de travail",
        content: `**Étape 1 : Vérifier l'opposabilité de la situation de l'emploi**

Pour certains métiers dits "en tension" (liste fixée par arrêté préfectoral), l'employeur est dispensé de prouver qu'il n'a pas trouvé de candidat en France. Sinon, il doit justifier de démarches de recherche infructueuses (publication d'offres auprès de France Travail, etc.).

**Étape 2 : Constituer le dossier de demande**

Le dossier doit comporter :
- Le formulaire Cerfa n°15186 (demande d'autorisation de travail)
- Le contrat de travail ou la promesse d'embauche
- Les justificatifs de qualification du salarié (diplômes, expérience)
- Un extrait Kbis de moins de 3 mois
- La preuve du paiement de la taxe OFII (Office français de l'immigration et de l'intégration)

**Étape 3 : Dépôt de la demande**

La demande doit être déposée sur la plateforme en ligne "Administration numérique pour les étrangers en France" (ANEF) par l'employeur.

**Étape 4 : Instruction par la DREETS et la Préfecture**

Délai d'instruction : **2 mois** en moyenne (peut être plus long selon les préfectures). L'absence de réponse dans un délai de 2 mois vaut **rejet implicite**.

**Étape 5 : Délivrance du titre de séjour**

Si l'autorisation est accordée, le salarié doit se rendre en préfecture pour retirer son titre de séjour portant la mention "salarié" ou "travailleur temporaire".`
      },
      {
        h2: "Les risques du travail dissimulé (emploi d'étranger sans titre)",
        content: `**Sanctions pénales pour l'employeur** :
- Jusqu'à **5 ans d'emprisonnement**
- Jusqu'à **15 000 € d'amende par salarié** en situation irrégulière
- Interdiction d'exercer (pour les dirigeants)
- Exclusion des marchés publics pendant 5 ans

**Sanctions administratives** :
- Contribution spéciale (remboursement à l'OFII des frais de réacheminement du salarié)
- Fermeture administrative de l'établissement
- Solidarité financière : l'employeur peut être tenu de payer les salaires, charges sociales et impôts dus

**Sanctions pour le salarié** :
- Obligation de quitter le territoire français (OQTF)
- Interdiction de retour sur le territoire (jusqu'à 3 ans)

⚠️ **Jurisprudence** : Les tribunaux ne retiennent aucune circonstance atténuante, même en cas de bonne foi alléguée de l'employeur.`
      },
      {
        h2: "Les métiers en tension (dispense d'opposabilité)",
        content: `Certains secteurs bénéficient d'une liste de métiers en tension permettant de faciliter le recrutement :

**Exemples de métiers en tension (liste non exhaustive)** :
- Informatique : développeurs, data scientists, ingénieurs cybersécurité
- BTP : maçons, électriciens, plombiers, chefs de chantier
- Santé : aides-soignants, infirmiers (sous réserve de diplôme reconnu)
- Hôtellerie-restauration : cuisiniers, serveurs, réceptionnistes
- Industrie : soudeurs, techniciens de maintenance, conducteurs de ligne

📋 **Bon à savoir** : La liste des métiers en tension varie selon les régions. Consultez l'arrêté préfectoral de votre département.`
      }
    ],
    faq: [
      {
        q: "Combien coûte une demande d'autorisation de travail ?",
        a: "L'employeur doit s'acquitter de la taxe OFII, dont le montant varie selon la durée du contrat : environ 74 € pour un CDD de moins de 3 mois, et jusqu'à 300 € pour un CDI ou un CDD de plus de 12 mois."
      },
      {
        q: "Puis-je embaucher un étudiant étranger en CDI ?",
        a: "Oui, mais l'étudiant doit d'abord effectuer une demande de changement de statut auprès de la préfecture pour obtenir un titre de séjour 'salarié'. Cette démarche doit être anticipée plusieurs mois avant la fin des études."
      },
      {
        q: "Que faire si le titre de séjour de mon salarié arrive à expiration ?",
        a: "Le salarié doit déposer une demande de renouvellement en préfecture **au moins 2 mois avant** l'expiration. Pendant l'instruction, il conserve le droit de travailler si le récépissé de demande de renouvellement porte la mention 'autorise son titulaire à travailler'."
      }
    ],
    cta: "Externaliser mes démarches d'autorisation de travail"
  },
  "rediger-contrat-travail-cdi-clauses-obligatoires": {
    intro: "Le contrat de travail à durée indéterminée (CDI) est le contrat de droit commun en France. Pourtant, de nombreux employeurs utilisent encore des modèles types inadaptés, source de contentieux coûteux. Voici les règles à connaître pour rédiger un CDI juridiquement solide en 2024.",
    sections: [
      {
        h2: "CDI écrit ou verbal : que dit la loi ?",
        content: `**Principe** : Le CDI à temps plein peut être conclu **verbalement** (article L. 1221-1 du Code du travail). Cependant, cette pratique est fortement déconseillée.

**Exceptions nécessitant un écrit obligatoire** :
- CDI à temps partiel
- CDI intermittent
- Contrat comportant une clause spécifique (période d'essai, non-concurrence, mobilité, etc.)

**Pourquoi rédiger un CDI écrit même pour un temps plein ?**
- Pour imposer une période d'essai (impossible sans écrit)
- Pour sécuriser les clauses protectrices de l'entreprise (confidentialité, exclusivité, etc.)
- Pour éviter les contentieux sur les conditions d'emploi (qualification, rémunération, horaires)

⚠️ **Obligation de remise** : Si le CDI est écrit, l'employeur doit le remettre au salarié **au plus tard dans les 2 jours suivant l'embauche**.`
      },
      {
        h2: "Les mentions obligatoires du CDI",
        content: `**Mentions impératives** :
- Identité et adresse des parties (employeur et salarié)
- Date d'embauche et date de début du contrat
- Intitulé du poste et qualification (selon la convention collective)
- Lieu de travail (ou mention "itinérant" si applicable)
- Durée de la période d'essai (si prévue) et conditions de renouvellement
- Rémunération brute mensuelle ou horaire (+ primes et avantages)
- Durée du travail (horaire hebdomadaire ou mensuel)
- Convention collective applicable
- Organisme de retraite complémentaire et de prévoyance

**Mentions facultatives mais recommandées** :
- Clause de mobilité géographique
- Clause de non-concurrence
- Clause d'exclusivité
- Clause de confidentialité
- Clause de dédit-formation (sous conditions strictes)`
      },
      {
        h2: "La période d'essai : règles et pièges",
        content: `**Durées maximales légales** (hors dispositions conventionnelles plus favorables) :
- Ouvriers et employés : **2 mois** (renouvelable 1 fois, soit 4 mois max)
- Agents de maîtrise et techniciens : **3 mois** (renouvelable 1 fois, soit 6 mois max)
- Cadres : **4 mois** (renouvelable 1 fois, soit 8 mois max)

**Conditions de validité** :
- La période d'essai doit être **expressément prévue dans le contrat de travail** (ou la lettre d'engagement)
- Le renouvellement doit être prévu par la convention collective et accepté par le salarié **avant la fin de la période initiale**
- Les délais de prévenance en cas de rupture doivent être respectés (variables selon l'ancienneté)

⚠️ **Erreur fréquente** : Imposer une période d'essai sans l'avoir inscrite dans le contrat = période d'essai nulle. Le salarié est alors considéré comme embauché définitivement dès le premier jour.`
      },
      {
        h2: "Les clauses sensibles : non-concurrence, mobilité, exclusivité",
        content: `**Clause de non-concurrence**

Conditions de validité (jurisprudence stricte) :
- Limitée dans le temps (généralement 1 à 2 ans maximum)
- Limitée dans l'espace géographique (proportionnée à l'activité)
- Limitée quant aux activités interdites (précision des fonctions)
- Assortie d'une **contrepartie financière** (minimum 30 % du salaire brut pendant la durée de la clause, selon jurisprudence)
- Justifiée par la protection des intérêts légitimes de l'entreprise

**Clause de mobilité géographique**

Permet à l'employeur d'imposer une mutation dans une zone géographique définie. Conditions :
- Zone géographique précisément définie dans le contrat
- Mise en œuvre loyale (délai de prévenance raisonnable, prise en compte de la situation familiale)

**Clause d'exclusivité**

Interdit au salarié d'exercer une autre activité professionnelle. Limites :
- Doit être justifiée par la nature de la tâche et proportionnée au but recherché
- Peut être contestée si elle porte atteinte excessive à la liberté du travail`
      }
    ],
    faq: [
      {
        q: "Puis-je modifier le contrat de travail après signature ?",
        a: "Toute modification d'un élément essentiel du contrat (rémunération, qualification, temps de travail, lieu de travail) nécessite l'accord écrit du salarié. En cas de refus, l'employeur ne peut pas imposer la modification et doit soit renoncer, soit engager une procédure de licenciement."
      },
      {
        q: "La clause de non-concurrence est-elle obligatoire pour protéger mon entreprise ?",
        a: "Non, elle est facultative. Mais si vous souhaitez empêcher un salarié stratégique de rejoindre un concurrent, elle est indispensable. Attention : elle a un coût (contrepartie financière obligatoire) et doit être rédigée avec précision pour être valable."
      },
      {
        q: "Que se passe-t-il si je ne remets pas le contrat écrit au salarié ?",
        a: "Pour un CDI temps plein, l'absence d'écrit n'invalide pas le contrat, mais vous ne pourrez pas imposer de période d'essai ni de clauses spécifiques. Pour un temps partiel, l'absence d'écrit peut entraîner la requalification en temps plein."
      }
    ],
    cta: "Faire rédiger mes contrats de travail sur-mesure"
  },
  "obligations-employeur-rse-prevention-risques-duerp": {
    intro: "La responsabilité sociétale des entreprises (RSE) n'est plus une option. Entre obligations légales de prévention des risques professionnels et attentes croissantes des salariés en matière de qualité de vie au travail, les employeurs doivent structurer leur politique de prévention. Voici un état des lieux des obligations 2024.",
    sections: [
      {
        h2: "L'obligation de sécurité de l'employeur : un cadre strict",
        content: `**Principe fondamental** : L'employeur est tenu à une **obligation de sécurité** envers ses salariés (article L. 4121-1 du Code du travail). Cette obligation impose de prendre toutes les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs.

**Les 9 principes généraux de prévention** :
1. Éviter les risques
2. Évaluer les risques qui ne peuvent pas être évités
3. Combattre les risques à la source
4. Adapter le travail à l'homme
5. Tenir compte de l'évolution de la technique
6. Remplacer ce qui est dangereux par ce qui l'est moins
7. Planifier la prévention
8. Prendre des mesures de protection collective (prioritaires sur les protections individuelles)
9. Donner des instructions appropriées aux travailleurs

⚠️ **Jurisprudence** : Depuis l'arrêt Air France de 2015, l'obligation de sécurité est une **obligation de moyens renforcée**. L'employeur doit prouver qu'il a pris toutes les mesures de prévention nécessaires.`
      },
      {
        h2: "Le Document Unique d'Évaluation des Risques Professionnels (DUERP)",
        content: `**Obligation légale** : Toute entreprise, **dès le 1er salarié**, doit élaborer et tenir à jour un Document Unique recensant les risques professionnels (article R. 4121-1).

**Contenu obligatoire** :
- Inventaire des risques identifiés dans chaque unité de travail
- Classement des risques (par gravité et fréquence)
- Mesures de prévention mises en place ou à mettre en place
- Suivi des actions de prévention

**Mise à jour obligatoire** :
- Au moins **1 fois par an**
- Lors de toute décision d'aménagement important
- Lorsqu'une information supplémentaire sur un risque est recueillie

**Sanctions en cas d'absence de DUERP** :
- Amende de **1 500 € par infraction** (jusqu'à 3 000 € en cas de récidive)
- Responsabilité pénale de l'employeur en cas d'accident du travail
- Reconnaissance possible de la faute inexcusable de l'employeur

📋 **Nouveauté 2024** : Le DUERP doit désormais être conservé pendant **40 ans** et être accessible aux anciens salariés (traçabilité des expositions).`
      },
      {
        h2: "Prévention des risques psychosociaux (RPS) et harcèlement",
        content: `**Définition des RPS** : Stress, épuisement professionnel (burn-out), harcèlement moral ou sexuel, violences au travail.

**Obligations de l'employeur** :
- Évaluer les RPS dans le DUERP
- Mettre en place des actions de prévention collective (formation des managers, organisation du travail, droit à la déconnexion)
- Former et informer les salariés sur les risques psychosociaux
- Afficher les coordonnées des services de santé au travail et de l'inspection du travail

**Harcèlement moral et sexuel** :
- Affichage obligatoire dans l'entreprise des textes relatifs au harcèlement et aux sanctions encourues
- Mise en place d'une procédure de signalement et de traitement des plaintes
- Formation des managers et des représentants du personnel

**Sanctions** :
- Responsabilité civile : dommages et intérêts pour le salarié victime
- Responsabilité pénale : jusqu'à 2 ans d'emprisonnement et 30 000 € d'amende pour harcèlement moral
- Reconnaissance de la faute inexcusable en cas de burn-out ou suicide lié au travail`
      },
      {
        h2: "Droit à la déconnexion et qualité de vie au travail",
        content: `**Droit à la déconnexion** (obligatoire depuis 2017 pour les entreprises de plus de 50 salariés) :
- Mise en place de dispositifs de régulation de l'utilisation des outils numériques
- Négociation d'un accord collectif ou élaboration d'une charte (si pas d'accord)
- Sensibilisation des managers et des salariés

**Égalité professionnelle femmes-hommes** :
- Index de l'égalité professionnelle obligatoire (entreprises de plus de 50 salariés)
- Plan d'action si note inférieure à 75/100
- Sanctions financières en cas de non-publication ou de non-atteinte des objectifs

**Travailleurs handicapés** :
- Obligation d'emploi de 6 % de travailleurs handicapés (entreprises de plus de 20 salariés)
- Contribution Agefiph en cas de non-respect du quota
- Aménagement raisonnable du poste de travail`
      }
    ],
    faq: [
      {
        q: "Suis-je obligé d'avoir un DUERP si je n'ai qu'un seul salarié ?",
        a: "Oui, l'obligation s'applique dès le 1er salarié, quelle que soit la taille de l'entreprise ou le secteur d'activité."
      },
      {
        q: "Qu'est-ce que la faute inexcusable de l'employeur ?",
        a: "C'est lorsque l'employeur avait (ou aurait dû avoir) conscience du danger menaçant le salarié et qu'il n'a pas pris les mesures nécessaires pour l'en préserver. Elle entraîne une majoration de l'indemnisation de l'accident du travail ou de la maladie professionnelle et la réparation intégrale du préjudice."
      },
      {
        q: "Comment prouver que j'ai respecté mon obligation de prévention ?",
        a: "En conservant tous les documents attestant de vos actions : DUERP à jour, comptes-rendus de CSSCT, attestations de formation, procès-verbaux d'affichage, courriers d'information, etc. La traçabilité est essentielle en cas de contentieux."
      }
    ],
    cta: "Audit de conformité RSE et mise à jour de mon DUERP"
  }
};

export default function BlogArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const content = ARTICLES_CONTENT[params.slug];

  if (!content) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": `${SITE_CONFIG.url}${article.image}`,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": "Loubna Abouz Manta"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/logo.png`
      }
    }
  };

  return (
    <>
      <article>
        <section className="page-hero">
          <div className="hero-grid-bg" />
          <div className="container-main relative z-10 pt-20 pb-12">
            <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
              <Link href="/" className="hover:text-white/60 transition-colors">
                Accueil
              </Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-white/60 transition-colors">
                Blog
              </Link>
              <span>›</span>
              <span className="text-or-500">{article.category}</span>
            </nav>
            <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
              <span className="px-3 py-1 bg-or-500 text-encre-950 font-bold tracking-wider uppercase rounded-sm">
                {article.category}
              </span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-tight max-w-4xl">
              {article.title}
            </h1>
          </div>
        </section>

        <section className="section-pad bg-encre-50">
          <div className="container-main">
            <div className="max-w-[820px] mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-[1.1rem] text-encre-700 leading-relaxed mb-8">
                  {content.intro}
                </p>

                {content.sections.map((section, idx) => (
                  <div key={idx} className="mb-10">
                    <h2 className="font-serif text-[1.75rem] text-encre-950 mb-4 mt-12">
                      {section.h2}
                    </h2>
                    <div className="text-encre-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}

                {content.faq && content.faq.length > 0 && (
                  <div className="mt-16 bg-white p-8 rounded-sm border border-or-500/10">
                    <h2 className="font-serif text-[1.75rem] text-encre-950 mb-6">
                      Questions fréquentes
                    </h2>
                    <div className="space-y-6">
                      {content.faq.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold text-encre-950 mb-2">
                            {item.q}
                          </h3>
                          <p className="text-encre-700">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 p-8 bg-rouge-50 border-l-4 border-rouge-800 rounded-sm">
                  <h3 className="font-serif text-xl text-encre-950 mb-4">
                    Besoin d'un accompagnement personnalisé ?
                  </h3>
                  <p className="text-encre-700 mb-6">
                    Chaque situation est unique. Contactez-nous pour une analyse juridique adaptée à votre cas.
                  </p>
                  <Link href="/contact" className="btn btn-primary">
                    {content.cta}
                  </Link>
                </div>

                {article.relatedLinks && article.relatedLinks.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-or-500/20">
                    <h3 className="font-serif text-lg text-encre-950 mb-4">
                      Pour aller plus loin
                    </h3>
                    <ul className="space-y-2">
                      {article.relatedLinks.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.href}
                            className="text-rouge-800 hover:text-rouge-900 underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
