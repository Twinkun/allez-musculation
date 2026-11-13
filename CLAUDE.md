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

## Vérifier
- `node --test tests/*.test.js` (noyau, programme, nutrition, compléments, recettes, logbook, corrections de contenu).
- Tests navigateur (Playwright, Edge) : dans `_prive/tests/`, hors dépôt.
- Après une modification du site : incrémenter `CACHE` dans `sw.js` et tenir la liste `LOCAL_ASSETS` à jour.

## Publier
- `publier.cmd` (hors dépôt) recopie un ancien dossier de travail par-dessus `MUSCULATION/` et ne copie pas les sous-dossiers `data/` et `assets/`. **Ne pas l'utiliser avec la v2** tant que la procédure n'est pas refaite.
- Branche de travail : `refonte-v2`. `main` = version en ligne.

## Contenu privé
- `[data-prive="clé"]` : remplacé par le bloc du même nom du fichier privé importé (HTML assaini : balises de texte, `class`, `style` simple). Sans import, l'élément garde son texte générique (`data-prive-garder`) ou reste masqué.
- `ALLEZ.hourText('A:-90')` : heure réelle si les horaires sont saisis dans le profil, sinon repère relatif.
