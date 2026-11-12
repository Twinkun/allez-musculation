/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/nutrition.js · SOURCE UNIQUE des cibles nutritionnelles
   ALLEZ.NUTRITION : aucune cible n'est écrite en dur, tout est calculé
   à partir du profil (poids, taille, âge, sexe) et des paramètres ci-dessous.
   Chargé après core.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

  // Paramètres de la stratégie (recomposition : léger surplus les jours de séance, déficit au repos)
  var PARAMS = {
    activite: 1.45,             // 3 séances + 1 activité cardio par semaine, travail de bureau
    facteurSeance: 1.09,        // jour de séance = dépense × 1,09
    facteurRepos: 0.865,        // jour de repos = dépense × 0,865
    arrondiKcal: 50,
    proteinesParKg: 2.25,       // haut de la plage utile (1,6 à 2,2 g/kg : Morton 2018, DOI 10.1136/bjsports-2017-097608)
    lipidesSeanceParKg: 1.0,
    lipidesReposParKg: 1.05,
    arrondiGrammes: 5,
    joursSeance: 3, joursRepos: 4,
    incertitude: 0.10           // la dépense estimée peut varier de ±10 % : bilan toutes les 4 semaines
  };
  var SOURCES = {
    bmr: 'Mifflin-St Jeor (1990) : 10 × poids + 6,25 × taille − 5 × âge + 5 (homme) ou − 161 (femme)',
    proteines: 'Morton et al. 2018, Br J Sports Med, DOI 10.1136/bjsports-2017-097608'
  };

  function roundTo(x, step) { return Math.round(x / step) * step; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }
  function day(kcal, p, fat, tdee, weight) {
    var g = Math.round((kcal - p * 4 - fat * 9) / 4);
    return {
      kcal: kcal, p: p, g: g, l: fat, pKcal: p * 4, gKcal: g * 4, lKcal: fat * 9,
      pPct: Math.round(p * 4 / kcal * 100), gPct: Math.round(g * 4 / kcal * 100), lPct: Math.round(fat * 9 / kcal * 100),
      delta: kcal - tdee, pParKg: r2(p / weight), gParKg: r1(g / weight), lParKg: r2(fat / weight)
    };
  }
  // profil : { sex, age, height, start:{ weight, bf } } → cibles
  function compute(p) {
    var s = p.start, P = PARAMS;
    var constante = p.sex === 'f' ? -161 : 5;
    var bmrExact = 10 * s.weight + 6.25 * p.height - 5 * p.age + constante, bmr = Math.round(bmrExact);
    var tdee = Math.round(bmr * P.activite);
    var prot = roundTo(P.proteinesParKg * s.weight, P.arrondiGrammes);
    var train = day(roundTo(tdee * P.facteurSeance, P.arrondiKcal), prot, roundTo(P.lipidesSeanceParKg * s.weight, P.arrondiGrammes), tdee, s.weight);
    var rest = day(roundTo(tdee * P.facteurRepos, P.arrondiKcal), prot, roundTo(P.lipidesReposParKg * s.weight, P.arrondiGrammes), tdee, s.weight);
    var moyenne = Math.round((P.joursSeance * train.kcal + P.joursRepos * rest.kcal) / 7);
    var lean = s.weight * (1 - s.bf / 100);
    return {
      bmr: bmr, tdee: tdee, activite: P.activite, train: train, rest: rest,
      moyenne: moyenne, ecartMoyen: moyenne - tdee, proteines: prot, proteinesParKg: r2(prot / s.weight),
      proteinesMin: Math.round(1.6 * s.weight), proteinesMax: Math.round(2.2 * s.weight),
      bmrKatch: Math.round(370 + 21.6 * lean), tdeeMarge: Math.round(tdee * P.incertitude),
      joursSeance: P.joursSeance, joursRepos: P.joursRepos,
      formule: { poids: s.weight, taille: p.height, age: p.age, termePoids: 10 * s.weight, termeTaille: 6.25 * p.height, termeAge: 5 * p.age, constante: constante }
    };
  }
  var cacheKey = null, cacheVal = null;
  function current() {
    var p = A.profile(), k = JSON.stringify([p.sex, p.age, p.height, p.start.weight, p.start.bf]);
    if (k !== cacheKey) { cacheKey = k; cacheVal = compute(p); }
    return cacheVal;
  }

  A.NUTRITION = { PARAMS: PARAMS, SOURCES: SOURCES, compute: compute, current: current };
})(typeof window !== 'undefined' ? window : globalThis);
