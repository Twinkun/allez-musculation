// Tests des cibles nutritionnelles et du cumul des compléments. Lancer : node --test "tests/*.test.js"
const test = require('node:test'), assert = require('node:assert/strict');
const { load, plain, PROFIL_TEST } = require('./helpers');

test('nutrition : cibles calculées depuis le profil (Mifflin-St Jeor), cohérentes entre elles', () => {
  const { ALLEZ } = load({}); ALLEZ.setProfile(PROFIL_TEST);
  const N = ALLEZ.NUTRITION.current();
  assert.equal(N.bmr, Math.round(10 * 80 + 6.25 * 182 - 5 * 35 + 5));          // 1 768
  assert.equal(N.tdee, Math.round(N.bmr * 1.45));
  assert.equal(N.train.kcal % 50, 0); assert.equal(N.rest.kcal % 50, 0);
  assert.equal(N.train.delta, N.train.kcal - N.tdee); assert.ok(N.train.delta > 0); assert.ok(N.rest.delta < 0);
  assert.equal(N.proteines, 180);                                              // 2,25 g/kg × 80, arrondi à 5 g
  // les macros redonnent les calories à ±3 kcal (arrondi des glucides)
  [N.train, N.rest].forEach(d => assert.ok(Math.abs(d.p * 4 + d.g * 4 + d.l * 9 - d.kcal) <= 3));
  assert.equal(N.moyenne, Math.round((3 * N.train.kcal + 4 * N.rest.kcal) / 7));
  assert.equal(N.ecartMoyen, N.moyenne - N.tdee);
  assert.equal(N.proteinesMin, 128); assert.equal(N.proteinesMax, 176);
});

test('nutrition : femme → constante −161 ; changement de profil → recalcul', () => {
  const { ALLEZ } = load({});
  ALLEZ.setProfile(Object.assign({}, PROFIL_TEST, { sex: 'f' }));
  const f = ALLEZ.NUTRITION.current().bmr;
  ALLEZ.setProfile(PROFIL_TEST);
  assert.equal(ALLEZ.NUTRITION.current().bmr - f, 166);
});

test('compléments : cumul du stack actuel (UnoCardio avec vitamine D, 2 capsules)', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, c = plain(S.cumul(S.STACKS.actuel));
  assert.equal(c.vitd.supp, 110);                       // Opti-Men 10 + D3 50 + UnoCardio 2 × 25
  assert.equal(c.vitd.min, 112.1); assert.equal(c.vitd.max, 120.5); assert.equal(c.vitd.statut, 'depasse');
  assert.equal(c.zinc.supp, 22); assert.equal(c.zinc.min, 31); assert.equal(c.zinc.max, 32.3); assert.equal(c.zinc.statut, 'depasse');
  assert.equal(c.b6.supp, 8.9); assert.equal(c.b6.min, 11.4); assert.equal(c.b6.max, 12.4); assert.equal(c.b6.statut, 'limite');
  assert.equal(c.mg.supp, 230); assert.equal(c.mg.max, 230); assert.equal(c.mg.statut, 'ok');   // limite sur les compléments seuls
  assert.deepEqual(plain(S.alerts(S.STACKS.actuel)).map(a => a.nutriment + ':' + a.statut), ['vitd:depasse', 'zinc:depasse', 'b6:limite']);
});

test('compléments : même stack avec un oméga-3 sans vitamine D', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, c = plain(S.cumul(S.STACKS.actuel, { omega3SansVitD: true }));
  assert.equal(c.vitd.supp, 60); assert.equal(c.vitd.min, 62.1); assert.equal(c.vitd.max, 70.5); assert.equal(c.vitd.statut, 'ok');
  assert.equal(c.zinc.statut, 'depasse');
});

test('compléments : la proposition passe sous toutes les limites', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, c = plain(S.cumul(S.STACKS.proposition));
  assert.equal(c.vitd.supp, 35); assert.equal(c.vitd.max, 45.5);
  assert.equal(c.zinc.supp, 12); assert.equal(c.zinc.max, 22.3);
  assert.equal(c.b6.max, 8.9); assert.equal(c.mg.supp, 80);
  Object.values(c).forEach(x => assert.equal(x.statut, 'ok'));
  assert.equal(S.alerts(S.STACKS.proposition).length, 0);
});

test('compléments : chaque effet a un niveau de preuve, chaque référence citée existe', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS;
  Object.values(S.PRODUCTS).forEach(p => {
    assert.ok(p.effets.length >= 1, p.id);
    p.effets.forEach(e => { assert.ok(['A', 'B', 'C'].includes(e.preuve), p.id); (e.refs || []).forEach(r => assert.ok(S.REF[r], p.id + ' → ' + r)); });
  });
  const testo = id => S.PRODUCTS[id].effets.find(e => /Testostérone/.test(e.effet));
  assert.equal(testo('d3').preuve, 'C'); assert.equal(testo('ashwagandha').preuve, 'C'); assert.equal(testo('zma').preuve, 'C');
  assert.equal(S.UL.vitd.ul, 100); assert.equal(S.UL.zinc.ul, 25); assert.equal(S.UL.b6.ul, 12); assert.equal(S.UL.mg.ul, 250);
});
