# Version public_html — marocsaharatrekking.com

Had version katkhddem b HTML/CSS/JS + PHP. Ma kat7taj la Node.js, la Terminal, la Run NPM Install f hosting.

## 1. Backup w t7yid liaison dyal Node.js

1. F File Manager, sauvegardi contenu l9dim dyal public_html w `.htaccess` f archive barra men public_html.
2. F Setup Node.js App, Remove/Delete application `marocsaharatrekking` bach domaine ma yb9ach merbot b Passenger. Stop bo7do y9der ykhelli routage Node w erreur 503.
3. Ma t7yedch boites email, DNS, SSL ola domaine. L'application Node l9dima ma b9atch matlouba lhad version.

## 2. Upload ZIP jdid

1. F File Manager, dkhol `/home/marocsah/public_html`.
2. 7yed fichiers source l9dam dyal had site men public_html, mor backup: app/, components/, content/, lib/, scripts/, tests/, types/, node_modules/, .next/, app.js, server.js, package*.json, next*.js/ts, tsconfig*, tailwind.config.ts, postcss.config.js w env files ila kaynin. Ma t7yedch `.well-known` ola fichiers dyal sites okhrin.
3. Upload akhir ZIP li smiyto `marocsaharatrekking-public_html-YYYY-MM-DD.zip` (khtar date l-ajdad).
4. Extract DIRECTEMENT f public_html. Khas `index.html`, `_next`, `treks`, `contact`, `api` w `.htaccess` ykouno directement fih; machi dakhel dossier out.
5. Active Settings > Show Hidden Files. St3mel `.htaccess` li kayn f ZIP, bla blocs Passenger/Node l9dam. Ila cPanel kayzid bloc PHP automatiquement, khllih w verify PHP version f MultiPHP Manager.
6. Mor extraction, 7yed ZIP men public_html (backup yb9a barra men public_html).

## 3. PHP w email dyal cPanel

- F MultiPHP Manager / Select PHP Version, khtar PHP 8.2 ola ajdad lhad domaine. Test local tdar b PHP 8.4.
- Cree boite `noreply@marocsaharatrekking.com` ila mazal ma kaynach.
- Formulaire kayst3mel PHP `mail()` w service mail local dyal cPanel; ma kay7tajch SMTP password f site.
- Les messages kaymchiw l `m_assi_ni@hotmail.fr`, w confirmation katmchi l visiteur.
- Ila bghiti tbeddel email expediteur ola destinataire, kaynin f `api/_private/config.php`: `from` w `to`.
- `api/_private` mamnou3 men acces web. Ma t7yedch `.htaccess` li fih. PHP kaycree `rate-limits/` tma; compte PHP khas y9der ykteb fih. Ma tdirch chmod 777.
- F Email Deliverability, verify SPF/DKIM. Ila PHP mail() disabled f offre dyalek, support Najah Host khas yactivih ola yconfiguri transport mail local. Hadchi ma ymkench n2ekkdoh men PC.

## 4. Jreb site

- Home: https://marocsaharatrekking.com/
- Catalogue: https://marocsaharatrekking.com/treks/
- Filtre direct: https://marocsaharatrekking.com/treks/?region=toubkal
- Contact: https://marocsaharatrekking.com/contact/
- Robots: https://marocsaharatrekking.com/robots.txt
- Sitemap: https://marocsaharatrekking.com/sitemap.xml

Jreb navigation, filtres, Back/Forward, WhatsApp, album w formulaire. Sift message test men formulaire b email dyalek w chof inbox/spam dyal destinataire w confirmation. Ma tb9ach t3awed essais bzaf f 15 minutes: protection anti-spam katlimit chaque visiteur.

PHP mail() ila rje3 success kay3ni service mail 9bel message, machi preuve belli wsel l inbox. Ila site kaygol success w email ma wselch, chof Track Delivery f cPanel.

## 5. HTTPS

F SSL/TLS Status, Run AutoSSL l domaine. Mor certificat valide, active Force HTTPS Redirect f cPanel. Had ZIP ma kay9derch yinstalli certificat SSL. Ma tforcech HTTPS ila certificat mazal fih erreur.

## Ila ba9i 503 ola Index of /

- 503: verify application Node t7ydat men domaine w ma b9a ta Passenger rule l9dim f public_html/.htaccess. Support y9der y7yed mapping dyal Passenger ila ba9i.
- Index of /: verify index.html f public_html directement w domaine document root kaychof nafs dossier.
- 500: verify PHP 8.2+, cPanel error log w ma kaynach ancienne configuration Node. Ila host ma kaysme7ch chi directive Apache, support y2ekkedha men log.
- Formulaire kayrje3 erreur: chof PHP error log, mailbox from, mail() w permissions api/_private. WhatsApp kayb9a disponible.

## Development local (machi f hosting)

Node.js kaytst3mel ghir localement bach ygeneri fichiers static:

```bash
npm install
npm run build
npm test
npm run test:php
```

`out/` fih version ready. Preview ila PHP kayn f PATH:

```bash
npm start
```

7ell http://127.0.0.1:8080/. Origin dyal formulaire production kay9bel ghir domaine officiel; tests PHP kayjerbo validation w mail b mock bla envoi reel.

References:
- https://nextjs.org/docs/app/guides/static-exports
- https://www.php.net/manual/en/function.mail.php
