# 🔐 GUIDE D'AUTHENTIFICATION ADMIN

## 📋 SYSTÈME D'AUTHENTIFICATION CRÉÉ

Le back office est maintenant protégé par un système d'authentification complet avec Supabase Auth.

---

## 🎯 FONCTIONNALITÉS

✅ **Page de connexion** : `/admin/login`  
✅ **Protection automatique** : Toutes les routes `/admin/*` sont protégées  
✅ **Vérification admin** : Seuls les utilisateurs dans la table `admin_users` peuvent accéder  
✅ **Session persistante** : Reste connecté même après rechargement  
✅ **Déconnexion** : Bouton dans la sidebar  
✅ **Redirection automatique** : Redirige vers login si non authentifié  

---

## 🚀 CONFIGURATION INITIALE

### 1. Créer un compte admin dans Supabase

**Étape 1 : Créer un utilisateur via Supabase Auth**

1. Aller dans Supabase Dashboard → Authentication → Users
2. Cliquer sur "Add user" → "Create new user"
3. Entrer email et mot de passe
4. Cliquer sur "Create user"
5. **Copier l'UUID du user** (colonne `id`)

**Étape 2 : Ajouter l'utilisateur dans la table admin_users**

Aller dans SQL Editor et exécuter :

```sql
INSERT INTO admin_users (id, email, role) 
VALUES ('uuid-copié-étape-1', 'votre-email@example.com', 'super_admin');
```

---

## 🔑 UTILISATION

### Connexion

1. Aller sur http://localhost:3000/admin
2. Vous serez redirigé vers `/admin/login`
3. Entrer email et mot de passe
4. Cliquer sur "Se connecter"
5. Redirection automatique vers le dashboard

### Déconnexion

1. Cliquer sur le bouton "🚪 Déconnexion" dans la sidebar
2. Redirection automatique vers `/admin/login`

---

## 🛡️ SÉCURITÉ

### Protection des routes

Toutes les routes `/admin/*` (sauf `/admin/login`) sont automatiquement protégées :

- Vérification de la session Supabase
- Vérification que l'utilisateur est dans `admin_users`
- Redirection vers login si non authentifié

### Vérification en temps réel

Le hook `useAuth` vérifie en permanence :
- ✅ Session active
- ✅ Utilisateur authentifié
- ✅ Statut admin dans la base de données

---

## 📁 FICHIERS CRÉÉS

**Page de connexion** :
- `src/app/admin/login/page.tsx` - Interface de connexion

**Hook d'authentification** :
- `src/hooks/useAuth.ts` - Gestion de la session et vérification admin

**Layout protégé** :
- `src/app/admin/layout.tsx` - Protection automatique + bouton déconnexion

---

## 🧪 TESTER L'AUTHENTIFICATION

### Test 1 : Accès non authentifié

1. Aller sur http://localhost:3000/admin
2. ✅ Doit rediriger vers `/admin/login`

### Test 2 : Connexion avec mauvais identifiants

1. Sur `/admin/login`, entrer email/password incorrects
2. ✅ Doit afficher un message d'erreur

### Test 3 : Connexion réussie

1. Entrer les bons identifiants
2. ✅ Doit rediriger vers `/admin` (dashboard)
3. ✅ Email affiché dans la sidebar
4. ✅ Bouton déconnexion visible

### Test 4 : Navigation dans le back office

1. Une fois connecté, naviguer entre les pages
2. ✅ Accès à toutes les pages admin
3. ✅ Pas de redirection vers login

### Test 5 : Déconnexion

1. Cliquer sur "Déconnexion"
2. ✅ Redirection vers `/admin/login`
3. ✅ Impossible d'accéder à `/admin` sans se reconnecter

---

## 🔧 PERSONNALISATION

### Modifier les rôles admin

Vous pouvez créer différents niveaux d'accès :

```sql
-- Super admin (accès complet)
INSERT INTO admin_users (id, email, role) 
VALUES ('uuid', 'super@example.com', 'super_admin');

-- Admin simple
INSERT INTO admin_users (id, email, role) 
VALUES ('uuid', 'admin@example.com', 'admin');
```

### Ajouter des permissions par rôle

Modifiez `src/hooks/useAuth.ts` pour gérer les permissions :

```typescript
export function useAuth() {
  // ... code existant
  const [role, setRole] = useState<'admin' | 'super_admin' | null>(null);
  
  // Récupérer le rôle depuis admin_users
  // Utiliser dans les composants pour afficher/masquer des fonctionnalités
}
```

---

## ⚠️ IMPORTANT

### Variables d'environnement requises

Pour que l'authentification fonctionne, vous devez avoir configuré dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
```

### Première connexion

Avant de pouvoir vous connecter :
1. ✅ Supabase doit être configuré
2. ✅ Le schéma SQL doit être exécuté (table `admin_users` créée)
3. ✅ Un compte utilisateur doit être créé dans Supabase Auth
4. ✅ L'utilisateur doit être ajouté dans `admin_users`

---

## 🚨 TROUBLESHOOTING

### "Accès non autorisé. Vous n'êtes pas administrateur."

**Cause** : L'utilisateur existe dans Supabase Auth mais pas dans `admin_users`

**Solution** :
```sql
INSERT INTO admin_users (id, email, role) 
VALUES ('uuid-du-user', 'email@example.com', 'super_admin');
```

### Redirection infinie vers /admin/login

**Cause** : Variables d'environnement Supabase incorrectes

**Solution** : Vérifier `.env.local` et redémarrer le serveur

### "supabaseUrl is required"

**Cause** : Variables d'environnement manquantes

**Solution** : Créer `.env.local` avec les bonnes valeurs

---

## 📊 FLOW COMPLET

```
1. Utilisateur va sur /admin
   ↓
2. useAuth vérifie la session
   ↓
3. Pas de session → Redirection /admin/login
   ↓
4. Utilisateur entre email/password
   ↓
5. Supabase Auth vérifie les identifiants
   ↓
6. Vérification dans table admin_users
   ↓
7. Si admin → Redirection /admin (dashboard)
   ↓
8. Session persistante → Accès à toutes les pages admin
   ↓
9. Déconnexion → Suppression session → Redirection /admin/login
```

---

## ✅ CHECKLIST DÉPLOIEMENT

Avant de déployer en production :

- [ ] Variables d'environnement Supabase configurées
- [ ] Schéma SQL exécuté sur Supabase
- [ ] Au moins un compte admin créé
- [ ] Test connexion/déconnexion réussi
- [ ] Protection des routes vérifiée
- [ ] Email admin confirmé dans la sidebar

---

## 🎉 RÉSULTAT

Vous avez maintenant un système d'authentification complet et sécurisé pour votre back office !

**Accès** : http://localhost:3000/admin/login
