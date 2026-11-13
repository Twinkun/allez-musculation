// Phase 6 : une seule source par donnée (grep anti-duplication) et rien de personnel dans ce qui est publié.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, PROFIL_TEST, ROOT } = require('./helpers');
const REPO = path.join(ROOT, '..');
const PAGES = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const SOURCES = PAGES.concat(['core.js', 'sw.js', 'manifest.json', 'assets/base.css']);
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

test('grep : le programme (séries × répétitions, charges indicatives) n\'est écrit que dans data/programme.js', () => {
  // Doublon = un dosage du programme écrit sur la même ligne que le nom (ou l'identifiant) de son exercice
  const P = load({}).ALLEZ.PROGRAM, regles = [];
  Object.values(P.SESSIONS).forEach(s => s.items.forEach(it => {
    const e = P.EXERCISES[it.ex], noms = [e.name, e.short, it.ex].concat(e.aliases || []).filter(Boolean).map(n => n.toLowerCase());
    const reps = it.reps.replace(/ \(.*\)$/, ''), motifs = [];
    if (/^\d/.test(reps)) motifs.push(it.sets + '×' + reps, it.sets + ' × ' + reps, it.sets + 'x' + reps);
    if (it.hint && /\d/.test(it.hint)) motifs.push(it.hint);
    regles.push({ noms, motifs });
  }));
  assert.ok(regles.length >= 25, regles.length + ' exercices de séance');
  const trouves = [];
  SOURCES.forEach(f => read(f).split('\n').forEach((l, i) => {
    const bas = l.toLowerCase();
    regles.forEach(r => { if (r.noms.some(n => bas.includes(n))) r.motifs.forEach(m => { if (l.includes(m)) trouves.push(f + ':' + (i + 1) + ' « ' + m + ' »'); }); });
  }));
  assert.deepEqual(trouves, []);
  // les dosages affichés par posture.html viennent des données
  assert.ok(!/data-prog="[^"]+">\d/.test(read('posture.html')));
  // définitions de séances ou d'exercices hors de data/
  // (une constante dérivée des données par .map(…) est permise : ce n'est pas une copie)
  SOURCES.forEach(f => read(f).split('\n').forEach(l => assert.ok(/\.map\(/.test(l) || !/\bvar (SESSIONS|EXERCISES)\s*=\s*\{|\bconst (SESSIONS|EXERCISES|WORKOUTS|STRENGTH_D|EXDATA|MYPROG)\s*=\s*[\[{]/.test(l), f + ' : ' + l.slice(0, 80))));
});

test('grep : cibles nutritionnelles et objectifs calculés, jamais écrits dans les pages', () => {
  const { ALLEZ } = load({ px_profile: Object.assign({ schemaVersion: 1 }, PROFIL_TEST) });
  const N = ALLEZ.NUTRITION.current(), G = ALLEZ.GOALS;
  const fmt = n => [String(n), String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '), String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')];
  const valeurs = [N.train.kcal, N.rest.kcal].filter(v => v > 999).flatMap(v => fmt(v).map(s => s + ' kcal'));
  PAGES.forEach(f => valeurs.forEach(v => assert.ok(!read(f).includes(v), f + ' contient ' + v)));
  // anciennes valeurs en dur de la v65 (profil réel) : disparues
  ['2 650', '2650 kcal', '2 100 kcal', '72,5 kg', '+217'].forEach(v => PAGES.forEach(f => assert.ok(!read(f).includes(v), f + ' contient « ' + v + ' »')));
  assert.ok(G && typeof G === 'object');
});

test('grep : recettes, compléments et plan repas ne sont définis que dans data/', () => {
  PAGES.forEach(f => {
    const t = read(f);
    assert.ok(!/MEALS_DB|const RECIPES\s*=|const SUPPS?\s*=\s*\[|const MEAL_PLAN\s*=/.test(t), f);
    assert.ok(!/(?:kcal|prot|gluc)\s*:\s*\d{2,4}\s*,\s*(?:prot|gluc|lip|p|g|l)\s*:\s*\d/.test(t), f + ' : macros en dur');
  });
});

test('confidentialité : aucune information médicale, mensuration, horaire, salle ni dossier photo dans les fichiers publiés', () => {
  const INTERDIT = /pectus|scoliose|discopath|L5-?S1|hernie discale|fitness ?park|s[ée]nart|photo physique|photo ping|torse nu|\b178 ?cm\b|\b71 ?kg\b|20,5 ?%|\b8h00\b|\b11h00\b/i;
  const fichiers = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(html|js|css|json|md|txt|svg)$/.test(e.name)) fichiers.push(p); });
  walk(ROOT); ['CHANGELOG.md', 'CLAUDE.md', '.gitignore'].forEach(f => fichiers.push(path.join(REPO, f)));
  const trouves = fichiers.filter(f => INTERDIT.test(fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n'))).map(f => path.relative(REPO, f));
  assert.deepEqual(trouves, []);
  // aucune image ni vidéo hors des icônes
  const medias = []; const w2 = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) w2(p); else if (/\.(jpe?g|png|gif|webp|mp4|mov|pdf)$/i.test(e.name)) medias.push(e.name); });
  w2(ROOT); assert.deepEqual(medias.sort(), ['icon-192.png', 'icon-512.png']);
});
