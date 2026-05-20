# 🚀 CONFIGURATION SERVEUR HETZNER - BACK OFFICE

Le back office a été adapté pour utiliser **PostgreSQL sur votre serveur Hetzner** au lieu de Supabase.

---

## 📦 ARCHITECTURE

- **Base de données** : PostgreSQL sur serveur Hetzner
- **Authentification** : Sessions Next.js + bcrypt (iron-session)
- **Connexion** : Pool PostgreSQL (pg library)
- **Paiement** : Stripe (inchangé)

---

## ⚙️ CONFIGURATION REQUISE

### 1. Sur votre serveur Hetzner

**PostgreSQL doit être installé et configuré** :

```bash
# Installer PostgreSQL (si pas déjà fait)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Créer la base de données
sudo -u postgres psql
CREATE DATABASE loubna_db;
CREATE USER loubna_user WITH PASSWORD 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE loubna_db TO loubna_user;
\q
```

**Autoriser les connexions externes** :

Éditer `/etc/postgresql/*/main/postgresql.conf` :
```conf
listen_addresses = '*'
```

Éditer `/etc/postgresql/*/main/pg_hba.conf` :
```conf
# Autoriser connexion depuis votre IP
host    loubna_db    loubna_user    0.0.0.0/0    md5
```

Redémarrer PostgreSQL :
```bash
sudo systemctl restart postgresql
```

**Ouvrir le port 5432 dans le firewall** :
```bash
sudo ufw allow 5432/tcp
```

---

### 2. Exécuter le schéma SQL

Sur votre serveur Hetzner :

```bash
# Copier le fichier schema-postgres.sql sur le serveur
scp supabase/schema-postgres.sql user@your-server:/tmp/

# Se connecter au serveur
ssh user@your-server

# Exécuter le schéma
psql -U loubna_user -d loubna_db -f /tmp/schema-postgres.sql
```

---

### 3. Configuration locale (.env.local)

Mettre à jour le fichier `.env.local` avec vos informations :

```env
# PostgreSQL Hetzner
POSTGRES_HOST=123.45.67.89  # IP de votre serveur Hetzner
POSTGRES_PORT=5432
POSTGRES_DATABASE=loubna_db
POSTGRES_USER=loubna_user
POSTGRES_PASSWORD=votre_mot_de_passe_securise

# Session Secret (générer une clé aléatoire)
SESSION_SECRET=votre_cle_secrete_aleatoire_32_caracteres_minimum

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Générer SESSION_SECRET** :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 4. Créer un compte administrateur

Utiliser le script fourni :

```bash
node scripts/create-admin.js admin@example.com password123
```

Ou directement en SQL :

```bash
# Générer un hash bcrypt
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"

# Insérer dans PostgreSQL
psql -U loubna_user -d loubna_db
INSERT INTO admin_users (email, password_hash, role) 
VALUES ('admin@example.com', '$2b$10$...hash...', 'super_admin');
```

---

### 5. Démarrer l'application

```bash
npm run dev
```

Accéder à : http://localhost:3000/admin/login

---

## 🔐 SÉCURITÉ

### Recommandations importantes

1. **Utiliser SSL/TLS pour PostgreSQL** :
   ```conf
   # Dans postgresql.conf
   ssl = on
   ssl_cert_file = '/path/to/server.crt'
   ssl_key_file = '/path/to/server.key'
   ```

2. **Limiter les connexions par IP** :
   ```conf
   # Dans pg_hba.conf
   host    loubna_db    loubna_user    VOTRE_IP/32    md5
   ```

3. **Utiliser un mot de passe fort** pour PostgreSQL

4. **Activer le firewall** et n'autoriser que les IPs nécessaires

5. **Sauvegardes régulières** :
   ```bash
   pg_dump -U loubna_user loubna_db > backup.sql
   ```

---

## 📊 STRUCTURE BASE DE DONNÉES

**Tables créées** :
- `services_rdv` - Services proposés
- `appointments` - Rendez-vous clients
- `payments` - Historique paiements
- `admin_users` - Comptes administrateurs (avec password_hash)
- `availability_settings` - Horaires disponibilité
- `blocked_dates` - Dates bloquées

**Différence avec Supabase** :
- Pas de RLS (Row Level Security)
- Authentification gérée côté application (bcrypt + sessions)
- Connexion directe via pool PostgreSQL

---

## 🔄 MIGRATION DEPUIS SUPABASE

Si vous aviez déjà des données sur Supabase :

1. **Exporter les données** :
   ```sql
   -- Sur Supabase
   COPY (SELECT * FROM services_rdv) TO '/tmp/services.csv' CSV HEADER;
   COPY (SELECT * FROM appointments) TO '/tmp/appointments.csv' CSV HEADER;
   ```

2. **Importer sur Hetzner** :
   ```sql
   -- Sur PostgreSQL Hetzner
   COPY services_rdv FROM '/tmp/services.csv' CSV HEADER;
   COPY appointments FROM '/tmp/appointments.csv' CSV HEADER;
   ```

---

## 🧪 TESTER LA CONNEXION

Test rapide de connexion PostgreSQL :

```javascript
// test-db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'your-server-ip',
  port: 5432,
  database: 'loubna_db',
  user: 'loubna_user',
  password: 'your-password',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erreur connexion:', err);
  } else {
    console.log('✅ Connexion réussie:', res.rows[0]);
  }
  pool.end();
});
```

```bash
node test-db.js
```

---

## 📝 FICHIERS CRÉÉS/MODIFIÉS

**Nouveaux fichiers** :
- `src/lib/db/postgres.ts` - Client PostgreSQL
- `src/lib/auth/session.ts` - Gestion sessions
- `src/app/api/auth/login/route.ts` - API login
- `src/app/api/auth/logout/route.ts` - API logout
- `src/app/api/auth/me/route.ts` - Vérification session
- `supabase/schema-postgres.sql` - Schéma PostgreSQL
- `scripts/create-admin.js` - Script création admin
- `HETZNER_SETUP.md` - Cette documentation

**Fichiers modifiés** :
- `src/app/admin/login/page.tsx` - Utilise nouvelle API auth
- `src/hooks/useAuth.ts` - Utilise sessions au lieu de Supabase
- `src/app/admin/layout.tsx` - Supprimé vérification Supabase
- `.env.local` - Variables PostgreSQL

**Fichiers obsolètes** (peuvent être supprimés) :
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `supabase/schema.sql` (version Supabase)

---

## 🚨 TROUBLESHOOTING

### Erreur "Connection refused"
- Vérifier que PostgreSQL est démarré
- Vérifier le firewall (port 5432 ouvert)
- Vérifier l'IP dans `listen_addresses`

### Erreur "password authentication failed"
- Vérifier le mot de passe dans `.env.local`
- Vérifier les permissions dans `pg_hba.conf`

### Erreur "database does not exist"
- Créer la base de données : `CREATE DATABASE loubna_db;`

### Erreur "relation does not exist"
- Exécuter le schéma SQL : `psql -f schema-postgres.sql`

---

## ✅ CHECKLIST DÉPLOIEMENT

- [ ] PostgreSQL installé sur Hetzner
- [ ] Base de données `loubna_db` créée
- [ ] Schéma SQL exécuté
- [ ] Firewall configuré (port 5432)
- [ ] `.env.local` configuré avec bonnes valeurs
- [ ] SESSION_SECRET généré (32+ caractères)
- [ ] Compte admin créé
- [ ] Test connexion PostgreSQL réussi
- [ ] Test login admin réussi
- [ ] Sauvegardes configurées

---

## 📞 SUPPORT

Pour toute question :
- Vérifier les logs PostgreSQL : `/var/log/postgresql/`
- Vérifier les logs Next.js : console du serveur dev
- Tester la connexion avec `test-db.js`

---

**Votre back office est maintenant configuré pour fonctionner avec PostgreSQL sur Hetzner !** 🎉
