# Déploiement sur cPanel (Najah Host) — Node.js App

Guide complet pour déployer l'application Next.js avec backend Nodemailer sur cPanel via Phusion Passenger.

---

## Étape 1 : Créer l'email dans cPanel

1. Connectez-vous à votre **cPanel**.
2. Allez dans **Email Accounts** → cliquez sur **Create**.
3. **Email** : `noreply@moroccosaharatrekking.com`
4. **Password** : Entrez un mot de passe sécurisé et notez-le.
5. Notez les paramètres de connexion :
   - **Serveur SMTP entrant/sortant** : `mail.moroccosaharatrekking.com`
   - **Port SMTP recommandé** : `587` (STARTTLS) ou `465` (SSL)

---

## Étape 2 : Préparer et Builder le projet localement

Exécutez la commande suivante dans votre terminal :

```bash
npm run export
```

Cette commande exécute le build autonome Next.js (`output: 'standalone'`) et copie automatiquement les dossiers statiques (`.next/static` et `public`) dans `.next/standalone`.

---

## Étape 3 : Uploader les fichiers sur cPanel

1. Compressez le dossier `.next/standalone` en archive `.zip` (ou sélectionnez tout son contenu et zippez-le).
2. Ouvrez le **Gestionnaire de fichiers** (File Manager) de cPanel ou utilisez un client FTP (FileZilla).
3. Uploadez et extrayez le zip dans votre dossier d'application (ex : `/home/VOTRE_USER/moroccosaharatrekking`).
4. Uploadez également le fichier `server.js` à la racine de ce dossier (si non présent).
5. Uploadez `.env.production` à la racine, renommez-le en `.env`, et remplacez `your_email_password_here` par le vrai mot de passe de votre boîte email cPanel :

```env
SMTP_HOST=mail.moroccosaharatrekking.com
SMTP_PORT=587
SMTP_USER=noreply@moroccosaharatrekking.com
SMTP_PASS=VOTRE_VRAI_MOT_DE_PASSE
MAIL_TO=m_assi_ni@hotmail.fr
```

---

## Étape 4 : Configurer l'application Node.js dans cPanel

1. Dans cPanel, recherchez et ouvrez **Setup Node.js App**.
2. Cliquez sur **Create Application**.
3. Remplissez les champs :
   - **Node.js version** : Sélectionnez **18.x** ou **20.x**.
   - **Application mode** : **Production**
   - **Application root** : `moroccosaharatrekking` (le chemin relatif à votre home).
   - **Application URL** : Choisissez votre nom de domaine `moroccosaharatrekking.com`.
   - **Application startup file** : `server.js`
4. Cliquez sur **Create**.

---

## Étape 5 : Installer les dépendances sur le serveur

1. Dans l'interface Node.js App de cPanel, cliquez sur le bouton **Run NPM Install**.
2. Ou bien, via le Terminal cPanel :
   ```bash
   cd ~/moroccosaharatrekking
   npm install --production
   ```

---

## Étape 6 : Démarrer / Redémarrer l'application

Dans l'interface Node.js App de cPanel, cliquez sur le bouton **Restart**.

---

## Étape 7 : Tester le formulaire

Le serveur SMTP doit présenter un certificat TLS valide pour `SMTP_HOST`. La vérification du certificat est activée ; corrigez le certificat ou utilisez le nom d'hôte sécurisé fourni par l'hébergeur en cas d'échec.

La protection anti-spam ne partage aucun quota entre tous les visiteurs. Par fenêtre de 15 minutes, elle limite chaque IP fiable à 30 requêtes JSON et 5 messages valides, ainsi que chaque couple IP/email à 3 messages. Une IP bloquée ne consomme pas le quota des autres IP. Les visiteurs partageant la même IP publique partagent toutefois ses limites.

Sur Vercel (`VERCEL=1`), l'application utilise automatiquement `x-vercel-forwarded-for`, fourni par la plateforme. Sur cPanel, configurez `CONTACT_TRUSTED_IP_HEADER` uniquement si le proxy remplace systématiquement cet en-tête. Ne faites jamais confiance à un en-tête contrôlé par le visiteur. Sans IP fiable, seule la limite de 3 messages par email s'applique ; il n'existe aucun quota anonyme commun. Le champ anti-robot et la validation des données restent actifs.

Ces compteurs sont locaux à chaque processus Node et leur mémoire est bornée (10 000 identités par compteur, avec éviction des anciennes entrées). Ils ne constituent pas une protection distribuée : pour plusieurs instances ou contre des attaques réparties, configurez une limite partagée **par IP** dans le firewall/proxy de l'hébergeur ou un stockage partagé. Un redémarrage ou une éviction réinitialise le compteur concerné. N'ajoutez pas de quota applicatif global qui permettrait à un visiteur de bloquer le formulaire pour tous.

Le choix « offres exclusives et mises à jour » est envoyé dans l'email de l'équipe, avec la date de l'accord. Il permet de gérer la liste manuellement ; aucun service d'envoi de newsletters n'est connecté automatiquement.

1. Rendez-vous sur `https://moroccosaharatrekking.com/contact`.
2. Remplissez le formulaire avec un message de test et cliquez sur **Envoyer**.
3. Vérifiez :
   - Que vous recevez le mail admin sur `m_assi_ni@hotmail.fr`.
   - Que l'adresse de test saisie reçoit l'email de confirmation automatique.

---

## 🛠️ Dépannage (Troubleshooting)

- **Les emails ne partent pas (SMTP connection error)** :
  - Vérifiez que le mot de passe dans `.env` (`SMTP_PASS`) correspond exactement au mot de passe du compte cPanel.
  - Testez le port SSL `465` dans `.env` : changez `SMTP_PORT=465`.
- **Erreur HTTP 500** :
  - Assurez-vous que le fichier `.env` se trouve bien à la racine du dossier de l'application.
- **L'application ne démarre pas** :
  - Vérifiez dans le Terminal cPanel les logs de Passenger (ex: `stderr.log`).
  - Assurez-vous que la version de Node.js est bien 18 ou supérieure.
