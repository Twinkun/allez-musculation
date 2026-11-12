/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — core.js · noyau partagé par toutes les pages (v2)
   Aucune donnée personnelle ici : le profil vit dans localStorage.
   - Dates : jour J, semaine / bloc / cycle
   - Profil (px_profile) → objectifs et projection calculés
   - Journal des séances (px_journal, schemaVersion 2) + migration
     sans perte des 3 anciennes clés (px_logbook, px_sessions_v2, px_sessions)
   - Sauvegarde : export, import validé avec résumé, rappel, persistance
   - Liaison des pages : [data-az], [data-az-h], [data-prive]
   Chargé AVANT data/*.js et les scripts des pages. Aucune dépendance.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var DAY = 86400000;
  var doc = w.document || null;

  // ── UTILITAIRES ────────────────────────────────────────────────────
  // Date locale YYYY-MM-DD (toISOString = UTC → décale la date entre minuit et 2 h en France)
  function localISO(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parseISO(s) { return new Date(s + 'T12:00:00'); }
  function isISO(s) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(parseISO(s).getTime()); }
  function lsRaw(k) { try { return w.localStorage.getItem(k); } catch (e) { return null; } }
  function lsGet(k, def) { var v = lsRaw(k); if (v === null || v === undefined) return def; try { var o = JSON.parse(v); return o === null ? def : o; } catch (e) { return def; } }
  function lsSet(k, v) { try { w.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function lsDel(k) { try { w.localStorage.removeItem(k); } catch (e) {} }
  function r1(x) { return Math.round(x * 10) / 10; }
  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  function toNum(x) { if (isNum(x)) return x; if (typeof x === 'string' && x.trim() !== '') { var n = parseFloat(x.replace(',', '.')); return isFinite(n) ? n : null; } return null; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function num(v, dec) { return Number(v).toFixed(dec === undefined ? 1 : dec).replace('.', ','); }
  // Entier avec séparateur de milliers français (espace insécable)
  function int(v) { return String(Math.round(Number(v))).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  // ── DATE DE DÉPART ─────────────────────────────────────────────────
  var START_KEY = 'px_start_date';
  function nextMonday(from) {
    var d = new Date(from || new Date()); d.setHours(12, 0, 0, 0);
    var add = (8 - d.getDay()) % 7; if (add === 0) add = 7;
    d.setDate(d.getDate() + add); return d;
  }
  function getStartISO() { var s = lsRaw(START_KEY); return isISO(s) ? s : null; }
  function setStartISO(iso) { try { if (iso) w.localStorage.setItem(START_KEY, iso); else w.localStorage.removeItem(START_KEY); } catch (e) {} }
  // Départ effectif : date choisie, sinon lundi prochain (provisoire)
  function startDate() { var s = getStartISO(); return s ? parseISO(s) : nextMonday(); }

  // Repli si data/programme.js n'est pas chargé (les blocs complets y sont définis)
  var BLOCKS_MIN = { B1: { code: 'B1', name: 'Apprentissage' }, B2: { code: 'B2', name: 'Progression' }, B3: { code: 'B3', name: 'Intensification' }, DL: { code: 'DL', name: 'Deload' } };
  function blocks() { return (w.ALLEZ && w.ALLEZ.PROGRAM && w.ALLEZ.PROGRAM.BLOCKS) || BLOCKS_MIN; }
  function blockCodeForCycleWeek(cw) { return cw <= 4 ? 'B1' : cw <= 8 ? 'B2' : cw <= 12 ? 'B3' : 'DL'; }

  // État du programme à une date donnée
  function status(at) {
    var now = at ? new Date(at) : new Date(); now.setHours(12, 0, 0, 0);
    var start = startDate(), B = blocks();
    var days = Math.round((now - start) / DAY);
    var res = { set: !!getStartISO(), startISO: localISO(start), start: start, days: days };
    if (days < 0) { res.started = false; res.daysUntil = -days; res.week = 0; res.block = B.B1; res.cycle = 1; res.cycleWeek = 0; return res; }
    var week = Math.floor(days / 7) + 1;
    res.started = true; res.finished = week > 52; res.week = Math.min(52, week);
    var cw = ((res.week - 1) % 13) + 1;
    res.cycleWeek = cw; res.cycle = Math.ceil(res.week / 13);
    res.block = B[blockCodeForCycleWeek(cw)];
    res.monthFloat = Math.min(12, days / 30.4375);
    return res;
  }

  var MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  var MOIS_L = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  function addMonths(d, n) { var x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
  // Mois n du programme (1..12) : intervalle de dates réel
  function monthRange(n) {
    var s = startDate(), from = addMonths(s, n - 1), to = new Date(addMonths(s, n) - DAY);
    return { from: from, to: to, label: from.getDate() + ' ' + MOIS[from.getMonth()] + ' → ' + to.getDate() + ' ' + MOIS[to.getMonth()] + ' ' + to.getFullYear(), short: MOIS[to.getMonth()] };
  }
  function fmtDate(d, opts) { return new Date(d).toLocaleDateString('fr-FR', opts || { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
  // Position (en mois, 0..12) d'une date dans le programme
  function monthPos(iso) { return Math.max(0, Math.min(12, (parseISO(iso) - startDate()) / DAY / 30.4375)); }

  // ── PROFIL (localStorage uniquement) ───────────────────────────────
  var PROFILE_KEY = 'px_profile';
  // Profil d'exemple : valeurs rondes purement illustratives, utilisées tant que le profil n'est pas saisi.
  var PROFILE_EXEMPLE = { schemaVersion: 1, exemple: true, sex: 'm', age: 30, height: 180, start: { weight: 75, bf: 20, waist: 85, chest: 95, biceps: 35, shoulders: 47, shouldersCirc: null } };
  var PROFILE_FIELDS = {
    age: ['Âge', 14, 90, 'ans'], height: ['Taille', 130, 220, 'cm']
  };
  var START_FIELDS = {
    weight: ['Poids de départ', 35, 200, 'kg', true], bf: ['Masse grasse de départ', 4, 50, '%', true],
    waist: ['Tour de taille', 50, 160, 'cm', true], chest: ['Tour de poitrine', 60, 160, 'cm', true],
    biceps: ['Biceps contracté', 20, 60, 'cm', true], shoulders: ['Largeur d\'épaules (bideltoïde)', 30, 65, 'cm', true],
    shouldersCirc: ['Tour d\'épaules (facultatif)', 80, 170, 'cm', false]
  };
  function validateProfile(p) {
    var errors = [], out = { schemaVersion: 1, sex: 'm', start: {} };
    if (!p || typeof p !== 'object') return { ok: false, errors: ['Profil absent.'] };
    out.sex = p.sex === 'f' ? 'f' : 'm';
    Object.keys(PROFILE_FIELDS).forEach(function (k) {
      var f = PROFILE_FIELDS[k], v = toNum(p[k]);
      if (v === null || v < f[1] || v > f[2]) errors.push(f[0] + ' : valeur attendue entre ' + f[1] + ' et ' + f[2] + ' ' + f[3] + '.'); else out[k] = v;
    });
    var s = p.start && typeof p.start === 'object' ? p.start : {};
    Object.keys(START_FIELDS).forEach(function (k) {
      var f = START_FIELDS[k], v = toNum(s[k]);
      if (v === null) { if (f[4]) errors.push(f[0] + ' : valeur manquante.'); else out.start[k] = null; return; }
      if (v < f[1] || v > f[2]) errors.push(f[0] + ' : valeur attendue entre ' + f[1] + ' et ' + f[2] + ' ' + f[3] + '.'); else out.start[k] = v;
    });
    return errors.length ? { ok: false, errors: errors } : { ok: true, errors: [], profile: out };
  }
  var cache = { raw: undefined, profile: null, goals: null, proj: null };
  function profile() {
    var raw = lsRaw(PROFILE_KEY);
    if (raw === cache.raw && cache.profile) return cache.profile;
    var p = null;
    if (raw) { try { var v = validateProfile(JSON.parse(raw)); if (v.ok) { p = v.profile; p.exemple = false; } } catch (e) {} }
    cache = { raw: raw, profile: p || clone(PROFILE_EXEMPLE), goals: null, proj: null };
    return cache.profile;
  }
  function profileIsSet() { return !profile().exemple; }
  function setProfile(p) {
    var v = validateProfile(p); if (!v.ok) return v;
    lsSet(PROFILE_KEY, v.profile); cache.raw = undefined;
    return { ok: true, errors: [], profile: profile() };
  }
  function clearProfile() { lsDel(PROFILE_KEY); cache.raw = undefined; }

  // ── OBJECTIFS & PROJECTION (calculés depuis le profil, valeurs de FIN de mois) ──
  // Modèle de recomposition sur 12 mois (débutant, haut du corps, créatine incluse) : écarts par rapport au départ.
  // Masse maigre : fourchette +2,5 à +4,5 kg ; les courbes ci-dessous décrivent le haut de la fourchette.
  var MODEL = {
    dWeight: [0, 0.5, 0.9, 1.1, 1.3, 1.5, 1.5, 1.5, 1.6, 1.6, 1.6, 1.5, 1.5],
    dBf:     [0, -0.4, -0.9, -1.3, -1.7, -2.1, -2.4, -2.8, -3.1, -3.5, -3.8, -4.2, -4.5],
    dLean:   [0, 0.8, 1.4, 1.9, 2.3, 2.7, 3.0, 3.3, 3.6, 3.9, 4.1, 4.3, 4.5],
    dWaist:  [0, -0.5, -1, -1.5, -1.5, -2, -2.5, -2.5, -3, -3.5, -3.5, -4, -4],
    leanGainLow: 2.5, leanGainHigh: 4.5,
    dShoulders: 3, dBiceps: [2, 3], dChest: 5,
    // Horizons plus lointains : fourchettes d'écart par rapport au départ (pratiquant naturel régulier)
    an2: { weight: [4, 6], lean: [7, 8], biceps: [3, 4], chest: [8, 11], bf: [-6.5, -5.5] },
    an5: { weight: [7, 11], lean: [11, 13], biceps: [4, 5], chest: [13, 17], bf: [-8.5, -7.5] }
  };
  function compute() {
    var p = profile(); if (cache.goals) return;
    var s = p.start, lean0 = r1(s.weight * (1 - s.bf / 100));
    var add = function (base, arr, k) { return arr.map(function (d) { return r1(base + d * (k === undefined ? 1 : k)); }); };
    var proj = {
      weight: add(s.weight, MODEL.dWeight), bf: add(s.bf, MODEL.dBf), lean: add(lean0, MODEL.dLean),
      leanLow: add(lean0, MODEL.dLean, MODEL.leanGainLow / MODEL.leanGainHigh), waist: add(s.waist, MODEL.dWaist)
    };
    var n = proj.weight.length - 1;
    cache.proj = proj;
    cache.goals = {
      weight0: s.weight, weight: proj.weight[n], bf0: s.bf, bf: proj.bf[n],
      lean0: lean0, lean: proj.lean[n], leanLow: proj.leanLow[n], leanGainLow: MODEL.leanGainLow, leanGainHigh: MODEL.leanGainHigh,
      fat0: r1(s.weight - lean0), fat: r1(proj.weight[n] - proj.lean[n]),
      waist0: s.waist, waist: proj.waist[n],
      shoulders0: s.shoulders, shoulders: r1(s.shoulders + MODEL.dShoulders),      // largeur bideltoïde (cm)
      biceps0: s.biceps, biceps: (s.biceps + MODEL.dBiceps[0]) + '–' + (s.biceps + MODEL.dBiceps[1]), bicepsLow: s.biceps + MODEL.dBiceps[0], bicepsHigh: s.biceps + MODEL.dBiceps[1],
      chest0: s.chest, chest: r1(s.chest + MODEL.dChest),
      // écarts utiles à l'affichage
      dWeight: r1(proj.weight[n] - s.weight), dBf: r1(proj.bf[n] - s.bf), dFat: r1(r1(proj.weight[n] - proj.lean[n]) - r1(s.weight - lean0)),
      dWaist: r1(proj.waist[n] - s.waist), dShoulders: MODEL.dShoulders, dChest: MODEL.dChest,
      leanPct0: r1(100 - s.bf), bmi0: r1(s.weight / Math.pow(p.height / 100, 2)),
      dBicepsTxt: '+' + MODEL.dBiceps[0] + '-' + MODEL.dBiceps[1]
    };
    // Fourchettes à 2 et 5 ans : « 75–77 », « +7 à 8 »…
    var rg = function (base, d) { var f = function (x) { return String(Math.round(x * 2) / 2).replace('.', ','); }; return f(base + d[0]) + '–' + f(base + d[1]); };
    ['an2', 'an5'].forEach(function (h) {
      var M = MODEL[h];
      cache.goals[h] = { weight: rg(s.weight, M.weight), lean: '+' + M.lean[0] + ' à ' + M.lean[1], biceps: rg(s.biceps, M.biceps), chest: rg(s.chest, M.chest), bf: rg(s.bf, M.bf) };
    });
  }
  function goals() { compute(); return cache.goals; }
  function proj() { compute(); return cache.proj; }

  // ── JOURNAL DES SÉANCES (modèle unique, schemaVersion 2) ───────────
  var JKEY = 'px_journal', JSCHEMA = 2;
  var KINDS = { muscu: 1, pingpong: 1, autre: 1 };
  var DAY_SEANCE = { 1: 'push', 4: 'pull', 6: 'vshape' };
  var SEANCE_NAME = { push: 'PUSH', pull: 'PULL', vshape: 'V-SHAPE' };
  function typeFromName(n) { n = String(n || '').toUpperCase(); return n.indexOf('PUSH') === 0 ? 'push' : n.indexOf('PULL') === 0 ? 'pull' : n.indexOf('V-SHAPE') === 0 ? 'upper' : 'other'; }
  function seanceFromName(n) { var t = typeFromName(n); return t === 'upper' ? 'vshape' : t === 'other' ? null : t; }
  function exIdFromName(name) { var P = w.ALLEZ && w.ALLEZ.PROGRAM; return (P && P.findByName) ? P.findByName(name) : null; }
  function cleanStr(s, max) { return typeof s === 'string' ? s.slice(0, max || 500) : (s == null ? '' : String(s).slice(0, max || 500)); }
  function cleanSet(st) {
    st = st && typeof st === 'object' ? st : {};
    var o = { reps: Math.max(0, toNum(st.reps) || 0), kg: Math.max(0, toNum(st.kg) || 0), done: st.done !== false };
    if (st.done === false) o.done = false;
    var rir = toNum(st.rir); if (rir !== null && rir >= 0 && rir <= 10) o.rir = rir;
    return o;
  }
  function cleanExercise(e) {
    if (!e || typeof e !== 'object') return null;
    var name = cleanStr(e.name, 120); if (!name && !e.exId) return null;
    return { exId: typeof e.exId === 'string' ? e.exId.slice(0, 60) : exIdFromName(name), name: name, muscle: cleanStr(e.muscle, 120), unit: e.unit === 'sec' ? 'sec' : 'reps', sets: Array.isArray(e.sets) ? e.sets.map(cleanSet) : [] };
  }
  // Normalise une séance (du journal ou d'un import) ; renvoie null si elle est inexploitable
  function cleanSession(s) {
    if (!s || typeof s !== 'object' || !isISO(s.date)) return null;
    var kind = KINDS[s.kind] ? s.kind : 'muscu';
    var seance = SEANCE_NAME[s.seance] ? s.seance : null;
    var dur = toNum(s.duration), bw = toNum(s.bodyWeight);
    return {
      id: s.date + '_' + kind, date: s.date, kind: kind, seance: kind === 'muscu' ? seance : null,
      name: cleanStr(s.name, 60) || (seance ? SEANCE_NAME[seance] : kind === 'pingpong' ? 'Ping-pong' : 'Séance'),
      duration: dur !== null && dur > 0 && dur < 600 ? dur : null, bodyWeight: bw !== null && bw > 30 && bw < 250 ? bw : null,
      feeling: cleanStr(s.feeling, 40), note: cleanStr(s.note, 2000),
      exercises: Array.isArray(s.exercises) ? s.exercises.map(cleanExercise).filter(Boolean) : [],
      origins: Array.isArray(s.origins) ? s.origins.filter(function (o) { return typeof o === 'string'; }).slice(0, 10) : [],
      legacySig: s.legacySig && typeof s.legacySig === 'object' ? s.legacySig : {},
      edited: !!s.edited, updatedAt: typeof s.updatedAt === 'string' ? s.updatedAt : null
    };
  }
  function emptyJournal() { return { schemaVersion: JSCHEMA, sessions: [], removed: [] }; }
  function jLoad() {
    var j = lsGet(JKEY, null);
    if (!j || typeof j !== 'object' || !Array.isArray(j.sessions)) return emptyJournal();
    if (!Array.isArray(j.removed)) j.removed = [];
    return j;
  }
  function jSave(j) { j.schemaVersion = JSCHEMA; return lsSet(JKEY, j); }

  // Anciennes clés → liste d'entrées { origin, sig, session }
  function legacyEntries(src) {
    var out = [];
    var lb = src.logbook && typeof src.logbook === 'object' && Array.isArray(src.logbook.sessions) ? src.logbook.sessions : [];
    lb.forEach(function (s) {
      if (!s || !isISO(s.date)) return;
      var seance = DAY_SEANCE[s.dayNum] || seanceFromName(s.sessionName);
      out.push({ origin: 'logbook:' + s.date, sig: JSON.stringify(s.exercises || []).length + ':' + cleanStr(s.sessionName, 60),
        session: { date: s.date, kind: 'muscu', seance: seance, name: cleanStr(s.sessionName, 60), exercises: s.exercises || [] } });
    });
    (Array.isArray(src.sessions_v2) ? src.sessions_v2 : []).forEach(function (s) {
      if (!s || !isISO(s.date)) return;
      var pp = s.type === 'legs', seance = s.type === 'push' ? 'push' : s.type === 'pull' ? 'pull' : s.type === 'upper' ? 'vshape' : null;
      out.push({ origin: 'v2:' + s.date, sig: [s.type, s.duration, s.weight, s.feeling, cleanStr(s.note, 2000).length].join('|'),
        session: { date: s.date, kind: pp ? 'pingpong' : 'muscu', seance: seance, duration: s.duration, bodyWeight: s.weight, feeling: s.feeling, note: s.note } });
    });
    (Array.isArray(src.streak_sessions) ? src.streak_sessions : []).forEach(function (d) {
      if (!isISO(d)) return;
      out.push({ origin: 'streak:' + d, sig: '1', session: { date: d, kind: 'muscu' } });
    });
    return out;
  }
  // Fusionne des entrées d'anciennes clés dans un journal. Idempotent : rejouable sans doublon.
  function mergeLegacy(j, entries) {
    var byId = {}, added = 0, updated = 0;
    j.sessions.forEach(function (s) { byId[s.id] = s; });
    var removed = {}; j.removed.forEach(function (o) { removed[o] = 1; });
    entries.forEach(function (en) {
      if (removed[en.origin]) return;
      var c = cleanSession(en.session); if (!c) return;
      var cur = byId[c.id];
      if (!cur) { c.origins = [en.origin]; c.legacySig = {}; c.legacySig[en.origin] = en.sig; j.sessions.push(c); byId[c.id] = c; added++; return; }
      var known = cur.origins.indexOf(en.origin) >= 0;
      if (known && (cur.legacySig || {})[en.origin] === en.sig) return;       // déjà migrée, inchangée
      if (known && cur.edited) return;                                         // modifiée depuis dans la v2 : la v2 fait foi
      // Complète sans rien écraser d'existant, sauf les exercices du logbook (source de détail)
      if (c.exercises.length && (!cur.exercises.length || en.origin.indexOf('logbook:') === 0)) { cur.exercises = c.exercises; if (c.name) cur.name = c.name; }
      if (c.seance && !cur.seance) cur.seance = c.seance;
      if (c.duration !== null && cur.duration === null) cur.duration = c.duration;
      if (c.bodyWeight !== null && cur.bodyWeight === null) cur.bodyWeight = c.bodyWeight;
      if (c.feeling && !cur.feeling) cur.feeling = c.feeling;
      if (c.note && !cur.note) cur.note = c.note;
      if (!known) cur.origins.push(en.origin);
      cur.legacySig = cur.legacySig || {}; cur.legacySig[en.origin] = en.sig; updated++;
    });
    j.sessions.sort(function (a, b) { return a.id.localeCompare(b.id); });
    return { added: added, updated: updated };
  }
  function legacyFromStorage() { return { logbook: lsGet('px_logbook', null), sessions_v2: lsGet('px_sessions_v2', null), streak_sessions: lsGet('px_sessions', null) }; }
  var migratedThisLoad = false;
  // Migration : copie de sécurité avant la première fusion, puis fusion idempotente. Les anciennes clés ne sont jamais modifiées.
  function migrate(force) {
    if (migratedThisLoad && !force) return { added: 0, updated: 0 };
    migratedThisLoad = true;
    var entries = legacyEntries(legacyFromStorage());
    if (!entries.length) return { added: 0, updated: 0 };
    var j = jLoad(), first = lsRaw(JKEY) === null;
    if (first && lsRaw('px_backup_avant_v2') === null) lsSet('px_backup_avant_v2', { date: new Date().toISOString(), raison: 'migration v2', donnees: rawDump() });
    var res = mergeLegacy(j, entries);
    if (first || res.added || res.updated) { j.migratedAt = new Date().toISOString(); jSave(j); }
    return res;
  }
  function rawDump() { var o = {}; ['px_logbook', 'px_sessions_v2', 'px_sessions', 'px_measures', 'px_start_date'].forEach(function (k) { var v = lsRaw(k); if (v !== null) o[k] = v; }); return o; }

  var store = {
    KEY: JKEY, SCHEMA: JSCHEMA,
    load: function () { migrate(); return jLoad(); },
    // filtre : 'muscu' | 'pingpong' | 'autre' | undefined (tout)
    sessions: function (kind) {
      var l = this.load().sessions; if (kind) l = l.filter(function (s) { return s.kind === kind; });
      return l.slice().sort(function (a, b) { return a.date.localeCompare(b.date) || a.id.localeCompare(b.id); });
    },
    get: function (id) { return this.load().sessions.filter(function (s) { return s.id === id; })[0] || null; },
    // Crée ou remplace la séance (une par date et par type)
    upsert: function (s) {
      var c = cleanSession(s); if (!c) return null;
      var j = this.load(), i = -1; j.sessions.forEach(function (x, k) { if (x.id === c.id) i = k; });
      if (i >= 0) { c.origins = j.sessions[i].origins || []; c.legacySig = j.sessions[i].legacySig || {}; }
      c.edited = true; c.updatedAt = new Date().toISOString();
      if (i >= 0) j.sessions[i] = c; else j.sessions.push(c);
      return jSave(j) ? c : null;
    },
    remove: function (id) {
      var j = this.load(), keep = [];
      j.sessions.forEach(function (s) { if (s.id === id) (s.origins || []).forEach(function (o) { if (j.removed.indexOf(o) < 0) j.removed.push(o); }); else keep.push(s); });
      var changed = keep.length !== j.sessions.length; j.sessions = keep;
      return changed ? jSave(j) : false;
    },
    migrate: function () { return migrate(true); }
  };

  // Vue compatible avec les pages : une entrée par séance, triée par date
  function sessionType(s) { return s.kind === 'pingpong' ? 'legs' : s.seance === 'vshape' ? 'upper' : s.seance || 'other'; }
  function sessions(kind) {
    return store.sessions(kind).map(function (s) {
      return { id: s.id, date: s.date, kind: s.kind, seance: s.seance, name: s.name, type: sessionType(s), source: s.exercises.length ? 'logbook' : 'rapide',
        duration: s.duration === null ? '' : s.duration, weight: s.bodyWeight === null ? '' : s.bodyWeight, feeling: s.feeling, note: s.note, exercises: s.exercises };
    });
  }
  // Séries communes : la série tient tant que l'écart entre 2 séances ≤ 4 jours
  // (programme lun/jeu/sam → écarts normaux de 2-3 j ; sauter UNE séance ne casse pas la série). Musculation uniquement.
  var GAP = 4;
  function streak(dates) {
    var u = Array.from(new Set(dates || store.sessions('muscu').map(function (s) { return s.date; }))).sort();
    var best = 0, run = 0, i;
    for (i = 0; i < u.length; i++) {
      run = (i === 0 || (parseISO(u[i]) - parseISO(u[i - 1])) / DAY > GAP) ? 1 : run + 1;
      if (run > best) best = run;
    }
    var cur = 0;
    if (u.length && (parseISO(localISO()) - parseISO(u[u.length - 1])) / DAY <= GAP) {
      cur = 1;
      for (i = u.length - 1; i > 0; i--) { if ((parseISO(u[i]) - parseISO(u[i - 1])) / DAY <= GAP) cur++; else break; }
    }
    return { cur: cur, best: best, total: u.length };
  }
  function weekDates(ref) {
    var t = ref ? new Date(ref) : new Date(), dow = (t.getDay() + 6) % 7;
    var mon = new Date(t); mon.setDate(t.getDate() - dow);
    return Array.from({ length: 7 }, function (_, i) { var d = new Date(mon); d.setDate(mon.getDate() + i); return localISO(d); });
  }
  // Meilleure charge (kg) enregistrée pour un exercice, par identifiant stable (les anciens noms sont des alias)
  function bestKg(exId) {
    var m = 0;
    store.sessions('muscu').forEach(function (s) { s.exercises.forEach(function (e) { if ((e.exId || exIdFromName(e.name)) === exId) e.sets.forEach(function (st) { if (st.done !== false && st.kg > m) m = st.kg; }); }); });
    return m;
  }

  // ── MESURES ───────────────────────────────────────────────────────
  var FR_M = { 'janvier': 0, 'février': 1, 'fevrier': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7, 'aout': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11, 'decembre': 11 };
  function measureISO(m) {
    if (isISO(m.iso)) return m.iso;
    var r = /(\d{1,2})\s+([a-zéûè]+)\s+(\d{4})/i.exec(m.date || '');
    if (r && FR_M[r[2].toLowerCase()] !== undefined) return localISO(new Date(+r[3], FR_M[r[2].toLowerCase()], +r[1], 12));
    return null;
  }
  function measuresRaw() { var a = lsGet('px_measures', []); return Array.isArray(a) ? a.filter(function (m) { return m && typeof m === 'object'; }) : []; }
  function measures() { return measuresRaw().map(function (m, i) { return Object.assign({ _i: i }, m, { iso: measureISO(m) }); }); }
  function lastMeasure(field) {
    var ms = measures().filter(function (m) { return toNum(m[field]) !== null; });
    if (!ms.length) return null;
    ms.sort(function (a, b) { return (a.iso || '').localeCompare(b.iso || '') || a._i - b._i; });
    return toNum(ms[ms.length - 1][field]);
  }

  // ── SAUVEGARDE / RESTAURATION ─────────────────────────────────────
  var SIMPLE = [['measures', 'px_measures'], ['courses_sel', 'px_courses_sel'], ['pingpong_matches', 'px_pingpong_matches'], ['pingpong_obj', 'px_pingpong_obj'], ['pingpong_video', 'px_pingpong_video'], ['logbook_draft', 'px_logbook_draft']];
  var SIMPLE_TYPE = { measures: 'array', courses_sel: 'array', pingpong_matches: 'array', pingpong_obj: 'object', pingpong_video: 'object', logbook_draft: 'object' };
  function dataCount() { return store.sessions().length + measuresRaw().length; }
  function buildBackup() {
    var data = { app: 'ALLEZ', format: 2, exported: new Date().toISOString(), start_date: getStartISO(), profile: lsGet(PROFILE_KEY, null), prive: lsGet('px_prive', null), journal: store.load() };
    SIMPLE.forEach(function (b) { var v = lsGet(b[1], null); if (v !== null) data[b[0]] = v; });
    var plans = {}; for (var i = 0; i < 7; i++) { var p = lsGet('px_day_plan_' + i, null); if (p !== null) plans[i] = p; }
    if (Object.keys(plans).length) data.day_plans = plans;
    return data;
  }
  function typeOf(v) { return Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v; }
  // Analyse et valide un fichier de sauvegarde (formats 1 et 2). N'écrit rien.
  function parseBackup(text) {
    var res = { ok: false, errors: [], warnings: [], data: null, summary: null }, d;
    try { d = JSON.parse(text); } catch (e) { res.errors.push('Fichier illisible : ce n\'est pas du JSON valide.'); return res; }
    if (typeOf(d) !== 'object') { res.errors.push('Fichier invalide : il ne provient pas d\'ALLEZ.'); return res; }
    var known = ['journal', 'logbook', 'sessions_v2', 'streak_sessions', 'measures', 'profile', 'prive', 'start_date', 'pingpong_matches'];
    if (!known.some(function (k) { return d[k] !== undefined && d[k] !== null; })) { res.errors.push('Fichier invalide : il ne provient pas d\'ALLEZ (aucune donnée reconnue).'); return res; }
    var out = { app: 'ALLEZ', format: 2 }, sum = { sections: [] };
    // Types de premier niveau : un type inattendu = fichier corrompu, on refuse tout
    var want = { journal: 'object', logbook: 'object', sessions_v2: 'array', streak_sessions: 'array', profile: 'object', prive: 'object', day_plans: 'object' };
    Object.keys(SIMPLE_TYPE).forEach(function (k) { want[k] = SIMPLE_TYPE[k]; });
    Object.keys(want).forEach(function (k) { if (d[k] !== undefined && d[k] !== null && typeOf(d[k]) !== want[k]) res.errors.push('« ' + k + ' » devrait être ' + (want[k] === 'array' ? 'une liste' : 'un objet') + ' : fichier corrompu.'); });
    if (d.journal && !Array.isArray(d.journal.sessions)) res.errors.push('« journal.sessions » devrait être une liste : fichier corrompu.');
    if (d.logbook && d.logbook.sessions !== undefined && !Array.isArray(d.logbook.sessions)) res.errors.push('« logbook.sessions » devrait être une liste : fichier corrompu.');
    if (d.start_date !== undefined && d.start_date !== null && !isISO(d.start_date)) res.errors.push('« start_date » n\'est pas une date valide.');
    if (res.errors.length) return res;

    // Séances : journal (format 2) et/ou anciennes clés (format 1), fusionnées
    var hasSessions = !!(d.journal || d.logbook || d.sessions_v2 || d.streak_sessions);
    if (hasSessions) {
      var j = emptyJournal(), dropped = 0;
      if (d.journal) {
        var seen = {};
        d.journal.sessions.forEach(function (s) { var c = cleanSession(s); if (!c || seen[c.id]) { dropped++; return; } seen[c.id] = 1; j.sessions.push(c); });
        if (Array.isArray(d.journal.removed)) j.removed = d.journal.removed.filter(function (o) { return typeof o === 'string'; });
      }
      var en = legacyEntries({ logbook: d.logbook, sessions_v2: d.sessions_v2, streak_sessions: d.streak_sessions });
      var nLegacy = ((d.logbook && d.logbook.sessions) || []).length + (d.sessions_v2 || []).length + (d.streak_sessions || []).length;
      dropped += nLegacy - en.length;
      mergeLegacy(j, en);
      if (dropped) res.warnings.push(dropped + ' séance(s) ignorée(s) : date manquante ou invalide.');
      out.journal = j; sum.sections.push('journal');
      sum.sessions = j.sessions.length; sum.muscu = j.sessions.filter(function (s) { return s.kind === 'muscu'; }).length;
      sum.pingpong = j.sessions.filter(function (s) { return s.kind === 'pingpong'; }).length;
      sum.detaillees = j.sessions.filter(function (s) { return s.exercises.length; }).length;
      var ds = j.sessions.map(function (s) { return s.date; }).sort(); sum.premiere = ds[0] || null; sum.derniere = ds[ds.length - 1] || null;
    }
    if (d.measures) {
      var ms = d.measures.filter(function (m) { return typeOf(m) === 'object'; });
      if (ms.length !== d.measures.length) res.warnings.push((d.measures.length - ms.length) + ' mesure(s) ignorée(s) : format invalide.');
      out.measures = ms; sum.measures = ms.length; sum.sections.push('measures');
    }
    if (d.profile) { var v = validateProfile(d.profile); if (v.ok) { out.profile = v.profile; sum.profile = true; sum.sections.push('profile'); } else res.warnings.push('Profil ignoré : ' + v.errors[0]); }
    if (d.prive) {
      var blocs = {}, nb = 0; var src = typeOf(d.prive.blocs) === 'object' ? d.prive.blocs : {};
      Object.keys(src).forEach(function (k) { if (typeof src[k] === 'string') { blocs[k.slice(0, 80)] = src[k].slice(0, 60000); nb++; } });
      var hor = {}; var hs = typeOf(d.prive.horaires) === 'object' ? d.prive.horaires : {};
      Object.keys(hs).forEach(function (k) { if (/^([01]?\d|2[0-3]):[0-5]\d$/.test(hs[k])) hor[k.slice(0, 10)] = hs[k]; });
      out.prive = { schemaVersion: 1, blocs: blocs, horaires: hor }; sum.prive = nb; sum.sections.push('prive');
    }
    if (d.start_date !== undefined) { out.start_date = d.start_date; sum.start_date = d.start_date; sum.sections.push('start_date'); }
    ['courses_sel', 'pingpong_matches', 'pingpong_obj', 'pingpong_video', 'logbook_draft', 'day_plans'].forEach(function (k) { if (d[k] !== undefined && d[k] !== null) { out[k] = d[k]; sum.sections.push(k); } });
    if (out.pingpong_matches) sum.pingpong_matches = out.pingpong_matches.length;
    sum.exported = typeof d.exported === 'string' ? d.exported : null; sum.format = d.format === 2 ? 2 : 1;
    res.ok = true; res.data = out; res.summary = sum;
    return res;
  }
  // Applique une sauvegarde validée : seules les sections présentes dans le fichier sont remplacées.
  function applyBackup(data) {
    lsSet('px_backup_auto', { date: new Date().toISOString(), raison: 'avant import', donnees: buildBackup() });
    if (data.journal) {
      // Les anciennes clés de cet appareil ne doivent pas « ressusciter » des séances absentes du fichier importé
      var j = data.journal, known = {};
      j.sessions.forEach(function (s) { s.origins.forEach(function (o) { known[o] = 1; }); });
      legacyEntries(legacyFromStorage()).forEach(function (en) { if (!known[en.origin] && j.removed.indexOf(en.origin) < 0) j.removed.push(en.origin); });
      jSave(j);
    }
    if (data.profile) { lsSet(PROFILE_KEY, data.profile); cache.raw = undefined; }
    if (data.prive) lsSet('px_prive', data.prive);
    if (data.start_date !== undefined) setStartISO(data.start_date);
    SIMPLE.forEach(function (b) { if (data[b[0]] !== undefined) lsSet(b[1], data[b[0]]); });
    if (data.day_plans) Object.keys(data.day_plans).forEach(function (i) { if (/^[0-6]$/.test(i)) lsSet('px_day_plan_' + i, data.day_plans[i]); });
    return true;
  }
  function markBackup() { lsSet('px_last_backup', { date: new Date().toISOString(), count: dataCount(), sessions: store.sessions().length, measures: measuresRaw().length }); }
  function exportData() {
    var blob = new Blob([JSON.stringify(buildBackup(), null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob), a = doc.createElement('a');
    a.href = url; a.download = 'allez-backup-' + localISO() + '.json';
    doc.body.appendChild(a); a.click(); doc.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    markBackup(); lsDel('px_backup_snooze');
    var b = doc.querySelector('.az-banner[data-kind=backup]'); if (b) b.remove();
  }
  function summaryLines(sum) {
    var f = function (iso) { return iso ? parseISO(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : ''; }, L = [];
    if (sum.sessions !== undefined) L.push('Séances : ' + sum.sessions + (sum.sessions ? ' (' + sum.detaillees + ' détaillée' + (sum.detaillees > 1 ? 's' : '') + (sum.pingpong ? ', ' + sum.pingpong + ' ping-pong' : '') + (sum.premiere ? ', du ' + f(sum.premiere) + ' au ' + f(sum.derniere) : '') + ')' : '') + ' — remplacent celles de cet appareil');
    else L.push('Séances : absentes du fichier — celles de cet appareil sont conservées');
    if (sum.measures !== undefined) L.push('Mesures : ' + sum.measures + ' — remplacent celles de cet appareil');
    if (sum.start_date !== undefined) L.push('Date de départ : ' + (sum.start_date ? f(sum.start_date) : 'aucune'));
    if (sum.profile) L.push('Profil : remplacé');
    if (sum.prive !== undefined) L.push('Contenu privé : ' + sum.prive + ' bloc' + (sum.prive > 1 ? 's' : ''));
    if (sum.pingpong_matches !== undefined) L.push('Matchs de ping-pong : ' + sum.pingpong_matches);
    return L;
  }
  function importData(input) {
    var file = input.files && input.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var res = parseBackup(String(e.target.result)); input.value = '';
      if (!res.ok) { ui.dialog({ title: 'Import impossible', lines: res.errors, ok: 'Fermer', cancel: null }); return; }
      var lines = summaryLines(res.summary).concat(res.warnings.map(function (x) { return '⚠ ' + x; }));
      ui.dialog({ title: 'Importer cette sauvegarde ?', intro: 'Fichier ' + (res.summary.format === 2 ? 'ALLEZ v2' : 'ALLEZ (ancien format)') + (res.summary.exported ? ' du ' + new Date(res.summary.exported).toLocaleDateString('fr-FR') : '') + '. Une copie de l\'état actuel est gardée sur cet appareil avant le remplacement.', lines: lines, ok: 'Remplacer', cancel: 'Annuler', danger: true })
        .then(function (yes) { if (!yes) return; applyBackup(res.data); w.location.reload(); });
    };
    reader.readAsText(file);
  }
  // Rappel : plus de 14 jours ou plus de 5 nouvelles séances depuis la dernière sauvegarde
  function backupDue() {
    var last = lsGet('px_last_backup', null), nS = store.sessions().length, nM = measuresRaw().length;
    if (!nS && !nM) return { due: false, days: null, newSessions: 0 };
    var days, newS, changed;
    if (!last || !last.date) {
      var first = store.sessions()[0]; days = first ? Math.floor((parseISO(localISO()) - parseISO(first.date)) / DAY) : 0; newS = nS; changed = true;
    } else {
      days = Math.floor((Date.now() - new Date(last.date).getTime()) / DAY);
      newS = Math.max(0, nS - (isNum(last.sessions) ? last.sessions : nS)); changed = newS > 0 || nM > (isNum(last.measures) ? last.measures : nM) || (!isNum(last.sessions) && dataCount() > (last.count || 0));
    }
    return { due: changed && (days > 14 || newS > 5), days: days, newSessions: newS, never: !last };
  }
  // Stockage persistant (Safari iOS peut effacer localStorage d'un site peu visité)
  var persisted = null;
  function requestPersist() {
    var st = w.navigator && w.navigator.storage;
    if (!st || !st.persist) return Promise.resolve(null);
    return st.persisted().then(function (p) { return p || st.persist(); }).then(function (p) { persisted = !!p; return persisted; }, function () { return null; });
  }

  // ── LIAISON DES PAGES ─────────────────────────────────────────────
  // value('goals.weight'), value('proj.lean.6'), value('nutrition.train.kcal'), value('profile.height')…
  var ROOTS = {
    goals: goals, proj: proj, profile: profile,
    start: function () { return profile().start; },
    nutrition: function () { var N = w.ALLEZ.NUTRITION; return N ? N.current() : null; },
    programme: function () { var P = w.ALLEZ.PROGRAM; return P ? P.summary() : null; },
    supp: function () { var S = w.ALLEZ.SUPPLEMENTS; return S ? S.summary() : null; }
  };
  function value(path) {
    var parts = String(path).split('.'), root = ROOTS[parts[0]]; if (!root) return undefined;
    var o = root();
    for (var i = 1; i < parts.length && o !== null && o !== undefined; i++) o = o[parts[i]];
    return o;
  }
  // Formats : '0' '1' '2' (décimales) · 'n' (1 décimale au plus : 16 ou 17,5) · 'int' (2 650) · préfixe '+' = signe affiché · absent = texte brut
  function fmt(v, f) {
    if (v === undefined || v === null || v === '') return '—';
    if (!f || typeof v !== 'number') return typeof v === 'number' ? String(v).replace('.', ',') : String(v);
    if (f === 'int') return int(v);
    var sign = f.charAt(0) === '+', k = sign ? f.slice(1) : f;
    var s = k === 'n' ? num(Math.abs(v), 1).replace(/,0$/, '') : k === 'int' ? int(Math.abs(v)) : num(Math.abs(v), +k || 0);
    return (v < 0 ? '−' : sign ? '+' : '') + s;
  }
  function prive(key) { var p = lsGet('px_prive', null); var v = p && p.blocs ? p.blocs[key] : null; return typeof v === 'string' ? v : null; }
  // Assainit le HTML du contenu privé importé : liste blanche de balises, aucun script ni lien
  var TAGS_OK = { P: 1, DIV: 1, SPAN: 1, STRONG: 1, B: 1, EM: 1, I: 1, U: 1, BR: 1, UL: 1, OL: 1, LI: 1, H2: 1, H3: 1, H4: 1, H5: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, SMALL: 1, SUP: 1, SUB: 1 };
  function sanitizeInto(target, html) {
    var tpl = doc.createElement('template'); tpl.innerHTML = html;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) return;
        if (n.nodeType !== 1 || !TAGS_OK[n.tagName]) { n.parentNode.removeChild(n); return; }
        Array.prototype.slice.call(n.attributes).forEach(function (a) {
          var ok = a.name === 'class' || a.name === 'colspan' || a.name === 'rowspan' || (a.name === 'style' && /^[\w\s#%.,:;()\-'"!]*$/.test(a.value) && !/url|expression|import|position\s*:\s*fixed/i.test(a.value));
          if (!ok) n.removeAttribute(a.name);
        });
        walk(n);
      });
    })(tpl.content);
    target.textContent = ''; target.appendChild(tpl.content);
  }
  // Horaires : data-az-h="A:-90" = journée type A, 90 min avant l'heure de séance saisie dans le contenu privé
  function hourText(spec) {
    var m = /^([A-Za-z]+):(-?\d+)$/.exec(spec || ''), p = lsGet('px_prive', null);
    var base = m && p && p.horaires ? p.horaires[m[1]] : null; if (!base) return null;
    var t = (+base.split(':')[0]) * 60 + (+base.split(':')[1]) + (+m[2]); t = ((t % 1440) + 1440) % 1440;
    return Math.floor(t / 60) + 'h' + String(t % 60).padStart(2, '0');
  }
  function bind(root) {
    if (!doc) return; root = root || doc;
    root.querySelectorAll('[data-az]').forEach(function (el) {
      var a = el.getAttribute('data-az').split('|'); el.textContent = fmt(value(a[0]), a[1]);
    });
    root.querySelectorAll('[data-az-h]').forEach(function (el) { var t = hourText(el.getAttribute('data-az-h')); if (t) el.textContent = t; });
    root.querySelectorAll('[data-prive]').forEach(function (el) {
      var html = prive(el.getAttribute('data-prive'));
      if (html) { sanitizeInto(el, html); el.hidden = false; } else if (!el.hasAttribute('data-prive-garder')) el.hidden = true;
    });
    root.querySelectorAll('[data-si-profil]').forEach(function (el) { el.hidden = (el.getAttribute('data-si-profil') === 'exemple') === profileIsSet(); });
  }

  // ── INTERFACE COMMUNE ─────────────────────────────────────────────
  var ui = {
    // Boîte de dialogue maison → Promise<boolean>
    dialog: function (o) {
      return new Promise(function (resolve) {
        var ov = doc.createElement('div'); ov.className = 'az-modal'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', o.title || 'Message');
        var box = doc.createElement('div'); box.className = 'az-modal-box';
        var h = doc.createElement('div'); h.className = 'az-modal-t'; h.textContent = o.title || ''; box.appendChild(h);
        if (o.intro) { var p = doc.createElement('p'); p.className = 'az-modal-p'; p.textContent = o.intro; box.appendChild(p); }
        if (o.lines && o.lines.length) { var ul = doc.createElement('ul'); ul.className = 'az-modal-l'; o.lines.forEach(function (t) { var li = doc.createElement('li'); li.textContent = t; ul.appendChild(li); }); box.appendChild(ul); }
        var bar = doc.createElement('div'); bar.className = 'az-modal-b';
        var done = function (v) { doc.removeEventListener('keydown', onKey); ov.remove(); resolve(v); };
        var onKey = function (e) { if (e.key === 'Escape') done(false); };
        if (o.cancel !== null) { var c = doc.createElement('button'); c.className = 'az-btn ghost'; c.type = 'button'; c.textContent = o.cancel || 'Annuler'; c.onclick = function () { done(false); }; bar.appendChild(c); }
        var k = doc.createElement('button'); k.className = 'az-btn' + (o.danger ? ' danger' : ''); k.type = 'button'; k.textContent = o.ok || 'OK'; k.onclick = function () { done(true); }; bar.appendChild(k);
        box.appendChild(bar); ov.appendChild(box); doc.body.appendChild(ov); doc.addEventListener('keydown', onKey); k.focus();
      });
    },
    toast: function (msg) {
      var t = doc.createElement('div'); t.className = 'az-toast'; t.setAttribute('role', 'status'); t.textContent = msg; doc.body.appendChild(t);
      setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 2600);
    },
    // Bandeau en haut de page : { kind, text, actions:[{label, href | onClick, ghost}] }
    banner: function (o) {
      if (doc.querySelector('.az-banner[data-kind=' + o.kind + ']')) return null;
      var b = doc.createElement('div'); b.className = 'az-banner'; b.setAttribute('data-kind', o.kind); b.setAttribute('role', 'status');
      var s = doc.createElement('span'); s.className = 'az-banner-t'; s.textContent = o.text; b.appendChild(s);
      (o.actions || []).forEach(function (a) {
        var el = doc.createElement(a.href ? 'a' : 'button'); el.className = 'az-btn' + (a.ghost ? ' ghost' : ''); el.textContent = a.label;
        if (a.href) el.href = a.href; else { el.type = 'button'; el.onclick = function () { a.onClick(b); }; }
        b.appendChild(el);
      });
      var host = doc.querySelector('[data-az-banners]');
      if (host) host.appendChild(b); else doc.body.insertBefore(b, doc.body.firstChild);
      return b;
    }
  };
  function page() { return (w.location.pathname.split('/').pop() || 'index.html'); }
  function reminders() {
    if (doc.body.hasAttribute('data-no-rappels')) return;
    if (!profileIsSet() && page() !== 'profil.html')
      ui.banner({ kind: 'profil', text: 'Valeurs d\'exemple affichées : ton profil n\'est pas renseigné sur cet appareil.', actions: [{ label: 'Renseigner mon profil', href: 'profil.html' }] });
    var due = backupDue(), snooze = lsGet('px_backup_snooze', 0);
    if (due.due && Date.now() > snooze)
      ui.banner({ kind: 'backup', text: 'Sauvegarde conseillée : ' + (due.newSessions ? due.newSessions + ' séance' + (due.newSessions > 1 ? 's' : '') : 'des données') + (due.never ? ' jamais sauvegardée' + (due.newSessions > 1 ? 's' : '') : ' depuis la dernière sauvegarde (il y a ' + due.days + ' j)') + '.',
        actions: [{ label: 'Sauvegarder', onClick: function () { exportData(); } }, { label: 'Plus tard', ghost: true, onClick: function (b) { lsSet('px_backup_snooze', Date.now() + 3 * DAY); b.remove(); } }] });
    if (dataCount() > 0) requestPersist();
  }

  // ── CARTE « DATE DE DÉPART » (dashboard + progression) ────────────
  function injectCSS() { /* styles désormais dans assets/base.css */ }
  function renderStartCard(el, onChange) {
    if (!el) return;
    var st = status(), html;
    var dflt = st.set ? st.startISO : localISO(nextMonday());
    var form = '<div class="az-start-f"><input type="date" id="azStartIn" value="' + dflt + '" aria-label="Date de départ"><button class="az-btn" id="azStartOk" type="button">' + (st.set ? 'Modifier' : 'Valider') + '</button>' + (st.set ? '<button class="az-btn ghost" id="azStartRm" type="button" title="Effacer la date">Effacer</button>' : '') + '</div>';
    if (!st.set) {
      html = '<div class="az-start-ico">📅</div><div class="az-start-txt"><div class="az-start-t">Quand démarres-tu le programme ?</div><div class="az-start-s">Choisis ton jour J (idéalement un lundi). Les semaines, blocs, mois et projections de toute l\'app se caleront dessus.</div></div>' + form;
    } else if (!st.started) {
      html = '<div class="az-start-ico">⏳</div><div class="az-start-txt"><div class="az-start-t">Départ le ' + fmtDate(st.start) + '<span class="az-pill">J-' + st.daysUntil + '</span></div><div class="az-start-s">Avant le jour J : prends tes mesures de départ et tes photos (face, profil, dos), à jeun le matin.</div></div>' + form;
    } else {
      html = '<div class="az-start-ico">🗓️</div><div class="az-start-txt"><div class="az-start-t">Semaine ' + st.week + ' / 52<span class="az-pill">' + st.block.code + ' · ' + st.block.name + '</span></div><div class="az-start-s">Cycle ' + st.cycle + ' · semaine ' + st.cycleWeek + '/13 · démarré le ' + fmtDate(st.start, { day: 'numeric', month: 'long', year: 'numeric' }) + (st.finished ? ' · 🏆 année 1 terminée' : '') + '</div></div>' + form;
    }
    el.className = 'az-start'; el.innerHTML = html;
    var ok = el.querySelector('#azStartOk'), rm = el.querySelector('#azStartRm'), inp = el.querySelector('#azStartIn');
    ok.onclick = function () { if (!inp.value) return; setStartISO(inp.value); renderStartCard(el, onChange); if (onChange) onChange(); };
    if (rm) rm.onclick = function () { ui.dialog({ title: 'Effacer la date de départ ?', ok: 'Effacer', danger: true }).then(function (yes) { if (!yes) return; setStartISO(null); renderStartCard(el, onChange); if (onChange) onChange(); }); };
  }

  // ── BARRE DE NAVIGATION MOBILE ────────────────────────────────────
  var TABS = [
    { h: 'index.html', i: '🏠', t: 'Accueil' },
    { h: 'logbook.html', i: '🏋️', t: 'Séance' },
    { h: 'dashboard.html', i: '📊', t: 'Suivi' },
    { h: 'nutrition.html', i: '🥗', t: 'Nutrition' },
    { h: 'progression.html', i: '📈', t: 'Progrès' }
  ];
  function injectTabbar() {
    if (doc.querySelector('.az-tabbar') || doc.body.hasAttribute('data-no-tabbar')) return;
    var pg = page();
    // <div> et non <nav> : les pages stylent « nav { position:fixed; top:0 … } » globalement
    var nav = doc.createElement('div'); nav.className = 'az-tabbar'; nav.setAttribute('role', 'navigation'); nav.setAttribute('aria-label', 'Navigation principale');
    nav.innerHTML = TABS.map(function (t) { return '<a href="' + t.h + '"' + (pg === t.h ? ' class="on" aria-current="page"' : '') + '><span class="i">' + t.i + '</span>' + t.t + '</a>'; }).join('');
    doc.body.appendChild(nav); doc.body.classList.add('az-has-tabbar');
  }
  function onReady() { injectTabbar(); bind(); reminders(); }
  if (doc) { if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', onReady); else onReady(); }

  var A = {
    VERSION: '2.0.0',
    localISO: localISO, parseISO: parseISO, isISO: isISO, nextMonday: nextMonday, num: num, int: int, esc: esc, fmt: fmt, lsGet: lsGet, lsSet: lsSet,
    getStartISO: getStartISO, setStartISO: setStartISO, startDate: startDate, status: status, blockCodeForCycleWeek: blockCodeForCycleWeek,
    MOIS: MOIS, MOIS_L: MOIS_L, monthRange: monthRange, fmtDate: fmtDate, monthPos: monthPos,
    profile: profile, profileIsSet: profileIsSet, setProfile: setProfile, clearProfile: clearProfile, validateProfile: validateProfile,
    PROFILE_KEY: PROFILE_KEY, PROFILE_FIELDS: PROFILE_FIELDS, START_FIELDS: START_FIELDS, MODEL: MODEL,
    store: store, sessions: sessions, streak: streak, weekDates: weekDates, typeFromName: typeFromName, bestKg: bestKg,
    measures: measures, lastMeasure: lastMeasure, measureISO: measureISO,
    backup: { build: buildBackup, parse: parseBackup, apply: applyBackup, due: backupDue, mark: markBackup, summaryLines: summaryLines },
    exportData: exportData, importData: importData, dataCount: dataCount, requestPersist: requestPersist, isPersisted: function () { return persisted; },
    value: value, bind: bind, prive: prive, hourText: hourText, sanitizeInto: sanitizeInto, ui: ui,
    renderStartCard: renderStartCard, injectCSS: injectCSS,
    _legacyEntries: legacyEntries, _mergeLegacy: mergeLegacy, _cleanSession: cleanSession
  };
  Object.defineProperty(A, 'GOALS', { get: goals, enumerable: true });
  Object.defineProperty(A, 'PROJ', { get: proj, enumerable: true });
  Object.defineProperty(A, 'BLOCKS', { get: blocks, enumerable: true });
  w.ALLEZ = A;
})(typeof window !== 'undefined' ? window : globalThis);
