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
