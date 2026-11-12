// Tests du programme : cohérence des données et volume calculé. Lancer : node --test tests/
const test = require('node:test'), assert = require('node:assert/strict');
const { load, plain } = require('./helpers');
const { ALLEZ } = load({});
const P = ALLEZ.PROGRAM;

test('chaque exercice de séance existe, a des muscles et un niveau de sécurité', () => {
  P.ORDER.forEach(sid => P.SESSIONS[sid].items.forEach(it => {
    const e = P.EXERCISES[it.ex];
    assert.ok(e, 'exercice inconnu : ' + it.ex);
    assert.ok(it.sets >= 1 && it.rest >= 0 && it.reps);
    assert.ok(['sur', 'prudence'].includes(e.lombaires), it.ex + ' : aucun exercice « à éviter » dans les séances');
    assert.ok(e.direct.length >= 1, it.ex + ' sans muscle direct');
    assert.ok(e.consigne && e.tempo && e.muscle);
  }));
});

test('substitutions : identifiants valides, jamais un exercice « à éviter »', () => {
  Object.values(P.EXERCISES).forEach(e => (e.subs || []).forEach(id => {
    assert.ok(P.EXERCISES[id], e.id + ' → substitution inconnue ' + id);
    assert.notEqual(P.EXERCISES[id].lombaires, 'eviter', e.id + ' → ' + id);
  }));
});

test('décisions du 12-11 : hollow body sorti des séances, planche latérale au samedi, Pallof en substitution', () => {
  const ids = P.ORDER.flatMap(sid => P.SESSIONS[sid].items.map(it => it.ex));
  assert.ok(!ids.includes('hollow-body'));
  assert.ok(P.SESSIONS.vshape.items.some(it => it.ex === 'planche-laterale'));
  assert.deepEqual(plain(P.EXERCISES['planche-laterale'].subs), ['pallof-press']);
  assert.equal(P.EXERCISES['hollow-body'].lombaires, 'eviter');
  // aucune jambe : aucun groupe musculaire du bas du corps
  assert.deepEqual(Object.keys(P.MUSCLES).sort(), ['biceps', 'core', 'delt-ant', 'delt-med', 'delt-post', 'dorsal', 'haut-dos', 'pectoraux', 'triceps']);
});

test('volume hebdomadaire calculé (blocs 2-3) = tableau de l\'audit §5', () => {
  const v = P.volume('B2'), row = m => [v[m].direct, v[m].indirect, v[m].weighted, v[m].freq];
  assert.deepEqual(row('delt-post'), [14, 15, 21.5, 3]);
  assert.deepEqual(row('biceps'), [9, 15, 16.5, 2]);
  assert.deepEqual(row('haut-dos'), [3, 26, 16, 1]);
  assert.deepEqual(row('delt-med'), [11, 8, 15, 2]);
  assert.deepEqual(row('triceps'), [7, 15, 14.5, 2]);
  assert.deepEqual(row('dorsal'), [12, 3, 13.5, 2]);
  assert.deepEqual(row('delt-ant'), [8, 10, 13, 2]);
  assert.deepEqual(row('core'), [12, 0, 12, 3]);
  assert.deepEqual(row('pectoraux'), [10, 0, 10, 2]);
  assert.deepEqual(plain(P.totals('B2')), { week: 86, push: 26, pull: 28, vshape: 32 });
});

test('bloc 1 : environ 70 % des séries ; deload : moitié des séries', () => {
  const t1 = P.totals('B1'), t2 = P.totals('B2'), dl = P.totals('DL');
  assert.deepEqual(plain(t1), { week: 62, push: 19, pull: 20, vshape: 23 });
  assert.ok(t1.week / t2.week > 0.65 && t1.week / t2.week < 0.75);
  assert.equal(P.setsFor({ sets: 4 }, 'DL'), 2); assert.equal(P.setsFor({ sets: 3 }, 'DL'), 2); assert.equal(P.setsFor({ sets: 2 }, 'DL'), 2);
  assert.ok(dl.week < t2.week * 0.62);
  assert.equal(P.BLOCKS.DL.load, 0.6);
});

test('RIR par bloc et par type d\'exercice', () => {
  const c = P.EXERCISES['dev-incline'], i = P.EXERCISES['elev-lat'], p = P.EXERCISES['face-pull'], k = P.EXERCISES['planche'];
  assert.equal(P.rirFor(c, 'B1'), '3'); assert.equal(P.rirFor(i, 'B1'), '3');
  assert.equal(P.rirFor(c, 'B3'), '2'); assert.equal(P.rirFor(i, 'B3'), '1');
  assert.equal(P.rirFor(p, 'B2'), '2-3'); assert.equal(P.rirFor(k, 'B2'), null);
});

test('durées estimées : moins de 90 min au programme complet, moins de 70 min au bloc 1', () => {
  P.ORDER.forEach(sid => { assert.ok(P.duration(sid, 'B2') <= 90, sid + ' ' + P.duration(sid, 'B2')); assert.ok(P.duration(sid, 'B1') < 70, sid + ' B1 ' + P.duration(sid, 'B1')); });
  assert.equal(P.duration('push', 'B2'), 68);
});

test('noms : anciens libellés retrouvés, identifiants uniques', () => {
  assert.equal(P.findByName('Face pull câble ★'), 'face-pull');
  assert.equal(P.findByName('Finisher — Face pull ★'), 'face-pull');
  assert.equal(P.findByName('Développé incliné haltères 30°'), 'dev-incline');
  assert.equal(P.findByName('Développé incliné haltères'), 'dev-incline');
  assert.equal(P.findByName('Hollow body'), 'hollow-body');
  assert.equal(P.findByName('Curl biceps haltères alternés'), 'curl-alternes');
  assert.equal(P.findByName('Exercice inconnu'), null);
  const names = Object.values(P.EXERCISES).flatMap(e => [e.name].concat(e.aliases || []).map(n => n.toLowerCase()));
  assert.equal(new Set(names).size, names.length, 'deux exercices partagent un nom');
});

test('vue logbook : mêmes séances, exercices identifiés', () => {
  const L = P.legacySessions();
  assert.deepEqual(Object.keys(L), ['1', '4', '6']);
  assert.equal(L[1].name, 'PUSH'); assert.equal(L[1].exercises.length, 7);
  assert.equal(L[1].exercises[5].name, 'Face pull câble ★'); assert.equal(L[1].exercises[5].id, 'face-pull');
  assert.equal(L[6].exercises[9].id, 'planche-laterale'); assert.equal(L[6].exercises[9].unit, 'sec');
  assert.equal(L[4].exercises[6].bw, true);
});
