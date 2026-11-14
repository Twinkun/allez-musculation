// Audit de rendu final (novembre 2026) : les incohérences corrigées ne reviennent pas.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, plain, ROOT, PROFIL_TEST } = require('./helpers');
const page = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const PAGES = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const TOUT = ['core.js', 'data/programme.js', 'data/nutrition.js', 'data/supplements.js', 'data/repas.js', 'data/fiches.js', 'data/recettes.js'];
// texte visible approximatif : sans styles, scripts, attributs ni balises
const texte = f => page(f).replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');

test('tempo : le 4e chiffre (pause en contraction) suit la pause décrite dans la fiche', () => {
  const A = load({}, { files: TOUT }).ALLEZ, P = A.PROGRAM;
  A.FICHES.forEach(f => {
    const e = P.EXERCISES[f.key], m = /^(\d)-(\d)-(\d)-(\d)$/.exec(e.tempo); if (!m) return;
    const t = [].concat(f.steps || [], (f.schema || []).map(s => s.lbl + ' ' + s.txt)).join(' · ');
    const haut = /[Pp]ause (\d) s (?:en haut|en contraction|bras tendus)/.exec(t), bas = /[Pp]ause (\d) (?:s|seconde) en bas/.exec(t);
    if (haut) assert.equal(+m[4], +haut[1], f.key + ' : pause en contraction ' + haut[1] + ' s, tempo ' + e.tempo);
    if (bas) assert.equal(+m[2], +bas[1], f.key + ' : pause en étirement ' + bas[1] + ' s, tempo ' + e.tempo);
    // la durée de la phase freinée citée dans la fiche est celle du tempo
    const desc = /(?:[Dd]escen(?:te|ds)|[Rr]etour|[Rr]emontée)[^.·]{0,22}?en (\d) s/.exec(t);
    if (desc) assert.equal(+m[1], +desc[1], f.key + ' : phase freinée ' + desc[1] + ' s, tempo ' + e.tempo);
  });
});

test('fiches : une seule durée par consigne, pas de série écrite en dur, typographie française', () => {
  const A = load({}, { files: TOUT }).ALLEZ;
  A.FICHES.forEach(f => {
    const t = JSON.stringify([f.steps, f.breath, f.amp, f.posture, f.errors, f.injury, f.schema]);
    assert.ok(!/\d s[ée]ries?(\/bras)?"/.test(t), f.key + ' : nombre de séries dans la fiche');
    assert.ok(!/\ds\b/.test(t), f.key + ' : « 3s » au lieu de « 3 s »');
    assert.ok(!/[A-Za-zé]: /.test(t), f.key + ' : espace manquante avant « : »');
    assert.ok(A.FICHES_UI.hasAnim(f.svgKey), f.key + ' : animation ' + f.svgKey);
  });
  const src = page('data/fiches.js');
  [/c'est là que le muscle se développe/, /attachment/, /3 faisceaux/, />HOLD</, /'press overhead'/].forEach(rx => assert.ok(!rx.test(src), String(rx)));
  assert.equal(A.fiche('respiration-9090').svgKey, 'respiration');
});

test('repères de charge : les haltères suivent les paliers du matériel (1 kg jusqu\'à 10 kg, puis 2 kg)', () => {
  const P = load({}).ALLEZ.PROGRAM;
  Object.values(plain(P.EXERCISES)).forEach(e => {
    if (!e.charges || P.palier(e.id, 12) !== 2) return;      // haltères seulement
    ['b1', 'b2', 'b3'].forEach(b => { const kg = e.charges[b][0]; assert.ok(kg <= 10 || kg % 2 === 0, e.id + ' ' + b + ' : ' + kg + ' kg'); });
  });
  // au poids du corps : pas de nombre de séries dans le repère (il dépend du bloc)
  ['planche', 'dead-bug', 'planche-laterale'].forEach(id => Object.values(P.EXERCISES[id].chargesTxt).forEach(v => assert.ok(!/^\d × /.test(v), id + ' ' + v)));
  assert.ok(!/PdC/.test(JSON.stringify(P.EXERCISES.tractions.chargesTxt.b2)), 'tractions au poids du corps dès le bloc 2');
});

test('objectifs à 5 ans : poids, masse maigre et masse grasse se tiennent entre eux', () => {
  [PROFIL_TEST, { sex: 'm', age: 30, height: 180, start: { weight: 72, bf: 20, waist: 84, chest: 90, biceps: 33, shoulders: 46, shouldersCirc: null } }].forEach(p => {
    const A = load({ px_profile: p }).ALLEZ, M = A.MODEL.an5, s = p.start, lean0 = s.weight * (1 - s.bf / 100);
    const mid = a => (a[0] + a[1]) / 2;
    const bfCalc = 100 * (1 - (lean0 + mid(M.lean)) / (s.weight + mid(M.weight)));
    assert.ok(Math.abs(bfCalc - (s.bf + mid(M.bf))) < 1.5, 'masse grasse déduite ' + bfCalc.toFixed(1) + ' % / annoncée ' + (s.bf + mid(M.bf)).toFixed(1) + ' %');
  });
});

test('recettes : pieds de fiche et titres liés aux données', () => {
  const rec = page('recettes.html'), nut = page('nutrition.html'), R = load({}).ALLEZ.RECETTES;
  assert.ok(!/timing-block">💪 <strong>\d/.test(rec), 'protéines écrites en dur dans un pied de fiche');
  rec.split('<div class="recipe" id="').slice(1).forEach(p => { const id = p.slice(0, 3); assert.equal((/class="recipe-title">([^<]*)</.exec(p) || [])[1].trim(), R.REC[id].titre, id); });
  nut.split(/<div class="top10-card[^>]*data-rec="/).slice(1).forEach(p => { const id = p.slice(0, 3); assert.equal((/class="top10-title">([^<]*)/.exec(p) || [])[1].trim(), R.REC[id].titre, id + ' (nutrition)'); });
  assert.ok(!/top10-prix">~\d+\.\d/.test(nut), 'prix avec un point décimal');
  assert.ok(!/prébiotiques|3× plus de profondeur|Marinader|aussi salée que la mer/.test(rec));
  // le tirage « Surprends-moi » s'appuie sur les étiquettes françaises
  assert.ok(/isTraining \? \/séance\/i/.test(rec) && /rtag-meal">🏋 Après séance</.test(rec) && !/rtag-meal">[^<]*(workout|training|Banger)/i.test(rec));
});

test('interface : plus de franglais ni de libellé périmé dans le texte des pages', () => {
  const interdits = [/\bStreak\b/i, /\bLogger\b|\blogg[ée]s?\b/i, /TRACK<br>|Achievements|milestone/i, /\bBF\b|BF%/, /Biceps tendu|cm tendu/, /Ouvrir le dashboard|dans le logbook/i, /SET TERMINÉ/, /Push A\b|Pull A\b/, /dopamine intacte/, /recomposition/i];
  PAGES.forEach(f => { const t = texte(f) + ' ' + (f === 'index.html' ? page(f).slice(page(f).indexOf('var T_LUNDI'), page(f).indexOf('var PLAN = ')) : ''); interdits.forEach(rx => assert.ok(!rx.test(t), f + ' ' + rx)); });
  assert.ok(/Ping-pong · Club \(Mardi et vendredi\)/.test(page('dashboard.html')));
  assert.ok(/P\.otherDays\[DOW\[i\]\]/.test(page('dashboard.html')), 'jours de ping-pong dans la semaine en cours');
  assert.ok(/Quatre journées types/.test(page('nutrition.html')) && !/3–3,5 L/.test(page('dashboard.html')));
  assert.ok(/Franchir 750 points/.test(page('pingpong.html')) && /11 critères sur 14/.test(page('comparatif-raquettes.html')));
});

test('mise en page : une phrase avec valeur calculée ne vit pas directement dans un conteneur flex', () => {
  // .erreur-fix (nutrition, posture) : affichage en bloc ; les autres phrases sont enveloppées dans un seul <span>
  ['nutrition.html', 'posture.html'].forEach(f => assert.ok(/\.erreur-fix \{ display: block !important; \}/.test(page(f)), f));
  assert.ok(/<div class="check-box"><\/div><span><span data-az="nutrition\.proteines">/.test(page('lifestyle.html')));
  ['nutrition.html', 'progression.html', 'dashboard.html'].forEach(f => assert.ok(/<style id="az-mobile">[\s\S]*minmax\(0, 1fr\)/.test(page(f)), f + ' : colonnes mobiles'));
});
