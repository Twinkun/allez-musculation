# Journal des changements — ALLEZ

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
