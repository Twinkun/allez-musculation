/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — core.js · SOURCE UNIQUE partagée par toutes les pages
   - Date de départ du programme (choisie par l'utilisateur, localStorage)
   - Semaine / bloc / cycle courants
   - Objectifs & projection 12 mois (recomposition réaliste)
   - Séances : union logbook + dashboard + progression, streak commun
   - Mesures : dates normalisées
   - Barre de navigation mobile (injectée)
   Aucune dépendance. Chargé AVANT les scripts inline des pages.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var DAY = 86400000;
  var START_KEY = 'px_start_date';

  // Date locale YYYY-MM-DD (toISOString = UTC → décale la date entre minuit et 2h en France)
  function localISO(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parseISO(s) { return new Date(s + 'T12:00:00'); }
  function lsGet(k, def) { try { var v = localStorage.getItem(k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } }

  // ── DATE DE DÉPART ─────────────────────────────────────────────────
  function nextMonday(from) {
    var d = new Date(from || new Date()); d.setHours(12, 0, 0, 0);
    var add = (8 - d.getDay()) % 7; if (add === 0) add = 7;
    d.setDate(d.getDate() + add); return d;
  }
  function getStartISO() { var s = null; try { s = localStorage.getItem(START_KEY); } catch (e) {} return (s && /^\d{4}-\d{2}-\d{2}$/.test(s)) ? s : null; }
  function setStartISO(iso) { try { if (iso) localStorage.setItem(START_KEY, iso); else localStorage.removeItem(START_KEY); } catch (e) {} }
  // Départ effectif : date choisie, sinon lundi prochain (provisoire)
  function startDate() { var s = getStartISO(); return s ? parseISO(s) : nextMonday(); }

  var BLOCKS = {
    B1: { code: 'B1', name: 'Apprentissage', rirC: '3', rirI: '3', desc: 'Charges légères, technique parfaite, haut de la fourchette de reps. RIR 3 partout.' },
    B2: { code: 'B2', name: 'Progression', rirC: '2', rirI: '2', desc: 'Double progression : quand toutes les séries atteignent le haut de la fourchette, +1 palier de charge. RIR 2.' },
    B3: { code: 'B3', name: 'Intensification', rirC: '2', rirI: '1', desc: 'Charges les plus lourdes du cycle, bas de fourchette accepté. RIR 2 sur les polyarticulaires, 1 sur les isolations. Jamais d\'échec sur les développés.' },
    DL: { code: 'DL', name: 'Deload', rirC: '4+', rirI: '4+', desc: 'Moitié des séries, charges −40 %, RIR 4+. Samedi : V-Shape allégé ou repos. Le corps assimile le cycle.' }
  };

  // État du programme à une date donnée
  function status(at) {
    var now = at ? new Date(at) : new Date(); now.setHours(12, 0, 0, 0);
    var start = startDate();
    var days = Math.round((now - start) / DAY);
    var res = { set: !!getStartISO(), startISO: localISO(start), start: start, days: days };
    if (days < 0) { res.started = false; res.daysUntil = -days; res.week = 0; res.block = BLOCKS.B1; res.cycle = 1; res.cycleWeek = 0; return res; }
    var week = Math.floor(days / 7) + 1;
    res.started = true; res.finished = week > 52; res.week = Math.min(52, week);
    var cw = ((res.week - 1) % 13) + 1;
    res.cycleWeek = cw; res.cycle = Math.ceil(res.week / 13);
    res.block = cw <= 4 ? BLOCKS.B1 : cw <= 8 ? BLOCKS.B2 : cw <= 12 ? BLOCKS.B3 : BLOCKS.DL;
    res.monthFloat = Math.min(12, days / 30.4375);
    return res;
  }

  // ── OBJECTIFS & PROJECTION (valeurs FIN de mois) ──────────────────
  // Recomposition : nutrition 2 650 / 2 100 kcal (moy. 2 336, ≈ −100 kcal/j vs maintenance)
  // → perte de gras ~0,25 kg/mois, masse maigre +4,5 kg/an (débutant, haut du corps, créatine incluse)
  var GOALS = {
    weight0: 71, weight: 72.5,
    bf0: 20.5, bf: 16,
    lean0: 56.4, lean: 60.9,
    fat0: 14.6, fat: 11.6,
    waist0: 86, waist: 82,
    shoulders0: 48, shoulders: 51,     // largeur bideltoïde (cm)
    biceps0: 34, biceps: '36–37',      // tendu (33 au repos)
    chest0: 87, chest: 92
  };
  var PROJ = {
    weight: [71.0, 71.5, 71.9, 72.1, 72.3, 72.5, 72.5, 72.5, 72.6, 72.6, 72.6, 72.5, 72.5],
    bf:     [20.5, 20.1, 19.6, 19.2, 18.8, 18.4, 18.1, 17.7, 17.4, 17.0, 16.7, 16.3, 16.0],
    lean:   [56.4, 57.2, 57.8, 58.3, 58.7, 59.1, 59.4, 59.7, 60.0, 60.3, 60.5, 60.7, 60.9],
    waist:  [86.0, 85.5, 85.0, 84.5, 84.5, 84.0, 83.5, 83.5, 83.0, 82.5, 82.5, 82.0, 82.0]
  };

  var MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  var MOIS_L = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  function addMonths(d, n) { var x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
  // Mois n du programme (1..12) : intervalle de dates réel
  function monthRange(n) {
    var s = startDate(), from = addMonths(s, n - 1), to = new Date(addMonths(s, n) - DAY);
    return { from: from, to: to, label: from.getDate() + ' ' + MOIS[from.getMonth()] + ' → ' + to.getDate() + ' ' + MOIS[to.getMonth()] + ' ' + to.getFullYear(), short: MOIS[to.getMonth()] };
  }
  function fmtDate(d, opts) { return new Date(d).toLocaleDateString('fr-FR', opts || { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
  function num(v, dec) { return Number(v).toFixed(dec === undefined ? 1 : dec).replace('.', ','); }

  // ── SÉANCES (union de toutes les sources) ─────────────────────────
  function typeFromName(n) { n = String(n || '').toUpperCase(); return n.indexOf('PUSH') === 0 ? 'push' : n.indexOf('PULL') === 0 ? 'pull' : n.indexOf('V-SHAPE') === 0 ? 'upper' : 'other'; }
  function sessions() {
    var map = {};
    (lsGet('px_sessions', []) || []).forEach(function (d) { if (typeof d === 'string') map[d] = { date: d, type: 'other', source: 'progression' }; });
    (lsGet('px_sessions_v2', []) || []).forEach(function (s) { if (s && s.date) map[s.date] = Object.assign({ source: 'dashboard' }, s); });
    var lb = lsGet('px_logbook', { sessions: [] }) || { sessions: [] };
    (lb.sessions || []).forEach(function (s) {
      var prev = map[s.date] || {};
      map[s.date] = { date: s.date, type: typeFromName(s.sessionName), source: 'logbook', duration: prev.duration || '', weight: prev.weight || '', feeling: prev.feeling || '', note: prev.note || '', exercises: s.exercises || [] };
    });
    return Object.keys(map).sort().map(function (k) { return map[k]; });
  }
  // Streak commun : la série tient tant que l'écart entre 2 séances ≤ 4 jours
  // (programme lun/jeu/sam → écarts normaux de 2-3 j ; sauter UNE séance ne casse pas la série)
  var GAP = 4;
  function streak(dates) {
    var u = Array.from(new Set(dates || sessions().map(function (s) { return s.date; }))).sort();
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

  // ── MESURES ───────────────────────────────────────────────────────
  var FR_M = { 'janvier': 0, 'février': 1, 'fevrier': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7, 'aout': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11, 'decembre': 11 };
  function measureISO(m) {
    if (m.iso) return m.iso;
    var r = /(\d{1,2})\s+([a-zéûè]+)\s+(\d{4})/i.exec(m.date || '');
    if (r && FR_M[r[2].toLowerCase()] !== undefined) return localISO(new Date(+r[3], FR_M[r[2].toLowerCase()], +r[1], 12));
    return null;
  }
  function measures() {
    return (lsGet('px_measures', []) || []).map(function (m, i) { return Object.assign({ _i: i }, m, { iso: measureISO(m) }); });
  }
  function lastMeasure(field) {
    var ms = measures().filter(function (m) { return m[field] !== undefined && m[field] !== '' && !isNaN(parseFloat(m[field])); });
    if (!ms.length) return null;
    ms.sort(function (a, b) { return (a.iso || '').localeCompare(b.iso || '') || a._i - b._i; });
    return parseFloat(ms[ms.length - 1][field]);
  }
  // Position (en mois, 0..12) d'une date dans le programme
  function monthPos(iso) { return Math.max(0, Math.min(12, (parseISO(iso) - startDate()) / DAY / 30.4375)); }

  // ── CARTE « DATE DE DÉPART » (dashboard + progression) ────────────
  var cssDone = false;
  function injectCSS() {
    if (cssDone) return; cssDone = true;
    var css = '' +
      '.az-start{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:#fff;border:1px solid #e5e0d5;border-left:4px solid #e8960a;border-radius:14px;padding:14px 18px;box-shadow:0 2px 12px rgba(0,0,0,.05);font-family:Inter,system-ui,sans-serif;color:#1a1a2e}' +
      '.az-start-ico{font-size:1.5rem;line-height:1}' +
      '.az-start-txt{flex:1;min-width:200px}' +
      '.az-start-t{font-weight:700;font-size:.95rem}' +
      '.az-start-s{font-size:.8rem;color:#6b7280;margin-top:2px;line-height:1.4}' +
      '.az-start-f{display:flex;gap:8px;align-items:center;flex-wrap:wrap}' +
      '.az-start input[type=date]{font:inherit;font-size:.85rem;padding:8px 10px;border:1px solid #e5e0d5;border-radius:10px;background:#f7f4ef;color:#1a1a2e;min-height:40px}' +
      '.az-btn{font:inherit;font-size:.8rem;font-weight:700;padding:9px 16px;border-radius:100px;border:1px solid #e8960a;background:#e8960a;color:#fff;cursor:pointer;min-height:40px}' +
      '.az-btn.ghost{background:#fff;color:#374151;border-color:#e5e0d5}' +
      '.az-pill{display:inline-block;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:100px;background:rgba(232,150,10,.12);color:#b87400;margin-left:6px;vertical-align:middle}' +
      /* barre de navigation mobile */
      '.az-tabbar{display:none}' +
      '@media(max-width:768px){' +
      '.az-tabbar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:900;background:rgba(11,16,32,.97);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,.08);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}' +
      '.az-tabbar a{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;min-height:48px;justify-content:center;color:rgba(255,255,255,.62);text-decoration:none;font:600 10px/1.1 Inter,system-ui,sans-serif;letter-spacing:.02em;border-radius:10px;-webkit-tap-highlight-color:transparent}' +
      '.az-tabbar a .i{font-size:19px;line-height:1}' +
      '.az-tabbar a.on{color:#e8960a;background:rgba(232,150,10,.10)}' +
      'body.az-has-tabbar{padding-bottom:calc(64px + env(safe-area-inset-bottom))}' +
      '}' +
      '@media print{.az-tabbar{display:none!important}}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  }
  function renderStartCard(el, onChange) {
    if (!el) return; injectCSS();
    var st = status(), html;
    var dflt = st.set ? st.startISO : localISO(nextMonday());
    var form = '<div class="az-start-f"><input type="date" id="azStartIn" value="' + dflt + '" aria-label="Date de départ"><button class="az-btn" id="azStartOk">' + (st.set ? 'Modifier' : 'Valider') + '</button>' + (st.set ? '<button class="az-btn ghost" id="azStartRm" title="Effacer la date">Effacer</button>' : '') + '</div>';
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
    if (rm) rm.onclick = function () { if (!confirm('Effacer la date de départ ?')) return; setStartISO(null); renderStartCard(el, onChange); if (onChange) onChange(); };
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
    if (document.querySelector('.az-tabbar') || document.body.hasAttribute('data-no-tabbar')) return;
    injectCSS();
    var page = (location.pathname.split('/').pop() || 'index.html');
    // <div> et non <nav> : les pages stylent « nav { position:fixed; top:0 … } » globalement
    var nav = document.createElement('div'); nav.className = 'az-tabbar'; nav.setAttribute('role', 'navigation'); nav.setAttribute('aria-label', 'Navigation principale');
    nav.innerHTML = TABS.map(function (t) { return '<a href="' + t.h + '"' + (page === t.h ? ' class="on" aria-current="page"' : '') + '><span class="i">' + t.i + '</span>' + t.t + '</a>'; }).join('');
    document.body.appendChild(nav); document.body.classList.add('az-has-tabbar');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectTabbar); else injectTabbar();

  // ── SAUVEGARDE / RESTAURATION (toutes les clés px_*) ──────────────
  var BK = [
    ['logbook', 'px_logbook', { sessions: [] }], ['sessions_v2', 'px_sessions_v2', []], ['measures', 'px_measures', []],
    ['streak_sessions', 'px_sessions', []], ['courses_sel', 'px_courses_sel', []],
    ['pingpong_matches', 'px_pingpong_matches', []], ['pingpong_obj', 'px_pingpong_obj', {}], ['pingpong_video', 'px_pingpong_video', {}]
  ];
  function dataCount() {
    var lb = lsGet('px_logbook', { sessions: [] }) || {};
    return ((lb.sessions || []).length) + (lsGet('px_sessions_v2', []) || []).length + (lsGet('px_measures', []) || []).length + (lsGet('px_sessions', []) || []).length;
  }
  function exportData() {
    var data = { exported: new Date().toISOString(), app: 'ALLEZ', start_date: getStartISO() };
    BK.forEach(function (b) { data[b[0]] = lsGet(b[1], b[2]); });
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'allez-backup-' + localISO() + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    try { localStorage.setItem('px_last_backup', JSON.stringify({ date: new Date().toISOString(), count: dataCount() })); } catch (e) {}
  }
  function importData(input) {
    var file = input.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var data = JSON.parse(e.target.result);
        if (!data.logbook && !data.sessions_v2 && !data.measures) { alert('Fichier invalide — ne provient pas d\'ALLEZ.'); input.value = ''; return; }
        if (!confirm('Restaurer ces données ?\n\nLes données actuelles de cet appareil seront remplacées.\nCette action est irréversible.')) { input.value = ''; return; }
        BK.forEach(function (b) { if (data[b[0]] !== undefined) localStorage.setItem(b[1], JSON.stringify(data[b[0]])); });
        if (data.start_date) setStartISO(data.start_date);
        location.reload();
      } catch (e2) { alert('Erreur : fichier JSON invalide.'); input.value = ''; }
    };
    reader.readAsText(file);
  }

  w.ALLEZ = {
    exportData: exportData, importData: importData, dataCount: dataCount,
    localISO: localISO, parseISO: parseISO, nextMonday: nextMonday,
    getStartISO: getStartISO, setStartISO: setStartISO, startDate: startDate, status: status, BLOCKS: BLOCKS,
    GOALS: GOALS, PROJ: PROJ, MOIS: MOIS, MOIS_L: MOIS_L, monthRange: monthRange, fmtDate: fmtDate, num: num,
    sessions: sessions, streak: streak, weekDates: weekDates, typeFromName: typeFromName,
    measures: measures, lastMeasure: lastMeasure, measureISO: measureISO, monthPos: monthPos,
    renderStartCard: renderStartCard, injectCSS: injectCSS
  };
})(window);
