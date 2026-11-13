// Phase 5 : navigation unique, accessibilité statique, polices hébergées, service worker.
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { load, plain, ROOT } = require('./helpers');
const PAGES = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');

test('navigation unique : 4 onglets + « Plus », en français, chaque lien existe, toutes les pages atteignables', () => {
  const { ALLEZ } = load({});
  const N = ALLEZ.NAV;
  assert.deepEqual(plain(N.tabs.map(t => t.t)), ['Accueil', 'Séance', 'Nutrition', 'Progrès']);
  const all = N.tabs.map(t => t.h).concat(...N.plus.map(g => g.items.map(i => i.h)));
  all.forEach(h => assert.ok(fs.existsSync(path.join(ROOT, h)), h + ' existe'));
  assert.equal(new Set(all).size, all.length, 'pas de doublon');
  // pages du site absentes du menu : uniquement les sous-pages de ping-pong (rattachées à leur parent)
  const hors = PAGES.filter(p => !all.includes(p));
  assert.deepEqual(hors.sort(), Object.keys(N.parent).sort());
  // aucun libellé anglais dans les menus
  JSON.stringify(N).match(/"t":"[^"]+"/g).forEach(l => assert.ok(!/Dashboard|Logbook|Lifestyle|Progress/i.test(l), l));
});

test('chaque page : une barre [data-az-nav], aucun ancien menu (hamburger, liste de liens en dur)', () => {
  PAGES.forEach(p => {
    const t = read(p);
    assert.equal((t.match(/data-az-nav/g) || []).length, 1, p);
    assert.ok(!/navHbg|nav-hamburger"|id="mobileMenu"|class="web-nav"/.test(t.replace(/<style[\s\S]*?<\/style>/g, '')), p + ' : ancien menu');
    assert.ok(!/<ul class="nav-links">|<div class="nav-links">/.test(t), p + ' : liste de liens en dur');
  });
});

test('repères : un seul <main id="contenu">, lien d\'évitement en tête, un h1', () => {
  PAGES.forEach(p => {
    const t = read(p);
    assert.equal((t.match(/<main\b/g) || []).length, 1, p + ' <main>');
    assert.ok(/<main[^>]*id="contenu"/.test(t), p + ' : main#contenu');
    assert.ok(/<body[^>]*>\n<a class="az-skip" href="#contenu">/.test(t), p + ' : lien d\'évitement');
    assert.ok(/<h1[\s>]/.test(t), p + ' : h1');
  });
});

test('aucun gestionnaire en ligne (onclick, onchange…) ni propriété .onclick ; alert() banni ; confirm() réservé aux suppressions', () => {
  const DESTRUCTIF = /Effacer les séances rapides|Supprimer cette séance|séries de cet exercice sont déjà cochées|Changer de séance/;
  PAGES.concat(['core.js']).forEach(p => {
    const t = read(p);
    assert.ok(!/\son(click|change|input|submit|keydown|load|error)\s*=\s*["']/.test(t), p + ' : gestionnaire en ligne');
    assert.ok(!/\.on(click|change)\s*=/.test(t), p + ' : propriété .onclick');
    assert.ok(!/\balert\(/.test(t), p + ' : alert()');
    (t.match(/\bconfirm\([^)]*\)/g) || []).forEach(c => assert.ok(DESTRUCTIF.test(c), p + ' : confirm non destructif « ' + c.slice(0, 60) + ' »'));
  });
});

test('actions déclaratives : chaque data-action / data-change d\'une page est déclaré dans ALLEZ.actions', () => {
  PAGES.forEach(p => {
    const t = read(p);
    const used = new Set([...t.matchAll(/data-(?:action|change)="([A-Za-z]+)"/g)].map(m => m[1]));
    if (!used.size) return;
    const decl = (t.match(/ALLEZ\.actions\(\{([\s\S]*?)\n\}\);/) || [])[1] || '';
    used.forEach(a => assert.ok(new RegExp('\\b' + a + '\\s*:').test(decl), p + ' : action « ' + a + ' » non déclarée'));
  });
});

test('polices hébergées : plus de Google Fonts, @font-face local, fichiers et licences présents', () => {
  PAGES.forEach(p => assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(read(p)), p));
  const css = fs.readFileSync(path.join(ROOT, 'assets/base.css'), 'utf8').replace(/\r\n/g, '\n');
  ['inter-latin-400.woff2', 'inter-latin-500.woff2', 'inter-latin-600.woff2', 'inter-latin-700.woff2', 'inter-latin-800.woff2', 'bebas-neue-latin-400.woff2'].forEach(f => {
    assert.ok(css.includes("url('fonts/" + f + "')"), f + ' dans base.css');
    const buf = fs.readFileSync(path.join(ROOT, 'assets/fonts', f)); assert.equal(buf.slice(0, 4).toString(), 'wOF2', f + ' est un woff2');
  });
  assert.ok(/font-display: swap/.test(css));
  ['OFL-inter.txt', 'OFL-bebas-neue.txt', 'LICENCES.md'].forEach(f => assert.ok(fs.existsSync(path.join(ROOT, 'assets/fonts', f)), f));
});

test('service worker : stale-while-revalidate, mise à jour sur accord (SKIP_WAITING), précache complet', () => {
  const sw = read('sw.js');
  assert.ok(/self\.addEventListener\('message', e => \{ if \(e\.data === 'SKIP_WAITING'\) self\.skipWaiting\(\); \}\)/.test(sw));
  assert.ok(/self\.registration\.active \? null : self\.skipWaiting\(\)/.test(sw), 'pas d\'activation forcée quand une version tourne déjà');
  assert.ok(/if \(cached\) \{ e\.waitUntil\(network/.test(sw), 'réponse du cache + revalidation réseau');
  const list = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]);
  PAGES.concat(fs.readdirSync(path.join(ROOT, 'data')).map(f => 'data/' + f), ['core.js', 'assets/base.css', 'assets/fonts/inter-latin-400.woff2', 'assets/fonts/inter-latin-700.woff2', 'assets/fonts/bebas-neue-latin-400.woff2', 'manifest.json'])
    .forEach(f => assert.ok(list.includes(f), f + ' en précache'));
  list.forEach(f => assert.ok(fs.existsSync(path.join(ROOT, f)), f + ' existe'));
  // core.js : enregistrement unique + bandeau ; plus aucun enregistrement dans les pages
  const core = read('core.js');
  assert.ok(core.includes("register('./sw.js')") && core.includes("postMessage('SKIP_WAITING')") && core.includes('Nouvelle version disponible'));
  PAGES.forEach(p => assert.ok(!/serviceWorker\.register/.test(read(p)), p));
});

test('manifeste installable : nom, start_url, display standalone, icônes 192 et 512', () => {
  const m = JSON.parse(read('manifest.json'));
  assert.ok(m.name && m.short_name && m.start_url && /standalone|fullscreen|minimal-ui/.test(m.display));
  const sizes = (m.icons || []).map(i => i.sizes);
  assert.ok(sizes.includes('192x192') && sizes.includes('512x512'));
  m.icons.forEach(i => assert.ok(fs.existsSync(path.join(ROOT, i.src.replace(/^\.\//, ''))), i.src));
});

test('mouvements réduits : règle globale dans base.css, compteurs animés court-circuités', () => {
  assert.ok(/@media \(prefers-reduced-motion: reduce\) \{\n  \*, \*::before, \*::after \{ animation-duration: \.01ms !important;/.test(fs.readFileSync(path.join(ROOT, 'assets/base.css'), 'utf8').replace(/\r\n/g, '\n')));
  assert.ok(read('nutrition.html').includes('ALLEZ.reduceMotion() ? 1 :'));
  assert.equal((read('progression.html').match(/ALLEZ\.reduceMotion\(\) \? 1 :/g) || []).length, 2);
});

test('données saisies affichées avec textContent (notes de séance, adversaires de ping-pong)', () => {
  const d = read('dashboard.html'), p = read('pingpong.html');
  assert.ok(!/\$\{esc\(s\.note\)\}/.test(d) && d.includes("n.textContent=s.note"));
  assert.ok(!/ppEsc\(m\.opp\)/.test(p) && p.includes("cell('tk-opp', m.opp || 'Adversaire')"));
});
