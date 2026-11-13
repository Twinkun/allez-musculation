// Corrections de contenu de la phase 3 (AUDIT §4, §9.5, §3 n° 17-18) : les affirmations retirées ne reviennent pas.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, plain, ROOT } = require('./helpers');
const page = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('fiches : corrections du §9.5 et du §4 appliquées', () => {
  const t = page('data/fiches.js');
  [/exactement 30/, /contraction maximale du sternum/, /Câbles > haltères/, /corde en pronation/, /la moitié du travail/, /résistance de l'air/, /adore l'excentrique/,
   /rentre le ventre vers la colonne/, /Exercice le plus sûr/, /protection spinale optimale/, /Aucun risque/, /2\/3 du volume/, /4×15 léger > 4×8 lourd/, /Prévient l'impingement/,
   /Idéal à jeun/, /résultats en 4-6 semaines/, /seul du programme/, /dossier 90°/, /passer en unilatéral pour corriger/, /\(25°\)/, /côté GAUCHE/, /pas de cisaillement/, /= meilleure hypertrophie/, /Biceps \(chef long\)"/]
    .forEach(rx => assert.ok(!rx.test(t), String(rx)));
  assert.ok(/Rodríguez-Ridao 2020/.test(t) && /Maeo 2023/.test(t) && /Saragiotto 2016/.test(t));
  // une seule charge de départ pour les élévations et l'oiseau, identique au programme
  assert.ok(/4-6 kg/.test(t)); assert.ok(!/4-8 kg/.test(t));
});

test('programme : plus de séries « max » (règle : jamais d\'échec)', () => {
  const P = load({}).ALLEZ.PROGRAM;
  const items = Object.values(plain(P.SESSIONS)).flatMap(s => s.items || s.exercises || []);
  assert.ok(items.length > 20);
  items.forEach(it => assert.ok(!/^\s*max/i.test(String(it.reps)), it.ex + ' : ' + it.reps));
  assert.equal(P.repsMax(items.find(i => i.ex === 'tractions').reps), 8);
});

test('posture, accueil, nutrition : affirmations non étayées retirées', () => {
  const po = page('posture.html'), ix = page('index.html'), nu = page('nutrition.html');
  [/dormir sur le ventre|côté gauche \(pas/i, /Croiser les bras/, /moins de 3 semaines/, /en 4-6 semaines/, /seul exercice qui corrige/, /à jeun = plus efficace/, /rétraction nocturne/].forEach(rx => assert.ok(!rx.test(po), String(rx)));
  [/seul muscle qui élargit/, /ZMA avant le coucher/, /non négociable/, /les jambes travaillent au ping-pong/].forEach(rx => assert.ok(!rx.test(ix), String(rx)));
  [/3 à 3,5 L/, /augmente légèrement les besoins en eau/, /Prendre ZMA/].forEach(rx => assert.ok(!rx.test(nu), String(rx)));
  assert.ok(/2,5 L d'eau totale/.test(nu) && /10\.2903\/j\.efsa\.2010\.1459/.test(nu));
});

test('logbook : courbe d\'un exercice sans charge expliquée, page rechargée après minuit', () => {
  const lb = page('logbook.html');
  assert.ok(/Exercice sans charge/.test(lb));
  assert.ok(/ALLEZ\.reloadOnNewDay\(\)/.test(lb) && /ALLEZ\.reloadOnNewDay\(\)/.test(page('index.html')));
  // dans le bac à sable sans document : la fonction existe et ne plante pas
  const { ALLEZ } = load({}); assert.equal(typeof ALLEZ.reloadOnNewDay, 'function'); ALLEZ.reloadOnNewDay();
});
