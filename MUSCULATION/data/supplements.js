/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/supplements.js · SOURCE UNIQUE des compléments
   ALLEZ.SUPPLEMENTS : composition par nutriment, niveau de preuve A/B/C
   avec source, limites supérieures de sécurité (EFSA) et cumul calculé.
   Niveaux de preuve : A = solide (consensus, méta-analyses ou allégation
   autorisée dans l'UE) · B = modéré (plusieurs essais, effet modeste ou
   études financées par le fabricant) · C = faible ou non démontré.
   Chargé après core.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

  // ── LIMITES SUPÉRIEURES DE SÉCURITÉ (adulte, par jour) ────────────
  // scope 'total' = toutes sources (aliments + compléments) · 'supp' = compléments seuls
  var UL = {
    vitd: { label: 'Vitamine D', unit: 'µg', ul: 100, scope: 'total', source: 'EFSA 2023', doi: '10.2903/j.efsa.2023.8145' },
    zinc: { label: 'Zinc', unit: 'mg', ul: 25, scope: 'total', source: 'Comité scientifique de l\'alimentation humaine 2003, repris par l\'EFSA' },
    b6:   { label: 'Vitamine B6', unit: 'mg', ul: 12, scope: 'total', source: 'EFSA 2023', doi: '10.2903/j.efsa.2023.8006' },
    mg:   { label: 'Magnésium', unit: 'mg', ul: 250, scope: 'supp', source: 'Comité scientifique de l\'alimentation humaine 2001, repris par l\'EFSA' }
  };
  // Apports alimentaires du plan repas (3 journées types, avec ou sans poisson gras), calculés avec la table Ciqual 2025 (Anses, DOI 10.57745/RDMHWY)
  var FOOD = { vitd: [2.1, 10.5], zinc: [9.0, 10.3], b6: [2.5, 3.5] };

  var REF = {
    kreider2017: { txt: 'Kreider et al. 2017, J Int Soc Sports Nutr', doi: '10.1186/s12970-017-0173-z' },
    rawson2003: { txt: 'Rawson & Volek 2003, J Strength Cond Res', doi: '10.1519/1533-4287(2003)017<0822:eocsar>2.0.co;2' },
    morton2018: { txt: 'Morton et al. 2018, Br J Sports Med', doi: '10.1136/bjsports-2017-097608' },
    pilz2011: { txt: 'Pilz et al. 2011, Horm Metab Res', doi: '10.1055/s-0030-1269854' },
    lerchbaum2017: { txt: 'Lerchbaum et al. 2017, J Clin Endocrinol Metab', doi: '10.1210/jc.2017-01428' },
    lerchbaum2019: { txt: 'Lerchbaum et al. 2019, Eur J Nutr', doi: '10.1007/s00394-018-1858-z' },
    wilborn2004: { txt: 'Wilborn et al. 2004, J Int Soc Sports Nutr', doi: '10.1186/1550-2783-1-2-12' },
    shaw2017: { txt: 'Shaw et al. 2017, Am J Clin Nutr', doi: '10.3945/ajcn.116.138594' },
    chandrasekhar2012: { txt: 'Chandrasekhar et al. 2012, Indian J Psychol Med', doi: '10.4103/0253-7176.106022' },
    wankhede2015: { txt: 'Wankhede et al. 2015, J Int Soc Sports Nutr', doi: '10.1186/s12970-015-0104-9' },
    lopresti2019: { txt: 'Lopresti et al. 2019, Am J Mens Health', doi: '10.1177/1557988319835985' },
    smith2021: { txt: 'Smith et al. 2021, Adv Nutr (revue systématique)', doi: '10.1093/advances/nmaa134' },
    ue432: { txt: 'Allégation de santé autorisée, règlement (UE) n° 432/2012' },
    anses2024: { txt: 'Avis de l\'ANSES sur l\'ashwagandha, 2024' }
  };

  // ── PRODUITS ──────────────────────────────────────────────────────
  // unite : ce que représente « 1 » dans le stack · nutriments : apport par unité (mêmes clés que UL)
  // effets : ce que le produit fait ou non, avec le niveau de preuve
  var PRODUCTS = {
    creatine: { icone: '⚗️', titre: 'CRÉATINE', court: 'Créatine 5 g', moment: 'pre', quand: 'Tous les jours, repos compris', resume: 'Force et volume d\'entraînement',
      marque: 'Optimum Nutrition', nom: 'Créatine monohydrate', priorite: 3, unite: '5 g', nutriments: {},
      dose: '5 g par jour, tous les jours (repos compris). Pas de phase de charge nécessaire.',
      aSavoir: 'Environ +1 kg sur la balance les premières semaines : de l\'eau retenue dans le muscle, pas du gras.',
      effets: [{ effet: 'Force et volume d\'entraînement (environ +8 % de force et +14 % de répétitions contre placebo)', preuve: 'A', refs: ['rawson2003', 'kreider2017'] }] },
    whey: { icone: '🥛', titre: 'GOLD WHEY', court: 'Whey 1 dose', moment: 'post', quand: 'Après la séance, ou en collation', resume: '24 g de protéines par dose',
      marque: 'Optimum Nutrition', nom: 'Gold Standard Whey', priorite: 3, unite: '1 dose', nutriments: {},
      dose: '1 dose par jour en général, 2 au maximum.',
      effets: [{ effet: 'Atteindre l\'apport en protéines (un aliment pratique, pas un produit magique)', preuve: 'A', refs: ['morton2018'] }] },
    omega3: { icone: '🐟', titre: 'OMÉGA-3 + D3', court: 'Oméga-3', parUnite: 'capsule', moment: 'matin', quand: 'Matin, avec un repas contenant des graisses', resume: 'EPA + DHA · vitamine D 1 000 UI',
      marque: 'WHC', nom: 'UnoCardio 1000 + Vitamin D 1000', priorite: 2, unite: '1 capsule', nutriments: { vitd: 25 }, autres: 'EPA 675 mg + DHA 400 à 460 mg par capsule',
      dose: '1 capsule par jour (dose de l\'étiquette). C\'est ta seule source de vitamine D en plus de l\'Opti-Men : pas de D3 séparée sans prise de sang qui montre un manque.',
      effets: [
        { effet: 'Fonction cardiaque normale (dès 250 mg d\'EPA + DHA par jour)', preuve: 'A', refs: ['ue432'] },
        { effet: 'Vitamine D : os et fonction musculaire, en cas d\'apport insuffisant', preuve: 'A', refs: ['ue432'] },
        { effet: 'Vitamine D et testostérone', preuve: 'C', verdict: 'Non démontré : un essai positif chez des hommes carencés et en surpoids, deux essais sans effet.', refs: ['pilz2011', 'lerchbaum2017', 'lerchbaum2019'] }] },
    optimen: { icone: '💊', titre: 'OPTI-MEN', court: 'Opti-Men', moment: 'matin', quand: 'Matin, avec le petit-déjeuner', resume: 'Filet de sécurité en vitamines et minéraux',
      marque: 'Optimum Nutrition', nom: 'Opti-Men (multivitamines, version UE)', priorite: 2, unite: '3 comprimés', nutriments: { vitd: 10, zinc: 12, mg: 80, b6: 5.4 }, autres: 'cuivre 2 mg',
      dose: '3 comprimés par jour (dose de l\'étiquette).',
      effets: [{ effet: 'Filet de sécurité contre les petits manques ; aucune allégation de performance retenue', preuve: 'C', refs: [] }] },
    collagene: { icone: '🦴', titre: 'COLLAGÈNE', court: 'Collagène 10-15 g + vit. C', moment: 'pre', quand: '30 à 60 min avant la séance', resume: 'Tendons et ligaments · preuves limitées',
      marque: 'Vital Proteins', nom: 'Collagène + vitamine C', priorite: 1, unite: '10-15 g', nutriments: {},
      dose: '10-15 g avec 50-100 mg de vitamine C, 30 à 60 min avant la séance.',
      effets: [{ effet: 'Tendons et ligaments', preuve: 'C', verdict: 'Une petite étude (8 sujets) sur un marqueur sanguin. Ne compte pas dans les protéines utiles au muscle.', refs: ['shaw2017'] }] },
    ashwagandha: { icone: '🌿', titre: 'ASHWAGANDHA', court: 'Ashwagandha 300 mg', moment: ['matin', 'soir'], quand: '300 mg au petit-déjeuner + 300 mg au dîner, avec le repas · cycle de 8 semaines, puis 4 d\'arrêt', resume: 'Stress et sommeil',
      marque: 'Nutri&Co', nom: 'Ashwagandha KSM-66', priorite: 1, unite: '600 mg', nutriments: {},
      dose: '600 mg par jour en deux prises de 300 mg, matin et soir avec un repas : c\'est le schéma des essais cliniques (Chandrasekhar 2012, Wankhede 2015). Les essais ont duré 8 semaines : cycle de 8 semaines, puis 4 semaines d\'arrêt.',
      prudence: 'Déconseillé en cas de trouble thyroïdien, hépatique ou cardiaque, et avec des médicaments sédatifs.',
      effets: [
        { effet: 'Stress et sommeil', preuve: 'B', verdict: 'Baisse du cortisol dans plusieurs essais, financés par le fabricant.', refs: ['chandrasekhar2012'] },
        { effet: 'Testostérone', preuve: 'C', verdict: 'Préliminaire : hausse d\'environ 15 % dans deux petits essais financés par le fabricant ; une revue systématique juge les preuves limitées.', refs: ['wankhede2015', 'lopresti2019', 'smith2021'] }],
      refsPrudence: ['anses2024'] }
  };
  Object.keys(PRODUCTS).forEach(function (id) { PRODUCTS[id].id = id; });

  // ── STACKS (unités par jour) ──────────────────────────────────────
  // ACTUEL = stack décidé le 12-11-2026 : 1 capsule d'UnoCardio, plus de D3 séparée, plus de ZMA (cumul sous les limites EFSA).
  // ANCIEN = stack d'avant (2 capsules + D3 2 000 UI + ZMA), gardé pour l'historique et les tests : vitamine D et zinc dépassés.
  var STACKS = {
    actuel: { creatine: 1, whey: 1, omega3: 1, optimen: 1, collagene: 1, ashwagandha: 1 },
    ancien: { creatine: 1, whey: 1, omega3: 2, optimen: 1, collagene: 1, ashwagandha: 1, _d3: 50, _zma: 1 }
  };
  var ACTIF = 'actuel';
  // Produits retirés le 12-11-2026, gardés seulement pour recalculer l'ancien stack (jamais affichés)
  var RETIRES = {
    _d3: { nom: 'Vitamine D3 Nutri&Co (2 000 UI)', court: 'D3', nutriments: { vitd: 1 } },
    _zma: { nom: 'ZMA MyProtein', court: 'ZMA', nutriments: { zinc: 10, mg: 150, b6: 3.5 } }
  };
  // Moments de prise et consigne commune
  var MOMENTS = { matin: 'avec le petit-déjeuner (repas qui contient des graisses)', pre: '30 à 60 min avant la séance', soir: 'avec le dîner' };
  function hasMoment(p, m) { return Array.isArray(p.moment) ? p.moment.indexOf(m) >= 0 : p.moment === m; }

  function r1(x) { return Math.round(x * 10) / 10; }
  // Cumul par nutriment
  function cumul(stack) {
    stack = stack || STACKS[ACTIF];
    var out = {};
    Object.keys(UL).forEach(function (n) {
      var u = UL[n], supp = 0, detail = [];
      Object.keys(stack).forEach(function (id) {
        var p = PRODUCTS[id] || RETIRES[id], q = stack[id]; if (!p || !q) return;
        var v = (p.nutriments[n] || 0) * q;
        if (v) { supp += v; detail.push({ id: id, nom: p.nom, apport: r1(v) }); }
      });
      var food = u.scope === 'total' && FOOD[n] ? FOOD[n] : [0, 0];
      var min = r1(supp + food[0]), max = r1(supp + food[1]);
      out[n] = { label: u.label, unit: u.unit, ul: u.ul, scope: u.scope, supp: r1(supp), detail: detail, alimMin: food[0], alimMax: food[1], min: min, max: max,
        statut: min > u.ul ? 'depasse' : max >= u.ul ? 'limite' : 'ok' };
    });
    return out;
  }
  function alerts(stack) {
    var c = cumul(stack), L = [];
    Object.keys(c).forEach(function (n) {
      var x = c[n]; if (x.statut === 'ok') return;
      var tot = x.scope === 'total' ? String(x.min).replace('.', ',') + ' à ' + String(x.max).replace('.', ',') + ' ' + x.unit + ' avec l\'alimentation' : String(x.supp).replace('.', ',') + ' ' + x.unit + ' en compléments';
      L.push({ nutriment: n, statut: x.statut, texte: x.label + ' : ' + tot + ' pour une limite de ' + x.ul + ' ' + x.unit + ' par jour (' + (x.statut === 'depasse' ? 'dépassée' : 'atteinte') + ').' });
    });
    return L;
  }
  var SUMMARY = null;
  // Pour la liaison data-az : supp.actuel.vitd.supp, supp.dose.omega3, supp.nb…
  function summary() {
    if (SUMMARY) return SUMMARY;
    var dose = {}; Object.keys(STACKS[ACTIF]).forEach(function (id) { dose[id] = STACKS[ACTIF][id]; });
    SUMMARY = { actuel: cumul(STACKS.actuel), ancien: cumul(STACKS.ancien), dose: dose, ul: UL, nb: active().length };
    return SUMMARY;
  }
  // Produits pris (quantité > 0) dans le stack actif
  function active(stack) { stack = stack || STACKS[ACTIF]; return Object.keys(stack).filter(function (id) { return stack[id] > 0 && PRODUCTS[id]; }).map(function (id) { return PRODUCTS[id]; }); }
  // Dose affichée : « 1 capsule », « 600 mg »…
  function doseText(id, stack) { var p = PRODUCTS[id], n = (stack || STACKS[ACTIF])[id] || 0; return p.parUnite ? n + ' ' + p.parUnite + (n > 1 ? 's' : '') : p.unite; }
  // Libellé d'un moment de prise : « Oméga-3 (1 capsule) · Opti-Men · Ashwagandha 300 mg »
  function stackLabel(moment, stack) {
    return active(stack).filter(function (p) { return hasMoment(p, moment); }).map(function (p) { return p.court + (p.parUnite ? ' (' + doseText(p.id, stack) + ')' : ''); }).join(' · ');
  }
  function momentText(moment) { return MOMENTS[moment] || ''; }
  function refText(id) { var r = REF[id]; return r ? r.txt + (r.doi ? ' · DOI ' + r.doi : '') : ''; }
  function refUrl(id) { var r = REF[id]; return r && r.doi ? 'https://doi.org/' + r.doi : null; }

  A.SUPPLEMENTS = { UL: UL, FOOD: FOOD, REF: REF, PRODUCTS: PRODUCTS, STACKS: STACKS, ACTIF: ACTIF, RETIRES: RETIRES, MOMENTS: MOMENTS, hasMoment: hasMoment, momentText: momentText, cumul: cumul, alerts: alerts, summary: summary, active: active, doseText: doseText, stackLabel: stackLabel, refText: refText, refUrl: refUrl };
})(typeof window !== 'undefined' ? window : globalThis);
