# 🎯 BACK OFFICE - GESTION DES RENDEZ-VOUS

## 📦 INSTALLATION ET CONFIGURATION

### 1. Installation des dépendances

Les dépendances suivantes ont été installées :
```bash
npm install @supabase/supabase-js stripe react-hook-form @hookform/resolvers zod date-fns react-big-calendar
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Configuration Supabase

1. **Créer un projet Supabase** sur https://supabase.com
2. **Exécuter le schéma SQL** :
   - Allez dans l'éditeur SQL de Supabase
   - Copiez le contenu de `supabase/schema.sql`
   - Exécutez le script

3. **Créer un compte admin** :
   - Créez un compte via Supabase Auth
   - Récupérez l'UUID du compte
   - Exécutez dans SQL Editor :
   ```sql
   INSERT INTO admin_users (id, email, role) 
   VALUES ('uuid-from-auth', 'votre-email@example.com', 'super_admin');
   ```

### 4. Configuration Stripe

1. **Créer un compte Stripe** sur https://stripe.com
2. **Récupérer les clés API** (Dashboard → Developers → API keys)
3. **Configurer le webhook** :
   - URL : `https://votre-domaine.com/api/stripe/webhook`
   - Événements à écouter :
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Récupérer le `webhook secret`

---

## 🏗️ ARCHITECTURE

### Base de données (Supabase)

**Tables créées** :
- `services_rdv` - Services proposés
- `appointments` - Rendez-vous clients
- `payments` - Historique des paiements
- `admin_users` - Utilisateurs admin
- `availability_settings` - Horaires de disponibilité
- `blocked_dates` - Dates bloquées (congés, jours fériés)

### API Routes

**Rendez-vous** :
- `GET /api/appointments` - Liste des RDV (avec filtres)
- `POST /api/appointments` - Créer un RDV
- `GET /api/appointments/[id]` - Détail d'un RDV
- `PATCH /api/appointments/[id]` - Mettre à jour un RDV
- `DELETE /api/appointments/[id]` - Supprimer un RDV

**Services** :
- `GET /api/services` - Liste des services
- `POST /api/services` - Créer un service

**Stripe** :
- `POST /api/stripe/checkout` - Créer une session de paiement
- `POST /api/stripe/webhook` - Webhook Stripe (mise à jour auto des paiements)

### Pages Admin

- `/admin` - Dashboard (statistiques)
- `/admin/appointments` - Liste et gestion des RDV
- `/admin/calendar` - Vue calendrier mensuelle
- `/admin/services` - Gestion des services
- `/admin/settings` - Paramètres

### Pages Client

- `/rendez-vous` - Réservation de RDV (4 étapes)
- `/rendez-vous/confirmation` - Confirmation après paiement

---

## 🚀 UTILISATION

### Côté Client (Réservation)

1. Client va sur `/rendez-vous`
2. Sélectionne un service
3. Choisit date et heure
4. Remplit ses coordonnées
5. Redirigé vers Stripe Checkout
6. Paie en ligne (CB sécurisée)
7. Redirection vers `/rendez-vous/confirmation`
8. Email de confirmation envoyé automatiquement

### Côté Admin (Gestion)

1. Se connecter avec compte Supabase Auth
2. Accéder à `/admin`
3. **Dashboard** : Vue d'ensemble (stats, RDV récents)
4. **Rendez-vous** : 
   - Voir tous les RDV
   - Filtrer par statut/paiement
   - Modifier statut
   - Ajouter notes admin
5. **Calendrier** : Vue mensuelle des RDV
6. **Services** : Activer/désactiver services

---

## 📊 FLOW COMPLET

```
1. Client sélectionne service → Calendrier
2. Client choisit créneau → Formulaire coordonnées
3. Création appointment (status: pending, payment_status: unpaid)
4. Redirection Stripe Checkout (paiement CB)
5. Webhook Stripe → Mise à jour appointment (status: paid, payment_status: paid)
6. Email confirmation client + admin
7. Admin voit RDV dans back office
```

---

## 🔐 SÉCURITÉ

- **RLS (Row Level Security)** : Politiques Supabase pour protéger les données
- **Webhooks Stripe** : Signature vérifiée pour sécuriser les paiements
- **Variables d'environnement** : Clés API jamais exposées côté client
- **Authentification** : Supabase Auth pour l'accès admin

---

## 📝 DONNÉES INITIALES

Le schéma SQL crée automatiquement :

**4 services par défaut** :
- Consultation initiale - 30 min (80€)
- Consultation approfondie - 1h (150€)
- Accompagnement DUERP - 90 min (200€)
- Analyse dossier AT/MP - 1h (120€)

**Disponibilités par défaut** :
- Lundi à Vendredi : 9h00 - 17h00

---

## 🛠️ DÉVELOPPEMENT

### Lancer en local

```bash
npm run dev
```

Accès :
- Site : http://localhost:3000
- Admin : http://localhost:3000/admin
- Réservation : http://localhost:3000/rendez-vous

### Tester les paiements

Utilisez les cartes de test Stripe :
- Succès : `4242 4242 4242 4242`
- Échec : `4000 0000 0000 0002`
- Date : N'importe quelle date future
- CVC : N'importe quel 3 chiffres

---

## 📧 NOTIFICATIONS

Les emails sont gérés automatiquement via Stripe :
- Email de confirmation client après paiement
- Email admin pour nouveau RDV

Pour personnaliser les emails, configurez les templates dans Stripe Dashboard.

---

## 🎨 PERSONNALISATION

### Modifier les horaires disponibles

Éditez dans Supabase SQL Editor :
```sql
UPDATE availability_settings 
SET start_time = '10:00', end_time = '18:00' 
WHERE day_of_week = 1; -- Lundi
```

### Bloquer une date

```sql
INSERT INTO blocked_dates (date, reason) 
VALUES ('2026-12-25', 'Noël');
```

### Ajouter un service

Via l'interface admin `/admin/services` ou SQL :
```sql
INSERT INTO services_rdv (name, description, duration_minutes, price_cents, active) 
VALUES ('Nouveau service', 'Description', 60, 10000, true);
```

---

## 🚨 TROUBLESHOOTING

### Webhook Stripe ne fonctionne pas

1. Vérifier que `STRIPE_WEBHOOK_SECRET` est correct
2. Tester avec Stripe CLI :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

### Erreur de connexion Supabase

1. Vérifier les variables d'environnement
2. Vérifier que les tables sont créées
3. Vérifier les politiques RLS

### Créneaux non disponibles

1. Vérifier `availability_settings`
2. Vérifier `blocked_dates`
3. Vérifier les RDV existants

---

## 📦 DÉPLOIEMENT

1. Configurer les variables d'environnement sur Vercel/Netlify
2. Mettre à jour `NEXT_PUBLIC_SITE_URL` avec l'URL de production
3. Configurer le webhook Stripe avec l'URL de production
4. Tester le flow complet en production

---

## ✅ CHECKLIST AVANT MISE EN PRODUCTION

- [ ] Variables d'environnement configurées
- [ ] Schéma SQL exécuté sur Supabase
- [ ] Compte admin créé
- [ ] Clés Stripe configurées (mode production)
- [ ] Webhook Stripe configuré avec URL production
- [ ] Services créés et actifs
- [ ] Horaires de disponibilité configurés
- [ ] Test complet du flow de réservation
- [ ] Test paiement Stripe
- [ ] Vérification emails de confirmation

---

## 📞 SUPPORT

Pour toute question ou problème :
- Documentation Supabase : https://supabase.com/docs
- Documentation Stripe : https://stripe.com/docs
- Documentation Next.js : https://nextjs.org/docs
