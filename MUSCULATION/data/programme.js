/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/programme.js · SOURCE UNIQUE du programme d'entraînement
   ALLEZ.PROGRAM : blocs, exercices (identifiant stable), séances, volume calculé.
   Toutes les pages lisent ce fichier : aucune série, répétition, charge ou
   consigne de programme ne doit être écrite ailleurs.
   Chargé après core.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

  // ── BLOCS (cycle de 13 semaines : 4 + 4 + 4 + 1 deload) ───────────
  // sets(n) = nombre de séries réellement faites pour n séries prévues au programme complet
  var BLOCKS = {
    B1: { code: 'B1', name: 'Apprentissage', weeks: '1 à 4', rirC: '3', rirI: '3', load: 1,
      sets: function (n) { return n >= 3 ? n - 1 : n; },
      desc: 'Charges légères, technique parfaite, haut de la fourchette de reps. RIR 3 partout. Volume réduit (environ 70 % des séries) le temps que le corps s\'adapte.' },
    B2: { code: 'B2', name: 'Progression', weeks: '5 à 8', rirC: '2', rirI: '2', load: 1,
      sets: function (n) { return n; },
      desc: 'Double progression : quand toutes les séries atteignent le haut de la fourchette, +1 palier de charge. RIR 2.' },
    B3: { code: 'B3', name: 'Intensification', weeks: '9 à 12', rirC: '2', rirI: '1', load: 1,
      sets: function (n) { return n; },
      desc: 'Charges les plus lourdes du cycle, bas de fourchette accepté. RIR 2 sur les polyarticulaires, 1 sur les isolations. Jamais d\'échec sur les développés.' },
    DL: { code: 'DL', name: 'Deload', weeks: '13', rirC: '4+', rirI: '4+', load: 0.6,
      sets: function (n) { return Math.max(2, Math.ceil(n / 2)); },
      desc: 'Moitié des séries, charges −40 %, RIR 4+. Samedi : V-Shape allégé ou repos. Le corps assimile le cycle.' }
  };

  // ── GROUPES MUSCULAIRES (pour le calcul du volume) ────────────────
  var MUSCLES = {
    'pectoraux': 'Pectoraux', 'delt-ant': 'Deltoïde antérieur', 'delt-med': 'Deltoïde médial', 'delt-post': 'Deltoïde postérieur',
    'dorsal': 'Grand dorsal', 'haut-dos': 'Haut du dos', 'biceps': 'Biceps', 'triceps': 'Triceps', 'core': 'Core'
  };

  // ── EXERCICES ─────────────────────────────────────────────────────
  // type : c = polyarticulaire · i = isolation · p = posture · k = core
  // unit : 'reps' (défaut) ou 'sec' · bw : poids du corps, pas de charge à saisir
  // cue : consigne technique courte (le détail est dans la fiche)
  // lombaires : niveau de sécurité pour un dos sensible — 'sur' | 'prudence' | 'eviter' (+ consigne)
  // fiche : numéro de la fiche technique (data/fiches.js) · short : nom court pour les listes · aliases : anciens noms (l'historique suit l'identifiant)
  // charges : repères indicatifs par bloc [kg, reps] et à 12 mois
  var EXERCISES = {
    'dev-incline': { fiche: 1, name: 'Développé incliné haltères 30°', short: 'Incliné', muscle: 'Pectoraux hauts', type: 'c', tempo: '3-1-2-0', direct: ['pectoraux'], indirect: ['delt-ant', 'triceps'],
      cue: 'Banc à 30° · coudes à 45-60° du buste · pectoraux hauts',
      lombaires: 'sur', consigne: 'Dos en contact complet avec le banc, pieds à plat.', subs: ['dev-incline-machine'], aliases: ['Développé incliné haltères'],
      charges: { unit: 'kg/main', b1: [14, 12], b2: [16, 12], b3: [18, 10], an1: 22 } },
    'elev-lat': { fiche: 2, name: 'Élévations latérales', short: 'Élévations', muscle: 'Deltoïde médial', type: 'i', tempo: '2-1-3-0', direct: ['delt-med'], indirect: [],
      cue: 'Haltères légers · pas d\'élan · monter à l\'horizontale',
      lombaires: 'sur', consigne: 'Debout, abdos engagés, aucun élan du buste.', subs: ['elev-lat-cable'], aliases: ['Élévations latérales haltères'],
      charges: { unit: 'kg', b1: [5, 15], b2: [6, 14], b3: [7, 12], an1: '9-10' } },
    'dev-militaire': { fiche: 3, name: 'Développé militaire assis', short: 'Militaire', muscle: 'Épaules · Triceps', type: 'c', tempo: '2-1-2-0', direct: ['delt-ant'], indirect: ['delt-med', 'triceps'],
      cue: 'Haltères · dos collé au dossier · abdos engagés',
      lombaires: 'prudence', consigne: 'Charge au-dessus de la tête : dossier indispensable, dos collé, pas de cambrure pour finir la répétition.', subs: ['arnold-press', 'dev-epaules-machine'], aliases: ['Développé militaire haltères assis'],
      charges: { unit: 'kg/main', b1: [10, 12], b2: [12, 11], b3: [13, 10], an1: 18 } },
    'ecarte-cable': { fiche: 4, name: 'Écarté câble high-to-low', short: 'Écarté', muscle: 'Pectoraux', type: 'i', tempo: '2-1-3-0', direct: ['pectoraux'], indirect: ['delt-ant'],
      cue: 'Poulies hautes · arc du haut vers le bas',
      lombaires: 'sur', consigne: 'Un pied devant l\'autre, buste gainé.', subs: ['pec-deck'], aliases: [],
      charges: { unit: 'kg/côté', b1: [8, 15], b2: [9, 14], b3: [10, 12], an1: 15 } },
    'ext-triceps': { fiche: 5, name: 'Extension triceps corde', short: 'Triceps corde', muscle: 'Triceps', type: 'i', tempo: '2-0-2-0', direct: ['triceps'], indirect: [],
      cue: 'Coudes fixes aux flancs · écarter la corde en bas',
      lombaires: 'sur', consigne: 'Buste fixe, coudes aux flancs.', subs: ['ext-triceps-barre-v'], aliases: ['Extension triceps câble corde'],
      charges: { unit: 'kg', b1: [15, 15], b2: [18, 13], b3: [20, 12], an1: 30 } },
    'face-pull': { fiche: 6, name: 'Face pull câble', short: 'Face pull', muscle: 'Posture · Arrière épaule', type: 'p', tempo: '2-2-3-0', star: true, direct: ['delt-post'], indirect: ['haut-dos'],
      cue: 'Hauteur du visage · rotation externe · à ne jamais sauter',
      lombaires: 'sur', consigne: 'Charge légère, buste stable.', subs: ['oiseau-incline', 'band-pull-apart'], aliases: ['Face pull câble ★', 'Face pull', 'Face pull ★'] },
    'tirage-vertical': { fiche: 7, name: 'Tirage vertical prise large', short: 'Tirage vertical', muscle: 'Grand dorsal', type: 'c', tempo: '2-1-3-0', direct: ['dorsal'], indirect: ['biceps', 'haut-dos', 'delt-post'],
      cue: 'Prise à 1,5 fois la largeur des épaules · coudes vers les hanches',
      lombaires: 'sur', consigne: 'Cuisses calées, légère inclinaison fixe du buste, sans balancier.', subs: ['tirage-vertical-neutre', 'tractions'], aliases: [],
      charges: { unit: 'kg', b1: [45, 12], b2: [50, 11], b3: [55, 10], an1: 72 } },
    'rowing-unilateral': { fiche: 8, name: 'Rowing unilatéral haltère', short: 'Rowing haltère', muscle: 'Grand dorsal · Rhomboïdes', type: 'c', tempo: '2-1-3-0', side: true, direct: ['dorsal'], indirect: ['haut-dos', 'biceps', 'delt-post'],
      cue: 'Côté le plus faible en premier · main en appui sur le banc',
      lombaires: 'sur', consigne: 'Main et genou en appui sur le banc : le dos est déchargé. Dos plat obligatoire.', subs: ['rowing-machine'], aliases: [],
      charges: { unit: 'kg', b1: [20, 12], b2: [22, 12], b3: [24, 10], an1: 32 } },
    'rowing-cable': { fiche: 9, name: 'Rowing câble assis prise large', short: 'Rowing câble', muscle: 'Rhomboïdes · Trapèzes', type: 'c', tempo: '2-2-3-0', direct: ['haut-dos'], indirect: ['dorsal', 'delt-post', 'biceps'],
      cue: 'Omoplates serrées · buste droit, pas de balancier',
      lombaires: 'prudence', consigne: 'Buste vertical et fixe : l\'étirement vient des omoplates, jamais du bas du dos qui s\'enroule.', subs: ['rowing-machine'], aliases: ['Rowing câble assis'],
      charges: { unit: 'kg', b1: [30, 15], b2: [35, 13], b3: [40, 12], an1: 55 } },
    'oiseau-incline': { fiche: 10, name: 'Oiseau buste appuyé (banc incliné)', short: 'Oiseau buste appuyé', muscle: 'Deltoïde postérieur', type: 'i', tempo: '2-1-2-0', direct: ['delt-post'], indirect: ['haut-dos'],
      cue: 'Ventre sur le banc incliné · haltères légers',
      lombaires: 'sur', consigne: 'Poitrine soutenue par le banc : aucune charge sur le bas du dos.', subs: ['face-pull', 'pec-deck-inverse'], aliases: ['Oiseau sur banc incliné'],
      charges: { unit: 'kg/main', b1: [4, 18], b2: [5, 16], b3: [6, 15], an1: 8 } },
    'curl-alternes': { fiche: 12, name: 'Curl biceps haltères alternés', short: 'Curl alterné', muscle: 'Biceps', type: 'i', tempo: '2-1-3-0', side: true, direct: ['biceps'], indirect: [],
      cue: 'Supination en haut · descente en 3 s · coudes fixes',
      lombaires: 'sur', consigne: 'Debout ou assis, sans balancer le buste.', subs: ['curl-marteau', 'curl-poulie'], aliases: ['Curl biceps alternés', 'Curl biceps alterné'],
      charges: { unit: 'kg/main', b1: [10, 12], b2: [11, 11], b3: [12, 10], an1: 16 } },
    'arnold-press': { fiche: 14, name: 'Arnold press', short: 'Arnold', muscle: 'Épaules (avant + milieu)', type: 'c', tempo: '3-1-2-0', direct: ['delt-ant'], indirect: ['delt-med', 'triceps'],
      cue: 'Rotation lente des paumes · dos collé au dossier',
      lombaires: 'prudence', consigne: 'Charge au-dessus de la tête : dossier indispensable, côtes basses, pas de cambrure.', subs: ['dev-militaire', 'dev-epaules-machine'], aliases: [],
      charges: { unit: 'kg/main', b1: [10, 12], b2: [11, 12], b3: [12, 10], an1: 16 } },
    'elev-lat-cable': { fiche: 27, name: 'Élévations latérales câble', short: 'Élévations câble', muscle: 'Deltoïde médial', type: 'i', tempo: '2-1-3-0', direct: ['delt-med'], indirect: [],
      cue: 'Poulie basse · tension constante · un côté puis l\'autre',
      lombaires: 'sur', consigne: 'Buste droit, abdos gainés, pas de balancier.', subs: ['elev-lat'], aliases: ['Élévations câble'] },
    'tractions': { fiche: 15, name: 'Tractions / tirage vertical', short: 'Tractions', muscle: 'Grand dorsal', type: 'c', tempo: '2-1-3-0', direct: ['dorsal'], indirect: ['biceps', 'haut-dos', 'delt-post'],
      cue: 'Assistées ou au tirage tant que les tractions strictes ne passent pas · descente en 3 s',
      lombaires: 'sur', consigne: 'Corps gainé, côtes basses, sans cambrer ni se balancer.', subs: ['tirage-vertical'], aliases: ['Pull-ups / Tractions', 'Tractions'],
      chargesTxt: { b1: 'Élastique × 8', b2: 'PdC × 3-5', b3: 'PdC × 6', an1: '8-10 strictes' } },
    'curl-ez': { fiche: 16, name: 'Curl barre EZ', short: 'Curl EZ', muscle: 'Biceps', type: 'i', tempo: '2-1-3-0', direct: ['biceps'], indirect: [],
      cue: 'Debout, tronc fixe',
      lombaires: 'prudence', consigne: 'Debout : fessiers serrés, côtes basses. Si tu cambres ou balances, c\'est trop lourd.', subs: ['curl-alternes', 'curl-poulie'], aliases: [],
      charges: { unit: 'kg', b1: [20, 12], b2: [22, 11], b3: [25, 10], an1: 32 } },
    'curl-concentre': { fiche: 17, name: 'Curl concentré', short: 'Curl concentré', muscle: 'Biceps · pic', type: 'i', tempo: '2-2-3-0', side: true, direct: ['biceps'], indirect: [],
      cue: 'Assis, coude en appui sur la cuisse',
      lombaires: 'prudence', consigne: 'Posture penchée : dos plat, coude en appui sur la cuisse, charge légère.', subs: ['curl-marteau', 'curl-poulie'], aliases: ['Curl concentré haltère'],
      charges: { unit: 'kg', b1: [8, 12], b2: [9, 12], b3: [10, 10], an1: 14 } },
    'ext-overhead': { fiche: 18, name: 'Extension triceps overhead câble', short: 'Overhead', muscle: 'Triceps long', type: 'i', tempo: '3-1-2-0', direct: ['triceps'], indirect: [],
      cue: 'Coudes hauts et fixes · extension complète',
      lombaires: 'prudence', consigne: 'Bras au-dessus de la tête : fente avant, fessiers serrés, côtes basses. Plus sûr encore : à genoux, dos à la poulie.', subs: ['ext-triceps'], aliases: ['Extension triceps overhead', 'Extension overhead câble'],
      charges: { unit: 'kg', b1: [12, 12], b2: [14, 12], b3: [16, 10], an1: 22 } },
    'planche': { fiche: 22, name: 'Planche', short: 'Planche', muscle: 'Finisher · Gainage', type: 'k', unit: 'sec', tempo: 'Statique', direct: ['core'], indirect: [],
      cue: 'Corps gainé de la tête aux talons · fessiers serrés',
      lombaires: 'sur', consigne: 'Corps aligné ; si le bassin tombe, la série est finie.', subs: ['dead-bug'], aliases: ['Planche abdominale', 'Finisher — Planche'],
      chargesTxt: { b1: '3 × 30 s', b2: '3 × 45 s', b3: '3 × 60 s', an1: '3 × 60 s + variantes' } },
    'dead-bug': { fiche: 23, name: 'Dead bug', short: 'Dead bug', muscle: 'Finisher · Core', type: 'k', bw: true, side: true, tempo: 'Lent', direct: ['core'], indirect: [],
      cue: 'Lent · bas du dos plaqué au sol',
      lombaires: 'sur', consigne: 'Bas du dos en contact avec le sol pendant tout le mouvement.', subs: ['planche'], aliases: [],
      chargesTxt: { b1: '3 × 8/côté', b2: '3 × 10/côté', b3: '3 × 12/côté lent', an1: 'version lestée légère' } },
    'bird-dog': { fiche: 20, name: 'Bird dog', short: 'Bird dog', muscle: 'Finisher · Core', type: 'k', bw: true, side: true, tempo: 'Lent', direct: ['core'], indirect: [],
      cue: 'Lent · bassin immobile',
      lombaires: 'sur', consigne: 'Bassin immobile, dos neutre, jambe à hauteur du bassin.', subs: ['planche-laterale'], aliases: [] },
    'planche-laterale': { fiche: 29, name: 'Planche latérale', short: 'Planche latérale', muscle: 'Finisher · Core', type: 'k', unit: 'sec', side: true, tempo: 'Statique', direct: ['core'], indirect: [],
      cue: 'Coude sous l\'épaule · corps aligné · genoux au sol pour débuter',
      lombaires: 'sur', consigne: 'Colonne neutre, corps aligné de la tête aux pieds ; genoux au sol pour débuter.', subs: ['pallof-press'], aliases: [],
      chargesTxt: { b1: '3 × 20 s/côté', b2: '3 × 25 s/côté', b3: '3 × 30 s/côté', an1: '3 × 45 s/côté' } },
    // — Hors séances : échauffement, alternatives et substitutions —
    'band-pull-apart': { fiche: 19, name: 'Band pull-apart élastique', muscle: 'Arrière épaule · Rhomboïdes', type: 'p', bw: true, tempo: '2-1-2-0', direct: ['delt-post'], indirect: ['haut-dos'], lombaires: 'sur', consigne: 'Buste droit, épaules basses.', subs: ['face-pull'], aliases: ['Band pull-apart'], defaut: { sets: 2, reps: '15', rest: 45 } },
    'respiration-9090': { fiche: 28, name: 'Respiration 90/90 (côtes basses)', muscle: 'Diaphragme · Transverse', type: 'k', bw: true, tempo: 'Inspire 4 s · Expire 6-8 s', direct: [], indirect: [], lombaires: 'sur', consigne: 'Allongé, pieds au mur : aucune contrainte.', subs: [], aliases: [], defaut: { sets: 1, reps: '5 respirations', rest: 0 } },
    'pallof-press': { fiche: 24, name: 'Pallof press câble', muscle: 'Core · Anti-rotation', type: 'k', side: true, tempo: '2-1-2-0', direct: ['core'], indirect: [], lombaires: 'sur', consigne: 'Aucune flexion du tronc : le buste résiste à la rotation.', subs: ['planche-laterale'], aliases: [], defaut: { sets: 3, reps: '10-12/côté', rest: 60 } },
    'curl-marteau': { fiche: 13, name: 'Curl marteau', muscle: 'Brachioradial · Biceps', type: 'i', side: true, tempo: '2-0-3-0', direct: ['biceps'], indirect: [], lombaires: 'sur', consigne: 'Sans balancer le buste.', subs: ['curl-alternes'], aliases: [], defaut: { sets: 3, reps: '12/bras', rest: 60 } },
    'vacuum': { fiche: 25, name: 'Vacuum abdominal', muscle: 'Transverse', type: 'k', unit: 'sec', tempo: 'Statique', direct: ['core'], indirect: [], lombaires: 'sur', consigne: 'Dos neutre.', subs: [], aliases: [], defaut: { sets: 3, reps: '30-45 s', rest: 60 } },
    'oiseau-cable': { fiche: 11, name: 'Oiseau câble penché', muscle: 'Deltoïde postérieur', type: 'i', side: true, tempo: '2-1-2-0', direct: ['delt-post'], indirect: ['haut-dos'], lombaires: 'eviter', consigne: 'Buste penché non soutenu : bras de levier sur le bas du dos. Préférer l\'oiseau buste appuyé.', subs: ['oiseau-incline'], aliases: [], defaut: { sets: 3, reps: '15-20', rest: 60 } },
    'hollow-body': { fiche: 21, name: 'Hollow body', muscle: 'Core', type: 'k', unit: 'sec', tempo: 'Statique', direct: ['core'], indirect: [], lombaires: 'eviter', consigne: 'Flexion lombaire maintenue avec un grand bras de levier. Remplacé par la planche latérale.', subs: ['planche-laterale', 'pallof-press'], aliases: ['Hollow body hold', 'Finisher — Hollow body'], defaut: { sets: 3, reps: '20-30 s', rest: 60 } },
    'crunch-cable': { fiche: 26, name: 'Crunchs câble', muscle: 'Abdominaux', type: 'k', tempo: '2-1-2-0', direct: ['core'], indirect: [], lombaires: 'eviter', consigne: 'Flexion du tronc sous charge. Préférer Pallof press, planche ou dead bug.', subs: ['pallof-press', 'planche', 'dead-bug'], aliases: [], defaut: { sets: 3, reps: '15-20', rest: 60 } },
    // — Substitutions sur machine (sans fiche détaillée) : mêmes muscles, dos soutenu —
    'dev-incline-machine': { name: 'Développé incliné machine', muscle: 'Pectoraux hauts', type: 'c', tempo: '3-1-2-0', direct: ['pectoraux'], indirect: ['delt-ant', 'triceps'], lombaires: 'sur', consigne: 'Dos soutenu par le dossier.', subs: ['dev-incline'], aliases: [] },
    'dev-epaules-machine': { name: 'Développé épaules machine', muscle: 'Épaules · Triceps', type: 'c', tempo: '2-1-2-0', direct: ['delt-ant'], indirect: ['delt-med', 'triceps'], lombaires: 'sur', consigne: 'Dos soutenu par le dossier, trajectoire guidée.', subs: ['dev-militaire'], aliases: [] },
    'pec-deck': { name: 'Pec deck (butterfly)', muscle: 'Pectoraux', type: 'i', tempo: '2-1-3-0', direct: ['pectoraux'], indirect: ['delt-ant'], lombaires: 'sur', consigne: 'Assis, dos soutenu.', subs: ['ecarte-cable'], aliases: [] },
    'pec-deck-inverse': { name: 'Pec deck inversé', muscle: 'Deltoïde postérieur', type: 'i', tempo: '2-1-2-0', direct: ['delt-post'], indirect: ['haut-dos'], lombaires: 'sur', consigne: 'Assis, poitrine contre le dossier.', subs: ['oiseau-incline'], aliases: [] },
    'ext-triceps-barre-v': { name: 'Extension triceps barre en V', muscle: 'Triceps', type: 'i', tempo: '2-0-2-0', direct: ['triceps'], indirect: [], lombaires: 'sur', consigne: 'Buste fixe, coudes aux flancs.', subs: ['ext-triceps'], aliases: [] },
    'tirage-vertical-neutre': { name: 'Tirage vertical prise neutre', muscle: 'Grand dorsal', type: 'c', tempo: '2-1-3-0', direct: ['dorsal'], indirect: ['biceps', 'haut-dos', 'delt-post'], lombaires: 'sur', consigne: 'Cuisses calées, buste fixe.', subs: ['tirage-vertical'], aliases: [] },
    'rowing-machine': { name: 'Rowing machine buste appuyé', muscle: 'Dos', type: 'c', tempo: '2-1-3-0', direct: ['dorsal'], indirect: ['haut-dos', 'biceps', 'delt-post'], lombaires: 'sur', consigne: 'Poitrine contre le support : aucune charge sur le bas du dos.', subs: ['rowing-unilateral'], aliases: [] },
    'curl-poulie': { name: 'Curl poulie basse', muscle: 'Biceps', type: 'i', tempo: '2-1-3-0', direct: ['biceps'], indirect: [], lombaires: 'sur', consigne: 'Debout, buste gainé, sans élan.', subs: ['curl-alternes'], aliases: [] }
  };
  Object.keys(EXERCISES).forEach(function (id) { EXERCISES[id].id = id; });

  // ── SÉANCES ───────────────────────────────────────────────────────
  // sets = séries du programme complet (blocs 2 et 3) · rest en secondes · hint = charge indicative pour débuter
  // slot = journée type (A ou B) : l'heure de séance est une donnée privée, saisie dans le profil
  var SESSIONS = {
    push: { id: 'push', name: 'PUSH', day: 1, label: 'Lundi', slot: 'A', focus: 'Pectoraux · Épaules · Triceps + finisher posture', items: [
      { ex: 'dev-incline', sets: 4, reps: '12-15', rest: 90, hint: '12-14 kg/main' },
      { ex: 'elev-lat', sets: 4, reps: '12-15', rest: 60, hint: '4-6 kg' },
      { ex: 'dev-militaire', sets: 4, reps: '10-12', rest: 90, hint: '10 kg/main' },
      { ex: 'ecarte-cable', sets: 3, reps: '12-15', rest: 75, hint: '6-8 kg/côté' },
      { ex: 'ext-triceps', sets: 4, reps: '12-15', rest: 60, hint: '12-15 kg' },
      { ex: 'face-pull', sets: 4, reps: '15-20', rest: 60, hint: '8-10 kg' },
      { ex: 'planche', sets: 3, reps: '30-60 s', rest: 45 }
    ] },
    pull: { id: 'pull', name: 'PULL', day: 4, label: 'Jeudi', slot: 'A', focus: 'Dos · Biceps · Deltoïde post. + finisher core', items: [
      { ex: 'tirage-vertical', sets: 4, reps: '10-12', rest: 90, hint: '40-50 kg' },
      { ex: 'rowing-unilateral', sets: 4, reps: '10-12/côté', rest: 75, hint: '18-20 kg' },
      { ex: 'oiseau-incline', sets: 3, reps: '15-20', rest: 60, hint: '3-5 kg/main' },
      { ex: 'rowing-cable', sets: 3, reps: '12-15', rest: 75, hint: '25-35 kg' },
      { ex: 'face-pull', sets: 4, reps: '15-20', rest: 60, hint: '8-10 kg' },
      { ex: 'curl-alternes', sets: 4, reps: '10-12/bras', rest: 75, hint: '8-10 kg/main' },
      { ex: 'dead-bug', sets: 3, reps: '10/côté', rest: 45 },
      { ex: 'bird-dog', sets: 3, reps: '10/côté', rest: 45 }
    ] },
    vshape: { id: 'vshape', name: 'V-SHAPE', day: 6, label: 'Samedi', slot: 'B', focus: 'Épaules 3D · Dos · Bras + finishers posture & core', items: [
      { ex: 'elev-lat', sets: 4, reps: '15', rest: 60, hint: '4-6 kg' },
      { ex: 'elev-lat-cable', sets: 3, reps: '15', rest: 60, hint: '2,5-5 kg/côté' },
      { ex: 'arnold-press', sets: 4, reps: '10-12', rest: 90, hint: '8-10 kg/main' },
      { ex: 'tractions', sets: 4, reps: 'max (ou 10-12 au tirage)', rest: 120, hint: 'élastique ou 40-45 kg' },
      { ex: 'dev-incline', sets: 3, reps: '10-12', rest: 90, hint: '14-16 kg/main' },
      { ex: 'curl-ez', sets: 3, reps: '10-12', rest: 75, hint: '15-20 kg' },
      { ex: 'curl-concentre', sets: 2, reps: '10-12/bras', rest: 60, hint: '8-10 kg' },
      { ex: 'ext-overhead', sets: 3, reps: '12', rest: 75, hint: '10-15 kg' },
      { ex: 'face-pull', sets: 3, reps: '15', rest: 45, hint: '8-10 kg' },
      { ex: 'planche-laterale', sets: 3, reps: '20-30 s/côté', rest: 45 }
    ] }
  };
  var ORDER = ['push', 'pull', 'vshape'];
  var BY_DAY = { 1: 'push', 4: 'pull', 6: 'vshape' };          // jour de la semaine (0 = dimanche) → séance
  var OTHER_DAYS = { 5: { kind: 'pingpong', name: 'PING-PONG', focus: 'Activité cardio · repos musculaire' } };
  var DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Échauffement commun aux 3 séances
  var WARMUP = { duree: '8-10 min', minutes: 9, etapes: [
    { txt: '5 min rameur/vélo' },
    { ex: 'respiration-9090', txt: 'respiration 90/90 (5 expirations, côtes basses)' },
    { ex: 'band-pull-apart', txt: '2×15 band pull-apart' },
    { ex: 'face-pull', txt: '1 série légère de face pull' },
    { txt: 'séries d\'approche : 50 % × 10 puis 75 % × 5 sur le 1er exercice' }
  ] };

  // ── FONCTIONS ─────────────────────────────────────────────────────
  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/★/g, '').replace(/^finisher\s*[—-]\s*/, '').replace(/[^a-z0-9°+/]+/g, ' ').trim();
  }
  var NAME_INDEX = null;
  function findByName(name) {
    if (!NAME_INDEX) { NAME_INDEX = {}; Object.keys(EXERCISES).forEach(function (id) { var e = EXERCISES[id]; [e.name].concat(e.aliases || []).forEach(function (n) { NAME_INDEX[norm(n)] = id; }); }); }
    return NAME_INDEX[norm(name)] || null;
  }
  function exercise(id) { return EXERCISES[id] || null; }
  function block(code) { return BLOCKS[code] || BLOCKS.B2; }
  function currentBlockCode() { var st = A.status ? A.status() : null; return st && st.started ? st.block.code : 'B1'; }
  function setsFor(item, code) { return block(code).sets(item.sets); }
  function rirFor(ex, code) { var b = block(code); return ex.type === 'k' ? null : ex.type === 'p' ? '2-3' : ex.type === 'c' ? b.rirC : b.rirI; }
  function repsLabel(item) { return item.reps; }
  function prescription(item, code) { return setsFor(item, code) + '×' + item.reps.replace(/ \(.*\)$/, ''); }
  function displayName(ex) { return ex.name + (ex.star ? ' ★' : ''); }

  // Volume hebdomadaire par muscle : séries directes × 1 + séries indirectes × 0,5 (méthode de Pelland et al. 2026, DOI 10.1007/s40279-025-02344-w)
  function volume(code) {
    var out = {}; Object.keys(MUSCLES).forEach(function (m) { out[m] = { label: MUSCLES[m], direct: 0, indirect: 0, weighted: 0, freq: 0 }; });
    ORDER.forEach(function (sid) {
      var seen = {};
      SESSIONS[sid].items.forEach(function (it) {
        var e = EXERCISES[it.ex], n = setsFor(it, code);
        e.direct.forEach(function (m) { out[m].direct += n; if (!seen[m]) { seen[m] = 1; out[m].freq++; } });
        e.indirect.forEach(function (m) { out[m].indirect += n; });
      });
    });
    Object.keys(out).forEach(function (m) { out[m].weighted = out[m].direct + out[m].indirect / 2; });
    return out;
  }
  function totals(code) {
    var t = { week: 0 }; ORDER.forEach(function (sid) { t[sid] = SESSIONS[sid].items.reduce(function (a, it) { return a + setsFor(it, code); }, 0); t.week += t[sid]; });
    return t;
  }
  // Durée estimée (min) : échauffement + séries (≈ 3 s par répétition, ×2 si « par côté ») + repos + 1 min 30 de transition par exercice
  function midNum(reps) { var m = String(reps).match(/\d+/g); if (!m) return 10; return m.length > 1 && /^\D*\d+\s*-\s*\d+/.test(reps) ? (+m[0] + +m[1]) / 2 : +m[0] + (/^max/.test(reps) ? 1 : 0); }
  function duration(sid, code) {
    var s = 0;
    SESSIONS[sid].items.forEach(function (it) {
      var e = EXERCISES[it.ex], n = setsFor(it, code), per = /\/(côté|bras)/.test(it.reps) ? 2 : 1;
      var work = (e.unit === 'sec' ? midNum(it.reps) : midNum(it.reps) * 3) * per;
      s += n * (work + it.rest) + 90;
    });
    return Math.round(WARMUP.minutes + s / 60);
  }
  // Séance prévue un jour donné (0 = dimanche) ou null
  function sessionForDay(dayNum) { return BY_DAY[dayNum] ? SESSIONS[BY_DAY[dayNum]] : null; }
  function sessionsOf(exId) { return ORDER.filter(function (sid) { return SESSIONS[sid].items.some(function (it) { return it.ex === exId; }); }); }
  // Résumé d'une séance sur une ligne : « Incliné 4×12-15 · Élévations 4×12-15 · … »
  function compact(sid, code) { return SESSIONS[sid].items.map(function (it) { var e = EXERCISES[it.ex]; return (e.short || e.name) + ' ' + prescription(it, code); }).join(' · '); }
  function warmupText() { return '<b>Échauffement ' + WARMUP.duree + '</b> · ' + WARMUP.etapes.map(function (e) { return e.txt; }).join(' · '); }

  // Vue au format historique du logbook : { 1: {name, label, exercises:[…]}, 4: …, 6: … }
  function legacySessions(code) {
    var out = {};
    ORDER.forEach(function (sid) {
      var S = SESSIONS[sid];
      out[S.day] = { id: sid, name: S.name, label: S.label, exercises: S.items.map(function (it) {
        var e = EXERCISES[it.ex];
        return { id: e.id, name: displayName(e), muscle: e.muscle, sets: it.sets, reps: it.reps, t: e.type, hint: it.hint || '', restTime: it.rest, tempo: e.tempo, unit: e.unit || 'reps', bw: !!e.bw, lombaires: e.lombaires, consigne: e.consigne };
      }) };
    });
    return out;
  }
  // Résumé pour la liaison data-az : programme.series.semaine, programme.volume.delt-med.direct, programme.duree.push…
  var SUMMARY = null;
  function summary() {
    if (SUMMARY) return SUMMARY;
    var t = totals('B2'), t1 = totals('B1'), v = volume('B2');
    SUMMARY = {
      cycleSemaines: 13,
      series: { semaine: t.week, push: t.push, pull: t.pull, vshape: t.vshape, semaineB1: t1.week, pushB1: t1.push, pullB1: t1.pull, vshapeB1: t1.vshape, partB1: Math.round(t1.week / t.week * 100) },
      exercices: { push: SESSIONS.push.items.length, pull: SESSIONS.pull.items.length, vshape: SESSIONS.vshape.items.length },
      duree: { push: duration('push', 'B2'), pull: duration('pull', 'B2'), vshape: duration('vshape', 'B2'), pushB1: duration('push', 'B1'), pullB1: duration('pull', 'B1'), vshapeB1: duration('vshape', 'B1') },
      volume: v, seances: ORDER.length
    };
    return SUMMARY;
  }

  // ── PERFORMANCE (logbook) ─────────────────────────────────────────
  // 1RM estimé, formule d'Epley : charge × (1 + reps / 30). Repère de comparaison entre séries, pas une mesure.
  function e1rm(kg, reps) { kg = +kg || 0; reps = +reps || 0; return kg > 0 && reps > 0 ? Math.round(kg * (1 + reps / 30) * 10) / 10 : 0; }
  // Meilleure performance d'une liste de séries : 1RM estimé si chargé, sinon répétitions (ou secondes). Séries décochées ignorées.
  function best(sets) {
    var b = { e1rm: 0, reps: 0 };
    (sets || []).forEach(function (s) { if (s.done === false) return; var x = e1rm(s.kg, s.reps); if (x > b.e1rm) b.e1rm = x; if ((+s.reps || 0) > b.reps && !(+s.kg > 0)) b.reps = +s.reps; });
    return b;
  }
  // Haut de la fourchette : « 12-15 » → 15, « 15 » → 15, « 10-12/côté » → 12, « max (…) » → null
  function repsMax(reps) { var s = String(reps || ''); if (/^\s*max/i.test(s)) return null; var m = s.match(/(\d+)\s*(?:-\s*(\d+))?/); return m ? +(m[2] || m[1]) : null; }
  // Double progression : toutes les séries faites au haut de la fourchette, à charge identique → monter d'un palier
  function toutAuHaut(sets, reps) {
    var top = repsMax(reps), faites = (sets || []).filter(function (s) { return s.done !== false && (+s.reps || 0) > 0; });
    if (!top || !faites.length) return false;
    var kg0 = +faites[0].kg || 0;
    return faites.every(function (s) { return (+s.reps || 0) >= top && (+s.kg || 0) === kg0; });
  }
  // Charge proposée selon le bloc : en deload, charge × load (0,6), arrondie au 0,5 kg
  function chargeBloc(kg, code) { kg = +kg || 0; var l = block(code).load; return kg > 0 && l !== 1 ? Math.round(kg * l * 2) / 2 : kg; }

  A.PROGRAM = {
    e1rm: e1rm, best: best, repsMax: repsMax, toutAuHaut: toutAuHaut, chargeBloc: chargeBloc,
    BLOCKS: BLOCKS, MUSCLES: MUSCLES, EXERCISES: EXERCISES, SESSIONS: SESSIONS, ORDER: ORDER, byDay: BY_DAY, otherDays: OTHER_DAYS, DAY_NAMES: DAY_NAMES, WARMUP: WARMUP,
    exercise: exercise, findByName: findByName, displayName: displayName, block: block, currentBlockCode: currentBlockCode,
    setsFor: setsFor, rirFor: rirFor, repsLabel: repsLabel, prescription: prescription,
    volume: volume, totals: totals, duration: duration, sessionForDay: sessionForDay, sessionsOf: sessionsOf, warmupText: warmupText, compact: compact,
    legacySessions: legacySessions, summary: summary
  };
})(typeof window !== 'undefined' ? window : globalThis);
