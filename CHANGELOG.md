# Journal des changements — ALLEZ

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

### Reste à faire (phases suivantes)
- Recettes : calories sous-estimées d'environ 20 % en moyenne (avertissement affiché) ; une seule liste d'ingrédients par recette, valeurs Ciqual, liste de courses corrigée.
- Revue scientifique du reste de `lifestyle.html`, hydratation et notes de recettes.
- Logbook : brouillon perdu à la fermeture, record au 1RM estimé, charge du deload, saisie du RIR.
- Accessibilité (contraste de l'or en texte, cibles tactiles, `<main>`), polices hébergées, nouvelle navigation.
- Procédure de publication à refaire avant toute mise en ligne (voir `CLAUDE.md`).

## v65 et avant
Voir l'historique git de `main`.
