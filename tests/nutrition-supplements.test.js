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

test('compléments : le stack actuel (1 UnoCardio, sans D3 ni ZMA) est sous toutes les limites EFSA', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, c = plain(S.cumul());
  assert.equal(c.vitd.supp, 35); assert.equal(c.vitd.min, 37.1); assert.equal(c.vitd.max, 45.5);   // Opti-Men 10 + UnoCardio 25
  assert.equal(c.zinc.supp, 12); assert.equal(c.zinc.min, 21); assert.equal(c.zinc.max, 22.3);      // Opti-Men seul
  assert.equal(c.b6.supp, 5.4); assert.equal(c.b6.max, 8.9);
  assert.equal(c.mg.supp, 80);
  Object.values(c).forEach(x => assert.equal(x.statut, 'ok', x.label));
  assert.equal(S.alerts().length, 0);
  assert.equal(plain(S.summary()).nb, 6);
});

test('compléments : D3 séparée et ZMA ne sont plus des produits ; UnoCardio à 1 capsule', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS;
  assert.equal(S.PRODUCTS.d3, undefined); assert.equal(S.PRODUCTS.zma, undefined);
  assert.equal(S.STACKS.actuel.omega3, 1);
  assert.deepEqual(plain(S.active().map(p => p.id)).sort(), ['ashwagandha', 'collagene', 'creatine', 'omega3', 'optimen', 'whey']);
  assert.ok(!/D3 |ZMA/.test(S.stackLabel('matin') + S.stackLabel('soir') + S.stackLabel('pre')));
});

test('compléments : l\'ancien stack (2 capsules + D3 + ZMA) dépassait vitamine D et zinc', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, c = plain(S.cumul(S.STACKS.ancien));
  assert.equal(c.vitd.supp, 110); assert.equal(c.vitd.min, 112.1); assert.equal(c.vitd.max, 120.5); assert.equal(c.vitd.statut, 'depasse');
  assert.equal(c.zinc.supp, 22); assert.equal(c.zinc.min, 31); assert.equal(c.zinc.max, 32.3); assert.equal(c.zinc.statut, 'depasse');
  assert.equal(c.b6.supp, 8.9); assert.equal(c.b6.statut, 'limite'); assert.equal(c.mg.supp, 230);
});

test('compléments : ashwagandha en deux prises de 300 mg, matin et soir, avec un repas (schéma des essais)', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS, a = S.PRODUCTS.ashwagandha;
  assert.ok(S.hasMoment(a, 'matin') && S.hasMoment(a, 'soir'));
  assert.match(S.stackLabel('matin'), /Ashwagandha 300 mg/); assert.match(S.stackLabel('soir'), /Ashwagandha 300 mg/);
  assert.equal(S.momentText('soir'), 'avec le dîner');
  assert.match(a.dose, /Chandrasekhar 2012, Wankhede 2015/);
  assert.ok(!/2 h après|laitage/.test(a.quand + a.dose));
});

test('compléments : chaque effet a un niveau de preuve, chaque référence citée existe', () => {
  const { ALLEZ } = load({}); const S = ALLEZ.SUPPLEMENTS;
  Object.values(S.PRODUCTS).forEach(p => {
    assert.ok(p.effets.length >= 1, p.id);
    p.effets.forEach(e => { assert.ok(['A', 'B', 'C'].includes(e.preuve), p.id); (e.refs || []).forEach(r => assert.ok(S.REF[r], p.id + ' → ' + r)); });
  });
  const testo = id => S.PRODUCTS[id].effets.find(e => /[Tt]estostérone/.test(e.effet));
  assert.equal(testo('omega3').preuve, 'C'); assert.equal(testo('ashwagandha').preuve, 'C');
  assert.equal(S.UL.vitd.ul, 100); assert.equal(S.UL.zinc.ul, 25); assert.equal(S.UL.b6.ul, 12); assert.equal(S.UL.mg.ul, 250);
});
