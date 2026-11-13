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
  const t = fs.readFileSync(path.join(ROOT, 'logbook.html'), 'utf8').replace(/\r\n/g, '\n');
  ['px_logbook_draft_prev', 'data-action="staleResolve" data-args="true"', 'data-action="staleResolve" data-args="false"', 'ALLEZ.PROGRAM.best(', 'P.suggest(', 'data-t="rir"', 'function propagateKg'].forEach(s => assert.ok(t.includes(s), s));
  assert.ok(!/getHistMax/.test(t));
});

// ── Phase 4 : logbook complet ──────────────────────────────────────
const S = (r, kg, rir) => (rir == null ? { reps: r, kg, done: true } : { reps: r, kg, done: true, rir });

test('phase 4 · 1RM de Brzycki (charge × 36 / (37 − reps)) à côté d\'Epley, non défini au-delà de 36 reps', () => {
  const P = load({}).ALLEZ.PROGRAM;
  assert.equal(P.brzycki(100, 1), 100); assert.equal(P.brzycki(14, 12), 20.2); assert.equal(P.brzycki(14, 37), 0); assert.equal(P.brzycki(0, 10), 0);
});

test('phase 4 · records : 1RM estimé (Epley et Brzycki), meilleur volume de séance, séries décochées ignorées', () => {
  const P = load({}).ALLEZ.PROGRAM;
  const r = P.records([
    { date: '2026-11-02', sets: [S(12, 14), S(12, 14), S(10, 14)] },                       // volume 476
    { date: '2026-11-09', sets: [S(8, 16), S(8, 16), { reps: 30, kg: 30, done: false }] }  // volume 256, 1RM 20,3
  ]);
  assert.equal(r.volume, 476); assert.equal(r.volumeDate, '2026-11-02');
  assert.equal(r.e1rm, 20.3); assert.equal(r.e1rmDate, '2026-11-09'); assert.equal(r.brzycki, 20.2);   // Brzycki : 14 × 12 (20,2) > 16 × 8 (19,9)
  assert.equal(P.records([{ date: 'x', sets: [S(40, 0)] }]).reps, 40);
});

test('phase 4 · « Dernière fois : 3×12 @ 14 kg, RIR 2 »', () => {
  const P = load({}).ALLEZ.PROGRAM;
  assert.equal(P.resume([S(12, 14, 2), S(12, 14, 2), S(12, 14, 2)]), '3×12 @ 14 kg, RIR 2');
  assert.equal(P.resume([S(12, 14, 1), S(11, 14, 2), S(10, 14, 3)]), '12/11/10 @ 14 kg, RIR 1-3');
  assert.equal(P.resume([S(12, 14), S(12, 14), S(10, 16)]), '2×12 @ 14 kg + 1×10 @ 16 kg');
  assert.equal(P.resume([S(45, 0), S(40, 0)], 'sec'), '45/40 s');
  assert.equal(P.resume([{ reps: 12, kg: 12.5, done: false }]), '');
});

test('phase 4 · charge suggérée : double progression, deux échecs au bas de la fourchette → −10 %, deload', () => {
  const P = load({}).ALLEZ.PROGRAM;
  const haut = [S(15, 14), S(15, 14), S(15, 14)], milieu = [S(13, 14), S(12, 14)], echec = [S(12, 14), S(10, 14)];
  // + 1 palier quand tout est au haut de la fourchette, reps qui repartent du bas
  assert.deepEqual(plain(P.suggest('dev-incline', '12-15', [haut], 'B2')), { kg: 16, why: 'monte', base: 14, palier: 2, reps: 12 });
  assert.equal(P.suggest('elev-lat', '12-15', [[S(15, 6), S(15, 6)]], 'B2').kg, 7);            // haltère < 10 kg : palier 1 kg
  assert.equal(P.suggest('ecarte-cable', '12-15', [[S(15, 10), S(15, 10)]], 'B2').kg, 12.5);    // câble : 2,5 kg
  // sinon même charge
  assert.equal(P.suggest('dev-incline', '12-15', [milieu], 'B2').why, 'garde');
  // un seul échec : on garde ; deux de suite à la même charge : −10 %, arrondi au 0,5 kg
  assert.equal(P.suggest('dev-incline', '12-15', [echec, milieu], 'B2').why, 'garde');
  assert.deepEqual(plain(P.suggest('dev-incline', '12-15', [echec, echec], 'B2')), { kg: 12.5, why: 'baisse', base: 14 });
  assert.equal(P.suggest('dev-incline', '12-15', [echec, [S(10, 12)]], 'B2').why, 'garde');      // échecs à des charges différentes
  // deload : base × 0,6 (même si la dernière séance était au haut de la fourchette)
  assert.deepEqual(plain(P.suggest('dev-incline', '12-15', [haut], 'DL')), { kg: 8.5, why: 'deload', base: 14 });
  // pas d'historique ou exercice sans charge : pas de suggestion chiffrée
  assert.equal(P.suggest('dev-incline', '12-15', [], 'B2'), null);
  assert.equal(P.suggest('dead-bug', '10/côté', [[S(10, 0)]], 'B2'), null);
});

test('phase 4 · deload automatique en semaine 13 : bloc DL, séries divisées par deux, charges −40 %', () => {
  const { ALLEZ } = load({ px_start_date: '2026-11-02' });
  const st = ALLEZ.status('2027-01-27T12:00:00');               // 86 jours après le départ : semaine 13
  assert.equal(st.week, 13); assert.equal(st.block.code, 'DL');
  assert.equal(ALLEZ.status('2027-02-03T12:00:00').block.code, 'B1');   // semaine 14 : nouveau cycle
  assert.equal(ALLEZ.PROGRAM.setsFor({ sets: 4 }, 'DL'), 2); assert.equal(ALLEZ.PROGRAM.setsFor({ sets: 3 }, 'DL'), 2);
});

test('phase 4 · substitution : jamais un exercice déconseillé pour le dos, séries et repos du créneau gardés', () => {
  const P = load({}).ALLEZ.PROGRAM;
  Object.keys(P.EXERCISES).forEach(id => P.subsOf(id).forEach(s => assert.notEqual(P.exercise(s).lombaires, 'eviter', id + ' → ' + s)));
  const lx = P.legacySessions()[1].exercises[0];                 // PUSH, développé incliné
  const sub = P.substitute(lx, 'dev-incline-machine');
  assert.equal(sub.id, 'dev-incline-machine'); assert.equal(sub.remplace, 'dev-incline');
  assert.equal(sub.sets, lx.sets); assert.equal(sub.reps, lx.reps); assert.equal(sub.restTime, lx.restTime);
  assert.equal(P.substitute(lx, 'crunch-cable'), lx);           // hors liste : refusé
  // planche (secondes) → dead bug (répétitions) : fourchette du dead bug au programme
  const pl = P.legacySessions()[1].exercises.find(e => e.id === 'planche');
  const db = P.substitute(pl, 'dead-bug'); assert.equal(db.unit, 'reps'); assert.equal(db.reps, '10/côté');
});

test('phase 4 · journal : la substitution est conservée (champ « remplace »), l\'historique suit l\'exercice réellement fait', () => {
  const { ALLEZ } = load({});
  ALLEZ.store.upsert({ date: '2026-11-02', kind: 'muscu', seance: 'push', name: 'PUSH', exercises: [{ exId: 'dev-incline-machine', remplace: 'dev-incline', name: 'Développé incliné machine', sets: [S(12, 30)] }] });
  const e = plain(ALLEZ.store.get('2026-11-02_muscu').exercises[0]);
  assert.equal(e.exId, 'dev-incline-machine'); assert.equal(e.remplace, 'dev-incline');
  const b = plain(ALLEZ.backup.build()); const data = b.data || b;
  assert.ok(JSON.stringify(data).includes('"remplace":"dev-incline"'), 'remplace présent dans la sauvegarde');
});

test('phase 4 · logbook.html : suggestion, records, substitution, saisie en 2 taps, brouillon robuste, son débloqué au tap', () => {
  const t = fs.readFileSync(path.join(ROOT, 'logbook.html'), 'utf8').replace(/\r\n/g, '\n');
  ['P.suggest(', 'P.resume(', 'P.records(', 'isDeloadDate(', 'function pickSub', 'P.subsOf(', 'exo.remplace', 'function fBump', 'function fSetRir',
   'function draftSetsFor', 'ids: EXS.map', "addEventListener('pagehide', flushDraft)", 'id="draftWarn"', 'function audioUnlock', 'volumeSets('].forEach(s => assert.ok(t.includes(s), s));
  assert.ok(!/getLastSess|actSess\.exercises\[ei\]\.restTime/.test(t));
  assert.ok(!/new \(window\.AudioContext/.test(t), 'plus de contexte audio créé hors geste à la fin du repos');
});
