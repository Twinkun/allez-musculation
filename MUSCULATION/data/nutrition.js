/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/nutrition.js · SOURCE UNIQUE des cibles nutritionnelles
   ALLEZ.NUTRITION : aucune cible n'est écrite en dur, tout est calculé
   à partir du profil (poids, taille, âge, sexe) et des paramètres ci-dessous.
   Chargé après core.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

  // Paramètres de la stratégie (recomposition : léger surplus les jours de muscu, léger déficit les jours de ping-pong, déficit au repos)
  // Dépense d'un jour = métabolisme de base × niveau d'activité d'une journée sans sport + coût net de l'activité du jour
  // (coût net = (MET − 1) × poids × durée : le 1 MET de repos est déjà compté dans la journée de base).
  var PARAMS = {
    palBase: 1.4,               // journée de bureau sans sport (FAO/WHO/UNU 2004 : mode de vie sédentaire ou léger = 1,40 à 1,69)
    activites: {
      muscu:    { met: 3.5, heures: 1.25, jours: 3 },   // Compendium 2011, code 02054 (musculation, plusieurs exercices, 8-15 répétitions)
      pingpong: { met: 4.0, heures: 2.5,  jours: 2 }    // Compendium 2011, code 15660 (tennis de table) · mardi et vendredi, 2 h 30
    },
    joursRepos: 2,
    margeSeance: 1.04,          // jour de muscu = dépense du jour + 4 % (léger surplus pour construire)
    margePingpong: 0.96,        // jour de ping-pong = dépense du jour − 4 %
    margeRepos: 0.90,           // jour de repos = dépense du jour − 10 %
    arrondiKcal: 50,
    proteinesParKg: 2.25,       // un peu au-dessus de la plage utile (1,6 à 2,2 g/kg : Morton 2018, DOI 10.1136/bjsports-2017-097608) : marge pour les jours en déficit
    lipidesSeanceParKg: 1.0,
    lipidesPingpongParKg: 1.0,
    lipidesReposParKg: 1.05,
    arrondiGrammes: 5,
    incertitude: 0.10           // la dépense estimée peut varier de ±10 % : bilan toutes les 4 semaines
  };
  var SOURCES = {
    bmr: 'Mifflin-St Jeor (1990) : 10 × poids + 6,25 × taille − 5 × âge + 5 (homme) ou − 161 (femme)',
    proteines: 'Morton et al. 2018, Br J Sports Med, DOI 10.1136/bjsports-2017-097608',
    activite: 'Compendium of Physical Activities, Ainsworth et al. 2011, Med Sci Sports Exerc, DOI 10.1249/MSS.0b013e31821ece12 · FAO/WHO/UNU 2004, Human energy requirements'
  };

  function roundTo(x, step) { return Math.round(x / step) * step; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }
  // delta = cible − dépense estimée de CE jour (et non de la moyenne de la semaine)
  function day(kcal, p, fat, depense, weight) {
    var g = Math.round((kcal - p * 4 - fat * 9) / 4);
    return {
      kcal: kcal, p: p, g: g, l: fat, pKcal: p * 4, gKcal: g * 4, lKcal: fat * 9,
      pPct: Math.round(p * 4 / kcal * 100), gPct: Math.round(g * 4 / kcal * 100), lPct: Math.round(fat * 9 / kcal * 100),
      depense: depense, delta: kcal - depense, pParKg: r2(p / weight), gParKg: r1(g / weight), lParKg: r2(fat / weight)
    };
  }
  // profil : { sex, age, height, start:{ weight, bf } } → cibles
  function compute(p) {
    var s = p.start, P = PARAMS, A = P.activites;
    var constante = p.sex === 'f' ? -161 : 5;
    var bmrExact = 10 * s.weight + 6.25 * p.height - 5 * p.age + constante, bmr = Math.round(bmrExact);
    var base = Math.round(bmr * P.palBase);
    var cout = function (a) { return Math.round((a.met - 1) * s.weight * a.heures); };
    var depMuscu = base + cout(A.muscu), depPP = base + cout(A.pingpong), depRepos = base;
    var jours = A.muscu.jours + A.pingpong.jours + P.joursRepos;
    var tdee = Math.round((A.muscu.jours * depMuscu + A.pingpong.jours * depPP + P.joursRepos * depRepos) / jours);   // dépense moyenne de la semaine
    var prot = roundTo(P.proteinesParKg * s.weight, P.arrondiGrammes);
    var lip = function (k) { return roundTo(k * s.weight, P.arrondiGrammes); };
    var train = day(roundTo(depMuscu * P.margeSeance, P.arrondiKcal), prot, lip(P.lipidesSeanceParKg), depMuscu, s.weight);
    var pingpong = day(roundTo(depPP * P.margePingpong, P.arrondiKcal), prot, lip(P.lipidesPingpongParKg), depPP, s.weight);
    var rest = day(roundTo(depRepos * P.margeRepos, P.arrondiKcal), prot, lip(P.lipidesReposParKg), depRepos, s.weight);
    var moyenne = Math.round((A.muscu.jours * train.kcal + A.pingpong.jours * pingpong.kcal + P.joursRepos * rest.kcal) / jours);
    var lean = s.weight * (1 - s.bf / 100);
    return {
      bmr: bmr, base: base, tdee: tdee, activite: r2(tdee / bmr), palBase: P.palBase,
      coutMuscu: cout(A.muscu), coutPingpong: cout(A.pingpong), muscuMet: A.muscu.met, muscuHeures: A.muscu.heures, pingpongMet: A.pingpong.met, pingpongHeures: A.pingpong.heures,
      train: train, pingpong: pingpong, rest: rest,
      moyenne: moyenne, ecartMoyen: moyenne - tdee, proteines: prot, proteinesParKg: r2(prot / s.weight),
      proteinesMin: Math.round(1.6 * s.weight), proteinesMax: Math.round(2.2 * s.weight),
      bmrKatch: Math.round(370 + 21.6 * lean), tdeeMarge: Math.round(tdee * P.incertitude),
      joursSeance: A.muscu.jours, joursPingpong: A.pingpong.jours, joursRepos: P.joursRepos,
      formule: { poids: s.weight, taille: p.height, age: p.age, termePoids: 10 * s.weight, termeTaille: 6.25 * p.height, termeAge: 5 * p.age, constante: constante }
    };
  }
  // Type de journée nutritionnelle d'un jour de la semaine (0 = dimanche) : 'train' | 'pingpong' | 'rest'
  function dayKind(dn) {
    var Pg = A.PROGRAM; if (!Pg) return 'rest';
    if (Pg.byDay[dn]) return 'train';
    var o = Pg.otherDays[dn]; return o && o.kind === 'pingpong' ? 'pingpong' : 'rest';
  }
  function forDay(dn) { return current()[dayKind(dn)]; }
  var cacheKey = null, cacheVal = null;
  function current() {
    var p = A.profile(), k = JSON.stringify([p.sex, p.age, p.height, p.start.weight, p.start.bf]);
    if (k !== cacheKey) { cacheKey = k; cacheVal = compute(p); }
    return cacheVal;
  }

  A.NUTRITION = { PARAMS: PARAMS, SOURCES: SOURCES, compute: compute, current: current, dayKind: dayKind, forDay: forDay };
})(typeof window !== 'undefined' ? window : globalThis);
