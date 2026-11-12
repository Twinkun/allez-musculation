/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/repas.js · SOURCE UNIQUE du plan repas (3 journées types)
   ALLEZ.MEALS : repas, composition en grammes, totaux calculés.
   Valeurs pour 100 g : table Ciqual 2025 (Anses, DOI 10.57745/RDMHWY) ;
   USDA FoodData Central pour les aliments absents de Ciqual (src).
   Aucun horaire ici : offset = minutes par rapport à l'heure de séance
   (journées A et B) ou au petit-déjeuner (repos, journée C), heures
   saisies dans le profil privé.
   Fichier généré : ne pas modifier les totaux à la main, ils sont calculés.
   Chargé après core.js et data/supplements.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

  // Aliments du plan, pour 100 g (kcal, protéines, glucides disponibles, lipides)
  var FOODS = {
    "amande": {
      "nom": "Amande, émondée, sans sel ajouté",
      "kcal": 631.0,
      "p": 25.8,
      "g": 8.76,
      "l": 52.5,
      "src": "Ciqual 15041"
    },
    "avoine": {
      "nom": "Flocons d'avoine",
      "kcal": 369.0,
      "p": 11.4,
      "g": 57.7,
      "l": 7.82,
      "src": "Ciqual 32140"
    },
    "banane": {
      "nom": "Banane, chair sans peau, crue",
      "kcal": 87.6,
      "p": 1.06,
      "g": 19.7,
      "l": 0.25,
      "src": "Ciqual 13005"
    },
    "basmati_cru": {
      "nom": "Riz thaï ou basmati, cru",
      "kcal": 351.0,
      "p": 7.44,
      "g": 78.4,
      "l": 0.63,
      "src": "Ciqual 9119"
    },
    "beurrecacahuete": {
      "nom": "Beurre de cacahuète ou pâte d'arachide",
      "kcal": 643.0,
      "p": 25.4,
      "g": 17.3,
      "l": 51.4,
      "src": "Ciqual 15202"
    },
    "brocoli": {
      "nom": "Brocoli, cru",
      "kcal": 31.9,
      "p": 2.9,
      "g": 2.15,
      "l": 0.36,
      "src": "Ciqual 20057"
    },
    "citron": {
      "nom": "Jus de citron, pur jus",
      "kcal": 29.4,
      "p": 0.4,
      "g": 6.1,
      "l": 0.29,
      "src": "Ciqual 2028"
    },
    "cottage": {
      "nom": "Cheese, cottage, creamed, large or small curd",
      "kcal": 98,
      "p": 11.1,
      "g": 3.38,
      "l": 4.3,
      "src": "USDA FDC 172179"
    },
    "courgette": {
      "nom": "Courgette, chair et peau, crue",
      "kcal": 16.7,
      "p": 1.21,
      "g": 1.75,
      "l": 0.32,
      "src": "Ciqual 20020"
    },
    "fruitsrouges": {
      "nom": "Framboise, crue",
      "kcal": 47.9,
      "p": 1.19,
      "g": 5.83,
      "l": 0.8,
      "src": "Ciqual 13015"
    },
    "haricotvert": {
      "nom": "Haricot vert, cru",
      "kcal": 31.9,
      "p": 1.83,
      "g": 4.14,
      "l": 0.22,
      "src": "Ciqual 20061"
    },
    "huileolive": {
      "nom": "Huile d'olive vierge extra",
      "kcal": 899.0,
      "p": 0.25,
      "g": 0.0,
      "l": 99.9,
      "src": "Ciqual 17270"
    },
    "lait": {
      "nom": "Lait demi-écrémé, UHT",
      "kcal": 47.7,
      "p": 3.41,
      "g": 5.0,
      "l": 1.56,
      "src": "Ciqual 19041"
    },
    "laitue": {
      "nom": "Laitue, crue",
      "kcal": 14.7,
      "p": 1.35,
      "g": 1.22,
      "l": 0.2,
      "src": "Ciqual 20031"
    },
    "lentillecuite": {
      "nom": "Lentille verte, bouillie/cuite à l'eau",
      "kcal": 125.0,
      "p": 10.1,
      "g": 16.2,
      "l": 0.58,
      "src": "Ciqual 20587"
    },
    "miel": {
      "nom": "Miel",
      "kcal": 331.0,
      "p": 0.65,
      "g": 82.1,
      "l": 0.0,
      "src": "Ciqual 31008"
    },
    "moutarde": {
      "nom": "Moutarde",
      "kcal": 151.0,
      "p": 6.92,
      "g": 4.33,
      "l": 11.2,
      "src": "Ciqual 11013"
    },
    "oeuf": {
      "nom": "Oeuf cru",
      "kcal": 140.0,
      "p": 12.8,
      "g": 0.06,
      "l": 9.83,
      "src": "Ciqual 22000"
    },
    "paincomplet": {
      "nom": "Pain complet ou intégral (à la farine T150)",
      "kcal": 234.0,
      "p": 9.5,
      "g": 41.2,
      "l": 1.7,
      "src": "Ciqual 7110"
    },
    "patatedouce": {
      "nom": "Patate douce, crue",
      "kcal": 81.2,
      "p": 1.57,
      "g": 17.1,
      "l": 0.05,
      "src": "Ciqual 4101"
    },
    "poivron": {
      "nom": "Poivron rouge, cru",
      "kcal": 33.6,
      "p": 1.06,
      "g": 5.98,
      "l": 0.25,
      "src": "Ciqual 20087"
    },
    "pomme": {
      "nom": "Pomme, chair et peau, crue",
      "kcal": 54.0,
      "p": 0.25,
      "g": 11.6,
      "l": 0.25,
      "src": "Ciqual 13039"
    },
    "poulet": {
      "nom": "Poulet, filet sans peau cru",
      "kcal": 110.0,
      "p": 23.4,
      "g": 0.0,
      "l": 1.5,
      "src": "Ciqual 36017"
    },
    "saumon": {
      "nom": "Saumon, élevage, cru",
      "kcal": 193.0,
      "p": 20.5,
      "g": 0.0,
      "l": 12.4,
      "src": "Ciqual 26036"
    },
    "skyr": {
      "nom": "Plain Icelandic skyr, nonfat (produit de marque ; micronutriments : yaourt grec 0 %)",
      "kcal": 60,
      "p": 11.3,
      "g": 4.0,
      "l": 0,
      "src": "USDA FDC 2400949"
    },
    "whey": {
      "nom": "Protein powder, whey based (macros seuls ; micronutriments non comptés)",
      "kcal": 352,
      "p": 78.1,
      "g": 3.15,
      "l": 1.56,
      "src": "USDA FDC 173180"
    }
  };

  var DAYS = {
    "lj": {
      "titre": "Lun & Jeu",
      "titreLong": "LUNDI & JEUDI",
      "seance": true,
      "slot": "A",
      "jours": "Lundi et jeudi",
      "repas": [
        {
          "offset": -90,
          "label": "Pré-séance",
          "couleur": "green",
          "nom": "Pré-séance léger — 90 min avant",
          "aliments": [
            "1 banane mûre",
            "30 g de flocons d'avoine (ou 2 galettes de riz)",
            "1 œuf dur",
            "{PRE}"
          ],
          "prix": 1.1,
          "note": "Volontairement léger : tôt le matin, un estomac plein = nausées pendant la séance. Le collagène (~40 kcal) n'est pas compté dans les protéines : il ne sert pas à construire le muscle.",
          "compo": [
            [
              "banane",
              120.0
            ],
            [
              "avoine",
              30.0
            ],
            [
              "oeuf",
              52.0
            ]
          ]
        },
        {
          "offset": 0,
          "label": "Séance",
          "couleur": "gold",
          "nom": "Pendant la séance",
          "aliments": [
            "500–750 ml d'eau par petites gorgées",
            "Café noir 30-45 min avant si tu en as l'habitude (≤ 200 mg de caféine)",
            "Pas de shaker pendant l'effort : inutile"
          ],
          "tag": "Hydratation"
        },
        {
          "offset": 80,
          "label": "Post-séance",
          "couleur": "purple",
          "nom": "Shaker post-séance",
          "aliments": [
            "1 dose de whey (24 g de protéines)",
            "200 ml de lait demi-écrémé (ou eau)",
            "1 banane"
          ],
          "prix": 1.55,
          "note": "Pratique, pas magique : ce qui compte surtout, c'est d'avoir ~30-40 g de protéines dans les 2 h autour de la séance. Prépare-le dans ton sac.",
          "compo": [
            [
              "whey",
              30.0
            ],
            [
              "lait",
              206.0
            ],
            [
              "banane",
              120.0
            ]
          ]
        },
        {
          "offset": 180,
          "label": "Petit-déj",
          "couleur": "blue",
          "nom": "Vrai petit-déjeuner",
          "aliments": [
            "70 g de flocons d'avoine (eau ou lait végétal)",
            "150 g de skyr nature",
            "1 c. à soupe de miel + 80 g de fruits rouges",
            "15 g d'amandes ou de noix",
            "{MATIN}"
          ],
          "prix": 2.2,
          "note": "Les amandes apportent les graisses nécessaires pour absorber les vitamines liposolubles de tes compléments du matin.",
          "compo": [
            [
              "avoine",
              70.0
            ],
            [
              "skyr",
              150.0
            ],
            [
              "miel",
              21.0
            ],
            [
              "fruitsrouges",
              80.0
            ],
            [
              "amande",
              15.0
            ]
          ]
        },
        {
          "offset": 330,
          "label": "Déjeuner",
          "couleur": "blue",
          "nom": "Déjeuner complet",
          "aliments": [
            "150 g de blanc de poulet (ou 2 boîtes de thon)",
            "100 g de riz basmati cru (~250 g cuit)",
            "200 g de légumes (haricots verts, courgettes, brocoli)",
            "1 c. à soupe d'huile d'olive"
          ],
          "prix": 2.0,
          "note": "Mange lentement. Varie la protéine dans la semaine (poulet, thon, dinde, bœuf 5 %, œufs) — voir le Top 50.",
          "compo": [
            [
              "poulet",
              150.0
            ],
            [
              "basmati_cru",
              100.0
            ],
            [
              "haricotvert",
              67.0
            ],
            [
              "courgette",
              67.0
            ],
            [
              "brocoli",
              66.0
            ],
            [
              "huileolive",
              13.5
            ]
          ]
        },
        {
          "offset": 510,
          "label": "Collation",
          "couleur": "green",
          "nom": "Collation de l'après-midi",
          "aliments": [
            "100 g de cottage cheese",
            "2 tranches de pain complet",
            "10 g de beurre de cacahuète",
            "1 pomme ou poire"
          ],
          "prix": 1.3,
          "compo": [
            [
              "cottage",
              100.0
            ],
            [
              "paincomplet",
              70.0
            ],
            [
              "beurrecacahuete",
              10.0
            ],
            [
              "pomme",
              150.0
            ]
          ]
        },
        {
          "offset": 690,
          "label": "Dîner",
          "couleur": "purple",
          "nom": "Dîner",
          "aliments": [
            "{SOIR}",
            "150 g de saumon ou maquereau (2-3×/semaine — sinon 180 g de cabillaud ou poulet + 1 c. à soupe d'huile)",
            "250 g de patate douce rôtie",
            "Salade verte, vinaigrette citron-moutarde"
          ],
          "prix": 3.6,
          "compo": [
            [
              "saumon",
              150.0
            ],
            [
              "patatedouce",
              250.0
            ],
            [
              "laitue",
              50.0
            ],
            [
              "citron",
              15.0
            ],
            [
              "moutarde",
              5.0
            ]
          ]
        }
      ],
      "remarque": "écart < 2 % : dans la marge de précision des étiquettes."
    },
    "sam": {
      "titre": "Samedi",
      "titreLong": "SAMEDI",
      "seance": true,
      "slot": "B",
      "jours": "Samedi",
      "repas": [
        {
          "offset": -150,
          "label": "Réveil",
          "couleur": "gold",
          "nom": "Réveil",
          "aliments": [
            "500 ml d'eau",
            "Café ou thé sans sucre si habitude"
          ],
          "tag": "Hydratation"
        },
        {
          "offset": -90,
          "label": "Petit-déj",
          "couleur": "green",
          "nom": "Petit-déjeuner pré-séance — 90 min avant",
          "aliments": [
            "80 g de flocons d'avoine",
            "200 g de skyr nature",
            "1 banane + 1 c. à soupe de miel",
            "15 g d'amandes",
            "{MATIN}",
            "{PRE}"
          ],
          "prix": 2.7,
          "note": "Seul jour avec un vrai repas complet avant la séance : profites-en, c'est la séance la plus longue.",
          "compo": [
            [
              "avoine",
              80.0
            ],
            [
              "skyr",
              200.0
            ],
            [
              "banane",
              120.0
            ],
            [
              "miel",
              21.0
            ],
            [
              "amande",
              15.0
            ]
          ]
        },
        {
          "offset": 0,
          "label": "Séance",
          "couleur": "gold",
          "nom": "Pendant la séance",
          "aliments": [
            "500–750 ml d'eau par petites gorgées",
            "Café noir 30-45 min avant si tu en as l'habitude (≤ 200 mg de caféine)",
            "Pas de shaker pendant l'effort : inutile"
          ],
          "tag": "Hydratation"
        },
        {
          "offset": 100,
          "label": "Post-séance",
          "couleur": "purple",
          "nom": "Shaker post-séance",
          "aliments": [
            "1 dose de whey (24 g de protéines)",
            "200 ml de lait demi-écrémé (ou eau)",
            "1 banane"
          ],
          "prix": 1.55,
          "note": "Pratique, pas magique : ce qui compte surtout, c'est d'avoir ~30-40 g de protéines dans les 2 h autour de la séance. Prépare-le dans ton sac.",
          "compo": [
            [
              "whey",
              30.0
            ],
            [
              "lait",
              206.0
            ],
            [
              "banane",
              120.0
            ]
          ]
        },
        {
          "offset": 180,
          "label": "Déjeuner",
          "couleur": "blue",
          "nom": "Déjeuner complet",
          "aliments": [
            "150 g de blanc de poulet (ou 2 boîtes de thon)",
            "100 g de riz basmati cru (~250 g cuit)",
            "200 g de légumes (haricots verts, courgettes, brocoli)",
            "1 c. à soupe d'huile d'olive"
          ],
          "prix": 2.0,
          "note": "Mange lentement. Varie la protéine dans la semaine (poulet, thon, dinde, bœuf 5 %, œufs) — voir le Top 50.",
          "compo": [
            [
              "poulet",
              150.0
            ],
            [
              "basmati_cru",
              100.0
            ],
            [
              "haricotvert",
              67.0
            ],
            [
              "courgette",
              67.0
            ],
            [
              "brocoli",
              66.0
            ],
            [
              "huileolive",
              13.5
            ]
          ]
        },
        {
          "offset": 360,
          "label": "Collation",
          "couleur": "green",
          "nom": "Collation de l'après-midi",
          "aliments": [
            "100 g de cottage cheese",
            "2 tranches de pain complet",
            "10 g de beurre de cacahuète",
            "1 pomme ou poire"
          ],
          "prix": 1.3,
          "compo": [
            [
              "cottage",
              100.0
            ],
            [
              "paincomplet",
              70.0
            ],
            [
              "beurrecacahuete",
              10.0
            ],
            [
              "pomme",
              150.0
            ]
          ]
        },
        {
          "offset": 540,
          "label": "Dîner",
          "couleur": "purple",
          "nom": "Dîner",
          "aliments": [
            "{SOIR}",
            "150 g de saumon ou maquereau",
            "200 g de patate douce rôtie",
            "2 œufs brouillés",
            "Salade verte, vinaigrette citron"
          ],
          "prix": 4.1,
          "compo": [
            [
              "saumon",
              150.0
            ],
            [
              "patatedouce",
              200.0
            ],
            [
              "oeuf",
              104.0
            ],
            [
              "laitue",
              50.0
            ],
            [
              "citron",
              15.0
            ]
          ]
        }
      ],
      "remarque": "le samedi tourne un peu plus protéiné et un peu moins glucidique : calories identiques, aucun souci."
    },
    "repos": {
      "titre": "Jour de repos",
      "titreLong": "JOURS DE REPOS",
      "seance": false,
      "slot": "C",
      "jours": "Mardi, mercredi, vendredi, dimanche",
      "repas": [
        {
          "offset": 0,
          "label": "Petit-déj",
          "couleur": "green",
          "nom": "Petit-déjeuner",
          "aliments": [
            "250 g de skyr nature",
            "50 g de flocons d'avoine",
            "25 g d'amandes",
            "80 g de fruits rouges",
            "{MATIN}",
            "{CREATINE}"
          ],
          "prix": 2.4,
          "compo": [
            [
              "skyr",
              250.0
            ],
            [
              "avoine",
              50.0
            ],
            [
              "amande",
              25.0
            ],
            [
              "fruitsrouges",
              80.0
            ]
          ]
        },
        {
          "offset": 270,
          "label": "Déjeuner",
          "couleur": "blue",
          "nom": "Déjeuner",
          "aliments": [
            "150 g de blanc de poulet (ou poisson, dinde, bœuf 5 %)",
            "80 g de riz basmati cru (~200 g cuit)",
            "250 g de légumes",
            "1 c. à soupe d'huile d'olive"
          ],
          "prix": 1.9,
          "compo": [
            [
              "poulet",
              150.0
            ],
            [
              "basmati_cru",
              80.0
            ],
            [
              "haricotvert",
              84.0
            ],
            [
              "courgette",
              83.0
            ],
            [
              "brocoli",
              83.0
            ],
            [
              "huileolive",
              13.5
            ]
          ]
        },
        {
          "offset": 510,
          "label": "Collation",
          "couleur": "green",
          "nom": "Collation",
          "aliments": [
            "1 dose de whey dans l'eau",
            "2 œufs durs",
            "1 pomme",
            "1 tranche de pain complet"
          ],
          "prix": 1.7,
          "note": "La whey n'est pas réservée aux jours de séance : elle sert ici à atteindre les 160 g de protéines sans exploser les calories.",
          "compo": [
            [
              "whey",
              30.0
            ],
            [
              "oeuf",
              104.0
            ],
            [
              "pomme",
              150.0
            ],
            [
              "paincomplet",
              35.0
            ]
          ]
        },
        {
          "offset": 720,
          "label": "Dîner",
          "couleur": "purple",
          "nom": "Dîner",
          "aliments": [
            "{SOIR}",
            "150 g de saumon ou maquereau (sinon 180 g de poisson blanc + 1 c. à soupe d'huile en plus)",
            "100 g de lentilles cuites",
            "250 g de légumes rôtis",
            "1 c. à soupe d'huile d'olive"
          ],
          "prix": 3.9,
          "compo": [
            [
              "saumon",
              150.0
            ],
            [
              "lentillecuite",
              100.0
            ],
            [
              "courgette",
              125.0
            ],
            [
              "poivron",
              125.0
            ],
            [
              "huileolive",
              13.5
            ]
          ]
        }
      ],
      "remarque": "le vendredi (ping-pong) : ajoute 1 banane + 1 tranche de pain avant le club (~+150 kcal)."
    }
  };

  function r(x) { return Math.round(x); }
  function mealTotal(m) {
    var t = { kcal: 0, p: 0, g: 0, l: 0 };
    (m.compo || []).forEach(function (c) { var f = FOODS[c[0]]; t.kcal += f.kcal * c[1] / 100; t.p += f.p * c[1] / 100; t.g += f.g * c[1] / 100; t.l += f.l * c[1] / 100; });
    return { kcal: r(t.kcal / 5) * 5, p: r(t.p), g: r(t.g), l: r(t.l), exact: t };
  }
  function dayTotal(id) {
    var t = { kcal: 0, p: 0, g: 0, l: 0 };
    DAYS[id].repas.forEach(function (m) { var x = mealTotal(m).exact; t.kcal += x.kcal; t.p += x.p; t.g += x.g; t.l += x.l; });
    return { kcal: r(t.kcal / 10) * 10, p: r(t.p), g: r(t.g), l: r(t.l) };
  }
  // Cible du jour (data/nutrition.js) et écart du plan en %
  function target(id) { var N = A.NUTRITION.current(); return DAYS[id].seance ? N.train : N.rest; }
  function gap(id) { var t = dayTotal(id), c = target(id); return Math.round((t.kcal - c.kcal) / c.kcal * 100); }
  // Heure affichée : heure réelle si le profil privé la contient, sinon repère relatif
  function timeText(id, m) {
    var d = DAYS[id], h = A.hourText(d.slot + ':' + m.offset);
    if (h) return h;
    if (m.offset === 0) return d.seance ? 'Séance' : 'Matin';
    var a = Math.abs(m.offset), txt = Math.floor(a / 60) + 'h' + (a % 60 ? String(a % 60).padStart(2, '0') : '');
    return (m.offset < 0 ? '−' : '+') + txt;
  }
  // Lignes d'aliments : les jetons {MATIN} {PRE} {SOIR} {CREATINE} suivent le stack actif de data/supplements.js
  function foodLines(m) {
    var S = A.SUPPLEMENTS, out = [];
    m.aliments.forEach(function (x) {
      if (x === '{MATIN}') { var a = S.stackLabel('matin'); if (a) out.push('Compléments du matin avec ce repas (il contient des graisses) : ' + a); }
      else if (x === '{PRE}') { var b = S.stackLabel('pre'); if (b) out.push(b + ' — 30 à 60 min avant la séance'); }
      else if (x === '{CREATINE}') { if (S.STACKS[S.ACTIF].creatine) out.push('Créatine 5 g (tous les jours, même au repos)'); }
      else if (x === '{SOIR}') { var s = S.stackLabel('soir'); if (s) out.push('Compléments ' + S.momentText('soir') + ' : ' + s); }
      else out.push(x);
    });
    return out;
  }

  A.MEALS = { FOODS: FOODS, DAYS: DAYS, ORDER: ['lj', 'sam', 'repos'], mealTotal: mealTotal, dayTotal: dayTotal, target: target, gap: gap, timeText: timeText, foodLines: foodLines };
})(typeof window !== 'undefined' ? window : globalThis);
