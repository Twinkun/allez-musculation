// Charge core.js et data/*.js dans un bac à sable Node (faux localStorage, pas de DOM).
// Usage : const { load } = require('./helpers'); const { ALLEZ, ls } = load({ 'px_logbook': {...} });
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..', 'MUSCULATION');
const FILES = ['core.js', 'data/programme.js', 'data/nutrition.js', 'data/supplements.js'];

function fakeStorage(seed) {
  const m = new Map();
  Object.keys(seed || {}).forEach(k => m.set(k, typeof seed[k] === 'string' ? seed[k] : JSON.stringify(seed[k])));
  return {
    getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: k => { m.delete(k); },
    key: i => Array.from(m.keys())[i] || null, get length() { return m.size; }, _dump: () => Object.fromEntries(m), _map: m
  };
}
// seed : contenu initial de localStorage · opts.now : date figée (ISO) · opts.files : fichiers à charger
function load(seed, opts) {
  opts = opts || {};
  const ls = fakeStorage(seed);
  const sandbox = { localStorage: ls, location: { pathname: '/index.html', reload() {} }, navigator: {}, console, setTimeout, clearTimeout, JSON, Math, Object, Array, String, Number, Set, Map, Promise, RegExp, parseFloat, parseInt, isFinite, isNaN };
  if (opts.now) {
    const T = new Date(opts.now).getTime(), RD = Date;
    const D = function (...a) { return a.length ? new RD(...a) : new RD(T); };
    D.prototype = RD.prototype; D.now = () => T; D.parse = RD.parse; D.UTC = RD.UTC; sandbox.Date = D;
  } else sandbox.Date = Date;
  sandbox.window = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  (opts.files || FILES).forEach(f => { const p = path.join(ROOT, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); });
  return { ALLEZ: sandbox.ALLEZ, ls, sandbox };
}
const get = (ls, k) => { const v = ls.getItem(k); return v === null ? null : JSON.parse(v); };
// Profil fictif pour les tests (aucune mesure réelle dans le dépôt)
const PROFIL_TEST = { sex: 'm', age: 35, height: 182, start: { weight: 80, bf: 22, waist: 90, chest: 100, biceps: 36, shoulders: 46, shouldersCirc: 118 } };
// Les objets créés dans le bac à sable ont d'autres prototypes : on les « aplatit » avant deepEqual
const plain = x => JSON.parse(JSON.stringify(x));
module.exports = { load, get, plain, fakeStorage, ROOT, PROFIL_TEST };
