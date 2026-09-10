# Déploiement des documents numériques privés (DUERP & autres)

Ce document décrit comment déposer le **fichier réel** d'un produit
numérique payant (ex. `duerp-modele.pdf`) sur le VPS de production. Le
fichier n'est **jamais commité dans Git** (voir `.gitignore` — `*.pdf` et
`private-products/` sont exclus sans exception) : le déploiement applicatif
(CI/CD) ne le transporte pas, il doit être déposé manuellement une fois.

## 1. Chemin cible

```
/var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf
```

Ce chemin doit correspondre exactement à `private_file_path` en base
(table `digital_products`, voir `supabase/migration-digital-products.sql`)
et à la variable d'environnement `DUERP_PDF_PRIVATE_PATH` (secret GitHub
Actions, injecté dans `.env` au déploiement).

Le dossier `private-products/` doit être **hors du web root nginx**
(`public/` sert uniquement les assets statiques du build Next.js). Vérifier
la config nginx du site pour confirmer qu'aucun `location` ne pointe vers
`private-products/`.

## 2. Permissions et owner

```bash
# Le process PM2 (Node.js) doit pouvoir lire le fichier, personne d'autre.
sudo mkdir -p /var/www/projects/juriste-droit-du-travail/private-products
sudo chown <user-pm2>:<user-pm2> /var/www/projects/juriste-droit-du-travail/private-products
sudo chmod 700 /var/www/projects/juriste-droit-du-travail/private-products
sudo chmod 600 /var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf
```

Remplacer `<user-pm2>` par l'utilisateur système sous lequel tourne le
process PM2 (`pm2 describe nextjs-loubna` pour le vérifier).

## 3. Dépôt du fichier (SCP)

Depuis un poste avec le fichier source et l'accès SSH configuré :

```bash
scp -P <port> "DUERP en ligne.pdf" \
  <user>@<host>:/var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf
```

## 4. Variables d'environnement (secrets GitHub Actions)

| Secret | Valeur attendue |
|--------|------------------|
| `DUERP_PDF_PRIVATE_PATH` | `/var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf` |
| `DIGITAL_DUERP_SALES_ENABLED` | `true` (pour activer l'achat du DUERP) |
| `DOCUMENT_STORE_ENABLED` | `true` (pour que le DUERP apparaisse dans `/documents`) |
| `SUMUP_WEBHOOK_SECRET` | valeur secrète partagée avec SumUp — **obligatoire en production**, le webhook refuse toute requête si absent |

Ces secrets sont gérés dans GitHub (Settings → Secrets and variables →
Actions) et ne sont accessibles qu'aux workflows CI/CD — ils ne peuvent pas
être modifiés depuis le dépôt de code lui-même.

## 5. Checksum d'intégrité

La colonne `digital_products.file_sha256` sert de référence pour vérifier
que le fichier déployé correspond bien à celui attendu :

```bash
sha256sum /var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf
```

Comparer la sortie avec la valeur en base :

```sql
SELECT file_sha256 FROM digital_products WHERE slug = 'modele-duerp';
```

Si le fichier source change (nouvelle version du DUERP), mettre à jour
`file_sha256` dans `supabase/migration-digital-products.sql` (et re-déployer
la migration) pour que la valeur en base reflète le nouveau fichier.

## 6. Procédure de vérification avant activation

Avant de passer les feature flags à `true` en production :

1. Le fichier existe au chemin attendu et les permissions sont correctes
   (§2) ;
2. `sha256sum` du fichier correspond à `file_sha256` en base (§5) ;
3. Test bout-en-bout sur un environnement de pré-prod ou avec un paiement
   réel à faible montant : achat → paiement SumUp → réception de l'email de
   livraison → téléchargement effectif du PDF via le lien reçu ;
4. Vérifier que le fichier n'est PAS accessible par une URL publique directe
   (`https://.../private-products/duerp-modele.pdf` doit retourner 404) ;
5. Vérifier `git ls-files | grep -i pdf` sur le dépôt ne retourne aucun
   fichier du dossier `private-products/`.

## 7. En cas de changement de document

Si un autre document (parmi ceux en `status='draft'` dans
`migration-document-marketplace.sql`) est activé à son tour :

1. Déposer son PDF au chemin `private-products/<slug>.pdf` (même procédure
   que ci-dessus) ;
2. Mettre à jour en base : `private_file_path`, `file_key`, `file_sha256`,
   `status = 'published'`, `is_active = true` ;
3. Ne jamais passer `status = 'published'` sans que le fichier soit déjà
   déposé et vérifié — sinon le premier acheteur tombera sur une erreur 500
   au téléchargement (le paiement, lui, aurait déjà été prélevé).
