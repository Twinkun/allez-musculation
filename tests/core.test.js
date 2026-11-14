// Tests du noyau : profil, objectifs calculés, journal, migration, sauvegarde. Lancer : node --test tests/
const test = require('node:test'), assert = require('node:assert/strict');
const { load, get, plain, PROFIL_TEST } = require('./helpers');

// Données de test au format des trois anciennes clés
const ANCIEN = () => ({
  px_logbook: { sessions: [
    { date: '2026-11-16', dayNum: 1, sessionName: 'PUSH', exercises: [
      { name: 'Développé incliné haltères 30°', muscle: 'Pectoraux hauts', unit: 'reps', sets: [{ reps: 12, kg: 14, done: true }, { reps: 11, kg: 14, done: true }, { reps: 10, kg: 14, done: false }] },
      { name: 'Planche', muscle: 'Finisher · Gainage', unit: 'sec', sets: [{ reps: 40, kg: 0, done: true }] }] },
    { date: '2026-11-19', dayNum: 4, sessionName: 'PULL', exercises: [
      { name: 'Oiseau câble penché', muscle: 'Deltoïde postérieur', unit: 'reps', sets: [{ reps: 15, kg: 4, done: true }] }] }
  ] },
  px_sessions_v2: [
    { date: '2026-11-16', type: 'push', duration: '70', weight: '71.4', feeling: '💪', note: 'Bonne séance' },
    { date: '2026-11-20', type: 'legs', duration: '90', weight: '', feeling: '', note: 'Club' },
    { date: '2026-11-21', type: 'other', duration: '', feeling: '', note: '' }
  ],
  px_sessions: ['2026-11-21', '2026-11-23']
});

test('profil absent → profil d\'exemple signalé, objectifs calculables', () => {
  const { ALLEZ } = load({});
  assert.equal(ALLEZ.profileIsSet(), false);
  assert.equal(ALLEZ.profile().exemple, true);
  assert.equal(ALLEZ.PROJ.weight.length, 13);
  assert.equal(typeof ALLEZ.GOALS.weight, 'number');
});

test('profil saisi → objectifs = départ + écarts du modèle ; PROJ du mois 12 = GOALS', () => {
  const { ALLEZ, ls } = load({});
  const r = ALLEZ.setProfile(PROFIL_TEST);
  assert.equal(r.ok, true);
  assert.equal(ALLEZ.profileIsSet(), true);
  const G = ALLEZ.GOALS, P = ALLEZ.PROJ, r1 = x => Math.round(x * 10) / 10;
  assert.equal(G.weight0, 80); assert.equal(G.bf0, 22);
  assert.equal(G.lean0, r1(80 * 0.78));                       // 62,4
  // prise de masse lente : +3 kg, masse maigre +3,5 à +4,5 kg, masse grasse déduite (1 − maigre / poids)
  assert.equal(G.weight, 83); assert.equal(G.waist, 88.5);
  assert.equal(G.lean, r1(G.lean0 + 4.5)); assert.equal(G.leanLow, r1(G.lean0 + 3.5));
  assert.equal(G.bf, r1(100 * (1 - G.lean / G.weight)));         // 19,4
  assert.ok(G.fat < G.fat0);                                    // le gras ne monte pas
  assert.equal(G.shoulders, 49); assert.equal(G.chest, 105); assert.equal(G.biceps, '38–39');
  ['weight', 'bf', 'lean', 'waist'].forEach(k => { assert.equal(P[k][0], G[k + '0']); assert.equal(P[k][12], G[k]); });
  assert.equal(P.leanLow[12], G.leanLow);
  assert.equal(get(ls, 'px_profile').start.weight, 80);       // stocké dans localStorage
});

test('profil invalide refusé, rien n\'est écrit', () => {
  const { ALLEZ, ls } = load({});
  const r = ALLEZ.setProfile({ age: 30, height: 178, start: { weight: 700, bf: 20 } });
  assert.equal(r.ok, false);
  assert.ok(r.errors.length >= 2);
  assert.equal(ls.getItem('px_profile'), null);
});

test('migration : les 3 anciennes clés fusionnent sans perte dans px_journal', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  const all = ALLEZ.store.sessions();
  assert.deepEqual(all.map(s => s.id), ['2026-11-16_muscu', '2026-11-19_muscu', '2026-11-20_pingpong', '2026-11-21_muscu', '2026-11-23_muscu']);
  const push = ALLEZ.store.get('2026-11-16_muscu');
  assert.equal(push.seance, 'push'); assert.equal(push.name, 'PUSH');
  assert.equal(push.exercises.length, 2);
  assert.deepEqual(push.exercises[0].sets, [{ reps: 12, kg: 14, done: true }, { reps: 11, kg: 14, done: true }, { reps: 10, kg: 14, done: false }]);
  assert.equal(push.exercises[1].unit, 'sec');
  assert.equal(push.duration, 70); assert.equal(push.bodyWeight, 71.4); assert.equal(push.feeling, '💪'); assert.equal(push.note, 'Bonne séance');
  assert.deepEqual(push.origins.slice().sort(), ['logbook:2026-11-16', 'v2:2026-11-16']);
  const pp = ALLEZ.store.get('2026-11-20_pingpong');
  assert.equal(pp.kind, 'pingpong'); assert.equal(pp.duration, 90); assert.equal(pp.note, 'Club');
  assert.deepEqual(ALLEZ.store.get('2026-11-21_muscu').origins.slice().sort(), ['streak:2026-11-21', 'v2:2026-11-21']);
  assert.equal(get(ls, 'px_journal').schemaVersion, 2);
});

test('migration : les anciennes clés ne sont ni modifiées ni supprimées, copie de sécurité créée', () => {
  const seed = ANCIEN(), { ALLEZ, ls } = load(seed);
  ALLEZ.store.sessions();
  assert.deepEqual(get(ls, 'px_logbook'), seed.px_logbook);
  assert.deepEqual(get(ls, 'px_sessions_v2'), seed.px_sessions_v2);
  assert.deepEqual(get(ls, 'px_sessions'), seed.px_sessions);
  const copie = get(ls, 'px_backup_avant_v2');
  assert.equal(JSON.parse(copie.donnees.px_logbook).sessions.length, 2);
});

test('migration idempotente : rejouée, elle n\'ajoute ni doublon ni changement', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  ALLEZ.store.sessions();
  const avant = ls.getItem('px_journal');
  assert.deepEqual(plain(ALLEZ.store.migrate()), { added: 0, updated: 0 });
  const second = load(ls._dump());                       // nouveau chargement de page
  second.ALLEZ.store.sessions();
  assert.equal(JSON.stringify(get(second.ls, 'px_journal').sessions), JSON.stringify(JSON.parse(avant).sessions));
});

test('ancienne page en cache qui écrit après la migration → la nouvelle séance est récupérée', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  ALLEZ.store.sessions();
  const lb = get(ls, 'px_logbook');
  lb.sessions.push({ date: '2026-11-26', dayNum: 4, sessionName: 'PULL', exercises: [{ name: 'Tirage vertical prise large', sets: [{ reps: 10, kg: 45, done: true }] }] });
  ls.setItem('px_logbook', JSON.stringify(lb));
  const next = load(ls._dump());
  assert.equal(next.ALLEZ.store.sessions().length, 6);
  assert.equal(next.ALLEZ.store.get('2026-11-26_muscu').exercises[0].sets[0].kg, 45);
});

test('séance supprimée dans le journal → ne ressuscite pas à la fusion suivante', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  assert.equal(ALLEZ.store.remove('2026-11-19_muscu'), true);
  const next = load(ls._dump());
  assert.equal(next.ALLEZ.store.get('2026-11-19_muscu'), null);
  assert.equal(next.ALLEZ.store.sessions().length, 4);
});

test('séance modifiée dans la v2 : l\'ancienne clé ne l\'écrase plus', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  const s = ALLEZ.store.get('2026-11-16_muscu');
  s.exercises[0].sets[0].kg = 16;
  ALLEZ.store.upsert(s);
  const next = load(ls._dump());
  assert.equal(next.ALLEZ.store.get('2026-11-16_muscu').exercises[0].sets[0].kg, 16);
});

test('identifiant stable : l\'ancien nom « Oiseau câble penché » garde son historique', () => {
  const { ALLEZ } = load(ANCIEN());
  const ex = ALLEZ.store.get('2026-11-19_muscu').exercises[0];
  assert.equal(ex.exId, ALLEZ.PROGRAM.findByName('Oiseau câble penché'));
  assert.ok(ex.exId);
  assert.equal(ALLEZ.bestKg(ALLEZ.PROGRAM.findByName('Développé incliné haltères 30°')), 14);
});

test('séries : le ping-pong ne compte pas dans la série de musculation', () => {
  const { ALLEZ } = load(ANCIEN(), { now: '2026-11-24T10:00:00' });
  assert.equal(ALLEZ.store.sessions('muscu').length, 4);
  assert.equal(ALLEZ.store.sessions('pingpong').length, 1);
  assert.equal(ALLEZ.streak().total, 4);
  assert.equal(ALLEZ.streak().cur, 4);
});

test('import : ancienne sauvegarde (format 1) convertie et résumée', () => {
  const a = ANCIEN(), { ALLEZ } = load({});
  const fichier = JSON.stringify({ app: 'ALLEZ', exported: '2026-11-24T08:00:00.000Z', start_date: '2026-11-16', logbook: a.px_logbook, sessions_v2: a.px_sessions_v2, streak_sessions: a.px_sessions, measures: [{ date: '16 novembre 2026', iso: '2026-11-16', weight: '71.4' }] });
  const r = ALLEZ.backup.parse(fichier);
  assert.equal(r.ok, true);
  assert.equal(r.summary.format, 1); assert.equal(r.summary.sessions, 5); assert.equal(r.summary.detaillees, 2); assert.equal(r.summary.pingpong, 1); assert.equal(r.summary.measures, 1);
  assert.equal(r.summary.start_date, '2026-11-16');
  ALLEZ.backup.apply(r.data);
  assert.equal(ALLEZ.store.sessions().length, 5);
  assert.equal(ALLEZ.getStartISO(), '2026-11-16');
  assert.equal(ALLEZ.measures().length, 1);
});

test('import : fichier corrompu refusé sans rien écrire (measures non-tableau, JSON tronqué, fichier étranger)', () => {
  const { ALLEZ, ls } = load({ px_measures: [{ iso: '2026-11-16', weight: 71 }] });
  const avant = JSON.stringify(ls._dump());
  const bad = ALLEZ.backup.parse(JSON.stringify({ app: 'ALLEZ', logbook: { sessions: [] }, measures: { weight: 71 } }));
  assert.equal(bad.ok, false); assert.match(bad.errors[0], /measures/);
  assert.equal(ALLEZ.backup.parse('{"logbook":').ok, false);
  assert.equal(ALLEZ.backup.parse(JSON.stringify({ hello: 'world' })).ok, false);
  assert.equal(ALLEZ.backup.parse(JSON.stringify([1, 2])).ok, false);
  assert.equal(ALLEZ.backup.parse(JSON.stringify({ logbook: { sessions: 'x' } })).ok, false);
  assert.equal(JSON.stringify(ls._dump()), avant);
});

test('import : entrées invalides écartées avec avertissement, le reste est gardé', () => {
  const { ALLEZ } = load({});
  const r = ALLEZ.backup.parse(JSON.stringify({ logbook: { sessions: [{ date: '2026-11-16', sessionName: 'PUSH', exercises: [] }, { date: 'hier', exercises: [] }, null] }, measures: [{ iso: '2026-11-16', weight: 71 }, 'x'] }));
  assert.equal(r.ok, true);
  assert.equal(r.summary.sessions, 1); assert.equal(r.summary.measures, 1);
  assert.equal(r.warnings.length, 2);
});

test('export puis import (format 2) : tout est identique', () => {
  const { ALLEZ, ls } = load(Object.assign(ANCIEN(), { px_start_date: '2026-11-16', px_measures: [{ iso: '2026-11-16', weight: 71.4, waist: 86 }], px_day_plan_1: { date: 'x', idx: 2 }, px_logbook_draft: { date: '2026-11-24', dayNum: 1, sets: {} } }));
  ALLEZ.setProfile(PROFIL_TEST);
  const dump = JSON.stringify(ALLEZ.backup.build());
  const neuf = load({});
  const r = neuf.ALLEZ.backup.parse(dump);
  assert.equal(r.ok, true); assert.equal(r.summary.format, 2);
  neuf.ALLEZ.backup.apply(r.data);
  assert.equal(JSON.stringify(neuf.ALLEZ.store.sessions()), JSON.stringify(ALLEZ.store.sessions()));
  assert.deepEqual(get(neuf.ls, 'px_measures'), get(ls, 'px_measures'));
  assert.deepEqual(get(neuf.ls, 'px_day_plan_1'), { date: 'x', idx: 2 });
  assert.deepEqual(get(neuf.ls, 'px_logbook_draft'), get(ls, 'px_logbook_draft'));
  assert.equal(neuf.ALLEZ.getStartISO(), '2026-11-16');
  assert.equal(neuf.ALLEZ.GOALS.weight, ALLEZ.GOALS.weight);
});

test('import partiel (profil seul) : les séances de l\'appareil sont conservées', () => {
  const { ALLEZ } = load(ANCIEN());
  ALLEZ.store.sessions();
  const r = ALLEZ.backup.parse(JSON.stringify({ app: 'ALLEZ', format: 2, profile: PROFIL_TEST, prive: { blocs: { 'a.b': '<p>x</p>' }, horaires: { A: '08:00', Z: 'nope' } } }));
  assert.equal(r.ok, true);
  assert.deepEqual(plain(r.summary.sections), ['profile', 'prive']);
  ALLEZ.backup.apply(r.data);
  assert.equal(ALLEZ.store.sessions().length, 5);
  assert.equal(ALLEZ.profileIsSet(), true);
  assert.equal(ALLEZ.prive('a.b'), '<p>x</p>');
  assert.equal(ALLEZ.hourText('A:-90'), '6h30');
  assert.equal(ALLEZ.hourText('Z:0'), null);
});

test('import qui remplace les séances : les anciennes clés de l\'appareil ne ressuscitent rien', () => {
  const { ALLEZ, ls } = load(ANCIEN());
  ALLEZ.store.sessions();
  const r = ALLEZ.backup.parse(JSON.stringify({ app: 'ALLEZ', format: 2, journal: { schemaVersion: 2, sessions: [{ date: '2026-12-01', kind: 'muscu', seance: 'push', exercises: [] }], removed: [] } }));
  ALLEZ.backup.apply(r.data);
  const next = load(ls._dump());
  assert.deepEqual(next.ALLEZ.store.sessions().map(s => s.id), ['2026-12-01_muscu']);
});

test('rappel de sauvegarde : plus de 5 nouvelles séances ou plus de 14 jours avec du nouveau', () => {
  const j = n => ({ schemaVersion: 2, removed: [], sessions: Array.from({ length: n }, (_, i) => ({ id: '2026-11-' + String(i + 1).padStart(2, '0') + '_muscu', date: '2026-11-' + String(i + 1).padStart(2, '0'), kind: 'muscu', exercises: [], origins: [] })) });
  let a = load({}, { now: '2026-11-30T10:00:00' }).ALLEZ;
  assert.equal(a.backup.due().due, false);                                                        // aucune donnée
  a = load({ px_journal: j(8), px_last_backup: { date: '2026-11-25T10:00:00.000Z', sessions: 2, measures: 0 } }, { now: '2026-11-30T10:00:00' }).ALLEZ;
  assert.equal(a.backup.due().due, true); assert.equal(a.backup.due().newSessions, 6);           // 6 nouvelles
  a = load({ px_journal: j(3), px_last_backup: { date: '2026-11-10T10:00:00.000Z', sessions: 2, measures: 0 } }, { now: '2026-11-30T10:00:00' }).ALLEZ;
  assert.equal(a.backup.due().due, true);                                                         // 20 jours, 1 nouvelle
  a = load({ px_journal: j(3), px_last_backup: { date: '2026-11-28T10:00:00.000Z', sessions: 2, measures: 0 } }, { now: '2026-11-30T10:00:00' }).ALLEZ;
  assert.equal(a.backup.due().due, false);                                                        // récent, 1 nouvelle
  a = load({ px_journal: j(3), px_last_backup: { date: '2026-11-01T10:00:00.000Z', sessions: 3, measures: 0 } }, { now: '2026-11-30T10:00:00' }).ALLEZ;
  assert.equal(a.backup.due().due, false);                                                        // ancien, rien de nouveau
});

test('liaison : value() et fmt()', () => {
  const { ALLEZ } = load({});
  ALLEZ.setProfile(PROFIL_TEST);
  assert.equal(ALLEZ.value('goals.weight'), 83);
  assert.equal(ALLEZ.value('proj.bf.12'), 19.4);
  assert.equal(ALLEZ.value('profile.height'), 182);
  assert.equal(ALLEZ.fmt(81.5, '1'), '81,5'); assert.equal(ALLEZ.fmt(2650, 'int'), '2 650'); assert.equal(ALLEZ.fmt(4.5, '+1'), '+4,5'); assert.equal(ALLEZ.fmt(-4, '+0'), '−4');
  assert.equal(ALLEZ.fmt(undefined, '1'), '—');
});
