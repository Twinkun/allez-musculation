# ALLEZ — notes pour travailler dans ce dépôt

PWA de suivi de musculation. HTML/CSS/JS sans build ni dépendance, servie par GitHub Pages depuis `MUSCULATION/`.

## Règles
- **Ce dépôt est public.** Rien de personnel dans `MUSCULATION/` : pas d'information médicale, de mensuration, d'horaire, de nom de salle. Le personnel vit dans `_prive/` (ignoré par git) et dans le localStorage de l'appareil.
- **Une seule source par donnée.** Programme, fiches, cibles, compléments, plan repas, recettes : `MUSCULATION/data/*.js`. `data/recettes.js` est généré (`_prive/gen/gen_recettes.py` puis `gen_recettes_js.js`) : ne pas l'éditer à la main. Profil, objectifs, journal, sauvegarde : `MUSCULATION/core.js`. Une page n'écrit jamais un chiffre du programme ou une cible en dur : elle lit `window.ALLEZ` (`data-az="chemin|format"` ou script).
- **Logbook.** Règles de charge (`suggest` : deload, −10 % après deux échecs, palier), records (`records` : Epley, Brzycki, volume), résumé « 3×12 @ 14 kg » et substitutions (`subsOf`, `substitute`) vivent dans `data/programme.js`, testés dans `tests/logbook.test.js`. Une substitution est enregistrée avec `exId` = exercice fait et `remplace` = exercice du programme.
- **Zéro invention.** Un chiffre est calculé ou sourcé (DOI). Compléments : limites EFSA, toutes sources.
- **Dos.** Aucun exercice à charge axiale ni en flexion lombaire chargée dans le programme.
- Identité visuelle : or `#e8960a`, nuit `#0b1020`, crème `#f0ece3`, Bebas Neue + Inter (jetons dans `assets/base.css`).
- Les anciennes clés `px_logbook`, `px_sessions_v2`, `px_sessions` ne sont jamais supprimées ni réécrites ; le journal `px_journal` les fusionne à chaque chargement.

## Interface (phase 5)
- **Navigation unique** : `ALLEZ.NAV` dans `core.js` (Accueil · Séance · Nutrition · Progrès + panneau « Plus »). Une page ne contient qu'un conteneur vide `<nav class="az-topnav" data-az-nav …></nav>` (ou `data-az-nav="sidebar"`) ; core.js construit la barre du haut, la barre d'onglets du bas (mobile) et le panneau. Nouvelle page = l'ajouter à `NAV.plus` (ou à `NAV.parent` si c'est une sous-page).
- **Structure de page** : `<body>` → lien `.az-skip` → `<div class="az-banners" data-az-banners></div><script>ALLEZ.rappels()</script>` (bandeaux avant le 1er affichage, sans décalage) → barre → un seul `<main id="contenu">` → un `h1`, titres sans saut de niveau.
- **Événements** : jamais de `onclick=`/`onchange=` ni `.onclick =`. Boutons : `data-action="nom" data-args="a|b"` (ou `data-change`), fonctions déclarées en bas de page avec `ALLEZ.actions({ nom: … })`. `role="button"` répond aussi à Entrée/Espace.
- **Messages** : `ALLEZ.ui.toast` / `ALLEZ.ui.dialog`. `confirm()` natif réservé aux actions destructrices. Données saisies par l'utilisateur affichées avec `textContent`.
- **Accessibilité** : contraste AA (texte or sur fond clair = `#8a5800`, texte sur fond or = nuit), cibles tactiles ≥ 44 px. Blocs `<style id="az-contraste">` / `az-cibles` / `az-perf` en tête de page (générés par `_prive/gen/phase5_*.js`, retouchables à la main). Vérifier avec `_prive/tests/p5axe.js` et `p5cibles.js`.
- **Polices** : hébergées dans `assets/fonts/` (Inter 400-800 statiques, Bebas Neue ; licence OFL). Pas de police variable : son rendu coûtait plusieurs secondes sur mobile lent.
- **Service worker** : stale-while-revalidate ; une nouvelle version attend l'accord de l'utilisateur (bandeau « Nouvelle version disponible » → `SKIP_WAITING`). Enregistré par core.js après `load`.

## Vérifier
- `node --test tests/*.test.js` (noyau, programme, nutrition, compléments, recettes, logbook, corrections de contenu, interface).
- Tests navigateur (Playwright, Edge) : dans `_prive/tests/`, hors dépôt (`phase3.js`, `phase4.js`, `phase5.js`, `p5axe.js`, `p5cibles.js`, `p5shots.js`).
- Lighthouse : `LH_CPU=1 node lh.js <racine> <sortie> <pages>` (serveur gzip comme GitHub Pages). Sur cette machine (indice CPU ≈ 300, catégorie « mobile milieu de gamme »), la documentation Lighthouse prescrit un multiplicateur ×1 ; le ×4 par défaut vise un ordinateur haut de gamme.
- Après une modification du site : incrémenter `CACHE` dans `sw.js` et tenir la liste `LOCAL_ASSETS` à jour.

## Publier
- `publier.cmd` (hors dépôt) recopie un ancien dossier de travail par-dessus `MUSCULATION/` et ne copie pas les sous-dossiers `data/` et `assets/`. **Ne pas l'utiliser avec la v2** tant que la procédure n'est pas refaite.
- Branche de travail : `refonte-v2`. `main` = version en ligne.

## Contenu privé
- `[data-prive="clé"]` : remplacé par le bloc du même nom du fichier privé importé (HTML assaini : balises de texte, `class`, `style` simple). Sans import, l'élément garde son texte générique (`data-prive-garder`) ou reste masqué.
- `ALLEZ.hourText('A:-90')` : heure réelle si les horaires sont saisis dans le profil, sinon repère relatif.
