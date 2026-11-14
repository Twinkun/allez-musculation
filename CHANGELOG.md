# Journal des changements — ALLEZ

## Ping-pong D3 / 650 pts, recettes, barre du haut (branche `prise-lente`)

- `pingpong.html` : D3, 650 points, saison 2026-27 (14 V – 11 D) présentée par tranche de classement adverse, sans nom d'adversaire ; 6 conseils pour passer de 650 à 800 ; repères 550-600 → 600-700. `fiche-raquette-pingpong.html` : niveau à jour, nom du club retiré. Les 25 matchs (avec noms) vivent dans le fichier privé et arrivent dans le tracker à l'import.
- `recettes.html` : « Surprends-moi » atteint la bonne recette (fiches en `content-visibility:auto` rendues avant le saut, `goToRecipe`, aussi pour les pastilles et `#rNN`), bulle au-dessus de la barre d'onglets, « Ta collation », type de journée lu dans `ALLEZ.NUTRITION.dayKind` (charge `data/programme.js`).
- Mobile, profil renseigné : le haut du bandeau d'en-tête de pingpong, posture et lifestyle passait sous la barre fixe (48 px < 64 px) → 88 px, 48 px quand un bandeau est affiché.

## Prise de masse lente : objectif ~73 kg à 1 an (branche `prise-lente`)

- `core.js` MODEL : poids +3 kg sur 12 mois (~+0,25 kg/mois), masse maigre +3,5 à +4,5 kg, taille −1,5 cm. La masse grasse projetée n'est plus une série à part : elle est déduite (1 − maigre / poids), donc toujours cohérente. Horizon 2 ans : +5 à +7 kg.
- `data/nutrition.js` : muscu = dépense + 10 %, ping-pong = dépense, repos = dépense − 3 % → moyenne ≈ dépense + 80 kcal/j.
- `data/repas.js` : portions recalées à ±1 % des nouvelles cibles (miel et patate douce Lun-Jeu, patate douce samedi, riz du dîner ping-pong, riz et huile au repos).
- Textes : « recomposition » → « prise de masse lente » sur toutes les pages ; règles d'ajustement mensuel réécrites (cible +0,2 à +0,4 kg/mois, taille stable).

## Mesures réelles, tempos et ping-pong 2×/semaine (branche `mesures-reelles`)

### Nutrition : 3 types de journées
- `data/nutrition.js` : dépense calculée jour par jour = métabolisme de base × 1,4 (journée de bureau, FAO/WHO/UNU 2004) + coût net de l'activité (Compendium 2011 : musculation 3,5 MET × 1,25 h, code 02054 ; tennis de table 4 MET × 2,5 h, code 15660). Cibles : muscu = dépense + 4 %, ping-pong = dépense − 4 %, repos = dépense − 10 %. `delta` = écart à la dépense du jour. Nouveaux : `pingpong`, `dayKind(jour)`, `forDay(jour)`.
- Ping-pong le mardi et le vendredi (`OTHER_DAYS`), 2 h 30 au club.
- `data/repas.js` : 4ᵉ journée « Ping-pong », calée sur le début du club (horaire privé D) ; plans Lun-Jeu et Repos recalés à ≤ 2 % de leur cible (miel, patate douce, huile du dîner). Ce fichier est maintenu à la main : `_prive/gen/gen_repas.py` est périmé.
- Pages : nutrition (cartes, formule, onglet du plan), programme imprimable (8 pages, journée ping-pong), tableau de bord (cible du jour), accueil (mardi et vendredi), progression, profil (horaire du club).

### Mesures réelles et tempos
- Contenu privé : les chiffres liés au profil (poids, masse grasse, masse maigre, objectifs à 1, 2 et 5 ans, kcal, protéines, séries par semaine) sont calculés. `core.js` accepte `data-az` dans le contenu privé (chemins sur liste blanche, écriture en `textContent`).
- Tempos notés dans un seul format : phase freinée · pause en étirement · phase d'effort · pause en contraction. 12 tempos alignés sur la pause décrite dans la fiche. Fiches Arnold (retour en 3 s) et oiseau (descente en 2 s) corrigées.

## v2 — phase 6 « Vérification » et publication (fusion dans `main`)

### Corrigé pendant la vérification
- `posture.html` : 4 dosages écrits en dur (rowing, incliné, dead bug, planche latérale) → lus dans `data/programme.js` ; Pallof press : dosage par défaut des données.
- `progression.html` : « +217 / −333 / ≈ −100 kcal » de l'ancien profil → calculés depuis le profil.
- Lien « Voir l'historique » du jour de repos (logbook) : ancre inexistante corrigée.
- Typographie : macros du plan repas « P : 11 g », 23 guillemets droits → « … » (posture, recettes, nutrition).
- `.gitignore` : dossiers photos désignés par un motif générique ; script de publication `publier-v2.cmd` ignoré.
- Service worker `allez-v70`.

### Vérifié (preuves dans le récapitulatif de fin de phase)
- 72 tests Node, dont `tests/verification.test.js` : grep anti-duplication (programme, cibles, recettes, compléments, plan repas définis seulement dans `data/`) et grep de confidentialité sur tout ce qui est publié.
- `_prive/tests/phase6.js` 21/21 : 64 rendus sans erreur console ni débordement, 131 liens internes et ancres sans erreur, 16/16 pages hors ligne avec polices, scénario complet (date de départ → PUSH → onglet fermé → reprise → validation → tableau de bord, série, records → export → vidage → import identique), migration des 3 anciens formats.
- Phases 3, 4, 5 rejouées (33/33, 33/33, 30/30), axe-core 0 violation, cibles tactiles conformes.
- Lighthouse mobile complet, 16 pages, avant/après (voir le tableau du §14 d'AUDIT.md) : après = Performance 96 à 100, Accessibilité 100, Bonnes pratiques 96 à 100.

### Publication
- `publier-v2.cmd` (racine du clone) remplace `publier.cmd` : publie depuis le clone, `data/` et `assets/` compris, jamais depuis OneDrive. Procédure dans `CLAUDE.md`.

## v2 — phase 5 « Interface, accessibilité, performance, service worker » (branche `refonte-v2`, non publiée)

### Navigation unique, en français
- `ALLEZ.NAV` (core.js) : **Accueil · Séance · Nutrition · Progrès · Plus**. Barre du haut sur ordinateur, barre d'onglets en bas sur mobile, panneau « Plus » (10 pages, regroupées) : fenêtre modale, focus géré, Échap, tabulation contenue.
- Les 16 menus écrits en dur (barres, hamburgers, barre latérale du tableau de bord, barre du programme) sont remplacés par un conteneur vide rempli par core.js. Sous-pages raquette rattachées à Ping-pong.
- Libellés français : « Tableau de bord », « Carnet de séance », « Hygiène de vie », « onglet Séance » au lieu de logbook/dashboard/lifestyle.

### Accessibilité
- Chaque page : lien « Aller au contenu », un seul `<main id="contenu">`, un `h1`, titres sans saut de niveau (pingpong, nutrition, progression, programme), modales nommées (accueil), zones défilantes atteignables au clavier.
- **Contraste WCAG AA** : axe-core passe de 1 137 nœuds en échec à **0** sur les 16 pages. Texte or sur fond clair → or foncé `#8a5800`, texte sur fond or → nuit `#0b1020`, gris éclaircis foncés, badges « verrouillés » sans transparence, étiquettes de catégorie (Push, Core) assombries.
- **Cibles tactiles ≥ 44 px** : 418 → 5 (les 5 restantes sont des citations dans une phrase, exemptées par WCAG 2.5.8). Boutons du mode focus portés à 44 px.
- `prefers-reduced-motion` : règle globale dans `base.css` (pages sans règle comprises), compteurs animés affichés directement.
- `onclick` / `onchange` en ligne (58) et propriétés `.onclick =` (6) → délégation `data-action` + `ALLEZ.actions`. Éléments `role="button"` activables au clavier.
- `alert()` supprimés (notifications), `confirm()` non destructifs → fenêtre maison ; `confirm()` natif gardé pour les 4 actions destructrices (supprimer une séance, effacer les séances rapides, remplacer des séries cochées, changer de séance).
- Données saisies (notes de séance, adversaires de ping-pong) affichées avec `textContent`.

### Performance
- **Polices hébergées** (Inter 400-800, Bebas Neue, licence OFL, `assets/fonts/`) : plus de Google Fonts, rendu identique hors ligne. La version variable d'Inter a été écartée : son rendu coûtait plusieurs secondes sur processeur lent.
- Bandeaux (profil, sauvegarde) placés avant le premier affichage : plus de décalage de mise en page (CLS accueil 0,239 → 0, recettes 0,209 → 0).
- Exercices : le corps des 29 fiches (6 onglets, schémas) est construit à la première ouverture (6 200 → 1 330 nœuds au chargement). Recettes : fiches remplies à l'approche de l'écran, filtre « Protéines+ » lu dans les données. `content-visibility` sur les blocs longs (recettes, ping-pong).

### Service worker
- **Stale-while-revalidate** pour tous les fichiers locaux (pages, scripts, styles, données) : réponse immédiate du cache, mise à jour en arrière-plan.
- **Bandeau « Nouvelle version disponible »** : la nouvelle version attend l'accord (« Mettre à jour » → `SKIP_WAITING` → rechargement). Enregistrement centralisé dans core.js, après `load`. Correction en cours de phase : la première installation ne recharge plus la page.
- Cache `allez-v69`, polices en précache.

### Minuteur (iPhone)
- Un minuteur web ne peut pas sonner écran verrouillé sans serveur de notifications. L'écran reste allumé pendant le repos (Wake Lock, aussi hors mode focus), et si l'appli revient au premier plan après la fin du repos, un message l'indique en plus du son.

### Inchangé, vérifié
- `programme.html` imprimable en A4 : barre, onglets et boutons masqués, 13 pages comme avant.

### Vérifié
- 68 tests Node (58 + 10 de `tests/ux.test.js`).
- Scénarios navigateur : phase 5 30/30 (navigation, clavier, hors ligne et polices, bandeau de mise à jour, stale-while-revalidate, installable, mouvements réduits, impression A4), phase 4 33/33, phase 3 33/33.
- axe-core (WCAG 2.1 A/AA + bonnes pratiques) : 0 violation sur les 16 pages. 32 rendus (mobile + bureau) : 0 erreur console, 0 débordement.

### Lighthouse mobile — mesure incomplète
Conditions : serveur local gzip (comme GitHub Pages), émulation mobile. Cette machine (Intel i5-10210U, indice Lighthouse ≈ 300) est elle-même dans la catégorie « mobile milieu de gamme » : la documentation Lighthouse prescrit alors un ralentissement CPU ×1 (le ×4 par défaut vise un ordinateur haut de gamme et y gonfle le TBT de plusieurs secondes, y compris sur l'ancienne version).
La série finale (avant/après, ×1 et ×4) a été **interrompue par manque de mémoire** de la machine après 9 pages « avant ». Chiffres disponibles (Performance · Accessibilité · Bonnes pratiques) :

| Page | Avant ×1 | Après ×1 |
|---|---|---|
| analyse | 72 · 95 · 100 | 98 · 100 · 100 ¹ |
| comparatif-raquettes | 94 · 100 · 100 | — |
| dashboard | 91 · 95 · 100 | 93 · 100 · 100 ¹ |
| exercices | 82 · 91 · 96 | 95 · 100 · 96 |
| fiche-raquette | 93 · 100 · 100 | — |
| index | 78 · 91 · 100 | 96 · 100 · 100 |
| lifestyle | 87 · 95 · 100 | 99 · 100 · 100 ¹ |
| logbook | 80 · 95 · 100 | — |
| nutrition | 91 · 95 · 100 | 94 · 100 · 100 ¹ |
| pingpong | — | 98 · 100 · 100 |
| recettes | — | 90 · 100 · 100 |
| posture, profil, programme, progression, projection | — | — |

¹ mesuré avant les deux derniers réglages (bandeaux avant le 1er affichage, piège de focus), qui ne peuvent que réduire le CLS.
Référence complète de la phase 1 (×4, sans gzip, 16 pages) : `_prive/tests/out/lh-avant/`. SEO à 50 partout : voulu (`noindex`).
**À refaire** : la série complète `LH_CPU=1 node lh.js …` sur les 16 pages avant/après, machine peu chargée.

## v2 — phase 4 « Logbook » (branche `refonte-v2`, non publiée)

Objectif : un logbook utilisable à une main en 30 secondes entre deux séries. Déjà en place avant la phase et non refait : séance du jour détectée, rattrapage, brouillon enregistré à chaque saisie, brouillon d'un autre jour récupérable, deload en semaine 13 (moitié des séries, charges × 0,6), record au 1RM d'Epley, colonne RIR, minuteur basé sur l'heure de fin.

### Charge suggérée (`data/programme.js` : `suggest`)
- « Dernière fois : 3×12 @ 14 kg, RIR 2 » (séries identiques regroupées, fourchette de RIR si elle varie).
- Règles, dans cet ordre : deload → charge × 0,6 ; **deux séances de suite sous le bas de la fourchette à la même charge → −10 %** ; toutes les séries au haut de la fourchette → + 1 palier, répétitions au bas de la fourchette ; sinon même charge. Les séries sont préremplies avec la charge suggérée.
- Palier selon le matériel (repère courant, à ajuster selon la salle) : haltères 1 kg jusqu'à 10 kg puis 2 kg, câble, machine et barre 2,5 kg.
- Les séances de deload ne servent plus de base : la reprise après la semaine 13 repart des charges d'avant (le deload n'est plus appliqué deux fois).

### Records
- 1RM estimé d'Epley et de Brzycki (Brzycki 1993, DOI 10.1080/07303084.1993.10606684), meilleur volume d'une séance (reps × kg), affichés sur chaque exercice et dans les courbes.
- Badge « Record » : 1RM ou volume battu, sur les séries **cochées** seulement (une ligne préremplie avec la charge suggérée ne déclenche plus de faux record).

### Substitution en un tap
- Bouton « ⇄ Remplacer » : les remplaçants du programme (`subs`), jamais un exercice déconseillé pour le bas du dos. Séries, repos et fourchette du créneau gardés ; fourchette du remplaçant si l'unité change (planche → dead bug).
- Conservée dans le brouillon, dans la séance sauvegardée (champ `remplace`, gardé par le journal et la sauvegarde) et dans l'historique (« ⇄ à la place de… ») ; courbe propre pour l'exercice de remplacement.

### Saisie et brouillon
- Mode focus : boutons − / + (répétitions, charge au palier) et puces RIR 0 à 4+ de 48 px. Valeurs préremplies : RIR puis « Série terminée » = 2 taps.
- Brouillon : identifiants d'exercices et substitutions enregistrés, relu par identifiant ; enregistré aussi à `pagehide` ; alerte visible si le stockage refuse l'écriture. Quitter l'appli après « Sauvegarder » ne recrée plus de brouillon (la séance réapparaissait le lendemain comme « non sauvegardée »).
- Minuteur : le contexte audio est créé au tap qui coche la série, puis réutilisé à la fin du repos (le son était créé hors geste et pouvait être bloqué). Vibration : Android seulement.
- Service worker `allez-v68`.

### Vérifié
- 58 tests Node (50 + 8 nouveaux ; un test de la phase 3 adapté : la logique de charge passe par `suggest`).
- Scénario navigateur phase 4 : 33/33 (suggestion, −10 %, records, substitution, rechargement en pleine séance, 2 taps, deload semaine 13, jour de repos, bureau). Phase 3 rejouée : 33/33 (scénario du record adapté : série cochée).
- 64 rendus (16 pages × mobile et bureau × sans profil et avec le profil privé) : 0 erreur console. Hors ligne : 19 pages servies par le cache `allez-v68` (seules les polices Google échouent, phase 5).

### Reste à faire (phase 5)
- Minuteur écran verrouillé sur iPhone (notification), polices hébergées, accessibilité, navigation, bandeau de mise à jour, procédure de publication.

## v2 — phase 3 « Corrections » (branche `refonte-v2`, non publiée)

Objectif : corriger les erreurs encore ouvertes de l'audit, sans publier.

### Compléments (décision du 12-11-2026)
- UnoCardio 1000 + D3 : **1 capsule par jour** (dose de l'étiquette) au lieu de 2. D3 Nutri&Co et ZMA retirés.
- Bilan de sécurité **au vert** : vitamine D 37 à 46 µg/j, zinc 21 à 22 mg/j, B6 ≤ 8,9 mg/j, magnésium 80 mg/j (limites EFSA 100 µg, 25 mg, 12 mg, 250 mg). L'ancien stack (vitamine D et zinc dépassés) reste rappelé.
- Ashwagandha : 300 mg au petit-déjeuner + 300 mg au dîner, avec un repas (schéma de Chandrasekhar 2012 et Wankhede 2015). Les compléments du soir se prennent avec le dîner : fin du créneau « 2 h après le dîner, sans laitage » (contrainte du ZMA).
- Pages mises à jour : nutrition (fiches, bilan, erreurs), plan repas (`data/repas.js`), accueil (plans du jour), lifestyle (checklist).

### Recettes
- `data/recettes.js` : **une seule liste d'ingrédients par recette** (lignes de la fiche + grammes comptés), valeurs pour 100 g tirées de Ciqual 2025, puis USDA FoodData Central, puis approximation signalée (ordre du §9.2 de l'audit). Calories et macros calculées, lipides affichés, poids « compté » sous chaque ingrédient.
- Avertissement « calories sous-estimées » retiré de `recettes.html` et du Top 50.
- Top 50 de `nutrition.html` lu dans les mêmes données ; les n° 01 à 03 étaient en double (ancienne copie supprimée).
- Notes du chef réécrites : retirés « anti-inflammatoires », probiotiques, antioxydants, IG des pâtes complètes, « créatine 0,7 g/100 g », leucine/mTOR, PDCAAS absolu, chiffres de macros en dur.
- Liste de courses : additionne les grammes par aliment (les quantités en unités différentes n'étaient plus ignorées), riz cuit converti en riz cru, lignes non pesées dans « à vérifier au placard », plus d'`alert()`.

### Lifestyle
- Chaque affirmation renvoie à une source (19 références avec DOI en bas de page) ou a été retirée : voix (« 20-30 % plus grave »), dopamine détox, pincée de sel, « c'est littéral », érections « objectives », houblon, notes « Impact ★★★★★ ».
- Caféine 3-6 mg/kg (Grgic 2020, Guest 2021) et sommeil (Drake 2013), alcool (Välimäki 1984, Parr 2014), froid (Šrámek 2000, Roberts 2015), graisses (Whittaker 2021, Anses 2011), eau (EFSA 2010).

### Logbook (audit §3)
- n° 1 : un brouillon d'un autre jour est mis de côté (`px_logbook_draft_prev`, inclus dans la sauvegarde) et proposé : « sauvegarder à sa date » ou « jeter ».
- n° 5 : record au 1RM estimé (Epley), plus seulement à la charge maximale.
- n° 6 : en deload, charges de la dernière séance × 0,6.
- n° 8 : charge de la série 1 recopiée sur les séries suivantes, charge de départ indiquée, colonne RIR saisie et sauvegardée, palier suggéré quand toutes les séries atteignent le haut de la fourchette.
- n° 17 : la courbe d'un exercice sans charge explique où lire la progression. n° 18 : page rechargée au retour si le jour a changé (logbook, accueil).

### Autres erreurs de l'audit
- Fiches d'exercices (§9.5) : 46 corrections (30° « environ », prise neutre au face pull, buste vertical au rowing câble, une seule charge de départ, chef long « le plus volumineux », dead bug et vacuum sans superlatif ni délai, crunch câble et oiseau penché signalés hors programme, côté de départ générique…).
- Tractions : « max » remplacé par 5-8 répétitions, arrêt à 1-2 de l'échec.
- Posture : position de sommeil, bras croisés, délais de 3 et 4-6 semaines, « seul exercice qui corrige » retirés.
- Accueil : « seul muscle qui élargit » corrigé (deltoïde médial et grand dorsal), « non négociable », ZMA.
- Hydratation : 2 à 2,5 L à boire (EFSA 2010) au lieu de 3-3,5 L ; « la créatine augmente les besoins en eau » retiré.
- `analyse.html` : menu qui débordait de 21 px en 1440 px.
- Service worker `allez-v67` (28 fichiers, dont `data/recettes.js`).

### Vérifié
- 50 tests Node (34 de départ, dont 2 réécrits pour le nouveau stack, + 16 nouveaux).
- 64 chargements navigateur (16 pages × mobile et bureau × sans profil et avec le profil privé) : 0 erreur console, 0 débordement.
- Scénario navigateur phase 3 : 33 vérifications sur 33 (brouillon, record, deload, RIR, recettes, courses, compléments). Hors ligne : recettes servies depuis le cache.

### Reste à faire (phase 5)
- Accessibilité (contraste de l'or, cibles tactiles, `<main>`, titres), polices hébergées, nouvelle navigation, bandeau de mise à jour du service worker, minuteur sur iPhone.
- Procédure de publication (voir `CLAUDE.md`).

## v2 — phase 2 « Fondations » (branche `refonte-v2`, non publiée)

Objectif : une seule source de données, un seul stockage des séances, aucune donnée personnelle dans le code publié.

### Données
- `core.js` : profil (`px_profile`), objectifs et projection calculés depuis le profil, journal unique des séances (`px_journal`) avec migration des trois anciennes clés sans perte ni doublon, sauvegarde et import validés, liaison des pages (`data-az`, `data-prive`).
- `data/programme.js` : programme (blocs, exercices à identifiant stable, séances, volume et durées calculés). Bloc 1 à environ 70 % des séries. Hollow body remplacé par la planche latérale.
- `data/fiches.js` : 29 fiches d'exercices, au tutoiement.
- `data/nutrition.js` : cibles calculées (Mifflin-St Jeor, protéines, lipides).
- `data/supplements.js` : produits, niveau de preuve A/B/C avec DOI, limites EFSA toutes sources, cumul et alertes.
- `data/repas.js` : plan repas de trois journées types, totaux calculés avec la table Ciqual 2025 (Anses).

### Pages
- Toutes les pages lisent `window.ALLEZ` : plus de copie du programme, des cibles ni des compléments dans le HTML.
- `profil.html` (nouvelle) : mesures de départ, date de départ, horaires, import du fichier privé, sauvegarde, stockage persistant.
- `nutrition.html` : bilan de sécurité des compléments (vitamine D et zinc au-dessus des limites avec le stack actuel, correction la plus simple proposée), valeurs des aliments recalées sur Ciqual.
- `posture.html` : guide posture générique ; `analyse.html` : diagnostic absent du code publié, affiché après import du fichier privé.
- `lifestyle.html` : promesses chiffrées sans source retirées (« +40 % de testostérone », « reset en 90 jours »).
- `pingpong.html` : pourcentages sans source retirés, date des matchs en heure locale ; le ping-pong ne compte plus comme séance de musculation.
- `noindex` sur toutes les pages. Service worker `allez-v66` : précache complet, adresse avec paramètre servie hors ligne.
- Retirés : `recettes2.html`, `generate-icons.html`.

### Confidentialité
- Aucune information médicale, mensuration, horaire ni nom de salle dans `MUSCULATION/`.
- Le contenu personnel vit dans un fichier privé hors dépôt, importé une fois par appareil (localStorage).

### Reste à faire (phases suivantes) — recettes, lifestyle et logbook faits en phase 3
- Accessibilité (contraste de l'or en texte, cibles tactiles, `<main>`), polices hébergées, nouvelle navigation.
- Procédure de publication à refaire avant toute mise en ligne (voir `CLAUDE.md`).

## v65 et avant
Voir l'historique git de `main`.
