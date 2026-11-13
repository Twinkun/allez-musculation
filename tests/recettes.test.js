// Tests des recettes (data/recettes.js), de la liste de courses et des pages qui les lisent.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, plain, ROOT } = require('./helpers');
const page = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

test('recettes : 50 fiches, chaque aliment compté a une source et des valeurs complètes', () => {
  const R = load({}).ALLEZ.RECETTES;
  assert.equal(R.ORDER.length, 50);
  assert.deepEqual(plain(R.ORDER), Array.from({ length: 50 }, (_, i) => 'r' + String(i + 1).padStart(2, '0')));
  Object.entries(R.ALIM).forEach(([k, f]) => {
    assert.match(f.src, /^(Ciqual \d+|USDA FDC \d+)/, k);
    ['kcal', 'p', 'g', 'l'].forEach(x => assert.ok(typeof f[x] === 'number' && f[x] >= 0, k + '.' + x));
    assert.ok(R.RAYONS.includes(f.rayon), k);
  });
  R.ORDER.forEach(id => {
    const rec = R.REC[id];
    assert.ok(rec.note && rec.note.length > 40, id + ' note');
    assert.ok(rec.lignes.some(l => l.a.length), id);
    rec.lignes.forEach(l => l.a.forEach(([k, g]) => { assert.ok(R.ALIM[k], id + ' ' + k); assert.ok(g > 0, id + ' ' + k); }));
  });
});

test('recettes : totaux = somme des ingrédients ; recalcul Ciqual du §9.2 retrouvé', () => {
  const R = load({}).ALLEZ.RECETTES;
  R.ORDER.forEach(id => {
    let k = 0; R.REC[id].lignes.forEach(l => l.a.forEach(([a, g]) => { k += R.ALIM[a].kcal * g / 100; }));
    assert.equal(R.total(id).kcal, Math.round(k / 5) * 5, id);
    const t = R.exact(id), m = 4 * t.p + 4 * t.g + 9 * t.l;           // Atwater, fibres non comptées : écart < 10 %
    assert.ok(Math.abs(m - t.kcal) / t.kcal < 0.1, id + ' ' + Math.round(m) + ' / ' + Math.round(t.kcal));
  });
  // Valeurs du tableau AUDIT §9.2 (kcal · P · G · L)
  const ref = { r01: [928, 53, 45, 57], r21: [834, 73, 37, 42], r30: [1305, 104, 150, 31], r33: [537, 56, 57, 8], r46: [608, 50, 58, 17] };
  Object.entries(ref).forEach(([id, [kc, p, g, l]]) => {
    const t = R.exact(id);
    assert.ok(Math.abs(t.kcal - kc) < 1, id + ' kcal ' + t.kcal); assert.equal(Math.round(t.p), p); assert.equal(Math.round(t.g), g); assert.equal(Math.round(t.l), l);
  });
  assert.equal(R.densite('r01'), Math.round(R.exact('r01').p / R.exact('r01').kcal * 1000) / 10);
});

test('courses : même ingrédient additionné quelle que soit la recette, rien de perdu, riz cuit converti en cru', () => {
  const R = load({}).ALLEZ.RECETTES;
  // huile d'olive : r01 (1 c. à soupe = 13,5 g) + r05 (13,5 g) + r12 (1 c. à café = 4,5 g)
  const c = plain(R.courses(['r01', 'r05', 'r12']));
  const item = k => c.rayons.flatMap(r => r.items).find(i => i.key === k);
  assert.equal(item('huileolive').g, 32);
  assert.equal(item('citron').g, 40);
  // tous les grammes comptés se retrouvent dans la liste (riz cuit ramené au cru par l'énergie)
  const all = plain(R.courses(R.ORDER)), items = all.rayons.flatMap(r => r.items);
  let attendu = 0;
  R.ORDER.forEach(id => R.REC[id].lignes.forEach(l => l.a.forEach(([k, g]) => { const f = R.ALIM[k]; attendu += f.versCru ? g * f.versCru[1] * R.ALIM[f.versCru[0]].kcal : g * f.kcal; })));
  const obtenu = items.reduce((s, i) => s + i.g * R.ALIM[i.key].kcal, 0);
  assert.ok(Math.abs(obtenu - attendu) / attendu < 0.001);
  assert.equal(items.find(i => i.key === 'basmati_cuit'), undefined);
  assert.equal(items.find(i => i.key === 'rizblanc_cuit'), undefined);
  // riz cuit (200 g, n° 47) → environ 70-95 g de riz cru
  const r47 = plain(R.courses(['r47'])).rayons.flatMap(r => r.items).find(i => i.key === 'rizblanc_cru');
  assert.ok(r47.g > 70 && r47.g < 95, String(r47.g));
  // œufs : 5 (n° 08) + 3 (n° 11) = 8 pièces
  assert.equal(plain(R.courses(['r08', 'r11'])).rayons.flatMap(r => r.items).find(i => i.key === 'oeuf').pieces, 8);
  assert.ok(all.placard.length > 0);
});

test('pages recettes et nutrition : plus de valeurs en dur, plus d\'avertissement, plus de 3e copie des ingrédients', () => {
  const rec = page('recettes.html'), nut = page('nutrition.html');
  [rec, nut].forEach(t => { assert.ok(t.includes('data/recettes.js')); assert.ok(!/sous-estimées/.test(t)); });
  assert.ok(!/<div class="macro-item (kcal|prot|lip)?"?><div class="macro-v">\d/.test(rec));   // kcal, P, G, L liés aux données (le prix reste dans la fiche)
  assert.ok(!/<div class="macro-v">\d+g?<\/div><div class="macro-l">(kcal|Prot\.|Glu\.|Lip\.)/.test(rec));
  assert.equal((rec.match(/<div class="macro-v"><span data-rv="(kcal|p|g|l)">/g) || []).length, 200);
  assert.equal((rec.match(/data-rec-ingr/g) || []).length, 51);    // 50 listes + le script
  assert.ok(!/class="ingr-item"><span class="ingr-qty">/.test(rec.replace(/'<li class="ingr-item"><span class="ingr-qty">'/g, '')));
  assert.ok(!/MEALS_DB/.test(nut)); assert.ok(!/alert\(/.test(nut));
  assert.equal((nut.match(/class="top10-card[^"]*" data-rec="r\d\d"/g) || []).length, 50);
  assert.ok(!/meal-macro-pill [pcf]">[PCGLF] \d/.test(nut));
  // affirmations retirées des notes (AUDIT §4)
  const notes = Object.values(load({}).ALLEZ.RECETTES.REC).map(r => r.note).join(' ');
  [/anti-?inflam/i, /probiotique/i, /antioxydant/i, /capsaïcine/i, /index glyc/i, /0,7 ?g/, /leucine/i, /PDCAAS/].forEach(rx => assert.ok(!rx.test(notes), String(rx)));
});

test('lifestyle : chaque bloc chiffré renvoie à une source listée en bas de page', () => {
  const t = page('lifestyle.html');
  const ancres = [...t.matchAll(/href="#(src-[a-z0-9]+)"/g)].map(m => m[1]);
  assert.ok(ancres.length >= 15);
  ancres.forEach(a => assert.ok(t.includes(`id="${a}"`), a));
  [/\+40 %/, /reset (complet|est une période)/i, /90 j pour/, /dopamine intacte/, /pincée de sel/, /c'est littéral/, /20–30% plus grave/, /Impact ★/, /meilleur choix/, /phyto-œstrogènes/].forEach(rx => assert.ok(!rx.test(t), String(rx)));
  // chaque DOI cité a la forme attendue
  [...t.matchAll(/doi\.org\/([^"]+)"/g)].forEach(m => assert.match(m[1], /^10\.\d{4,5}\//));
});
