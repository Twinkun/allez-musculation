/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/recettes.js · SOURCE UNIQUE des 50 recettes
   Une seule liste d'ingrédients par recette : chaque ligne de la fiche
   porte les grammes réellement comptés (a: [[aliment, g], …]).
   Fiche, macros, Top 50 et liste de courses lisent cette liste.
   Valeurs pour 100 g : table Ciqual 2025 (Anses, DOI 10.57745/RDMHWY),
   puis USDA FoodData Central si l'aliment est absent, puis approximation
   signalée (champ src). Poids crus sauf mention « cuit ».
   Fichier généré par _prive/gen/gen_recettes.py + gen_recettes_js.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};
  var SOURCE = 'Table Ciqual 2025 (Anses), DOI 10.57745/RDMHWY';
  // Conversions utilisées : c. à soupe d'huile 13,5 g, c. à café 4,5 g ; sauce soja, mirin, nuoc-mâm 17 g par c. à soupe ; miel 21 g / 7 g ;
  // sucre 12 g / 4 g ; œuf 52 g sans coquille ; ½ avocat 70 g ; banane 120 g ; pomme 150 g ; tortilla 62 g ; pain burger 70 g ; dose de whey 30 g.
  var ALIM = {
    ail: {"nom":"Ail","kcal":109,"p":5.31,"g":18.6,"l":0.25,"src":"Ciqual 11000","rayon":"Fruits & légumes","piece":4},
    amande: {"nom":"Amandes","kcal":631,"p":25.8,"g":8.76,"l":52.5,"src":"Ciqual 15041","rayon":"Épicerie & condiments"},
    avocat: {"nom":"Avocat","kcal":203,"p":1.56,"g":0,"l":20.6,"src":"Ciqual 13004","rayon":"Fruits & légumes","piece":140},
    avoine: {"nom":"Flocons d'avoine","kcal":369,"p":11.4,"g":57.7,"l":7.82,"src":"Ciqual 32140","rayon":"Féculents & céréales"},
    banane: {"nom":"Bananes","kcal":87.6,"p":1.06,"g":19.7,"l":0.25,"src":"Ciqual 13005","rayon":"Fruits & légumes","piece":120},
    basmati_cru: {"nom":"Riz basmati","kcal":351,"p":7.44,"g":78.4,"l":0.63,"src":"Ciqual 9119","rayon":"Féculents & céréales"},
    basmati_cuit: {"nom":"Riz basmati (cuit)","kcal":148,"p":3.19,"g":32.9,"l":0.4,"src":"Ciqual 9125","rayon":"Féculents & céréales","versCru":["basmati_cru",0.422]},
    beurre: {"nom":"Beurre","kcal":753,"p":0.63,"g":0.71,"l":83,"src":"Ciqual 16400","rayon":"Œufs & produits laitiers"},
    beurrecacahuete: {"nom":"Beurre de cacahuète","kcal":643,"p":25.4,"g":17.3,"l":51.4,"src":"Ciqual 15202","rayon":"Épicerie & condiments"},
    boeuf: {"nom":"Bœuf à poêler (bavette, rumsteck)","kcal":133,"p":20.4,"g":0,"l":5.67,"src":"Ciqual 6212","rayon":"Viandes & poissons"},
    bouillon: {"nom":"Bouillon (cube ou maison)","kcal":7.2,"p":1.23,"g":0.28,"l":0.13,"src":"Ciqual 25947","rayon":"Épicerie & condiments"},
    brocoli: {"nom":"Brocoli","kcal":31.9,"p":2.9,"g":2.15,"l":0.36,"src":"Ciqual 20057","rayon":"Fruits & légumes"},
    cabillaud: {"nom":"Cabillaud","kcal":77.4,"p":18.1,"g":0,"l":0.57,"src":"Ciqual 26043","rayon":"Viandes & poissons"},
    cacahuete: {"nom":"Cacahuètes","kcal":644,"p":26.9,"g":14.4,"l":51.9,"src":"Ciqual 15053","rayon":"Épicerie & condiments"},
    cacao: {"nom":"Cacao non sucré","kcal":387,"p":22.4,"g":11.6,"l":20.6,"src":"Ciqual 18100","rayon":"Épicerie & condiments"},
    carotte: {"nom":"Carottes","kcal":30.2,"p":0.78,"g":5.16,"l":0.25,"src":"Ciqual 20009","rayon":"Fruits & légumes"},
    champignon: {"nom":"Champignons","kcal":21,"p":2.11,"g":1.83,"l":0.36,"src":"Ciqual 20056","rayon":"Fruits & légumes"},
    cheddar: {"nom":"Cheddar","kcal":399,"p":24.2,"g":1.2,"l":32.6,"src":"Ciqual 12726","rayon":"Œufs & produits laitiers"},
    chou: {"nom":"Chou","kcal":35.2,"p":1.38,"g":4.63,"l":0.6,"src":"Ciqual 20116","rayon":"Fruits & légumes"},
    citron: {"nom":"Citrons (jus)","kcal":29.4,"p":0.4,"g":6.1,"l":0.29,"src":"Ciqual 2028","rayon":"Fruits & légumes","piece":40},
    coco14: {"nom":"Lait de coco","kcal":145.1,"p":1.41,"g":3.13,"l":14,"src":"Ciqual 18041 — dérivé : lait de coco Ciqual (19,2 % MG) ramené à 14 % MG","rayon":"Épicerie & condiments"},
    concombre: {"nom":"Concombre","kcal":16.8,"p":0.65,"g":2.87,"l":0.11,"src":"Ciqual 20019","rayon":"Fruits & légumes","piece":300},
    cottage: {"nom":"Cottage cheese","kcal":98,"p":11.1,"g":3.38,"l":4.3,"src":"USDA FDC 172179","rayon":"Œufs & produits laitiers"},
    courgette: {"nom":"Courgettes","kcal":16.7,"p":1.21,"g":1.75,"l":0.32,"src":"Ciqual 20020","rayon":"Fruits & légumes","piece":200},
    creme30: {"nom":"Crème 30 %","kcal":293,"p":2.16,"g":3.69,"l":30,"src":"Ciqual 19417","rayon":"Œufs & produits laitiers"},
    crevette: {"nom":"Crevettes crues décortiquées","kcal":99,"p":19.7,"g":3.21,"l":0.84,"src":"Ciqual 10021","rayon":"Viandes & poissons"},
    cuissepoulet: {"nom":"Cuisse de poulet désossée","kcal":114,"p":19.3,"g":0,"l":4.05,"src":"Ciqual 36024","rayon":"Viandes & poissons"},
    curry: {"nom":"Curry / épices","kcal":301,"p":14.5,"g":2.63,"l":14,"src":"Ciqual 11005","rayon":"Épicerie & condiments"},
    dinde: {"nom":"Blanc de dinde","kcal":108,"p":23.7,"g":0,"l":1.48,"src":"Ciqual 36304","rayon":"Viandes & poissons"},
    dindehachee: {"nom":"Dinde hachée","kcal":137,"p":21.6,"g":0,"l":5.64,"src":"Ciqual 36300 — proxy : dinde, viande et peau crues (haché de dinde absent de Ciqual)","rayon":"Viandes & poissons"},
    edamame: {"nom":"Edamame (surgelés)","kcal":121,"p":11.9,"g":3.71,"l":5.2,"src":"USDA FDC 168411","rayon":"Légumineuses & conserves"},
    emmental: {"nom":"Emmental râpé","kcal":368,"p":27.1,"g":0.58,"l":28.2,"src":"Ciqual 12118","rayon":"Œufs & produits laitiers"},
    epinard: {"nom":"Épinards","kcal":33.3,"p":2.68,"g":3.06,"l":0.39,"src":"Ciqual 20059","rayon":"Fruits & légumes"},
    falafel: {"nom":"Falafels","kcal":211,"p":7.38,"g":17.7,"l":10.8,"src":"Ciqual 25590","rayon":"Traiteur"},
    farinesarrasin: {"nom":"Farine de sarrasin","kcal":348,"p":11.5,"g":68.4,"l":2.19,"src":"Ciqual 9540","rayon":"Féculents & céréales"},
    fecule: {"nom":"Fécule de maïs","kcal":365,"p":0.26,"g":90.4,"l":0.05,"src":"Ciqual 9510","rayon":"Féculents & céréales"},
    feta: {"nom":"Feta","kcal":284,"p":14.8,"g":0.45,"l":24.3,"src":"Ciqual 12066","rayon":"Œufs & produits laitiers"},
    fromagefrais: {"nom":"Fromage frais","kcal":133,"p":10.6,"g":5.12,"l":7.48,"src":"Ciqual 12069","rayon":"Œufs & produits laitiers"},
    fruitsrouges: {"nom":"Fruits rouges (surgelés)","kcal":47.9,"p":1.19,"g":5.83,"l":0.8,"src":"Ciqual 13015","rayon":"Fruits & légumes"},
    gnocchi: {"nom":"Gnocchis","kcal":176,"p":4.66,"g":35,"l":1.42,"src":"Ciqual 26264","rayon":"Féculents & céréales"},
    granola: {"nom":"Granola","kcal":450,"p":10,"g":61.2,"l":16.5,"src":"Ciqual 32145","rayon":"Féculents & céréales"},
    grec0: {"nom":"Yaourt grec 0 %","kcal":61,"p":10.3,"g":3.64,"l":0.37,"src":"USDA FDC 330137","rayon":"Œufs & produits laitiers"},
    grec2: {"nom":"Yaourt grec 2 %","kcal":73,"p":9.95,"g":3.94,"l":1.92,"src":"USDA FDC 170903","rayon":"Œufs & produits laitiers"},
    hache5: {"nom":"Steak haché 5 %","kcal":130,"p":21.9,"g":0.3,"l":4.59,"src":"Ciqual 6250","rayon":"Viandes & poissons"},
    haricotnoir: {"nom":"Haricots noirs (boîte)","kcal":108,"p":8.31,"g":13,"l":0.97,"src":"Ciqual 20524 — proxy : haricot rouge appertisé égoutté (haricot noir absent de Ciqual)","rayon":"Légumineuses & conserves"},
    haricotrouge: {"nom":"Haricots rouges (boîte)","kcal":108,"p":8.31,"g":13,"l":0.97,"src":"Ciqual 20524","rayon":"Légumineuses & conserves"},
    haricotvert: {"nom":"Haricots verts","kcal":31.9,"p":1.83,"g":4.14,"l":0.22,"src":"Ciqual 20061","rayon":"Fruits & légumes"},
    harissa: {"nom":"Harissa","kcal":76.4,"p":2.72,"g":7.3,"l":2.9,"src":"Ciqual 11112","rayon":"Épicerie & condiments"},
    houmous: {"nom":"Houmous","kcal":258,"p":8.06,"g":9,"l":19.9,"src":"Ciqual 25621","rayon":"Traiteur"},
    huileneutre: {"nom":"Huile neutre","kcal":900,"p":0.25,"g":0,"l":100,"src":"Ciqual 17440","rayon":"Épicerie & condiments"},
    huileolive: {"nom":"Huile d'olive","kcal":899,"p":0.25,"g":0,"l":99.9,"src":"Ciqual 17270","rayon":"Épicerie & condiments"},
    huilesesame: {"nom":"Huile de sésame","kcal":900,"p":0,"g":0,"l":100,"src":"Ciqual 17400","rayon":"Épicerie & condiments"},
    jambon: {"nom":"Jambon blanc","kcal":113,"p":21,"g":0.76,"l":2.83,"src":"Ciqual 28900","rayon":"Viandes & poissons"},
    lait: {"nom":"Lait demi-écrémé","kcal":47.7,"p":3.41,"g":5,"l":1.56,"src":"Ciqual 19041","rayon":"Œufs & produits laitiers"},
    lentillecorail: {"nom":"Lentilles corail","kcal":328,"p":27.7,"g":44.9,"l":0.8,"src":"Ciqual 20535","rayon":"Légumineuses & conserves"},
    mais: {"nom":"Maïs (boîte)","kcal":105,"p":2.66,"g":18.3,"l":1.68,"src":"Ciqual 20066","rayon":"Légumineuses & conserves"},
    mangue: {"nom":"Mangue","kcal":71.1,"p":0.63,"g":14.3,"l":0.25,"src":"Ciqual 13025","rayon":"Fruits & légumes"},
    miel: {"nom":"Miel","kcal":331,"p":0.65,"g":82.1,"l":0,"src":"Ciqual 31008","rayon":"Épicerie & condiments"},
    mirin: {"nom":"Mirin","kcal":233,"p":0,"g":46.7,"l":0,"src":"USDA FDC 2039206","rayon":"Épicerie & condiments"},
    miso: {"nom":"Pâte miso","kcal":188,"p":12.8,"g":18.1,"l":6.01,"src":"Ciqual 20916","rayon":"Épicerie & condiments"},
    moutarde: {"nom":"Moutarde","kcal":151,"p":6.92,"g":4.33,"l":11.2,"src":"Ciqual 11013","rayon":"Épicerie & condiments"},
    mozzarella: {"nom":"Mozzarella","kcal":227,"p":16.1,"g":0.7,"l":17.7,"src":"Ciqual 19590","rayon":"Œufs & produits laitiers"},
    myrtille: {"nom":"Myrtilles","kcal":57.7,"p":0.87,"g":10.6,"l":0.33,"src":"Ciqual 13028","rayon":"Fruits & légumes"},
    nuocmam: {"nom":"Nuoc-mâm","kcal":81.2,"p":9.3,"g":10.9,"l":0,"src":"Ciqual 11194","rayon":"Épicerie & condiments"},
    oeuf: {"nom":"Œufs","kcal":140,"p":12.8,"g":0.06,"l":9.83,"src":"Ciqual 22000","rayon":"Œufs & produits laitiers","piece":52},
    oignon: {"nom":"Oignons","kcal":39,"p":1.1,"g":6.25,"l":0.62,"src":"Ciqual 20034","rayon":"Fruits & légumes","piece":110},
    olive: {"nom":"Olives","kcal":182,"p":1.41,"g":0.26,"l":18,"src":"Ciqual 13186","rayon":"Légumineuses & conserves"},
    painburger: {"nom":"Pains burger","kcal":296,"p":9.38,"g":48.2,"l":6.16,"src":"Ciqual 7262","rayon":"Féculents & céréales","piece":70},
    parmesan: {"nom":"Parmesan","kcal":411,"p":30.5,"g":1.14,"l":31,"src":"Ciqual 12120","rayon":"Œufs & produits laitiers"},
    passata: {"nom":"Passata","kcal":45.5,"p":2.05,"g":7.57,"l":0.2,"src":"Ciqual 20260","rayon":"Légumineuses & conserves"},
    patatedouce: {"nom":"Patate douce","kcal":81.2,"p":1.57,"g":17.1,"l":0.05,"src":"Ciqual 4101","rayon":"Fruits & légumes"},
    patescompletes: {"nom":"Pâtes complètes","kcal":353,"p":12.6,"g":67.6,"l":2.2,"src":"Ciqual 9870","rayon":"Féculents & céréales"},
    pdt: {"nom":"Pommes de terre","kcal":81,"p":1.8,"g":16.8,"l":0.34,"src":"Ciqual 4003","rayon":"Fruits & légumes"},
    petitspois: {"nom":"Petits pois","kcal":77.9,"p":5.86,"g":9.5,"l":0.4,"src":"Ciqual 20084","rayon":"Légumineuses & conserves"},
    poischiche: {"nom":"Pois chiches (boîte)","kcal":122,"p":6.74,"g":15,"l":2.68,"src":"Ciqual 20532","rayon":"Légumineuses & conserves"},
    poivron: {"nom":"Poivrons","kcal":33.6,"p":1.06,"g":5.98,"l":0.25,"src":"Ciqual 20087","rayon":"Fruits & légumes","piece":160},
    polenta: {"nom":"Polenta","kcal":350,"p":7.88,"g":74,"l":1.8,"src":"Ciqual 9614","rayon":"Féculents & céréales"},
    pomme: {"nom":"Pommes","kcal":54,"p":0.25,"g":11.6,"l":0.25,"src":"Ciqual 13039","rayon":"Fruits & légumes","piece":150},
    poulet: {"nom":"Blanc de poulet","kcal":110,"p":23.4,"g":0,"l":1.5,"src":"Ciqual 36017","rayon":"Viandes & poissons"},
    poussesoja: {"nom":"Pousses de soja","kcal":28.3,"p":2.81,"g":3.4,"l":0.25,"src":"Ciqual 20183","rayon":"Fruits & légumes"},
    quinoa: {"nom":"Quinoa","kcal":358,"p":14.1,"g":58.1,"l":6.07,"src":"Ciqual 9340","rayon":"Féculents & céréales"},
    rizblanc_cru: {"nom":"Riz blanc (rond ou long)","kcal":350,"p":7.38,"g":77.5,"l":0.79,"src":"Ciqual 9100","rayon":"Féculents & céréales"},
    rizblanc_cuit: {"nom":"Riz (cuit)","kcal":155,"p":3.31,"g":33.2,"l":0.7,"src":"Ciqual 9104","rayon":"Féculents & céréales","versCru":["rizblanc_cru",0.443]},
    saucesoja: {"nom":"Sauce soja","kcal":39.9,"p":7.25,"g":1.72,"l":0.25,"src":"Ciqual 11104","rayon":"Épicerie & condiments"},
    saumon: {"nom":"Saumon (pavé)","kcal":193,"p":20.5,"g":0,"l":12.4,"src":"Ciqual 26036","rayon":"Viandes & poissons"},
    sesame: {"nom":"Graines de sésame","kcal":606,"p":20.9,"g":12.8,"l":49.7,"src":"Ciqual 15010","rayon":"Épicerie & condiments"},
    skyr: {"nom":"Skyr","kcal":60,"p":11.3,"g":4,"l":0,"src":"USDA FDC 2400949","rayon":"Œufs & produits laitiers"},
    soba: {"nom":"Nouilles soba","kcal":348,"p":11.5,"g":68.4,"l":2.19,"src":"Ciqual 9540 — proxy : farine de sarrasin (nouilles 100 % sarrasin absentes de Ciqual)","rayon":"Féculents & céréales"},
    sucre: {"nom":"Sucre","kcal":399,"p":0,"g":99.7,"l":0,"src":"Ciqual 31016","rayon":"Épicerie & condiments"},
    tahin: {"nom":"Tahin (crème de sésame)","kcal":631,"p":20.3,"g":13.8,"l":53.4,"src":"Ciqual 15203","rayon":"Épicerie & condiments"},
    thon: {"nom":"Thon (boîte, égoutté)","kcal":143,"p":26.8,"g":0,"l":3.94,"src":"Ciqual 26039","rayon":"Viandes & poissons"},
    tofu: {"nom":"Tofu ferme","kcal":147,"p":14.7,"g":2.87,"l":8.5,"src":"Ciqual 20904","rayon":"Traiteur"},
    tomate: {"nom":"Tomates","kcal":17.5,"p":0.5,"g":3.42,"l":0.25,"src":"Ciqual 20276","rayon":"Fruits & légumes","piece":120},
    tomatecerise: {"nom":"Tomates cerises","kcal":31.8,"p":1.31,"g":5.62,"l":0.25,"src":"Ciqual 20172","rayon":"Fruits & légumes"},
    tomatepelee: {"nom":"Tomates pelées (boîte)","kcal":21.8,"p":0.79,"g":3.15,"l":0.25,"src":"Ciqual 20137","rayon":"Légumineuses & conserves"},
    tortilla: {"nom":"Tortillas de blé","kcal":320,"p":8.79,"g":53,"l":7.48,"src":"Ciqual 7815","rayon":"Féculents & céréales","piece":62},
    vermicelleriz: {"nom":"Nouilles / vermicelles de riz","kcal":365,"p":7.81,"g":80.5,"l":1,"src":"Ciqual 9900","rayon":"Féculents & céréales"},
    wakame: {"nom":"Wakame séché","kcal":201,"p":12.2,"g":13.3,"l":1.5,"src":"Ciqual 20999","rayon":"Épicerie & condiments"},
    whey: {"nom":"Whey","kcal":352,"p":78.1,"g":3.15,"l":1.56,"src":"USDA FDC 173180","rayon":"Épicerie & condiments"}
  };

  var REC = {
    r01: { titre: "Pavé de Saumon · Quinoa · Avocat",
      note: "Le saumon apporte dans le même pavé des oméga-3 EPA et DHA, des protéines et de la vitamine D. La règle d'or : <strong>peau contre la poêle, pas de beurre, ne pas toucher</strong>. La chaleur remonte progressivement dans la chair : l'intérieur reste rosé et nacré.",
      lignes: [
        {"q":"200 g","nom":"Pavé de saumon (avec peau)","note":"Frais de préférence. Épaisseur idéale : 3 cm","a":[["saumon",200]]},
        {"q":"60 g","nom":"Quinoa blanc sec","note":"Donne ~130 g cuit","a":[["quinoa",60]]},
        {"q":"½","nom":"Avocat mûr","note":"Doit céder sous une légère pression du doigt","a":[["avocat",70]]},
        {"q":"80 g","nom":"Tomates cerises","note":"","a":[["tomatecerise",80]]},
        {"q":"½","nom":"Concombre","note":"Coupé en demi-lunes de 5 mm","a":[["concombre",150]]},
        {"q":"1 CS","nom":"Huile d'olive (vinaigrette)","note":"","a":[["huileolive",13.5]]},
        {"q":"½","nom":"Citron (jus + zeste)","note":"","a":[["citron",20]]},
        {"q":"1 cc","nom":"Moutarde de Dijon","note":"","a":[["moutarde",5]]},
        {"q":"q.s.","nom":"Aneth frais ou séché, sel, poivre","note":"","a":[]}
      ] },
    r02: { titre: "Chirashi Bowl · Saumon · Riz Vinaigré",
      note: "Le chirashi est un plat de <strong>précision</strong>. Le riz vinaigré (shari) est la base : trop chaud, le vinaigre s'évapore ; trop froid, il ne s'incorpore pas. <strong>Riz encore légèrement tiède</strong>, jamais brûlant. Poisson cru : la réglementation européenne impose une congélation à −20 °C pendant au moins 24 h contre les parasites. Achète du saumon surgelé qualité sashimi ou demande à ton poissonnier s'il a été congelé.",
      lignes: [
        {"q":"150 g","nom":"Saumon frais qualité sashimi","note":"Rayé ou Atlantique. Acheter chez un poissonnier ou en surgelé sashimi-grade. Ne jamais utiliser du saumon fumé ici.","a":[["saumon",150]]},
        {"q":"60 g","nom":"Riz japonica sec (sushi rice)","note":"Riz rond japonais — pas de basmati, pas de riz long grain","a":[["rizblanc_cru",60]]},
        {"q":"1 CS","nom":"Vinaigre de riz","note":"","a":[]},
        {"q":"1 cc","nom":"Sucre + pincée de sel","note":"","a":[["sucre",4]]},
        {"q":"100 g","nom":"Edamame décortiqués surgelés","note":"","a":[["edamame",100]]},
        {"q":"½","nom":"Avocat (tranches)","note":"","a":[["avocat",70]]},
        {"q":"¼","nom":"Concombre en rondelles fines","note":"","a":[["concombre",75]]},
        {"q":"2 CS","nom":"Sauce soja (tamari sans gluten ok)","note":"","a":[["saucesoja",34]]},
        {"q":"½ cc","nom":"Huile de sésame grillé","note":"","a":[["huilesesame",2.2]]},
        {"q":"q.s.","nom":"Gingembre mariné (gari), nori, graines sésame","note":"","a":[["sesame",3]]}
      ] },
    r03: { titre: "Thon · Riz Basmati · Brocolis Vapeur",
      note: "La recette la plus rapide de la liste. <strong>Le piège classique : cuire le brocoli trop longtemps</strong> — au-delà de 7-8 min de vapeur il devient mou, jaunit et prend un goût soufré. L'huile de sésame grillé ne cuit pas : elle se met en finition ou dans la sauce, sinon elle perd son arôme.",
      lignes: [
        {"q":"2 boîtes","nom":"Thon au naturel","note":"~200 g net égoutté. Impérativement \"au naturel\", pas à l'huile — on contrôle ainsi les lipides","a":[["thon",200]]},
        {"q":"45 g","nom":"Riz basmati sec","note":"Donne ~130 g cuit","a":[["basmati_cru",45]]},
        {"q":"250 g","nom":"Brocolis (bouquets)","note":"","a":[["brocoli",250]]},
        {"q":"2 CS","nom":"Sauce soja réduite en sel","note":"","a":[["saucesoja",34]]},
        {"q":"1 cc","nom":"Huile de sésame grillé","note":"","a":[["huilesesame",4.5]]},
        {"q":"1 cm","nom":"Gingembre frais râpé","note":"","a":[]},
        {"q":"½","nom":"Citron (jus)","note":"","a":[["citron",20]]},
        {"q":"1 cc","nom":"Graines de sésame (finition)","note":"","a":[["sesame",3]]}
      ] },
    r04: { titre: "Lentilles Corail · Poulet · Curry Coco",
      note: "Un curry complet : protéines du poulet, fibres et protéines des lentilles corail. La torréfaction des épices n'est pas optionnelle — c'est elle qui distingue un curry fade d'un curry profond. <strong>Règle : les épices sèches avant le liquide, toujours.</strong>",
      lignes: [
        {"q":"150 g","nom":"Blanc de poulet, dés de 2 cm","note":"","a":[["poulet",150]]},
        {"q":"100 g","nom":"Lentilles corail sèches","note":"Ne pas faire tremper — les lentilles corail cuisent directement","a":[["lentillecorail",100]]},
        {"q":"100 ml","nom":"Lait de coco léger (14% MG)","note":"Pas du lait de coco entier à 24% — trop calorique","a":[["coco14",100]]},
        {"q":"300 ml","nom":"Bouillon de poulet faible en sel","note":"","a":[["bouillon",300]]},
        {"q":"1 CS","nom":"Curry en poudre","note":"","a":[["curry",6]]},
        {"q":"½ cc","nom":"Curcuma moulu","note":"","a":[]},
        {"q":"½ cc","nom":"Cumin moulu","note":"","a":[]},
        {"q":"1 cc","nom":"Gingembre frais râpé","note":"","a":[]},
        {"q":"2","nom":"Gousses d'ail émincées","note":"","a":[["ail",8]]},
        {"q":"1 grosse","nom":"Poignée épinards frais","note":"","a":[["epinard",50]]},
        {"q":"1 cc","nom":"Huile d'olive ou coco","note":"","a":[["huileolive",4.5]]}
      ] },
    r05: { titre: "Cabillaud en Papillote · Patate Douce · Brocoli",
      note: "Le cabillaud est un poisson très maigre : environ <span data-alim=\"cabillaud.p\"></span> g de protéines pour 100 g cru, presque sans graisse. En papillote, les jus de cuisson restent avec le poisson. <strong>Erreur classique : ouvrir la papillote trop tôt</strong> — la vapeur s'échappe et la cuisson devient imprévisible.",
      lignes: [
        {"q":"220 g","nom":"Filet de cabillaud","note":"Aussi appelé morue fraîche. Surgelé convient très bien — décongeler 2h au réfrigérateur avant, jamais au micro-ondes","a":[["cabillaud",220]]},
        {"q":"1 CS","nom":"Huile d'olive","note":"","a":[["huileolive",13.5]]},
        {"q":"2","nom":"Gousses d'ail (lamelles fines)","note":"","a":[["ail",8]]},
        {"q":"½","nom":"Citron (rondelles + jus)","note":"","a":[["citron",20]]},
        {"q":"2","nom":"Branches de thym frais","note":"","a":[]},
        {"q":"200 g","nom":"Patate douce, cubes de 2 cm","note":"","a":[["patatedouce",200]]},
        {"q":"200 g","nom":"Brocolis en bouquets","note":"","a":[["brocoli",200]]},
        {"q":"q.s.","nom":"Sel, poivre, paprika fumé","note":"","a":[]}
      ] },
    r06: { titre: "Bowl Poulet · Riz · Patate Douce",
      note: "Un repas complet pour un jour de séance : riz, patate douce et poulet. Le paprika fumé donne le goût de grillade sans barbecue. <strong>Règle du repos :</strong> ne coupe pas le poulet dès la sortie de la poêle — attends 3 à 5 min, une partie du jus resterait sinon sur la planche.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet entier","note":"","a":[["poulet",180]]},
        {"q":"1 cc","nom":"Cumin moulu + 1 cc paprika fumé","note":"","a":[]},
        {"q":"45 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",45]]},
        {"q":"200 g","nom":"Patate douce, cubes 2 cm","note":"","a":[["patatedouce",200]]},
        {"q":"2","nom":"Gousses d'ail (patate douce)","note":"","a":[["ail",8]]},
        {"q":"1 grosse","nom":"Poignée épinards frais","note":"","a":[["epinard",50]]},
        {"q":"1 CS","nom":"Huile d'olive","note":"","a":[["huileolive",13.5]]},
        {"q":"q.s.","nom":"Citron, sel, poivre, piment d'Espelette","note":"","a":[]}
      ] },
    r07: { titre: "Soba Froides · Poulet · Sauce Tsuyu",
      note: "Le sarrasin n'est pas une céréale mais une graine, sans gluten : vérifie l'étiquette, beaucoup de soba contiennent surtout du blé. La <strong>sauce tsuyu maison</strong> permet de doser le sel. Le pochage du poulet se fait en grande quantité (4-5 blancs) et se garde 3 jours au réfrigérateur.",
      lignes: [
        {"q":"100 g","nom":"Nouilles soba sèches (100% sarrasin)","note":"Lire la composition : certaines soba contiennent jusqu'à 70% de blé ordinaire. Choisir 100 % sarrasin (sans gluten)","a":[["soba",100]]},
        {"q":"160 g","nom":"Blanc de poulet","note":"","a":[["poulet",160]]},
        {"q":"3 CS","nom":"Sauce soja","note":"","a":[["saucesoja",51]]},
        {"q":"2 CS","nom":"Mirin (vin de riz doux)","note":"","a":[["mirin",34]]},
        {"q":"150 ml","nom":"Dashi (bouillon japonais)","note":"Granulés dashi en épicerie asiatique. Ou à défaut : bouillon de légumes très léger","a":[["bouillon",150]]},
        {"q":"½ cc","nom":"Sucre","note":"","a":[["sucre",2]]},
        {"q":"¼","nom":"Concombre en julienne fine","note":"","a":[["concombre",75]]},
        {"q":"q.s.","nom":"Nori, sésame, oignons verts, gingembre râpé","note":"","a":[["sesame",3]]}
      ] },
    r08: { titre: "Omelette Jambon · Patate Douce Rôtie",
      note: "Œuf entier, jaune compris : protéines de très bonne qualité, choline et vitamine D. <strong>L'omelette baveuse au centre</strong> n'est pas une question de goût : la cuisson continue dans l'assiette avec la chaleur résiduelle. Une omelette bien cuite dans la poêle est trop cuite dans l'assiette.",
      lignes: [
        {"q":"5","nom":"Œufs entiers","note":"Œufs Label Rouge ou bio si possible — jaune plus orangé = plus de lutéine et bêta-carotène","a":[["oeuf",260]]},
        {"q":"100 g","nom":"Jambon blanc épais en dés","note":"Sans nitrites si possible (code \"sans\" ou \"- de 50mg/kg\"). Les tranches fines conviennent aussi","a":[["jambon",100]]},
        {"q":"½","nom":"Poivron rouge en brunoise","note":"","a":[["poivron",80]]},
        {"q":"4","nom":"Champignons de Paris émincés","note":"","a":[["champignon",60]]},
        {"q":"200 g","nom":"Patate douce en cubes (à rôtir)","note":"","a":[["patatedouce",200]]},
        {"q":"1 cc","nom":"Beurre ou huile de noix de coco","note":"","a":[["beurre",5]]},
        {"q":"q.s.","nom":"Ciboulette, persil frais, sel, poivre","note":"","a":[]}
      ] },
    r09: { titre: "Crevettes Sautées · Riz · Épinards · Ail",
      note: "Les crevettes font partie des aliments les plus riches en protéines pour leurs calories. La règle se résume au <strong>C contre O</strong> : en forme de C, elles sont cuites ; en forme de O, trop cuites. Tout se joue en 30 secondes. Poêle froide ou trop pleine : cuis en deux fois. L'ail brûlé est amer : toujours en fin de cuisson.",
      lignes: [
        {"q":"200 g","nom":"Crevettes décortiquées crues","note":"Surgelées conviennent. Décongeler 1h au frigo ou 15 min dans eau froide. Jamais au micro-ondes — elles commencent à cuire","a":[["crevette",200]]},
        {"q":"45 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",45]]},
        {"q":"1 grosse","nom":"Poignée épinards frais","note":"","a":[["epinard",50]]},
        {"q":"4","nom":"Gousses d'ail émincées","note":"","a":[["ail",16]]},
        {"q":"1","nom":"Piment rouge frais (ou piment d'Espelette)","note":"","a":[]},
        {"q":"1 CS","nom":"Huile d'olive","note":"","a":[["huileolive",13.5]]},
        {"q":"½","nom":"Citron (jus)","note":"","a":[["citron",20]]},
        {"q":"q.s.","nom":"Persil frais, sel, poivre","note":"","a":[]}
      ] },
    r10: { titre: "Gyudon · Bœuf Oignon · Riz",
      note: "Le gyudon est un classique de la restauration rapide japonaise. Le secret des tranches très fines : <strong>20 min de congélation du bœuf avant la découpe</strong>, la chair semi-ferme permet des tranches de 1-2 mm. L'œuf mollet lie le bol. Le shichimi (mélange de 7 épices) donne le relief.",
      lignes: [
        {"q":"180 g","nom":"Bœuf émincé très finement","note":"Technique : congeler le steak 20 min pour qu'il soit semi-ferme, puis couper en tranches de 2mm au couteau bien affûté. Ou utiliser des tranches à fondue / shabu-shabu déjà prêtes","a":[["boeuf",180]]},
        {"q":"1 gros","nom":"Oignon jaune, demi-lunes fines","note":"","a":[["oignon",150]]},
        {"q":"3 CS","nom":"Sauce soja","note":"","a":[["saucesoja",51]]},
        {"q":"2 CS","nom":"Mirin","note":"","a":[["mirin",34]]},
        {"q":"1 cc","nom":"Sucre","note":"","a":[["sucre",4]]},
        {"q":"150 ml","nom":"Dashi","note":"","a":[["bouillon",150]]},
        {"q":"60 g","nom":"Riz japonica sec","note":"","a":[["rizblanc_cru",60]]},
        {"q":"1","nom":"Œuf (pour œuf mollet)","note":"","a":[["oeuf",52]]},
        {"q":"q.s.","nom":"Oignons verts émincés, shichimi (7 épices)","note":"","a":[]}
      ] },
    r11: { titre: "Salade Niçoise Protéinée",
      note: "Trois sources de protéines : thon, œufs et un peu de haricots verts. Le thon est une bonne base, mais <strong>varie les poissons dans la semaine</strong> (mercure : thon et gros prédateurs à limiter, sardine, maquereau ou saumon en alternance). <strong>Sers à température ambiante</strong> : tomates et pommes de terre ont plus de goût à 18-20 °C.",
      lignes: [
        {"q":"160 g","nom":"Thon au naturel en boîte","note":"Égoutté soigneusement. Éviter le thon à l'huile — redondant avec l'huile d'olive de la vinaigrette","a":[["thon",160]]},
        {"q":"3","nom":"Œufs","note":"Durs — 9 minutes précises dans eau bouillante","a":[["oeuf",156]]},
        {"q":"150 g","nom":"Haricots verts","note":"Frais ou surgelés. Al dente, pas mous","a":[["haricotvert",150]]},
        {"q":"2","nom":"Tomates + ½ poivron rouge en lanières","note":"","a":[["tomate",240],["poivron",80]]},
        {"q":"100 g","nom":"Pommes de terre vapeur","note":"Petites — en rondelles de 5 mm","a":[["pdt",100]]},
        {"q":"10","nom":"Olives noires dénoyautées","note":"","a":[["olive",30]]},
        {"q":"1 CS","nom":"Huile d'olive (vinaigrette)","note":"","a":[["huileolive",13.5]]},
        {"q":"½","nom":"Citron (jus) + 1 cc moutarde + basilic frais","note":"","a":[["citron",20],["moutarde",5]]},
        {"q":"opt.","nom":"2 filets d'anchois (umami)","note":"","a":[]}
      ] },
    r12: { titre: "Steak Haché 5% · Pâtes Complètes · Sauce Tomate Maison",
      note: "Le bœuf haché 5 % apporte protéines, fer héminique et zinc. <strong>Astuce eau de cuisson</strong> : une louche d'eau de pâtes, chargée d'amidon, lie la sauce et l'émulsionne avec l'huile, sans crème.",
      lignes: [
        {"q":"200 g","nom":"Steak haché bœuf 5% MG","note":"5% MG = maigre et protéiné. Éviter le 15-20% pour ce plat : trop de graisses saturées, moins de protéines","a":[["hache5",200]]},
        {"q":"100 g","nom":"Pâtes complètes sèches","note":"Plus de fibres et de magnésium que les pâtes blanches (index glycémique voisin)","a":[["patescompletes",100]]},
        {"q":"1 boîte","nom":"Tomates pelées entières (400g)","note":"","a":[["tomatepelee",400]]},
        {"q":"1","nom":"Oignon jaune émincé en dés fins","note":"","a":[["oignon",110]]},
        {"q":"2","nom":"Gousses d'ail","note":"","a":[["ail",8]]},
        {"q":"20 g","nom":"Parmesan râpé (finition)","note":"","a":[["parmesan",20]]},
        {"q":"q.s.","nom":"Basilic frais ou séché, origan, piment rouge, sel, poivre","note":"","a":[]},
        {"q":"1 cc","nom":"Huile d'olive","note":"","a":[["huileolive",4.5]]}
      ] },
    r13: { titre: "Donburi Teriyaki Poulet",
      note: "Le teriyaki maison demande <strong>3 ingrédients et 2 minutes</strong>, et tu choisis la dose de sucre. <strong>Peau croustillante :</strong> départ à poêle froide, la graisse fond et arrose la peau. La <strong>fécule</strong> épaissit la sauce, qui enrobe la viande au lieu de glisser.",
      lignes: [
        {"q":"200 g","nom":"Cuisse de poulet désossée (sans peau facultatif)","note":"La cuisse est supérieure au blanc ici — sa graisse intramusculaire caramélise avec le mirin pour créer le laquage caractéristique. Blanc = trop sec avec ce type de cuisson","a":[["cuissepoulet",200]]},
        {"q":"3 CS","nom":"Sauce soja","note":"","a":[["saucesoja",51]]},
        {"q":"2 CS","nom":"Mirin (vin de riz doux)","note":"","a":[["mirin",34]]},
        {"q":"1 CS","nom":"Miel","note":"","a":[["miel",21]]},
        {"q":"1 cc","nom":"Fécule de maïs (Maïzena)","note":"Agent épaississant naturel pour la sauce teriyaki","a":[["fecule",3]]},
        {"q":"60 g","nom":"Riz japonica sec","note":"","a":[["rizblanc_cru",60]]},
        {"q":"q.s.","nom":"Graines de sésame blanc + oignons verts","note":"","a":[["sesame",3]]},
        {"q":"½ CS","nom":"Huile neutre (arachide ou tournesol)","note":"","a":[["huileneutre",6.75]]}
      ] },
    r14: { titre: "Soupe Miso · Tofu · Poulet · Riz",
      note: "Une soupe légère et complète : bouillon, miso, tofu, poulet, riz. Le miso est salé : pas de sel en plus. <strong>Plat adapté au soir</strong> — volume important, charge glucidique modérée.",
      lignes: [
        {"q":"400 ml","nom":"Bouillon dashi","note":"Granulés dashi en épicerie asiatique (Ajinomoto). Ou katsuobushi (copeaux bonite) infusés 5 min","a":[["bouillon",400]]},
        {"q":"1,5 CS","nom":"Pâte miso blanche (shiro miso)","note":"Shiro miso = plus doux, moins salé que le miso rouge. Disponible en épicerie asiatique ou bio","a":[["miso",27]]},
        {"q":"150 g","nom":"Tofu ferme en dés de 2 cm","note":"","a":[["tofu",150]]},
        {"q":"120 g","nom":"Blanc de poulet émincé très fin","note":"","a":[["poulet",120]]},
        {"q":"5 g","nom":"Algues wakamé sèches","note":"Gonfle 6-8× : 5g sec = ~40g réhydratées","a":[["wakame",5]]},
        {"q":"45 g","nom":"Riz japonica sec (cuit à part)","note":"","a":[["rizblanc_cru",45]]},
        {"q":"q.s.","nom":"Oignons verts ciselés + ½ cc huile de sésame","note":"","a":[["huilesesame",2.2]]}
      ] },
    r15: { titre: "Poulet Mariné · Légumes Méditerranéens Rôtis",
      note: "Le <strong>meal prep par excellence</strong> : 3-4 escalopes et une plaque de légumes le dimanche couvrent 3 jours de déjeuners. Les légumes rôtis se gardent 4 jours au frigo. Varier les couleurs des légumes, c'est varier les vitamines et les fibres.",
      lignes: [
        {"q":"200 g","nom":"Escalope de poulet","note":"","a":[["poulet",200]]},
        {"q":"—","nom":"Marinade : 1 CS huile d'olive + 2 gousses ail haché + 1 cc herbes de Provence + jus ½ citron + sel + poivre","note":"","a":[["huileolive",18],["ail",8],["citron",20]]},
        {"q":"1","nom":"Courgette en demi-lunes de 1 cm","note":"","a":[["courgette",200]]},
        {"q":"1","nom":"Poivron rouge en larges lanières","note":"","a":[["poivron",160]]},
        {"q":"1","nom":"Oignon rouge en quartiers","note":"","a":[["oignon",110]]},
        {"q":"100 g","nom":"Tomates cerises entières","note":"","a":[["tomatecerise",100]]},
        {"q":"200 g","nom":"Patate douce en cubes de 2 cm","note":"","a":[["patatedouce",200]]},
        {"q":"q.s.","nom":"Origan séché, thym, filet d'huile d'olive, sel","note":"","a":[]}
      ] },
    r16: { titre: "Wraps Dinde · Avocat · Fromage Frais",
      note: "Le <strong>repas sans cuisson</strong> de la liste : prêt en 15 min, transportable. Avocat trop ferme : mets-le 24 h dans un sac en papier avec une banane, <strong>l'éthylène qu'elle dégage accélère la maturation</strong>. La dinde est une viande très maigre, une bonne alternative au poulet.",
      lignes: [
        {"q":"2","nom":"Tortillas complètes (25 cm)","note":"Plus de fibres que les tortillas blanches. Réchauffer pour les rendre souples","a":[["tortilla",124]]},
        {"q":"150 g","nom":"Émincé de dinde","note":"Ou escalope de dinde coupée en lanières. La dinde est l'une des viandes les plus maigres","a":[["dinde",150]]},
        {"q":"½","nom":"Avocat mûr en tranches","note":"","a":[["avocat",70]]},
        {"q":"2 CS","nom":"Fromage frais léger (Philadelphia Light ou St Môret 0%)","note":"","a":[["fromagefrais",30]]},
        {"q":"q.s.","nom":"Salade feuille de chêne ou roquette","note":"","a":[]},
        {"q":"1","nom":"Tomate en rondelles fines","note":"","a":[["tomate",120]]},
        {"q":"¼","nom":"Concombre en rondelles","note":"","a":[["concombre",75]]},
        {"q":"q.s.","nom":"Sel, cumin moulu, jus de citron","note":"","a":[]}
      ] },
    r17: { titre: "Galette de Sarrasin · Œuf · Jambon · Emmental", nonCompte: "salade + tomates cerises d'accompagnement non comptées",
      note: "La galette bretonne se fait à la <strong>billig</strong> (galettière en fonte) vers 220 °C ; à la poêle, on compense par la technique. <strong>La température est le paramètre clé :</strong> trop froide, la pâte colle ; trop chaude, les bords brûlent avant que le centre cuise. Le sarrasin est naturellement sans gluten.",
      lignes: [
        {"q":"100 g","nom":"Farine de sarrasin (blé noir)","note":"100% sarrasin — naturellement sans gluten. Lire l'étiquette : certaines farines sont mélangées à du blé","a":[["farinesarrasin",100]]},
        {"q":"250 ml","nom":"Eau froide","note":"","a":[]},
        {"q":"1 pincée","nom":"Sel fin","note":"","a":[]},
        {"q":"2","nom":"Œufs entiers","note":"","a":[["oeuf",104]]},
        {"q":"80 g","nom":"Jambon blanc épais en dés","note":"Sans nitrites de préférence. Couper en dés de 1 cm — fond dans la galette à la cuisson","a":[["jambon",80]]},
        {"q":"30 g","nom":"Emmental râpé","note":"","a":[["emmental",30]]},
        {"q":"q.s.","nom":"Salade verte + tomates cerises (accompagnement)","note":"","a":[]},
        {"q":"q.s.","nom":"Beurre clarifié ou huile de coco (cuisson)","note":"","a":[["beurre",5]]}
      ] },
    r18: { titre: "Riz Sauté aux Œufs · Edamame · Sauce Soja",
      note: "Le riz sauté vise le <strong>wok hei</strong> (« souffle du wok ») : la légère saveur fumée d'un feu très vif. Difficile sur plaque électrique, mais un wok en acier bien chauffé 2 min s'en approche. <strong>L'huile de sésame ne cuit pas</strong> — c'est une huile de finition, hors du feu, en dernier.",
      lignes: [
        {"q":"200 g","nom":"Riz basmati cuit froid (de la veille)","note":"OBLIGATOIREMENT froid. Le riz chaud ou tiède est humide et s'agglomère en masse collante dans le wok. Préparer la veille","a":[["basmati_cuit",200]]},
        {"q":"3","nom":"Œufs entiers","note":"","a":[["oeuf",156]]},
        {"q":"100 g","nom":"Edamame décortiqués surgelés","note":"","a":[["edamame",100]]},
        {"q":"2 CS","nom":"Sauce soja réduite en sel","note":"","a":[["saucesoja",34]]},
        {"q":"1 cm","nom":"Gingembre frais râpé","note":"","a":[]},
        {"q":"2","nom":"Oignons verts ciselés","note":"","a":[]},
        {"q":"1 cc","nom":"Huile de sésame (finition, hors feu)","note":"","a":[["huilesesame",4.5]]},
        {"q":"1 cs","nom":"Graines de sésame blanc","note":"","a":[["sesame",9]]},
        {"q":"1 CS","nom":"Huile neutre (wok)","note":"","a":[["huileneutre",13.5]]}
      ] },
    r19: { titre: "Pancakes Avoine · Banane · Œufs",
      note: "Ces pancakes n'ont <strong>ni farine de blé, ni levure, ni sucre ajouté</strong> : les œufs coagulent, l'avoine lie, la banane sucre et humidifie. Le <strong>yaourt grec</strong> à côté équilibre la douceur de la banane.",
      lignes: [
        {"q":"3","nom":"Œufs entiers","note":"","a":[["oeuf",156]]},
        {"q":"1","nom":"Banane très mûre (taches brunes sur peau)","note":"Plus mûre = plus sucrée naturellement (amidon converti en fructose) + plus facile à écraser. Banane ferme et verte ne donne pas le même résultat","a":[["banane",120]]},
        {"q":"60 g","nom":"Flocons d'avoine (à mixer)","note":"","a":[["avoine",60]]},
        {"q":"1 scoop","nom":"Whey vanille ou nature (optionnel mais recommandé)","note":"30 g de whey ≈ 23 g de protéines, sans changer la texture","a":[["whey",30]]},
        {"q":"1 cc","nom":"Cannelle moulue","note":"","a":[]},
        {"q":"½ cc","nom":"Extrait de vanille + pincée de sel","note":"","a":[]},
        {"q":"200 g","nom":"Yaourt grec 0% (service)","note":"","a":[["grec0",200]]},
        {"q":"q.s.","nom":"Fruits rouges surgelés + filet de miel","note":"","a":[["fruitsrouges",50],["miel",7]]}
      ] },
    r20: { titre: "Bowl Petit-Déjeuner Protéiné · Yaourt · Avoine · Œufs",
      note: "Un bol de petit-déjeuner à trois sources de protéines (yaourt grec, œufs, avoine). Les bêta-glucanes de l'avoine forment un gel qui ralentit la digestion. <strong>Prends un yaourt nature</strong> : les versions aromatisées contiennent souvent beaucoup de sucre ajouté.",
      lignes: [
        {"q":"250 g","nom":"Yaourt grec nature Total 2% ou 0%","note":"Éviter les yaourts aromatisés ou sucrés : jusqu'à 15g sucre ajouté par pot","a":[["grec2",250]]},
        {"q":"50 g","nom":"Flocons d'avoine","note":"","a":[["avoine",50]]},
        {"q":"2","nom":"Œufs (à la coque ou mollets — 6 min)","note":"","a":[["oeuf",104]]},
        {"q":"1","nom":"Banane mûre en rondelles","note":"","a":[["banane",120]]},
        {"q":"15 g","nom":"Amandes effilées","note":"","a":[["amande",15]]},
        {"q":"5 g","nom":"Miel (1 filet)","note":"","a":[["miel",5]]},
        {"q":"opt.","nom":"Fruits rouges, cannelle, graines de chia","note":"","a":[]}
      ] },
    r21: { titre: "Tortilla Espagnole Protéinée · Poulet · Pommes de Terre",
      note: "Le meal prep par excellence : une seule poêle et 3 jours de conservation. Les œufs entiers apportent protéines, vitamine D et choline. Le secret d'une tortilla réussie : des pommes de terre bien égouttées et une cuisson douce pour garder le cœur moelleux.",
      lignes: [
        {"q":"5","nom":"Œufs entiers","note":"","a":[["oeuf",260]]},
        {"q":"150 g","nom":"Blanc de poulet émincé très fin","note":"Saisi 3 min à la poêle avant d'être incorporé à l'appareil","a":[["poulet",150]]},
        {"q":"200 g","nom":"Pommes de terre en rondelles","note":"Cuites à l'eau ~15 min. Patate douce possible en variante","a":[["pdt",200]]},
        {"q":"½","nom":"Oignon émincé + 1 CS huile d'olive","note":"","a":[["oignon",55],["huileolive",13.5]]},
        {"q":"q.s.","nom":"Sel, poivre, persil ou ciboulette","note":"","a":[]}
      ] },
    r22: { titre: "Bowl Mexicain · Poulet Épicé · Haricots Noirs · Guacamole",
      note: "Les <strong>haricots noirs</strong> ajoutent des fibres et des protéines végétales au poulet. Riz, haricots et maïs en font un repas riche en glucides, adapté aux jours de séance. Ajoute du piment selon ton goût.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet","note":"Épices tex-mex : cumin + paprika fumé + piment + origan","a":[["poulet",180]]},
        {"q":"120 g","nom":"Haricots noirs en boîte","note":"Égouttés et rincés","a":[["haricotnoir",120]]},
        {"q":"45 g","nom":"Riz basmati sec → cuit","note":"","a":[["basmati_cru",45]]},
        {"q":"½","nom":"Avocat en dés + jus de citron vert","note":"","a":[["avocat",70]]},
        {"q":"50 g","nom":"Maïs + ¼ poivron rouge + coriandre fraîche","note":"","a":[["mais",50],["poivron",40]]}
      ] },
    r23: { titre: "Cottage Cheese · Fruits Rouges · Granola Protéiné",
      note: "Prêt en 5 minutes. Le cottage cheese est riche en <strong>caséine</strong>, une protéine digérée lentement : en collation du soir, elle augmente la synthèse protéique de la nuit (Res 2012), mais c'est surtout le total de protéines de la journée qui compte.",
      lignes: [
        {"q":"300 g","nom":"Cottage cheese","note":"Source de caséine native — Carrefour, Lidl ou MDD","a":[["cottage",300]]},
        {"q":"100 g","nom":"Fruits rouges surgelés","note":"Framboises, myrtilles, cassis","a":[["fruitsrouges",100]]},
        {"q":"40 g","nom":"Granola","note":"Sans sucre ajouté de préférence","a":[["granola",40]]},
        {"q":"5 g","nom":"Miel (1 filet) + zeste de citron jaune","note":"","a":[["miel",5]]}
      ] },
    r24: { titre: "Smash Burger Maison · Cheddar · Frites de Patate Douce",
      note: "Le burger <strong>version recomposition</strong> : steak 5 %, pain complet et frites de patate douce au four (sans friture). Le goût « resto » vient de la <strong>réaction de Maillard</strong> : la croûte du smash sur poêle brûlante.",
      lignes: [
        {"q":"180 g","nom":"Steak haché 5% MG","note":"En 2 boules écrasées fort sur poêle brûlante = croûte caramélisée","a":[["hache5",180]]},
        {"q":"1","nom":"Pain burger complet","note":"","a":[["painburger",70]]},
        {"q":"1 tr.","nom":"Cheddar","note":"","a":[["cheddar",20]]},
        {"q":"200 g","nom":"Patate douce (frites au four)","note":"Bâtonnets + 1 cc huile, four 200°C 25 min","a":[["patatedouce",200],["huileolive",4.5]]},
        {"q":"1 CS","nom":"Sauce light (yaourt 0% + moutarde + cornichon haché)","note":"","a":[["grec0",15],["moutarde",5]]},
        {"q":"q.s.","nom":"Salade, tomate, oignon rouge","note":"","a":[["tomate",40]]}
      ] },
    r25: { titre: "Quinoa · Poulet Grillé · Pois Chiches Rôtis · Féta",
      note: "<strong>Trois sources de protéines</strong> : poulet, quinoa (qui contient les 9 acides aminés essentiels) et pois chiches. La féta apporte du calcium et le goût méditerranéen. Bon chaud comme froid : parfait en <strong>boîte repas</strong>.",
      lignes: [
        {"q":"160 g","nom":"Blanc de poulet grillé","note":"Herbes de Provence + huile d'olive","a":[["poulet",160],["huileolive",13.5]]},
        {"q":"70 g","nom":"Quinoa sec → 210g cuit","note":"","a":[["quinoa",70]]},
        {"q":"100 g","nom":"Pois chiches en boîte","note":"Poêle 3 min + sel + cumin = croustillants","a":[["poischiche",100]]},
        {"q":"40 g","nom":"Féta émiettée","note":"","a":[["feta",40]]},
        {"q":"q.s.","nom":"Épinards + tomates cerises + vinaigrette citron-huile d'olive","note":"","a":[["epinard",40],["tomatecerise",60]]}
      ] },
    r26: { titre: "Poke Bowl Thon · Mangue · Avocat · Sauce Ponzu",
      note: "La <strong>mangue</strong> apporte vitamine C, bêta-carotène et une douceur qui équilibre le salé du ponzu. <strong>Zéro cuisson</strong> hors riz : prêt en 15 min à partir de boîtes de thon.",
      lignes: [
        {"q":"160 g","nom":"Thon naturel en boîte","note":"Égoutté, assaisonné au ponzu 5 min avant","a":[["thon",160]]},
        {"q":"60 g","nom":"Riz japonica sec → cuit + vinaigré","note":"","a":[["rizblanc_cru",60]]},
        {"q":"100 g","nom":"Mangue en dés (fraîche ou surgelée)","note":"","a":[["mangue",100]]},
        {"q":"½","nom":"Avocat en dés","note":"","a":[["avocat",70]]},
        {"q":"Sauce","nom":"Ponzu : 2 CS sauce soja + jus citron vert + 1 cc miel","note":"","a":[["saucesoja",34],["miel",7]]},
        {"q":"q.s.","nom":"Graines de sésame + oignons verts ciselés","note":"","a":[["sesame",3]]}
      ] },
    r27: { titre: "Shakshuka Protéinée · Œufs Pochés · Poulet · Poivrons",
      note: "Un classique d'Afrique du Nord et du Proche-Orient, <strong>tout dans une seule poêle en 20 minutes</strong>. Avec <span data-rv=\"g\"></span> g de glucides, il convient aux jours de repos. La <strong>tomate cuite</strong> rend le lycopène plus disponible qu'en cru.",
      lignes: [
        {"q":"4","nom":"Œufs entiers","note":"Cassés directement dans la sauce, cuisson pochée","a":[["oeuf",208]]},
        {"q":"120 g","nom":"Blanc de poulet émincé","note":"Saisi en premier","a":[["poulet",120]]},
        {"q":"400 g","nom":"Tomates pelées en boîte","note":"Base de la sauce","a":[["tomatepelee",400]]},
        {"q":"1","nom":"Poivron rouge + 1 oignon + 2 gousses d'ail","note":"","a":[["poivron",160],["oignon",110],["ail",8]]},
        {"q":"Épices","nom":"1 cc harissa + 1 cc cumin + paprika fumé + sel","note":"","a":[["harissa",5]]}
      ] },
    r28: { titre: "Buddha Bowl · Tofu Croustillant · Patate Douce · Tahini",
      note: "Un des repas <strong>végétariens</strong> de la sélection (avec les n° 37, 45 et 48) : <span data-rv=\"p\"></span> g de protéines, à compléter d'un yaourt grec ou d'une whey si tu vises ta cible. Trois textures (croustillant, fondant, croquant) dans une seule assiette.",
      lignes: [
        {"q":"200 g","nom":"Tofu ferme pressé","note":"Cubes marinés soja + ail, four 200°C 20 min","a":[["tofu",200]]},
        {"q":"200 g","nom":"Patate douce","note":"Cumin + paprika, même plaque que le tofu","a":[["patatedouce",200]]},
        {"q":"100 g","nom":"Pois chiches","note":"Sel + huile, 15 min au four","a":[["poischiche",100],["huileolive",4.5]]},
        {"q":"q.s.","nom":"Grosse poignée d'épinards + tomates cerises","note":"","a":[["epinard",50],["tomatecerise",60]]},
        {"q":"Sauce","nom":"Tahini : 2 CS tahini + jus citron + 1 gousse d'ail + 3 CS eau chaude","note":"","a":[["tahin",30]]},
        {"q":"q.s.","nom":"Graines de sésame + grenade (garniture)","note":"","a":[["sesame",3]]}
      ] },
    r29: { titre: "Poulet Tikka Masala Maison · Riz Basmati",
      note: "Le <strong>marinage au yaourt</strong> attendrit la viande grâce à son acidité — résultat digne d'un restaurant indien. Prépare-en double le dimanche : le lendemain, les épices ont infusé toute la nuit.",
      lignes: [
        {"q":"200 g","nom":"Blanc de poulet en morceaux","note":"","a":[["poulet",200]]},
        {"q":"150 g","nom":"Marinade : yaourt grec + garam masala + curcuma + cumin + ail + gingembre","note":"4h minimum, idéalement toute la nuit","a":[["grec2",150],["ail",8]]},
        {"q":"400 g","nom":"Sauce : tomates pelées + 1 oignon + 2 gousses d'ail","note":"","a":[["tomatepelee",300],["oignon",100]]},
        {"q":"100 ml","nom":"Lait de coco léger + 2 CS crème","note":"Onctuosité finale","a":[["coco14",100],["creme30",30]]},
        {"q":"Épices","nom":"Garam masala + coriandre moulue + paprika doux","note":"","a":[]},
        {"q":"60 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",60]]}
      ] },
    r30: { titre: "Pad Thaï · Poulet · Crevettes · Cacahuètes",
      note: "La référence de la street-food thaïe, <strong>double protéine</strong> (poulet + crevettes). <strong>Grosse portion</strong> : <span data-rv=\"kcal\"></span> kcal avec 150 g de nouilles sèches — partage-la en deux repas ou réduis les nouilles. <strong>Technique wok</strong> : feu très fort, tout va vite.",
      lignes: [
        {"q":"120 g","nom":"Blanc de poulet émincé fin","note":"","a":[["poulet",120]]},
        {"q":"150 g","nom":"Crevettes décortiquées crues (surgelées)","note":"","a":[["crevette",150]]},
        {"q":"150 g","nom":"Nouilles de riz sèches","note":"Trempage 30 min eau froide avant cuisson","a":[["vermicelleriz",150]]},
        {"q":"3","nom":"Œufs entiers","note":"Brouillés directement dans le wok","a":[["oeuf",156]]},
        {"q":"Sauce","nom":"3 CS nuoc-mâm + 2 CS soja + 1 CS sucre de canne + jus citron vert","note":"","a":[["nuocmam",51],["sucre",12]]},
        {"q":"80 g","nom":"Pousses de soja + 2 oignons verts + coriandre","note":"","a":[["saucesoja",34],["poussesoja",80]]},
        {"q":"2 CS","nom":"Cacahuètes concassées + quartiers de citron vert","note":"","a":[["citron",15],["cacahuete",20]]}
      ] },
    r31: { titre: "Fajitas de Poulet · Poivrons · Tortillas", nonCompte: "salsa non comptée",
      note: "Le tex-mex <strong>express et coloré</strong> : poulet, poivrons riches en vitamine C, tortillas complètes. Pour des poivrons « grillés resto » : poêle <strong>très chaude</strong> et on remue peu, pour qu'ils marquent sans rendre d'eau.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet","note":"En fines lanières pour une cuisson rapide et homogène","a":[["poulet",180]]},
        {"q":"2","nom":"Tortillas de blé complètes","note":"","a":[["tortilla",124]]},
        {"q":"1½","nom":"Poivrons (rouge + vert) + ½ oignon","note":"","a":[["poivron",240],["oignon",55]]},
        {"q":"1 CS","nom":"Épices fajitas (paprika, cumin, ail, origan)","note":"","a":[]},
        {"q":"1 cc","nom":"Huile + jus de citron vert","note":"","a":[["huileneutre",4.5]]},
        {"q":"q.s.","nom":"Salsa, coriandre fraîche","note":"","a":[]}
      ] },
    r32: { titre: "Bibimbap Bœuf · Riz · Légumes · Œuf", nonCompte: "gochujang (~15 g, ≈ 30 kcal) non compté",
      note: "Le plat coréen complet : protéines, riz et 4 légumes dans un bol. Le gochujang (pâte de piment fermentée) apporte l'umami ; il n'est pas compté dans les calories (environ 30 kcal). Dispose les légumes par couleur avant de mélanger — c'est l'esprit du bibimbap.",
      lignes: [
        {"q":"150 g","nom":"Bœuf haché 5% MG","note":"","a":[["hache5",150]]},
        {"q":"60 g","nom":"Riz sec → cuit","note":"","a":[["rizblanc_cru",60]]},
        {"q":"1","nom":"Œuf (au plat, jaune coulant)","note":"","a":[["oeuf",52]]},
        {"q":"300 g","nom":"Légumes : carotte + épinards + champignons + courgette","note":"","a":[["carotte",75],["epinard",75],["champignon",75],["courgette",75]]},
        {"q":"sauce","nom":"Gochujang + sauce soja + huile de sésame","note":"","a":[["saucesoja",17],["huilesesame",4.5]]}
      ] },
    r33: { titre: "Poulet Shawarma Bowl · Riz · Sauce Yaourt-Ail",
      note: "Le goût street-food du shawarma, version <strong>maigre</strong> : <span data-rv=\"l\"></span> g de lipides seulement. La <strong>marinade au yaourt</strong> attendrit le poulet et le garde juteux. La sauce ail-citron au yaourt grec ajoute des protéines sans les calories d'une sauce blanche.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet","note":"Mariné dans le yaourt + épices : ça l'attendrit et le parfume","a":[["poulet",180]]},
        {"q":"60 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",60]]},
        {"q":"80 g","nom":"Yaourt grec 0% (sauce + ail + citron)","note":"","a":[["grec0",80]]},
        {"q":"1 CS","nom":"Épices shawarma (cumin, paprika, coriandre, curcuma)","note":"","a":[]},
        {"q":"1 cc","nom":"Huile d'olive","note":"","a":[["huileolive",4.5]]},
        {"q":"q.s.","nom":"Tomate, concombre, oignon rouge, persil, pickles","note":"","a":[["tomate",80],["concombre",80],["oignon",30]]}
      ] },
    r34: { titre: "Bun Cha · Poulet Grillé · Vermicelles · Herbes",
      note: "Plat vietnamien frais, riche en glucides (<span data-rv=\"g\"></span> g) : idéal les jours de séance. Les herbes fraîches (menthe, coriandre) font tout le parfum. Le nuoc-mâm est très salé : dose-le à la cuillère.",
      lignes: [
        {"q":"150 g","nom":"Blanc de poulet émincé (mariné soja + miel + ail)","note":"","a":[["poulet",150],["miel",7],["saucesoja",10]]},
        {"q":"80 g","nom":"Vermicelles de riz","note":"","a":[["vermicelleriz",80]]},
        {"q":"q.s.","nom":"Salade + menthe + coriandre + carotte râpée","note":"","a":[["carotte",50]]},
        {"q":"sauce","nom":"Nuoc-mâm + jus de citron vert + sucre + ail","note":"","a":[["nuocmam",20],["sucre",5]]},
        {"q":"1 CS","nom":"Cacahuètes concassées","note":"","a":[["cacahuete",10]]}
      ] },
    r35: { titre: "Chili Con Carne · Bœuf · Haricots Rouges · Riz",
      note: "Un grand volume, très rassasiant : bœuf (fer héminique) et haricots rouges (fibres, protéines végétales). À préparer en grande quantité le dimanche : il s'améliore en réchauffant.",
      lignes: [
        {"q":"200 g","nom":"Bœuf haché 5% MG","note":"","a":[["hache5",200]]},
        {"q":"1 boîte","nom":"Haricots rouges (égouttés)","note":"","a":[["haricotrouge",250]]},
        {"q":"400 g","nom":"Tomates pelées + 50g maïs","note":"","a":[["tomatepelee",400],["mais",50]]},
        {"q":"1","nom":"Oignon + ½ poivron + 2 gousses d'ail","note":"","a":[["oignon",110],["poivron",80],["ail",8]]},
        {"q":"épices","nom":"Cumin + paprika fumé + piment + origan","note":"","a":[]},
        {"q":"45 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",45]]}
      ] },
    r36: { titre: "Poulet Crémeux aux Champignons · Brocoli",
      note: "Le réconfort d'une <strong>sauce crémeuse</strong> sans crème : <span data-rv=\"g\"></span> g de glucides pour <span data-rv=\"kcal\"></span> kcal. L'astuce : le skyr s'ajoute <strong>hors du feu</strong>, sinon il tranche. Idéal les jours de repos.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet (en aiguillettes)","note":"","a":[["poulet",180]]},
        {"q":"150 g","nom":"Champignons de Paris","note":"","a":[["champignon",150]]},
        {"q":"200 g","nom":"Brocoli (en bouquets)","note":"","a":[["brocoli",200]]},
        {"q":"100 g","nom":"Skyr / fromage blanc 0%","note":"Hors du feu pour la sauce, sinon il tranche","a":[["skyr",100]]},
        {"q":"1 cc","nom":"Huile d'olive + 1 cc moutarde + ail","note":"","a":[["huileolive",4.5],["moutarde",5]]},
        {"q":"q.s.","nom":"Oignon, bouillon de volaille, persil, poivre","note":"","a":[["oignon",50],["bouillon",100]]}
      ] },
    r37: { titre: "Wrap Falafel · Houmous · Crudités", nonCompte: "sauce yaourt optionnelle non comptée",
      note: "Repas libanais végétarien, parfait à emporter. <span data-rv=\"p\"></span> g de protéines seulement — <strong>complète avec un yaourt grec ou une whey</strong> pour atteindre ta cible.",
      lignes: [
        {"q":"2","nom":"Tortillas complètes","note":"","a":[["tortilla",124]]},
        {"q":"6","nom":"Falafels (frais ou surgelés)","note":"","a":[["falafel",130]]},
        {"q":"60 g","nom":"Houmous","note":"","a":[["houmous",60]]},
        {"q":"q.s.","nom":"Salade + tomate + concombre","note":"","a":[["tomate",80],["concombre",80]]},
        {"q":"sauce","nom":"Yaourt + citron + ail (option)","note":"","a":[]}
      ] },
    r38: { titre: "Pâtes au Thon · Citron · Ail · Parmesan",
      note: "Express (15 min) et très protéiné à partir de placard. L'eau de cuisson amidonnée fait une sauce qui nappe sans crème. Le citron casse le côté « boîte » du thon.",
      lignes: [
        {"q":"100 g","nom":"Pâtes complètes sèches","note":"","a":[["patescompletes",100]]},
        {"q":"2 boîtes","nom":"Thon naturel (200g égoutté)","note":"","a":[["thon",200]]},
        {"q":"1","nom":"Citron (zeste + jus) + 2 gousses d'ail","note":"","a":[["citron",40],["ail",8]]},
        {"q":"1 CS","nom":"Huile d'olive + persil","note":"","a":[["huileolive",13.5]]},
        {"q":"20 g","nom":"Parmesan râpé","note":"","a":[["parmesan",20]]}
      ] },
    r39: { titre: "Porridge Protéiné · Chocolat · Banane",
      note: "Petit-déjeuner costaud à <strong>1,45 €</strong>, avec les bêta-glucanes de l'avoine pour la satiété. <strong>Ajoute la whey hors du feu</strong> : elle grumelle à la chaleur (sa valeur nutritive, elle, ne change pas). Goût « bowl cake ».",
      lignes: [
        {"q":"60 g","nom":"Flocons d'avoine","note":"","a":[["avoine",60]]},
        {"q":"1 scoop","nom":"Whey chocolat","note":"","a":[["whey",30],["cacao",3]]},
        {"q":"1","nom":"Banane","note":"","a":[["banane",120]]},
        {"q":"200 ml","nom":"Lait demi-écrémé + 1 cc cacao","note":"","a":[["lait",206]]},
        {"q":"10 g","nom":"Beurre de cacahuète","note":"","a":[["beurrecacahuete",10]]}
      ] },
    r40: { titre: "Skyr Bowl · Beurre de Cacahuète · Pomme",
      note: "5 minutes, en collation ou au petit-déjeuner. Le skyr est très riche en protéines pour peu de calories. Ajoute la pomme et le granola au dernier moment pour le croquant.",
      lignes: [
        {"q":"250 g","nom":"Skyr nature","note":"","a":[["skyr",250]]},
        {"q":"1","nom":"Pomme en dés","note":"","a":[["pomme",150]]},
        {"q":"20 g","nom":"Beurre de cacahuète","note":"","a":[["beurrecacahuete",20]]},
        {"q":"30 g","nom":"Granola ou flocons d'avoine","note":"","a":[["granola",30]]},
        {"q":"5 g","nom":"Miel + cannelle","note":"","a":[["miel",5]]}
      ] },
    r41: { titre: "Poulet Yassa · Oignons Citron · Riz",
      note: "Classique sénégalais, maigre et plein de saveur grâce au citron et aux oignons fondus. Économique et idéal en meal prep : la sauce s'intensifie le lendemain.",
      lignes: [
        {"q":"180 g","nom":"Blanc de poulet","note":"","a":[["poulet",180]]},
        {"q":"3","nom":"Oignons émincés","note":"La base du yassa : beaucoup d'oignon fondu","a":[["oignon",330]]},
        {"q":"2","nom":"Citrons (jus) + 1 CS moutarde","note":"","a":[["citron",80],["moutarde",15]]},
        {"q":"60 g","nom":"Riz sec","note":"","a":[["rizblanc_cru",60]]},
        {"q":"q.s.","nom":"Olives + 1 cc huile + piment + laurier","note":"","a":[["olive",20],["huileneutre",4.5]]}
      ] },
    r42: { titre: "Saumon Teriyaki · Riz · Brocoli",
      note: "Le saumon apporte oméga-3 EPA et DHA et vitamine D ; le riz, les glucides d'un repas d'après séance. La sauce teriyaki maison permet de doser le sucre.",
      lignes: [
        {"q":"150 g","nom":"Pavé de saumon","note":"","a":[["saumon",150]]},
        {"q":"60 g","nom":"Riz sec","note":"","a":[["rizblanc_cru",60]]},
        {"q":"sauce","nom":"Teriyaki : sauce soja + mirin + 1 cc miel","note":"","a":[["saucesoja",30],["mirin",17],["miel",7]]},
        {"q":"150 g","nom":"Brocoli vapeur","note":"","a":[["brocoli",150]]},
        {"q":"q.s.","nom":"Graines de sésame + oignon vert","note":"","a":[["sesame",3]]}
      ] },
    r43: { titre: "Boulettes de Dinde · Sauce Tomate · Polenta",
      note: "La dinde est l'une des viandes les plus maigres. La polenta est une alternative économique et sans gluten au riz ou aux pâtes. Plat réconfortant qui se conserve et se réchauffe très bien.",
      lignes: [
        {"q":"180 g","nom":"Dinde hachée","note":"","a":[["dindehachee",180]]},
        {"q":"60 g","nom":"Polenta (semoule de maïs)","note":"","a":[["polenta",60]]},
        {"q":"400 g","nom":"Tomates pelées + 1 oignon + 2 gousses d'ail","note":"","a":[["tomatepelee",400],["oignon",110],["ail",8]]},
        {"q":"20 g","nom":"Parmesan + herbes (origan, basilic)","note":"","a":[["parmesan",20]]}
      ] },
    r44: { titre: "Quesadilla Poulet · Cheddar · Haricots Noirs",
      note: "Protéines du poulet, du cheddar et des haricots. Cuisson à la poêle <strong>sans matière grasse</strong> : le fromage fait le liant et la coloration. Les haricots noirs ajoutent fibres et satiété.",
      lignes: [
        {"q":"150 g","nom":"Blanc de poulet émincé (épices tex-mex)","note":"","a":[["poulet",150]]},
        {"q":"2","nom":"Tortillas (blé ou maïs)","note":"","a":[["tortilla",124]]},
        {"q":"60 g","nom":"Cheddar râpé","note":"","a":[["cheddar",60]]},
        {"q":"60 g","nom":"Haricots noirs + ¼ poivron + oignon","note":"","a":[["haricotnoir",60],["poivron",40],["oignon",30]]}
      ] },
    r45: { titre: "Tofu Croustillant · Sauce Cacahuète · Nouilles",
      note: "Le <strong>végétarien sans compromis</strong> : tofu croustillant et sauce cacahuète. Le soja fait partie des rares protéines végétales de bonne qualité (riches en acides aminés essentiels). Le secret du tofu croustillant : bien l'<strong>éponger</strong> et le rouler dans un peu de maïzena.",
      lignes: [
        {"q":"180 g","nom":"Tofu ferme","note":"Bien l'éponger + 1 cc maïzena = croustillant garanti à la poêle","a":[["tofu",180],["fecule",3]]},
        {"q":"70 g","nom":"Nouilles (riz ou blé) sèches","note":"","a":[["vermicelleriz",70]]},
        {"q":"1½ CS","nom":"Beurre de cacahuète (sauce)","note":"","a":[["beurrecacahuete",24]]},
        {"q":"200 g","nom":"Légumes sautés (poivron, chou, carotte)","note":"","a":[["poivron",70],["chou",65],["carotte",65]]},
        {"q":"q.s.","nom":"Sauce soja + citron vert + ail + gingembre + sriracha","note":"","a":[["saucesoja",20]]},
        {"q":"q.s.","nom":"Cacahuètes concassées, coriandre","note":"","a":[["cacahuete",10]]}
      ] },
    r46: { titre: "Bœuf Sauté aux Brocolis · Riz · Sauce Soja-Sésame",
      note: "Le classique sauté <strong>bœuf-brocoli</strong>, avec le fer héminique du bœuf. Deux secrets de tendreté : trancher la viande <strong>fin et contre les fibres</strong>, et saisir à feu <strong>très vif et brièvement</strong>. Le brocoli blanchi garde sa couleur et son croquant.",
      lignes: [
        {"q":"180 g","nom":"Bœuf (bavette ou rumsteck)","note":"Tranché FIN dans le sens contraire des fibres = tendre","a":[["boeuf",180]]},
        {"q":"60 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",60]]},
        {"q":"200 g","nom":"Brocoli (en bouquets)","note":"","a":[["brocoli",200]]},
        {"q":"q.s.","nom":"Sauce soja + 1 cc miel + ail + gingembre","note":"","a":[["saucesoja",30],["miel",7]]},
        {"q":"1 cc","nom":"Huile + graines de sésame + oignon vert","note":"","a":[["huileneutre",4.5],["sesame",3]]}
      ] },
    r47: { titre: "Riz Cantonais Protéiné · Œufs · Jambon · Petits Pois",
      note: "L'anti-gaspi pour finir le riz de la veille, en 15 min. Le secret : <strong>riz bien froid</strong> et wok très chaud pour qu'il saute sans coller. Remplace le jambon par du poulet pour une version plus maigre.",
      lignes: [
        {"q":"200 g","nom":"Riz cuit de la veille","note":"Le riz froid saute mieux et ne colle pas","a":[["rizblanc_cuit",200]]},
        {"q":"3","nom":"Œufs","note":"","a":[["oeuf",156]]},
        {"q":"80 g","nom":"Jambon (ou poulet) en dés","note":"","a":[["jambon",80]]},
        {"q":"60 g","nom":"Petits pois (surgelés)","note":"","a":[["petitspois",60]]},
        {"q":"q.s.","nom":"Oignon vert + sauce soja + 1 cc huile","note":"","a":[["saucesoja",15],["huileneutre",4.5]]}
      ] },
    r48: { titre: "Gnocchis Poêlés · Tomate · Mozzarella · Œuf",
      note: "Le confort italien <strong>pas cher et rapide</strong> (2,95 €, 20 min). L'astuce : <strong>poêler les gnocchis à sec</strong> au lieu de les bouillir, croustillants dehors, moelleux dedans. L'œuf et la mozzarella apportent les protéines.",
      lignes: [
        {"q":"220 g","nom":"Gnocchis (rayon frais)","note":"Poêlés à sec sans les bouillir = dorés et moelleux dedans","a":[["gnocchi",220]]},
        {"q":"200 g","nom":"Sauce tomate / passata","note":"","a":[["passata",200]]},
        {"q":"60 g","nom":"Mozzarella","note":"","a":[["mozzarella",60]]},
        {"q":"1","nom":"Œuf (poché ou au plat)","note":"","a":[["oeuf",52]]},
        {"q":"10 g","nom":"Parmesan + basilic + ail","note":"","a":[["parmesan",10]]},
        {"q":"1 cc","nom":"Huile d'olive","note":"","a":[["huileolive",4.5]]}
      ] },
    r49: { titre: "Pancakes Protéinés · Myrtilles",
      note: "Petit-déjeuner gourmand pour 2,05 €. La whey vanille sucre la pâte (pas besoin de sucre ajouté). Feu moyen impératif : trop chaud, la whey brûle.",
      lignes: [
        {"q":"60 g","nom":"Flocons d'avoine (mixés en farine)","note":"","a":[["avoine",60]]},
        {"q":"1 scoop","nom":"Whey vanille","note":"","a":[["whey",30]]},
        {"q":"2","nom":"Œufs + 1 banane écrasée","note":"","a":[["oeuf",104],["banane",120]]},
        {"q":"60 g","nom":"Myrtilles + filet de lait","note":"","a":[["myrtille",60],["lait",30]]}
      ] },
    r50: { titre: "Crevettes Curry Coco · Riz", nonCompte: "pâte de curry rouge (1 c. à soupe, ≈ 20 kcal) non comptée",
      note: "Curry thaï express et parfumé. Les crevettes sont très riches en protéines pour leurs calories et apportent iode et sélénium. ⚠️ Ne les cuis pas plus de 3 min (forme en C), sinon elles deviennent caoutchouteuses. Lait de coco léger pour limiter les graisses saturées. La pâte de curry n'est pas comptée (environ 20 kcal).",
      lignes: [
        {"q":"150 g","nom":"Crevettes décortiquées crues","note":"","a":[["crevette",150]]},
        {"q":"100 ml","nom":"Lait de coco léger + 1 CS pâte de curry rouge","note":"","a":[["coco14",100]]},
        {"q":"60 g","nom":"Riz basmati sec","note":"","a":[["basmati_cru",60]]},
        {"q":"q.s.","nom":"Poivron + oignon + coriandre + citron vert","note":"","a":[["poivron",80],["oignon",60]]}
      ] }
  };

  function exact(id) {
    var t = { kcal: 0, p: 0, g: 0, l: 0 };
    REC[id].lignes.forEach(function (ln) { ln.a.forEach(function (x) { var f = ALIM[x[0]], q = x[1] / 100; t.kcal += f.kcal * q; t.p += f.p * q; t.g += f.g * q; t.l += f.l * q; }); });
    return t;
  }
  // Totaux affichés : kcal arrondies à 5, macros au gramme
  function total(id) { var t = exact(id); return { kcal: Math.round(t.kcal / 5) * 5, p: Math.round(t.p), g: Math.round(t.g), l: Math.round(t.l) }; }
  // Grammes de protéines pour 100 kcal
  function densite(id) { var t = exact(id); return Math.round(t.p / t.kcal * 1000) / 10; }
  function fmtG(g) { return (Math.round(g * 10) / 10).toString().replace('.', ','); }
  // Texte « compté » d'une ligne : « 13,5 g » ou « tomates 80 g · concombre 80 g »
  function compte(ln) {
    if (!ln.a.length) return '';
    if (ln.a.length === 1) return fmtG(ln.a[0][1]) + ' g';
    return ln.a.map(function (x) { return ALIM[x[0]].nom.toLowerCase() + ' ' + fmtG(x[1]) + ' g'; }).join(' · ');
  }
  // La quantité de la fiche dit déjà exactement les grammes comptés ?
  function qteExacte(ln) { return ln.a.length === 1 && new RegExp('^' + String(ln.a[0][1]).replace('.', '[.,]') + '\\s*g$').test(ln.q.trim()); }

  var RAYONS = ['Viandes & poissons', 'Œufs & produits laitiers', 'Fruits & légumes', 'Féculents & céréales', 'Légumineuses & conserves', 'Traiteur', 'Épicerie & condiments'];
  // Liste de courses : grammes additionnés par aliment (une seule unité, le gramme), regroupés par rayon.
  // Lignes non comptées (épices, eau, « q.s. » sans quantité) : rappel « à vérifier dans le placard ».
  function courses(ids) {
    var tot = {}, placard = {};
    ids.forEach(function (id) {
      var r = REC[id]; if (!r) return;
      r.lignes.forEach(function (ln) {
        if (!ln.a.length) { var n = ln.nom.replace(/\s*\(.*?\)/g, '').trim(); if (n) placard[n.toLowerCase()] = n; return; }
        ln.a.forEach(function (x) {
          var k = x[0], g = x[1], f = ALIM[k];
          if (f.versCru) { k = f.versCru[0]; g = g * f.versCru[1]; }
          tot[k] = (tot[k] || 0) + g;
        });
      });
    });
    var parRayon = RAYONS.map(function (ry) {
      var items = Object.keys(tot).filter(function (k) { return ALIM[k].rayon === ry; }).map(function (k) {
        var f = ALIM[k], g = Math.round(tot[k]);
        return { key: k, nom: f.nom, g: g, pieces: f.piece ? Math.ceil(tot[k] / f.piece - 0.05) : null };
      }).sort(function (a, b) { return b.g - a.g; });
      return { rayon: ry, items: items };
    }).filter(function (x) { return x.items.length; });
    return { rayons: parRayon, placard: Object.keys(placard).sort().map(function (k) { return placard[k]; }) };
  }

  A.RECETTES = { SOURCE: SOURCE, ALIM: ALIM, REC: REC, ORDER: Object.keys(REC), exact: exact, total: total, densite: densite, compte: compte, qteExacte: qteExacte, courses: courses, RAYONS: RAYONS };
})(typeof window !== 'undefined' ? window : globalThis);
