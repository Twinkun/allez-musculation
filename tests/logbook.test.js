// Logique du logbook (data/programme.js) : record au 1RM estimé, double progression, charge du deload.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, plain, ROOT } = require('./helpers');

test('record : 14 kg × 20 bat 14 kg × 13 (1RM estimé d\'Epley), pas seulement la charge maximale', () => {
  const P = load({}).ALLEZ.PROGRAM;
  assert.equal(P.e1rm(14, 13), 20.1); assert.equal(P.e1rm(14, 20), 23.3); assert.equal(P.e1rm(0, 10), 0);
  const avant = P.best([{ reps: 13, kg: 14 }]), apres = P.best([{ reps: 20, kg: 14 }]);
  assert.ok(apres.e1rm > avant.e1rm);
  // séries décochées ignorées ; sans charge : on compare les répétitions
  assert.equal(P.best([{ reps: 30, kg: 20, done: false }, { reps: 10, kg: 10 }]).e1rm, 13.3);
  assert.equal(P.best([{ reps: 8, kg: 0 }, { reps: 11, kg: 0 }]).reps, 11);
});

test('double progression : palier suggéré seulement si toutes les séries sont au haut de la fourchette, à charge égale', () => {
  const P = load({}).ALLEZ.PROGRAM;
  assert.equal(P.repsMax('12-15'), 15); assert.equal(P.repsMax('15'), 15); assert.equal(P.repsMax('10-12/côté'), 12); assert.equal(P.repsMax('max (ou 10-12 au tirage)'), null);
  const s = (r, kg) => ({ reps: r, kg, done: true });
  assert.equal(P.toutAuHaut([s(15, 14), s(15, 14), s(16, 14)], '12-15'), true);
  assert.equal(P.toutAuHaut([s(15, 14), s(14, 14)], '12-15'), false);
  assert.equal(P.toutAuHaut([s(15, 14), s(15, 12)], '12-15'), false);
  assert.equal(P.toutAuHaut([], '12-15'), false);
});

test('deload : charge × 0,6 arrondie au 0,5 kg ; blocs 1 à 3 inchangés', () => {
  const P = load({}).ALLEZ.PROGRAM;
  assert.equal(P.BLOCKS.DL.load, 0.6);
  assert.equal(P.chargeBloc(14, 'DL'), 8.5); assert.equal(P.chargeBloc(45, 'DL'), 27); assert.equal(P.chargeBloc(0, 'DL'), 0);
  ['B1', 'B2', 'B3'].forEach(c => assert.equal(P.chargeBloc(14, c), 14));
});

test('journal : le RIR saisi est conservé, les valeurs aberrantes écartées', () => {
  const { ALLEZ } = load({});
  ALLEZ.store.upsert({ date: '2026-11-02', kind: 'muscu', seance: 'push', name: 'PUSH', exercises: [{ exId: 'dev-incline', name: 'Développé incliné', sets: [{ reps: 12, kg: 14, rir: 2 }, { reps: 12, kg: 14, rir: 42 }] }] });
  const sets = plain(ALLEZ.store.get('2026-11-02_muscu').exercises[0].sets);
  assert.equal(sets[0].rir, 2); assert.equal(sets[1].rir, undefined);
});

test('sauvegarde : le brouillon mis de côté (jour précédent) fait partie de l\'export', () => {
  const draft = { date: '2026-11-01', dayNum: 1, sets: { 0: [{ reps: 12, kg: 14, done: true }] } };
  const { ALLEZ } = load({ px_logbook_draft_prev: draft });
  const b = plain(ALLEZ.backup.build());
  assert.deepEqual((b.data || b).logbook_draft_prev, draft);
});

test('logbook.html : brouillon d\'un autre jour signalé et récupérable, record au 1RM estimé, colonne RIR, recopie de la charge', () => {
  const t = fs.readFileSync(path.join(ROOT, 'logbook.html'), 'utf8');
  ['px_logbook_draft_prev', 'staleResolve(true)', 'staleResolve(false)', 'ALLEZ.PROGRAM.best(', 'ALLEZ.PROGRAM.chargeBloc(', 'ALLEZ.PROGRAM.toutAuHaut(', 'data-t="rir"', 'function propagateKg'].forEach(s => assert.ok(t.includes(s), s));
  assert.ok(!/getHistMax/.test(t));
});
