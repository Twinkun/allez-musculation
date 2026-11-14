/* ═══════════════════════════════════════════════════════════════════
   ALLEZ — data/fiches.js · SOURCE UNIQUE des fiches techniques d'exercices
   ALLEZ.FICHES : technique, respiration, amplitude, erreurs, précautions.
   key = identifiant de l'exercice dans data/programme.js (séries, repos,
   tempo et place dans la semaine viennent du programme, pas d'ici).
   ALLEZ.FICHES_UI : animations SVG et carte des muscles, partagées par
   exercices.html et les modales de l'accueil.
   Chargé après core.js et data/programme.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (w) {
  'use strict';
  var A = w.ALLEZ = w.ALLEZ || {};

const FICHES = [
  {id:1,
   key:"dev-incline",
   name:"Développé Incliné Haltères 30°",
   cat:"push",
   mg:"Pectoraux supérieurs",
   diff:3,
   eff:5,
   icon:"🏋️",
   svgKey:"press_incline",
   equip:"Haltères + banc incliné 30°",
   yt:"développé incliné haltères 30 degrés technique musculation débutant",
   muscles:{"p":["chest"],"s":["front-delt","triceps"]},
   steps:["Règle le banc à environ 30° : plus haut, l'avant de l'épaule prend le relais","Saisis les haltères, assieds-toi au bord, remonte les genoux pour t'allonger","Omoplates SERRÉES et ENFONCÉES dans le banc — maintiens cette position tout le set","Descends lentement en 3 secondes, coudes à 45-60° du buste (jamais à 90° en croix)","Pause 1 seconde en bas — ressens l'étirement du pectoral supérieur","Expire et pousse vers le haut-intérieur, haltères qui se rapprochent légèrement","Arrête avant de verrouiller les coudes — garde la tension musculaire continue"],
   breath:"⬇ Inspire lentement en descendant → ⏸ Pause 1 s → ⬆ Expire fort en poussant",
   amp:"Coudes légèrement sous l'épaule en bas — haltères proches (sans se toucher) en haut",
   posture:["Pieds à plat au sol, jambes stables","Dos en contact complet avec le banc","Omoplates serrées + enfoncées (tenue constante)","Poignets neutres — ni fléchis ni hyperétendus","Cou détendu, tête posée"],
   errors:[{"b":"Banc à 45° ou plus","g":"Environ 30° : bon compromis pour le haut des pectoraux (Rodríguez-Ridao 2020)"},{"b":"Coudes en croix à 90°","g":"45-60° — protège l'avant de l'épaule"},{"b":"Rebondir en bas","g":"Pause contrôlée 1 s — stretch reflex sécurisé"},{"b":"Dos qui décolle du banc","g":"Contact constant — empêche la compensation lombaire"}],
   injury:["Inconfort au sternum : réduire l'amplitude de 10-15 % — ne jamais forcer","Douleur d'épaule : vérifier l'angle des coudes (45-60°) et réduire le poids","Poignets : légère rotation externe des haltères améliore le confort articulaire"],
   schema:[{"lbl":"Position départ","txt":"Allongé à 30°, haltères au-dessus de la poitrine bras quasi-tendus, omoplates serrées et enfoncées dans le banc"},{"lbl":"Descente — 3 secondes","txt":"Écarter les haltères lentement, coudes à 45-60° du buste, descendre jusqu'à l'étirement du pectoral supérieur — pause 1 s"},{"lbl":"Poussée & contraction","txt":"Expirer fort, pousser vers le haut-intérieur, haltères se rapprochent légèrement — arrêt avant verrouillage"}]},

  {id:2,
   key:"elev-lat",
   name:"Élévations Latérales Haltères",
   cat:"push",
   mg:"Deltoïdes latéraux",
   diff:3,
   eff:5,
   icon:"💪",
   svgKey:"lateral_raise",
   equip:"Haltères légers (4-6 kg pour débuter)",
   yt:"élévations latérales haltères technique parfaite deltoïdes latéraux",
   muscles:{"p":["side-delt"],"s":["traps","front-delt"]},
   steps:["Debout, haltères le long du corps, légère flexion des coudes (15°)","Engage les abdominaux pour stabiliser le tronc — pas d'élan","Monte les bras sur les côtés jusqu'à l'horizontale EXACTE — pas plus haut","Pouce neutre et bras légèrement devant le corps (dans l'axe de l'omoplate) — pas de « verre qu'on verse »","Contrôle la descente en 3 secondes — sans laisser retomber les bras","Pause en bas sans balancer — pas d'élan, répétition stricte"],
   breath:"⬆ Expire en montant → ⬇ Inspire lentement en descendant (3 s)",
   amp:"De la hanche jusqu'à l'horizontale exacte — au-dessus l'épaule prend le relais",
   posture:["Tronc légèrement penché en avant (10°) pour le faisceau médial","Coudes légèrement fléchis tout le long","Épaules basses — ne pas hausser pendant le mouvement","Pas d'élan du corps ni de la tête"],
   errors:[{"b":"Monter au-dessus de l'horizontale","g":"Exactement à l'horizontale — cible le deltoïde médial de façon optimale"},{"b":"Utiliser l'élan du corps","g":"Mouvement strict — même si le poids est plus léger"},{"b":"Paumes en supination (vers le haut)","g":"Pouce neutre : le « verre qu'on verse » (rotation interne) augmente le risque de conflit à l'épaule"},{"b":"Trop lourd = compensation trapèzes","g":"Léger et strict > lourd et compensé"}],
   injury:["Douleur sous-acromiale : réduire l'amplitude, s'arrêter à 80° si pincement","Commencer léger (4-6 kg) — l'isolation exige de la légèreté","Séries de 12 à 20 : l'hypertrophie est comparable de 5 à 30 répétitions près de l'échec ; les séries légères sont surtout plus confortables pour l'épaule"],
   schema:[{"lbl":"Position départ","txt":"Debout, haltères le long des cuisses, légère flexion des coudes (15°), buste légèrement penché en avant (10°)"},{"lbl":"Montée — 2 secondes","txt":"Lever les bras sur les côtés en arc, pouce neutre, jusqu'à la parallèle au sol — pas au-delà"},{"lbl":"Retour — 3 secondes","txt":"Descendre lentement en résistant à la gravité, sans laisser retomber les bras"}]},

  {id:3,
   key:"dev-militaire",
   name:"Développé Militaire Haltères Assis",
   cat:"push",
   mg:"Deltoïdes antérieurs",
   diff:3,
   eff:4,
   icon:"⬆️",
   svgKey:"overhead_press",
   equip:"Haltères + banc à dossier réglable (75-85°)",
   yt:"développé militaire haltères assis technique épaules débutant",
   muscles:{"p":["front-delt","side-delt"],"s":["traps","triceps"]},
   steps:["Assis, dossier réglé à 75-85°, pieds à plat, dos en contact","Haltères au niveau des oreilles, coudes à 90°, paumes vers l'avant","Pousse verticalement jusqu'à quasi-extension — pas de verrouillage","Légère convergence des haltères en haut — ils ne se touchent pas","Descends lentement jusqu'à ce que les coudes soient à l'horizontale","Garde les abdominaux engagés — ne pas cambrer le bas du dos"],
   breath:"⬆ Expire fort en poussant → ⬇ Inspire en contrôlant la descente",
   amp:"Coudes à l'horizontale en bas — bras quasi-tendus (non verrouillés) en haut",
   posture:["Côtes basses : expire et « range » les côtes avant chaque poussée — pas de cambrure pour finir la rep","Dos droit collé au dossier en permanence","Lombaires neutres — pas d'hyperlordose","Poignets alignés avec les avant-bras","Regard droit devant, pas vers le haut"],
   errors:[{"b":"Cambrer violemment le dos","g":"Dos plat contre dossier — abdos engagés"},{"b":"Descendre trop bas (sous les oreilles)","g":"Coudes à l'horizontale maximum en bas"},{"b":"Verrouiller les coudes en haut","g":"Légère flexion maintenue — tension continue"},{"b":"Poignets fléchis","g":"Poignets neutres — dans l'axe des avant-bras"}],
   injury:["Épaule instable ou douloureuse : stop, avis médical avant de continuer","Jamais derrière la nuque — stress cervical inutile","Assis = plus stable pour apprendre le mouvement"],
   schema:[{"lbl":"Position départ","txt":"Assis, dos droit collé au dossier, haltères à hauteur des oreilles, coudes à 90°, paumes vers l'avant"},{"lbl":"Poussée — 2 secondes","txt":"Pousser vers le haut, légère convergence des haltères, quasi-extension sans verrouiller les coudes"},{"lbl":"Descente — 2 secondes","txt":"Contrôler la descente jusqu'à hauteur des oreilles (coudes à l'horizontale), inspirer, épaules actives"}]},

  {id:4,
   key:"ecarte-cable",
   name:"Écarté Câble High-to-Low",
   cat:"push",
   mg:"Pectoraux (chef sternal)",
   diff:3,
   eff:4,
   icon:"🔗",
   svgKey:"cable_fly",
   equip:"Machine à câbles — poulies hautes",
   yt:"écarté câble high to low crossover pectoraux technique",
   muscles:{"p":["chest"],"s":["front-delt"]},
   steps:["Positionne les poulies en position haute (au-dessus de la tête)","Un pied en avant pour la stabilité, légère inclinaison du tronc en avant","Légère flexion des coudes (15-20°) maintenue tout le mouvement","Tire les câbles vers le bas-devant en arc de cercle, comme embrasser un arbre","Croise légèrement les mains en fin de mouvement pour contracter le pectoral","Contrôle le retour en 3 secondes — résiste à l'ouverture progressive"],
   breath:"⬆ Expire en rapprochant les bras → ⬇ Inspire en revenant lentement",
   amp:"Grand arc de cercle du haut vers le bas-avant — croisement des mains en fin",
   posture:["Un pied devant l'autre pour la stabilité","Légère inclinaison du tronc 10-15°","Épaules basses, pas de haussement","Poignets neutres tout le mouvement"],
   errors:[{"b":"Plier excessivement les coudes","g":"15-20° fixes — ce n'est pas un rowing"},{"b":"Balancer le tronc","g":"Mouvement isolé des bras"},{"b":"Relâcher sans contrôle","g":"Retour contrôlé en 3 s — tension gardée tout le long"},{"b":"Câbles qui montent en fin","g":"Maintenir la direction bas-avant jusqu'à la fin"}],
   injury:["Le câble garde une tension sur toute l'amplitude ; la version haltères convient aussi","Douleur de coude : vérifier l'angle des coudes, utiliser des poignées rotatives"],
   schema:[{"lbl":"Position départ","txt":"Face à la machine, câbles en position haute, bras écartés en légère ouverture, légère flexion des coudes fixe"},{"lbl":"Adduction — arc de cercle","txt":"Ramener les bras vers le bas-avant-centre, comme embrasser un arbre géant"},{"lbl":"Contraction & retour","txt":"Légère croisure des mains en bas, pause 1 s, puis retour lent 3 s en résistant à l'ouverture"}]},

  {id:5,
   key:"ext-triceps",
   name:"Extension Triceps Câble Corde",
   cat:"push",
   mg:"Triceps — chef latéral & médial",
   diff:2,
   eff:3,
   icon:"💥",
   svgKey:"pushdown",
   equip:"Machine à câbles + corde (poulie haute)",
   yt:"extension triceps câble corde technique pushdown isolation",
   muscles:{"p":["triceps"],"s":[]},
   steps:["Poulie haute, accessoire corde, face à la machine, légère inclinaison avant","Pieds écartés largeur épaules, coudes COLLÉS aux flancs — règle absolue","Pars avec les avant-bras à l'horizontale ou légèrement au-dessus","Pousse la corde vers le bas et ÉCARTE les extrémités en fin de mouvement","Contraction maximale bras tendus — pause 1 s, visualise tes triceps","Reviens lentement à la position de départ en contrôlant"],
   breath:"⬇ Expire en poussant → ⬆ Inspire lentement en remontant",
   amp:"Avant-bras à 90°+ en haut — extension complète avec écartement des cordes en bas",
   posture:["Coudes fixes aux flancs — règle n°1","Poignets neutres (ni fléchis ni étendus)","Légère inclinaison du buste en avant","Ne pas se pencher avec le tronc pour aider"],
   errors:[{"b":"Coudes qui s'écartent ou remontent","g":"Coudes fixes = isolation triceps pure"},{"b":"Ne pas écarter la corde en bas","g":"L'écartement en bas = contraction maximale (chefs latéral et médial)"},{"b":"Amplitude réduite de moitié","g":"Extension COMPLÈTE — les triceps ont besoin de la pleine amplitude"},{"b":"Trop lourd + tronc qui aide","g":"Léger et strict — isolation pure"}],
   injury:["Douleur de coude : coudes ne bougent pas, réduire le poids","La corde est moins stressante pour les coudes que la barre droite","Variante : barre en V pour coudes sensibles"],
   schema:[{"lbl":"Position départ","txt":"Face au câble, légèrement penché, avant-bras à l'horizontale, coudes collés aux flancs"},{"lbl":"Extension vers le bas","txt":"Étendre les avant-bras vers le bas, coudes FIXES, amplitude maximale"},{"lbl":"Contraction & écartement","txt":"Écarter la corde en bas, pause 1 s bras tendus, puis remontée lente 2 s"}]},

  {id:6,
   key:"face-pull",
   name:"Face Pull Câble",
   cat:"push",
   mg:"Deltoïdes postérieurs + Rotateurs",
   diff:3,
   eff:5,
   icon:"🎯",
   svgKey:"face_pull",
   equip:"Machine à câbles + corde (poulie haute)",
   yt:"face pull câble technique deltoïdes postérieurs rotateurs coiffe",
   muscles:{"p":["rear-delt","rhomboids"],"s":["traps","side-delt"]},
   steps:["Poulie à hauteur du visage ou légèrement au-dessus, accessoire corde","Recule suffisamment pour avoir une tension constante sur le câble","Prends la corde en prise neutre, pouces vers toi, légère inclinaison arrière","Tire la corde vers ton visage en écartant les mains vers les oreilles","Rotation EXTERNE des épaules : coudes à hauteur des yeux, les mains finissent de chaque côté de la tête, derrière les oreilles","Pause 2 secondes en contraction — sens les delts postérieurs et rhomboïdes","Reviens lentement en 3 secondes — ne laisse pas les câbles te tirer"],
   breath:"⬆ Expire en tirant → ⏸ Pause 2 s → ➡ Inspire en revenant lentement",
   amp:"Bras quasi-tendus au départ — corde au niveau du visage avec coudes hauts en contraction",
   posture:["Légère inclinaison arrière (10-15°) — normale","Poitrine sortie, omoplates qui se rapprochent en fin","Coudes HAUTS (à hauteur des yeux) en fin de mouvement","Ne pas tirer vers le bas ni vers la poitrine"],
   errors:[{"b":"Tirer vers le bas (comme un rowing)","g":"Tirer VERS LE VISAGE avec rotation externe"},{"b":"Coudes bas pendant le mouvement","g":"Coudes à hauteur des yeux — active les delts postérieurs"},{"b":"Trop lourd = compensation trapèzes","g":"Léger et avec rotation externe complète"},{"b":"Amplitude réduite, pas de rotation","g":"La rotation externe EST l'exercice — sans elle, ça ne sert à rien"}],
   injury:["1 série très légère en échauffement, puis les séries de travail en fin de séance","Renforce l'arrière de l'épaule : utile pour l'équilibre avec les exercices de poussée et pour la posture","Si douleur d'épaule : réduire le poids et vérifier la rotation externe"],
   schema:[{"lbl":"Position départ","txt":"Face au câble (hauteur des yeux), bras quasi-tendus, corde en prise neutre, léger recul"},{"lbl":"Tirage vers le visage","txt":"Tirer vers le visage, coudes qui montent vers le haut-extérieur, paumes commencent à tourner"},{"lbl":"Rotation externe","txt":"Mains de chaque côté de la tête, coudes à hauteur des yeux — pause 2 s en contraction"}]},

  {id:7,
   key:"tirage-vertical",
   name:"Tirage Vertical Prise Large",
   cat:"pull",
   mg:"Grand dorsal (largeur)",
   diff:3,
   eff:5,
   icon:"⬇️",
   svgKey:"pulldown",
   equip:"Machine lat pulldown",
   yt:"tirage vertical prise large technique grand dorsal lat pulldown débutant",
   muscles:{"p":["lats"],"s":["biceps","rear-delt","rhomboids"]},
   steps:["Assieds-toi, calage de cuisses bien serré, pieds à plat","Prise large pronation (paumes vers l'avant), largeur 1,5 fois celle des épaules","Légère inclinaison arrière du tronc (15-20°) — garde-la tout le set","Amorce : ABAISSE les épaules AVANT de plier les coudes","Tire la barre vers le haut de la poitrine en guidant les coudes vers les hanches","Pause 1 s en contraction — ressens les lats contractés","Contrôle la montée en 3 secondes — stretch complet des lats en haut"],
   breath:"⬇ Expire en tirant → ⬆ Inspire en remontant avec contrôle (3 s)",
   amp:"Bras quasi-tendus en haut (stretch maximal) — barre au niveau de la clavicule en bas",
   posture:["Tronc incliné 15° arrière, position fixe","Épaules BAISSÉES (pas de haussement) tout le set","Coudes qui pointent vers le sol, pas vers l'arrière","Poitrine sortie pour favoriser la contraction des lats"],
   errors:[{"b":"Tirer avec les bras d'abord","g":"Initier avec les ÉPAULES BAISSÉES puis plier les coudes"},{"b":"Tirer derrière la nuque","g":"Toujours devant — derrière = stress cervical sans bénéfice"},{"b":"Se balancer avec le tronc","g":"Légère inclinaison fixe — pas de mouvement pendant le set"},{"b":"Lâcher sans contrôle vers le haut","g":"Remontée contrôlée en 3 s, sans lâcher la barre"}],
   injury:["Si douleur d'épaule : vérifier que les épaules s'abaissent AVANT la flexion des coudes","Douleur de poignet : essaie une prise neutre (poignées parallèles)","Commencer léger — la technique prime sur le poids"],
   schema:[{"lbl":"Position départ","txt":"Assis, cuisses calées, prise large pronation, bras TENDUS, légère inclinaison arrière du buste"},{"lbl":"Tirage","txt":"Abaisser les épaules d'abord, puis tirer la barre vers le haut de la poitrine, coudes vers les hanches"},{"lbl":"Contraction & retour","txt":"Barre à la clavicule, pause 1 s, lats contractés, retour contrôlé 3 s"}]},

  {id:8,
   key:"rowing-unilateral",
   name:"Rowing Unilatéral Haltère",
   cat:"pull",
   mg:"Grand dorsal + Rhomboïdes",
   diff:3,
   eff:5,
   icon:"🚣",
   svgKey:"row",
   equip:"Haltère + banc plat",
   yt:"rowing unilatéral haltère technique dos one arm dumbbell row",
   muscles:{"p":["lats","rhomboids"],"s":["biceps","rear-delt"]},
   steps:["Genou et main du côté libre sur le banc, dos parallèle au sol","Pied droit à plat, haltère dans la main droite — bras tendu","Dos PLAT — ni arrondi, ni hyperlordosé. Vise horizontal","Tire l'haltère vers la HANCHE (pas l'épaule) en guidant le coude vers le plafond","Légère rotation du torse en haut — naturelle et souhaitée","Pause 1 s en haut — coude au-dessus du dos, lat contracté","Descends lentement en 3 s — étirement complet du lat"],
   breath:"⬆ Expire en tirant → ⬇ Inspire en descendant lentement",
   amp:"Bras tendu en bas — coude au-dessus du niveau du dos en haut",
   posture:["Dos parallèle au sol, neutre","Épaule de support stable, pas enfoncée","Haltère tiré vers la HANCHE, pas l'épaule","Tête dans l'alignement du dos — regard vers le sol"],
   errors:[{"b":"Tirer vers l'épaule","g":"Tirer vers la hanche — cible les lats, pas les biceps"},{"b":"Arrondir le dos","g":"Dos plat horizontal — protège les lombaires"},{"b":"Trop de rotation du torse","g":"Légère rotation naturelle OK — évite l'exagération"},{"b":"Descendre sans contrôle","g":"Descente contrôlée en 3 s — étirement complet du dorsal"}],
   injury:["Commence toujours par ton côté le plus faible, puis fais l'autre avec le même nombre de répétitions","Écart de force marqué entre les côtés : garde le même nombre de répétitions, le côté faible rattrape avec le temps","Poignet : utiliser des sangles de traction si besoin"],
   schema:[{"lbl":"Position départ","txt":"Appui genou + main sur le banc, dos parallèle au sol, bras tendu, haltère pendant vers le sol"},{"lbl":"Tirage vers la hanche","txt":"Tirer le coude vers le plafond ET vers l'arrière jusqu'à la hauteur de la hanche"},{"lbl":"Contraction & descente","txt":"Pause 1 s coude au-dessus du dos, lat contracté, puis descente lente 3 s"}]},

  {id:9,
   key:"rowing-cable",
   name:"Rowing Câble Assis Prise Large",
   cat:"pull",
   mg:"Rhomboïdes + Trapèzes moyens",
   diff:3,
   eff:4,
   icon:"🔧",
   svgKey:"row",
   equip:"Machine à câbles poulie basse + barre large",
   yt:"rowing câble assis prise large rhomboïdes trapèzes technique dos",
   muscles:{"p":["rhomboids","traps"],"s":["lats","rear-delt","biceps"]},
   steps:["Assis face à la poulie basse, pieds sur les appuis, légère flexion des genoux","Saisis la barre large en pronation (paumes vers le bas), largeur épaules","Dos droit, buste vertical","Tire en ramenant les coudes EN ARRIÈRE ET EN BAS — les omoplates se rapprochent","Pause 2 s en contraction : omoplates serrées, poitrine vers la machine","Contrôle le retour en 3 s — ne te laisse pas emporter par le câble","Buste FIXE et vertical au retour : l'étirement vient des omoplates qui s'écartent, jamais du dos qui s'enroule"],
   breath:"⬆ Expire en tirant → ⏸ 2 s pause → ⬇ Inspire en revenant lentement",
   amp:"Bras quasi-tendus en départ — omoplates complètement serrées en fin de tirage",
   posture:["Dos droit, buste vertical (jamais arrondi)","Coudes à hauteur du torse (ni trop hauts ni trop bas)","Omoplates actives — pincement en fin de mouvement","Épaules basses, pas de haussement"],
   errors:[{"b":"Balancer le dos","g":"Dos quasi-fixe — c'est le dos qui travaille, pas l'élan"},{"b":"Tirer avec les bras, omoplates passives","g":"Initier le mouvement avec les OMOPLATES"},{"b":"Coudes collés au corps (cible les lats)","g":"Coudes écartés à hauteur du torse — rhomboïdes et trapèzes moyens ciblés"},{"b":"Relâcher sans contrôle","g":"3 s retour contrôlé — stretch clé pour la posture"}],
   injury:["Excellent exercice pour corriger la cyphose thoracique","Prise large pour rhomboïdes — prise serrée cible plus les lats","Si douleur lombaire : réduire l'inclinaison avant du buste"],
   schema:[{"lbl":"Position départ","txt":"Assis, dos droit, buste vertical, bras tendus, barre large en pronation"},{"lbl":"Tirage","txt":"Rétracter les omoplates d'abord, puis ramener les coudes vers les hanches"},{"lbl":"Contraction & retour","txt":"Omoplates serrées, pause 2 s, poitrine haute, retour contrôlé 3 s"}]},

  {id:10,
   key:"oiseau-incline",
   name:"Oiseau sur Banc Incliné",
   cat:"pull",
   mg:"Deltoïdes postérieurs",
   diff:3,
   eff:4,
   icon:"🦅",
   svgKey:"rear_fly",
   equip:"Haltères légers (3-5 kg pour débuter) + banc incliné 30-45°",
   yt:"oiseau haltères banc incliné deltoïdes postérieurs technique rear delt fly",
   muscles:{"p":["rear-delt"],"s":["rhomboids","traps"]},
   steps:["Banc à 30-45°, allongé face vers le bas (ventre sur le banc)","Haltères pendants, bras quasi-tendus, légère flexion des coudes","Monte les haltères sur les côtés en arc de cercle — comme des ailes","Guide les COUDES (pas les mains) vers le plafond","En fin : petite rotation externe (pouces vers le haut) pour la contraction","Pause 1 s en contraction — ressens les delts postérieurs","Descends lentement en 2 s, sans laisser retomber les haltères"],
   breath:"⬆ Expire en montant → ⬇ Inspire lentement en descendant (2 s)",
   amp:"Haltères pendants (bras vers le sol) — bras à l'horizontale ou légèrement au-dessus",
   posture:["Tête dans l'alignement du dos (regarder le sol)","Épaules basses, pas de haussement de trapèzes","Front/poitrine en contact avec le banc","Légère flexion des coudes fixe tout le mouvement"],
   errors:[{"b":"Monter trop haut (trapèzes)","g":"Arrêter à l'horizontale — delts postérieurs ciblés"},{"b":"Haltères trop lourds","g":"Très léger (3-5 kg pour débuter) — isolation pure"},{"b":"Lever le torse du banc","g":"Poitrine reste collée au banc tout le mouvement"},{"b":"Descente sans contrôle","g":"Descente lente en 2 s, tension constante"}],
   injury:["Un des exercices les plus importants pour la santé des épaules","Commencer très léger (3-5 kg) : le deltoïde postérieur est un petit muscle","Rotation externe en fin = sécurité articulaire"],
   schema:[{"lbl":"Position départ","txt":"Ventre sur le banc incliné, bras pendants, haltères légers"},{"lbl":"Ouverture","txt":"Arc de cercle sur les côtés jusqu'à l'horizontale, coudes qui guident"},{"lbl":"Contraction & retour","txt":"Pause 1 s, descente lente en 2 s"}]},

  {id:11,
   key:"oiseau-cable",
   name:"Oiseau Câble Penché",
   cat:"pull",
   mg:"Deltoïdes postérieurs (câble)",
   diff:3,
   eff:3,
   icon:"🔁",
   svgKey:"rear_fly",
   equip:"Machine à câbles — poulie basse",
   yt:"oiseau câble poulie basse rear delt cable fly penché technique",
   muscles:{"p":["rear-delt"],"s":["rhomboids"]},
   steps:["Poulie basse à droite, saisis avec la main GAUCHE (câble croisé devant toi)","Inclinaison du buste à 45° — dos plat, neutre","Bras quasi-tendu, tire vers le haut-côté en arc de cercle","Guide le coude vers le plafond — pense à l'oiseau","Pause 1 s en haut — delt postérieur contracté","Retour lent en 2 s — recommence","Faire les deux côtés"],
   breath:"⬆ Expire en tirant → ⬇ Inspire en revenant",
   amp:"Bras bas (quasi-vertical) — coude à hauteur du dos ou légèrement au-dessus",
   posture:["Dos plat, buste incliné 45°","Tête dans l'alignement du dos","Épaule libre stable pendant le mouvement"],
   errors:[{"b":"Câble direct (pas de tension constante)","g":"Câble croisé pour tension constante sur toute l'amplitude"},{"b":"Trop de trapèze","g":"Très léger et isolation delt postérieur — contrôle total"}],
   injury:["Buste penché sans appui : le bas du dos travaille en maintien. L'oiseau sur banc incliné (au programme) est plus sûr pour les lombaires","Correctif postural majeur : renforce les antagonistes, ouvre le thorax"],
   place:"Hors programme : remplacé par l'oiseau sur banc incliné, qui soulage le bas du dos",
   schema:[{"lbl":"Position départ","txt":"Penché à 45°, dos plat, câble croisé depuis la poulie basse opposée, bras légèrement fléchi"},{"lbl":"Arc de cercle vers l'extérieur","txt":"Tirer en arc vers le haut-côté, coude qui guide le mouvement vers le plafond"},{"lbl":"Contraction & retour","txt":"Pause 1 s en position étendue, delt postérieur contracté, retour lent 2 s"}]},

  {id:12,
   key:"curl-alternes",
   name:"Curl Biceps Haltères Alternés",
   cat:"pull",
   mg:"Biceps (les deux chefs), brachial",
   diff:2,
   eff:4,
   icon:"💪",
   svgKey:"curl",
   equip:"Haltères",
   yt:"curl biceps haltères alternés technique supination débutant",
   muscles:{"p":["biceps"],"s":["forearms","front-delt"]},
   steps:["Debout ou assis, haltères le long du corps, paumes vers l'intérieur (neutre)","Coudes COLLÉS aux flancs — ils ne bougent pas pendant tout le mouvement","Fléchis un bras en SUPINANT (tourne la paume vers le haut pendant le mouvement)","En haut : paume complètement vers le haut, petite contraction supplémentaire","Descends lentement en 3 s avec léger retour en pronation","Alterne les bras sans pause entre les côtés"],
   breath:"⬆ Expire en fléchissant → ⬇ Inspire en descendant (3 s)",
   amp:"Bras tendu en bas — haltère à hauteur de l'épaule en haut",
   posture:["Coudes fixes aux flancs — règle absolue","Tronc stable, pas de balancement","Épaules basses, pas de haussement en fin de mouvement"],
   errors:[{"b":"Coudes qui avancent en haut","g":"Coudes fixes — si ils avancent, c'est trop lourd"},{"b":"Pas de supination","g":"La supination = activation maximale du biceps"},{"b":"Se balancer pour aider","g":"Strict = efficace — l'élan bypass le biceps"},{"b":"Descente trop rapide","g":"Descente contrôlée en 3 s — plus de tension, moins d'élan"}],
   injury:["Douleur de coude : utiliser grip neutre (marteau) — moins de stress","Éviter les haltères trop lourds — la forme prime sur le poids"],
   schema:[{"lbl":"Position départ","txt":"Debout ou assis, haltères en prise neutre le long du corps, coudes aux flancs"},{"lbl":"Flexion + supination","txt":"Fléchir un bras en tournant progressivement la paume vers le haut, coude fixe"},{"lbl":"Contraction & descente","txt":"Pause 1 s en haut paume vers le plafond, descente lente 3 s en résistant"}]},

  {id:13,
   key:"curl-marteau",
   name:"Curl Marteau",
   cat:"pull",
   mg:"Brachioradial + Biceps",
   diff:1,
   eff:3,
   icon:"🔨",
   svgKey:"curl",
   equip:"Haltères",
   yt:"curl marteau haltères technique hammer curl brachioradial avant-bras",
   muscles:{"p":["biceps","forearms"],"s":[]},
   steps:["Debout, haltères en prise neutre (paumes se font face — comme tenir un marteau)","Coudes collés aux flancs","Fléchis un bras SANS rotation — prise neutre maintenue tout le mouvement","Monte jusqu'à ce que l'avant-bras soit quasi-vertical","Descente lente en 3 s en maintenant la prise neutre","Alterner ou faire les deux bras simultanément"],
   breath:"⬆ Expire en fléchissant → ⬇ Inspire lentement (3 s)",
   amp:"Bras tendu en bas — haltère près de l'épaule en haut",
   posture:["Prise neutre stricte (pas de rotation)","Coudes fixes aux flancs","Poignets neutres et alignés tout le mouvement"],
   errors:[{"b":"Laisser les coudes avancer","g":"Coudes fixes — si ils avancent, réduire le poids"},{"b":"Descente rapide","g":"3 s de descente contrôlée"}],
   injury:["Moins de stress sur le poignet que le curl supination — idéal pour poignets sensibles","Cible le brachioradial qui donne de l'épaisseur au bras"],
   place:"Alternative / variante du curl (poignets sensibles)"},

  {id:19,
   key:"band-pull-apart",
   name:"Band Pull-Apart Élastique",
   cat:"pull",
   mg:"Deltoïdes postérieurs + Rhomboïdes",
   diff:1,
   eff:4,
   icon:"🎗️",
   svgKey:"band_pull_apart",
   equip:"Bande élastique",
   yt:"band pull apart technique deltoïde postérieur rhomboïdes posture",
   muscles:{"p":["rear-delt","rhomboids"],"s":["traps","side-delt"]},
   steps:["Debout, saisis une bande élastique à deux mains, bras tendus devant toi à hauteur d'épaules","Mains écartées de la largeur des épaules, paumes vers le sol","Garde les bras tendus (coude quasi-verrouillé) pendant tout le mouvement","Écarte la bande en ouvrant les bras vers l'extérieur — amène les omoplates l'une vers l'autre","La bande vient toucher (ou frôler) ta poitrine en fin de mouvement","Serre les omoplates 1 s, puis reviens LENTEMENT en contrôlant le retour","Garde les épaules basses — ne monte pas les trapèzes vers les oreilles"],
   breath:"⬆ Expire en écartant la bande → ⬇ Inspire en revenant lentement",
   amp:"Bras tendus devant → bande contre la poitrine, omoplates serrées",
   posture:["Bras tendus tout le mouvement","Épaules basses, loin des oreilles","Buste droit, gainage léger","Mouvement piloté par les omoplates, pas par les mains"],
   errors:[{"b":"Plier les coudes pour « tricher »","g":"Bras tendus — le travail vient des deltoïdes postérieurs et des omoplates"},{"b":"Hausser les épaules","g":"Épaules basses — sinon ce sont les trapèzes supérieurs qui prennent le relais"},{"b":"Retour rapide et incontrôlé","g":"Retour lent (2 s), sans laisser la bande revenir d'un coup"}],
   injury:["Exercice d'échauffement et de santé d'épaule idéal avant le travail de poussée","Antidote direct aux épaules enroulées et à la cyphose — renforce ce que la position assise affaiblit"]},

  {id:14,
   key:"arnold-press",
   name:"Arnold Press",
   cat:"vshape",
   mg:"Deltoïdes (antérieur + moyen)",
   diff:4,
   eff:4,
   icon:"🏅",
   svgKey:"overhead_press",
   equip:"Haltères + banc à dossier réglable (75-85°)",
   yt:"arnold press technique haltères épaules rotation débutant",
   muscles:{"p":["front-delt","side-delt"],"s":["traps","triceps"]},
   steps:["Assis, dos contre le dossier (75-85°), haltères en haut d'un curl (devant le visage, coudes 90°, paumes vers toi)","Commence à pousser vers le haut EN TOURNANT progressivement les paumes vers l'extérieur","À mi-chemin, paumes face en avant (position standard militaire)","Continue jusqu'à extension quasi-complète — paumes face avant, coudes légèrement fléchis","Reviens en inversant : tends puis tourne les paumes vers toi","La rotation doit être LENTE et CONTRÔLÉE — elle augmente l'amplitude pour l'avant et le milieu de l'épaule"],
   breath:"⬆ Expire en poussant et tournant → ⬇ Inspire en revenant",
   amp:"Haltères devant le visage (paumes vers toi) → bras quasi-tendus (paumes en avant)",
   posture:["Côtes basses pendant toute la série (elles ont tendance à ressortir bras en l'air)","Dos droit contre le dossier","Abdos engagés, pas de cambrure","Rotation continue et fluide pendant tout le mouvement","Coudes qui montent de 90° pendant le mouvement"],
   errors:[{"b":"Rotation trop rapide ou partielle","g":"Rotation complète et lente — amplitude maximale"},{"b":"Cambrer le dos","g":"Dos plat et abdos serrés"},{"b":"Trop lourd = perte de la rotation","g":"Léger et technique — la rotation est l'exercice"}],
   injury:["Exercice technique — commencer léger pour maîtriser la rotation","Si douleur d'épaule : séparer en presse standard sans rotation au début"],
   schema:[{"lbl":"Position départ","txt":"Assis, haltères devant le visage, paumes vers soi (fin de curl), coudes à 90°"},{"lbl":"Poussée + rotation","txt":"Pousser vers le haut en tournant progressivement les paumes vers l'extérieur"},{"lbl":"Contraction & retour","txt":"Bras quasi-tendus en haut, paumes vers l'avant, retour inverse contrôlé en 3 s"}]},

  {id:27,
   key:"elev-lat-cable",
   name:"Élévations Latérales Câble",
   cat:"vshape",
   mg:"Deltoïdes latéraux (tension constante)",
   diff:3,
   eff:5,
   icon:"〽️",
   svgKey:"lateral_raise",
   equip:"Machine à câbles — poulie basse",
   yt:"élévation latérale poulie basse câble technique deltoïde",
   muscles:{"p":["side-delt"],"s":["traps"]},
   steps:["Poulie basse réglée tout en bas, poignée simple, debout de profil à la machine","Saisis la poignée avec la main la plus éloignée : le câble passe devant toi","Coude légèrement fléchi (15°) et FIXE pendant toute la série","Monte le bras sur le côté en arc de cercle jusqu'à l'horizontale — pas plus haut","Pouce neutre, bras légèrement devant le corps (dans l'axe de l'omoplate)","Redescends en 3 secondes en résistant au câble, sans relâcher la tension en bas","Fais toutes les reps d'un côté, puis l'autre — commence par ton côté le plus faible"],
   breath:"⬆ Expire en montant → ⬇ Inspire en descendant lentement (3 s)",
   amp:"Bras le long du corps (câble déjà tendu) → bras à l'horizontale",
   posture:["Buste droit, abdos gainés, pas de balancier","Épaule basse, loin de l'oreille","Légère inclinaison du buste à l'opposé de la machine possible pour plus d'amplitude","Coude fixe — ce n'est pas un curl"],
   errors:[{"b":"Coude qui se plie (curl latéral)","g":"Flexion légère et fixe du coude"},{"b":"Monter au-dessus de l'horizontale","g":"S'arrêter à l'horizontale — sinon les trapèzes prennent le relais"},{"b":"Trop lourd, élan du buste","g":"Très léger (2,5-5 kg) et strict"}],
   injury:["Avantage du câble : la tension reste présente en bas du mouvement, là où l'haltère « décharge »","Gêne sous l'acromion : réduire l'amplitude (s'arrêter vers 70-80°) et la charge","Complète les élévations aux haltères : 11 séries/semaine au total pour le deltoïde moyen"],
   schema:[{"lbl":"Position départ","txt":"Debout, câble bas du côté opposé, bras tendu avec légère flexion du coude fixe"},{"lbl":"Élévation — 2 secondes","txt":"Lever le bras sur le côté en arc jusqu'à l'horizontale, coude légèrement fléchi maintenu"},{"lbl":"Retour — 3 secondes","txt":"Descendre lentement en résistant à la tension du câble — tension constante tout au long"}]},

  {id:15,
   key:"tractions",
   name:"Pull-ups / Tractions",
   cat:"vshape",
   mg:"Grand dorsal (largeur maximale)",
   diff:5,
   eff:5,
   icon:"🔝",
   svgKey:"pullup",
   equip:"Barre de tractions",
   yt:"tractions pull ups technique grand dorsal débutant progression bande élastique",
   muscles:{"p":["lats","biceps"],"s":["rhomboids","abs","rear-delt"]},
   steps:["Prise pronation (paumes vers l'avant), largeur légèrement supérieure aux épaules","Bras tendus en départ — ABAISSE les épaules avant de plier les coudes","Tire le menton au-dessus de la barre en guidant les coudes vers les hanches","Légère inclinaison arrière, monte jusqu'à ce que le menton passe au-dessus de la barre","Pause 1 s en haut — dorsaux contractés, poitrine fière","Descends LENTEMENT en 3 s — stretch complet des lats","Si c'est impossible : utilise l'élastique ou le tirage vertical comme base"],
   breath:"⬆ Expire en montant → ⬇ Inspire lentement en descendant (3 s)",
   amp:"Bras COMPLÈTEMENT tendus en bas — menton au-dessus de la barre en haut",
   posture:["Côtes basses et fessiers serrés : le corps reste gainé, sans cambrer","Dépression des épaules avant tout","Légère inclinaison arrière du corps en haut","Pas de balancement ni d'élan","Poitrine ouverte, épaules basses"],
   errors:[{"b":"Demi-répétitions (bras non tendus en bas)","g":"Extension COMPLÈTE — la plus grande marge de progression"},{"b":"Épaules haussées (oreilles collées)","g":"Dépression d'abord — épaules loin des oreilles"},{"b":"Se balancer (kipping)","g":"Mouvements stricts — moins de reps, plus de muscle"},{"b":"Descente rapide","g":"3 s de descente contrôlée"}],
   injury:["Moins de 3 tractions strictes : tractions assistées (élastique/machine) ou tirage vertical + 2 négatives (descente 5 s)","Dès 5 tractions strictes : tractions libres","Douleur d'épaule : vérifier dépression des épaules au départ"],
   schema:[{"lbl":"Position départ","txt":"Prise sur la barre, bras COMPLÈTEMENT tendus, épaules abaissées (pas haussées)"},{"lbl":"Montée","txt":"Tirer jusqu'à ce que le menton passe au-dessus de la barre, légère inclinaison arrière"},{"lbl":"Descente — 3 secondes","txt":"Contrôler la descente jusqu'à extension complète — stretch maximal des lats"}]},

  {id:16,
   key:"curl-ez",
   name:"Curl Barre EZ",
   cat:"vshape",
   mg:"Biceps (volume bilatéral)",
   diff:2,
   eff:3,
   icon:"🏗️",
   svgKey:"curl",
   equip:"Barre EZ",
   yt:"curl barre EZ technique biceps volume bilatéral",
   muscles:{"p":["biceps"],"s":["forearms"]},
   steps:["Debout, prise semi-supinée sur la barre EZ (positions intérieures ou extérieures)","Barre contre les cuisses en position départ, coudes collés aux flancs","Fléchis les deux bras jusqu'à hauteur des épaules — les coudes ne bougent pas","Pause 1 s en haut — contraction maximale","Descente lente en 3 s — résiste à la gravité jusqu'à extension complète"],
   breath:"⬆ Expire en fléchissant → ⬇ Inspire en descendant (3 s)",
   amp:"Extension complète en bas — barre au niveau du menton en haut",
   posture:["Coudes fixes aux flancs","Tronc stable (légère inclinaison OK)","Poignets dans l'axe de la barre EZ"],
   errors:[{"b":"Se pencher en arrière pour aider","g":"Tronc fixe — si tu te penches, c'est trop lourd"},{"b":"Amplitude réduite","g":"Extension complète = recrutement complet"},{"b":"Descente trop rapide","g":"Descente contrôlée en 3 s jusqu'à l'extension complète"}],
   injury:["La barre EZ est plus confortable que la barre droite pour les poignets","Coudes sensibles : vérifier la prise (largeur et angle)"],
   schema:[{"lbl":"Position départ","txt":"Debout, prise semi-supinée, barre contre les cuisses, coudes aux flancs"},{"lbl":"Flexion — 2 secondes","txt":"Fléchir les deux bras jusqu'au menton, coudes fixes — pause 1 s en haut"},{"lbl":"Descente — 3 secondes","txt":"Résister jusqu'à l'extension complète, sans balancer le buste"}]},

  {id:17,
   key:"curl-concentre",
   name:"Curl Concentré Haltère",
   cat:"vshape",
   mg:"Biceps (pic/contraction)",
   diff:2,
   eff:3,
   icon:"🎯",
   svgKey:"curl",
   equip:"Haltère + banc",
   yt:"curl concentré haltère technique pic biceps concentration curl",
   muscles:{"p":["biceps"],"s":[]},
   steps:["Assis sur un banc, pied à plat, buste penché en avant","Coude contre l'intérieur de la cuisse — fixe tout le mouvement","Bras tendu, haltère en bas","Fléchis lentement jusqu'à contraction maximale","Pause 2 s en haut — supination complète, petit pincement supplémentaire","Descente lente 3 s — étirement complet"],
   breath:"⬆ Expire en fléchissant → ⬇ Inspire en descendant (3 s)",
   amp:"Extension complète en bas — haltère quasi-contre l'épaule en haut",
   posture:["Coude FIXE contre la cuisse — ne bouge pas","Tronc stable, ne pas se lever pour aider","Supination maximale en haut","Dos plat : penche-toi depuis les hanches, coude calé contre l'intérieur de la cuisse, sans arrondir le bas du dos"],
   errors:[{"b":"Coude qui se déplace (monte)","g":"Coude FIXE = isolation pure du biceps"},{"b":"Pas de pause en haut","g":"2 s de contraction = connexion musculaire optimale"}],
   injury:["Isolation pure — charge légère à modérée","Technique parfaite prioritaire — la forme prime toujours"]},

  {id:18,
   key:"ext-overhead",
   name:"Extension Triceps Overhead Câble",
   cat:"vshape",
   mg:"Triceps (chef long — étirement)",
   diff:3,
   eff:4,
   icon:"☝️",
   svgKey:"overhead_ext",
   equip:"Machine à câbles poulie basse + corde",
   yt:"extension triceps overhead câble technique chef long overhead cable",
   muscles:{"p":["triceps"],"s":[]},
   steps:["Poulie basse, corde, tourne le dos à la machine","Un pied en avant pour la stabilité, maintiens la corde derrière la tête","Coudes pointant vers le plafond — FIXES pendant tout le mouvement","Étends les bras vers le haut en dépliant les coudes","Extension complète — pause 1 s, contraction chef long","Descends lentement en 3 s — étirement maximum du chef long","Résiste à l'envie de laisser les coudes s'écarter"],
   breath:"⬆ Expire en étendant → ⬇ Inspire en descendant lentement (3 s)",
   amp:"Coudes fléchis max derrière la tête — bras complètement tendus en haut",
   posture:["Côtes basses : bras en l'air = tendance à cambrer et à ouvrir les côtes","Coudes pointant vers le plafond — fixes","Tronc légèrement incliné en avant","Abdos engagés pour stabiliser","Poignets neutres"],
   errors:[{"b":"Coudes qui s'écartent et descendent","g":"Coudes hauts et fixes = chef long ciblé"},{"b":"Balancer le tronc","g":"Mouvement isolé aux avant-bras uniquement"},{"b":"Amplitude réduite","g":"Extension COMPLÈTE — le chef long a besoin de la pleine amplitude"}],
   injury:["Bras au-dessus de la tête, le chef long (le plus volumineux des trois chefs) travaille en position étirée, ce qui favorise sa croissance (Maeo 2023)","Douleur de coude : réduire l'amplitude de retour"],
   schema:[{"lbl":"Position départ","txt":"Dos à la machine (poulie basse), corde derrière la tête, coudes pointant vers le plafond"},{"lbl":"Extension — 2 secondes","txt":"Étendre les avant-bras vers le haut, coudes FIXES, amplitude maximale"},{"lbl":"Descente — 3 secondes","txt":"Pause 1 s bras tendus, descente lente derrière la tête — étirement du chef long"}]},

  {id:22,
   key:"planche",
   name:"Planche Abdominale",
   cat:"core",
   mg:"Abdominaux + Stabilisateurs",
   diff:2,
   eff:4,
   icon:"⬛",
   svgKey:"plank",
   equip:"Sol / tapis",
   yt:"planche abdominale technique parfaite gainage statique débutant",
   muscles:{"p":["abs","obliques"],"s":["lower-back","glutes","quads"]},
   steps:["Avant-bras au sol, coudes sous les épaules, paumes à plat","Monte sur la pointe des pieds, corps en ligne DROITE de la tête aux talons","Gaine toute la sangle abdominale, comme pour encaisser un petit coup, sans creuser le ventre","Serre les fessiers — aide à maintenir la ligne droite","Regarde le sol, 30-40 cm devant toi — tête dans l'axe","Respire normalement, ne bloque pas la respiration","Maintiens — si la hanche monte ou descend : ARRÊTE"],
   breath:"Respire normalement tout au long — pas de blocage respiratoire pendant la planche",
   amp:"Position statique — fessiers à hauteur du corps (ni trop hauts ni trop bas)",
   posture:["Côtes basses : expire à fond en début de série et garde cette position (rib flare)","Corps en ligne droite de la tête aux talons","Abdos gainés, sans creuser le ventre","Fessiers contractés","Coudes sous les épaules (pas devant)"],
   errors:[{"b":"Fessiers trop hauts (position A)","g":"Corps en ligne droite — fessiers alignés avec les épaules"},{"b":"Hanches qui s'affaissent","g":"Abdos ET fessiers contractés pour maintenir la ligne"},{"b":"Tenir trop longtemps avec mauvaise forme","g":"30 s parfaits > 90 s effondrés"},{"b":"Bloquer la respiration","g":"Respiration normale — le core peut travailler en respirant"}],
   injury:["Très sûr si la forme est correcte","Lombaires : si douleur, vérifier l'alignement et réduire la durée","Progression : 30 s → 45 s → 60 s, puis rendre plus difficile (coudes plus loin devant, planche RKC 10-20 s) plutôt que tenir plus longtemps"]},

  {id:23,
   key:"dead-bug",
   name:"Dead Bug",
   cat:"core",
   mg:"Transverse + Stabilisation spinale",
   diff:3,
   eff:5,
   icon:"🐛",
   svgKey:"dead_bug",
   equip:"Sol / tapis",
   yt:"dead bug exercice core technique abdominaux stabilisation colonne vertébrale",
   muscles:{"p":["abs","obliques"],"s":["lower-back"]},
   steps:["Allonge-toi sur le dos, bras tendus vers le plafond, hanches et genoux à 90°","APPLIQUE ton bas du dos au sol — maintiens ce contact TOUT le mouvement","Inspire profondément en position de départ","En expirant : tends le bras DROIT vers l'arrière et la jambe GAUCHE vers l'avant","Les deux membres vont jusqu'à quasi-horizontaux — sans que le bas du dos se décolle","Reviens à la position de départ en inspirant","Répète côté opposé : bras gauche + jambe droite"],
   breath:"⬇ Inspire en position départ → ⬆ Expire en étendant les membres opposés",
   amp:"Membres quasi-horizontaux sans décollement du bas du dos",
   posture:["Expire à fond à chaque extension : les côtes basses descendent vers le bassin","Bas du dos COLLÉ au sol en permanence — règle absolue","Mouvement lent et contrôlé","Membres CONTROLATÉRAUX (bras droit + jambe gauche)","Tête posée sur le sol, pas soulevée"],
   errors:[{"b":"Bas du dos qui se décolle","g":"Réduire l'amplitude — le bas du dos DOIT rester au sol"},{"b":"Mouvement trop rapide","g":"Lent et contrôlé — c'est l'anti-mouvement qui compte"},{"b":"Même côté bras et jambe","g":"Côtés OPPOSÉS — bras droit + jambe gauche"}],
   injury:["Exercice de gainage peu exigeant pour le dos, souvent utilisé en rééducation lombaire","Travaille le gainage du tronc ; cibler le transverse n'est pas supérieur à un renforcement général (Saragiotto 2016)"]},

  {id:24,
   key:"pallof-press",
   name:"Pallof Press Câble",
   cat:"core",
   mg:"Anti-rotation core + Obliques",
   diff:3,
   eff:4,
   icon:"↔️",
   svgKey:"pallof",
   equip:"Machine à câbles — poulie au niveau du nombril",
   yt:"pallof press câble technique anti rotation core obliques stabilisation",
   muscles:{"p":["abs","obliques"],"s":["lower-back"]},
   steps:["Poulie à hauteur du nombril, poignée, tiens-toi debout côté à la machine","Saisis la poignée à deux mains contre ta poitrine, recule jusqu'à avoir une tension","Pieds largeur épaules, genoux légèrement fléchis — position athlétique","POUSSE lentement la poignée droit devant toi à bout de bras","Résiste à la rotation : ton corps veut tourner, ton core résiste","Pause 1 s bras tendus — core MAXIMAL, hanches carrées","Ramène lentement la poignée vers la poitrine","Fais les 2 côtés"],
   breath:"⬆ Expire en poussant → ⬇ Inspire en ramenant",
   amp:"Poignée contre la poitrine → bras complètement tendus devant",
   posture:["Corps perpendiculaire à la machine","Hanches carrées — ne pas les tourner","Genoux légèrement fléchis","Épaules basses et stables"],
   errors:[{"b":"Tourner les hanches vers la machine","g":"Hanches carrées — c'est l'anti-rotation qui compte"},{"b":"Trop lourd = compensation dos","g":"Léger et strict — la résistance à la rotation est clé"},{"b":"Bras trop hauts ou trop bas","g":"Poignée au niveau du nombril, bras horizontaux"}],
   injury:["Exercice roi pour la stabilisation du tronc","Renforce le tronc sans flexion — bien toléré avec des lombaires sensibles"],
   place:"Substitution de la planche latérale (anti-rotation)"},

  {id:25,
   key:"vacuum",
   name:"Vacuum Abdominal",
   cat:"core",
   mg:"Transverse abdominal (corset profond)",
   diff:3,
   eff:4,
   icon:"🌀",
   svgKey:"vacuum",
   equip:"Aucun",
   yt:"vacuum abdominal technique transverse gainage profond ventre plat",
   muscles:{"p":["abs"],"s":[]},
   steps:["Debout ou à quatre pattes (plus facile), expire TOUT l'air de tes poumons","Sans inspirer, rentre le ventre au MAXIMUM vers la colonne","Imagine toucher ta colonne vertébrale avec ton nombril","Maintiens la contraction en respirant légèrement par le nez : 10 à 20 s au début, jusqu'à 30-45 s avec l'habitude","Relâche doucement et inspire normalement","Respire calmement 15-20 s avant la répétition suivante","Progression : 3 × 10 s → 3 × 20 s → 3 × 30 s → 3 × 45 s"],
   breath:"Expire tout → Rentre le ventre (sans air) → Respirations légères de maintien par le nez",
   amp:"Rentrer le ventre au maximum vers la colonne — position statique tenue",
   posture:["Dos neutre — pas d'hyperlordose","Position à 4 pattes idéale pour débutants","Débutant : pratiquer assis avant debout"],
   errors:[{"b":"Bloquer la respiration complètement","g":"Légères respirations de maintien possibles"},{"b":"Contracter les abdos superficiels","g":"Rentrer le ventre profondément — transverse, pas rectus"},{"b":"Voûter le dos","g":"Dos neutre — vacuum indépendant de la posture du dos"}],
   injury:["Tonifie le transverse → taille visuellement plus resserrée (la perte de gras, elle, vient du déficit calorique)","Le transverse participe au gainage du tronc, comme les autres muscles de la sangle abdominale"],
   place:"Quotidien, à la maison"},

  {id:26,
   key:"crunch-cable",
   name:"Crunchs Câble",
   cat:"core",
   mg:"Abdominaux (rectus abdominis)",
   diff:2,
   eff:3,
   icon:"⚡",
   svgKey:"crunch",
   equip:"Machine à câbles poulie haute + corde",
   yt:"crunchs câble technique abdominaux kneeling cable crunch",
   muscles:{"p":["abs"],"s":["obliques"]},
   steps:["Poulie haute, corde, agenouille-toi face à la machine","Saisis la corde de chaque côté, amène-la derrière la nuque","Position de départ : tronc légèrement incliné en arrière","Enroule le HAUT du dos vers le bas en contractant les ABDOMINAUX","IMPORTANT : le mouvement vient de la flexion THORACIQUE (haut du dos), pas du tirage des bras","Fin : coudes vers les genoux — le bas du dos reste NEUTRE, seul le haut s'enroule","Pause 1 s — sens tes abdos au maximum","Reviens lentement en 3 s"],
   breath:"⬇ Expire fort en fléchissant → ⬆ Inspire en revenant",
   amp:"Tronc droit en départ — enroulement thoracique, lombaires neutres du début à la fin",
   posture:["Mouvement de FLEXION du haut du tronc — pas de tirage des bras","Hanches fixes pendant le mouvement","Coudes à hauteur du visage au départ","Bas du dos neutre — il ne s'arrondit JAMAIS sous la charge"],
   errors:[{"b":"Tirer avec les bras","g":"Abdos qui contractent le tronc — bras passifs"},{"b":"Arrondir le bas du dos sous charge","g":"Enroulement thoracique seulement — les lombaires restent neutres"},{"b":"Trop lourd = compensation","g":"Poids modéré où la sensation abdominale est maximale"}],
   injury:["Le câble permet de doser la charge, contrairement au crunch au sol","Cervicales : la corde est tenue par les mains, pas tirée avec le cou","Hors programme : flexion du tronc sous charge, à éviter si ton bas du dos est fragile"],
   place:"Hors programme — flexion du tronc sous charge"},

  {id:28,
   key:"respiration-9090",
   name:"Respiration 90/90 (Côtes Basses)",
   cat:"core",
   mg:"Diaphragme + Transverse (position des côtes et du bassin)",
   diff:1,
   eff:4,
   icon:"🫁",
   svgKey:"respiration",
   equip:"Sol + un mur",
   yt:"90 90 breathing rib flare respiration diaphragmatique pieds au mur",
   muscles:{"p":["abs"],"s":["obliques"]},
   steps:["Allonge-toi sur le dos, pieds à plat contre un mur, hanches et genoux pliés à 90°","Pousse légèrement les talons dans le mur : le bas du dos se pose au sol, sans forcer","Mains sur les côtes basses pour sentir leur mouvement","Inspire par le nez 4 s : le ventre et les CÔTÉS des côtes se gonflent, pas les épaules","Expire longuement par la bouche (6-8 s) jusqu'au bout de l'air : sens les côtes basses descendre et se refermer","Garde les côtes « rangées » pendant l'inspiration suivante — c'est tout l'exercice","5 respirations, puis relève-toi doucement"],
   breath:"Inspire 4 s (nez) → Expire 6-8 s (bouche, jusqu'au bout) → petite pause",
   amp:"Pas de mouvement visible : c'est la position des côtes et du bassin qui change",
   posture:["Pieds au mur, hanches et genoux à 90°","Bas du dos posé, sans écraser","Épaules et nuque relâchées","Côtes basses qui « rentrent » à l'expiration"],
   errors:[{"b":"Respirer avec les épaules","g":"Ventre et côtés des côtes — épaules immobiles"},{"b":"Expirer à moitié","g":"Expirer jusqu'au bout : c'est la fin de l'expiration qui ramène les côtes"},{"b":"Creuser le dos","g":"Bas du dos posé grâce aux talons dans le mur"}],
   injury:["Risque très faible : arrête si une douleur apparaît","Utile si tes côtes basses ressortent (rib flare)","À faire en échauffement des 3 séances + 1 série le soir"]},

  {id:20,
   key:"bird-dog",
   name:"Bird Dog",
   cat:"core",
   mg:"Stabilisation spinale + Fessiers",
   diff:2,
   eff:4,
   icon:"🐦",
   svgKey:"bird_dog",
   equip:"Sol / tapis",
   yt:"bird dog exercice gainage lombaire stabilisation dos technique débutant",
   muscles:{"p":["lower-back","abs"],"s":["glutes","obliques","rear-delt"]},
   steps:["À quatre pattes : mains sous les épaules, genoux sous les hanches","Dos neutre — ni creusé ni arrondi, regard vers le sol","Gaine le ventre AVANT de bouger (rentre légèrement le nombril)","Tends SIMULTANÉMENT le bras droit devant et la jambe GAUCHE derrière","Bras, dos et jambe forment une ligne droite — sans cambrer le bas du dos","Maintiens 1-2 s en gardant le bassin parfaitement stable (ne pas basculer)","Reviens lentement et alterne : bras gauche + jambe droite"],
   breath:"⬆ Expire en tendant bras et jambe → ⬇ Inspire en revenant",
   amp:"Membres opposés tendus à l'horizontale, bassin stable et dos neutre",
   posture:["Membres CONTROLATÉRAUX (bras droit + jambe gauche)","Bassin parfaitement stable — pas de bascule latérale","Dos neutre, pas de cambrure lombaire","Nuque dans l'axe du dos (ne pas relever la tête)"],
   errors:[{"b":"Le bassin qui tourne / bascule","g":"Imagine un verre d'eau posé sur le bas du dos — il ne doit pas tomber"},{"b":"Cambrer le bas du dos en tendant la jambe","g":"Monter la jambe seulement à hauteur du bassin, gainage actif"},{"b":"Mouvement rapide","g":"Lent et contrôlé — c'est la stabilité qui compte, pas l'amplitude"}],
   injury:["Exercice prescrit en rééducation lombaire — renforce les muscles profonds qui protègent la colonne","Améliore la coordination controlatérale et la stabilité du tronc"]},

  {id:21,
   key:"hollow-body",
   name:"Hollow Body Hold",
   cat:"core",
   mg:"Abdominaux profonds + Gainage",
   diff:3,
   eff:4,
   icon:"🍌",
   svgKey:"hollow_body",
   equip:"Sol / tapis",
   yt:"hollow body hold gainage abdominaux gymnastique technique débutant",
   muscles:{"p":["abs"],"s":["obliques","quads"]},
   steps:["Allongé sur le dos, bras tendus au-dessus de la tête, jambes tendues","COLLE le bas du dos au sol en rentrant le nombril — c'est la clé de l'exercice","Décolle simultanément les épaules et les jambes du sol","Le corps forme une « banane » légère : seul le bas du dos reste en contact","Plus les jambes sont basses, plus c'est dur — monte-les pour faciliter au début","Maintiens la position en respirant — le bas du dos ne doit JAMAIS se décoller","Si le bas du dos se décolle : remonte les bras/jambes ou plie les genoux"],
   breath:"Respiration courte et continue — ne jamais bloquer ; le gainage reste constant",
   amp:"Position statique en légère flexion (« banane »), bas du dos plaqué au sol",
   posture:["Côtes basses : c'est la clé — si les côtes remontent, remonte les jambes","Bas du dos COLLÉ au sol — règle absolue","Épaules et jambes décollées simultanément","Menton légèrement rentré, nuque relâchée","Régression : genoux pliés et/ou bras le long du corps"],
   errors:[{"b":"Le bas du dos qui se creuse / décolle","g":"Réduis l'amplitude (jambes plus hautes, genoux pliés) jusqu'à garder le dos au sol"},{"b":"Bloquer la respiration","g":"Respiration continue — le transverse travaille en respirant"},{"b":"Tirer sur la nuque","g":"Nuque relâchée, le travail vient des abdominaux profonds"}],
   injury:["Retiré du programme : c'est une flexion lombaire maintenue avec un grand bras de levier. La planche latérale le remplace","Progression : genoux pliés → une jambe tendue → deux jambes tendues → bras tendus"],
   place:"Hors programme — remplacé par la planche latérale"},

  {id:29,
   key:"planche-laterale",
   name:"Planche Latérale",
   cat:"core",
   mg:"Obliques + Stabilité latérale du tronc",
   diff:2,
   eff:4,
   icon:"📐",
   svgKey:"plank",
   equip:"Sol / tapis",
   yt:"planche latérale side plank technique gainage obliques débutant",
   muscles:{"p":["obliques"],"s":["abs","glutes","lower-back"]},
   steps:["Allonge-toi sur le côté, coude sous l'épaule, avant-bras au sol perpendiculaire au corps","Pour débuter : genoux pliés au sol. Ensuite : jambes tendues, pieds l'un sur l'autre ou l'un devant l'autre","Soulève le bassin jusqu'à former une ligne droite de la tête aux genoux (ou aux pieds)","Pousse le bassin vers l'avant : ni fesses en arrière, ni bassin qui tombe vers le sol","Main libre sur la hanche ; épaule d'appui basse, loin de l'oreille","Respire calmement pendant tout le maintien","Tiens le temps prévu, repose-toi quelques secondes, puis change de côté"],
   breath:"Respiration calme et continue — ne bloque pas",
   amp:"Position statique : tête, bassin et genoux (ou pieds) alignés",
   posture:["Coude à l'aplomb de l'épaule","Corps en ligne droite, vu de face comme de dessus","Hanches empilées l'une au-dessus de l'autre","Nuque dans l'axe, regard devant"],
   errors:[{"b":"Bassin qui descend vers le sol","g":"Arrête la série dès que la ligne se casse — mieux vaut des maintiens plus courts"},{"b":"Fesses en arrière, buste qui pivote vers le sol","g":"Hanches et épaules empilées, bassin poussé vers l'avant"},{"b":"Épaule tassée contre l'oreille","g":"Repousse le sol avec l'avant-bras, épaule basse"}],
   injury:["Colonne en position neutre pendant tout le maintien : ni flexion ni rotation du tronc","Exercice de stabilisation du tronc décrit par McGill & Karpowicz (2009, DOI 10.1016/j.apmr.2008.06.026), comme le bird dog","Progression : genoux au sol → jambes tendues → maintiens plus longs","Douleur à l'épaule d'appui : version genoux au sol, ou Pallof press à la place"]}
];
const BY_KEY = {}; FICHES.forEach(function (f) { BY_KEY[f.key] = f; });

// ─── SVG MOVEMENT ANIMATIONS ──────────────────────────────────────────────────
const BG='#0b1020', ST='#e8e3d9', GO='#e8960a', DUR='2s';
function stick(extra=''){
  return `<circle cx="80" cy="16" r="8" fill="${GO}"/>
<line x1="80" y1="24" x2="80" y2="55" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="80" y1="55" x2="68" y2="82" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="80" y1="55" x2="92" y2="82" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
${extra}`;
}
function svgWrap(content, label='mouvement'){
  return `<svg viewBox="0 0 160 100" width="200" height="125" xmlns="http://www.w3.org/2000/svg">
<rect width="160" height="100" fill="${BG}" rx="8"/>
${content}
<text x="80" y="96" text-anchor="middle" font-family="Inter,sans-serif" font-size="7" fill="rgba(232,150,10,0.6)" font-weight="700" letter-spacing="1.5">${label.toUpperCase()}</text>
</svg>`;
}

const SVG_ANIM = {
  lateral_raise: ()=>svgWrap(stick(`
<g style="transform-origin:65px 32px;animation:arm-lat-l ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="52" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:arm-lat-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="108" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'élévations latérales'),

  overhead_press: ()=>svgWrap(stick(`
<g style="transform-origin:65px 32px;animation:arm-oh ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="52" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:arm-oh-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="108" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'développé épaules'),

  pushdown: ()=>svgWrap(stick(`
<line x1="65" y1="32" x2="52" y2="42" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="95" y1="32" x2="108" y2="42" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:52px 42px;animation:arm-pd-l ${DUR} ease-in-out infinite">
  <line x1="52" y1="42" x2="40" y2="58" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:108px 42px;animation:arm-pd-r ${DUR} ease-in-out infinite">
  <line x1="108" y1="42" x2="120" y2="58" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'poussée vers le bas'),

  pulldown: ()=>svgWrap(stick(`
<g style="transform-origin:65px 32px;animation:arm-pull-l ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="52" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:arm-pull-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="108" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<line x1="30" y1="8" x2="130" y2="8" stroke="rgba(232,150,10,0.3)" stroke-width="2"/>
<line x1="80" y1="8" x2="80" y2="18" stroke="rgba(232,150,10,0.3)" stroke-width="1.5"/>`),'tirage vertical'),

  row: ()=>svgWrap(`
<circle cx="80" cy="22" r="8" fill="${GO}"/>
<line x1="80" y1="30" x2="80" y2="58" stroke="${ST}" stroke-width="2.5" stroke-linecap="round" transform="rotate(45,80,30)"/>
<line x1="80" y1="30" x2="68" y2="72" stroke="${ST}" stroke-width="2" stroke-linecap="round" transform="rotate(45,80,30)"/>
<line x1="80" y1="30" x2="92" y2="72" stroke="${ST}" stroke-width="2" stroke-linecap="round" transform="rotate(45,80,30)"/>
<line x1="65" y1="38" x2="52" y2="55" stroke="${ST}" stroke-width="2.5" stroke-linecap="round" transform="rotate(45,80,30)"/>
<g style="transform-origin:95px 38px;animation:arm-row-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="38" x2="115" y2="50" stroke="${GO}" stroke-width="3" stroke-linecap="round" transform="rotate(45,80,30)"/>
</g>`,'rowing'),

  curl: ()=>svgWrap(stick(`
<line x1="65" y1="32" x2="52" y2="42" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="95" y1="32" x2="108" y2="42" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:52px 42px;animation:arm-curl-l ${DUR} ease-in-out infinite">
  <line x1="52" y1="42" x2="40" y2="62" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:108px 42px;animation:arm-curl-r ${DUR} ease-in-out infinite">
  <line x1="108" y1="42" x2="120" y2="62" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'curl biceps'),

  cable_fly: ()=>svgWrap(stick(`
<g style="transform-origin:65px 32px;animation:arm-fly-l ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="45" y2="42" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:arm-fly-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="115" y2="42" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'écarté câble'),

  face_pull: ()=>svgWrap(stick(`
<g style="transform-origin:65px 32px;animation:arm-fp-l ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="45" y2="22" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:arm-fp-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="115" y2="22" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<line x1="20" y1="20" x2="35" y2="20" stroke="rgba(232,150,10,0.3)" stroke-width="1.5"/>
<line x1="125" y1="20" x2="140" y2="20" stroke="rgba(232,150,10,0.3)" stroke-width="1.5"/>`),'face pull'),

  press_incline: ()=>svgWrap(`
<circle cx="50" cy="48" r="8" fill="${GO}"/>
<line x1="57" y1="52" x2="100" y2="72" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="100" y1="72" x2="112" y2="88" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<rect x="30" y="68" width="90" height="6" rx="3" fill="rgba(232,150,10,0.2)"/>
<g style="transform-origin:70px 55px;animation:arm-inc-l ${DUR} ease-in-out infinite">
  <line x1="70" y1="55" x2="55" y2="42" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:82px 60px;animation:arm-inc-r ${DUR} ease-in-out infinite">
  <line x1="82" y1="60" x2="97" y2="47" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`,'développé incliné'),

  pullup: ()=>svgWrap(`
<line x1="30" y1="12" x2="130" y2="12" stroke="rgba(232,150,10,0.35)" stroke-width="3" stroke-linecap="round"/>
<g style="animation:arm-dip ${DUR} ease-in-out infinite">
  <line x1="80" y1="12" x2="65" y2="25" stroke="${GO}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="80" y1="12" x2="95" y2="25" stroke="${GO}" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="80" cy="34" r="8" fill="${GO}"/>
  <line x1="80" y1="42" x2="80" y2="70" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="80" y1="60" x2="70" y2="82" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="60" x2="90" y2="82" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
</g>`,'tractions'),

  leg_press: ()=>svgWrap(`
<rect x="15" y="30" width="55" height="50" rx="4" fill="rgba(232,150,10,0.12)" stroke="rgba(232,150,10,0.3)" stroke-width="1.5"/>
<circle cx="40" cy="42" r="8" fill="${GO}"/>
<line x1="40" y1="50" x2="40" y2="65" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:40px 65px;animation:leg-press ${DUR} ease-in-out infinite">
  <line x1="40" y1="65" x2="60" y2="80" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
  <line x1="60" y1="80" x2="80" y2="72" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<rect x="100" y="50" width="45" height="30" rx="4" fill="rgba(232,150,10,0.1)" stroke="rgba(232,150,10,0.2)" stroke-width="1.5"/>`,'leg press'),

  leg_curl: ()=>svgWrap(`
<circle cx="50" cy="28" r="8" fill="${GO}"/>
<line x1="56" y1="32" x2="110" y2="45" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="90" y1="45" x2="110" y2="45" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:90px 45px;animation:leg-curl ${DUR} ease-in-out infinite">
  <line x1="90" y1="45" x2="110" y2="60" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<rect x="30" y="50" width="90" height="8" rx="4" fill="rgba(232,150,10,0.15)"/>`,'leg curl'),

  plank: ()=>svgWrap(`
<g style="animation:plank-pulse 2s ease-in-out infinite">
<circle cx="38" cy="50" r="8" fill="${GO}"/>
<line x1="44" y1="54" x2="110" y2="54" stroke="${ST}" stroke-width="3" stroke-linecap="round"/>
<line x1="52" y1="54" x2="52" y2="70" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="62" y1="54" x2="62" y2="70" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="100" y1="54" x2="95" y2="70" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="110" y1="54" x2="115" y2="70" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="30" y1="50" x2="50" y2="66" stroke="${GO}" stroke-width="2.5" stroke-linecap="round"/>
</g>
<text x="80" y="84" text-anchor="middle" font-family="Inter,sans-serif" font-size="8" fill="rgba(232,150,10,0.5)">MAINTIEN</text>`,'gainage statique'),

  dead_bug: ()=>svgWrap(`
<circle cx="80" cy="28" r="8" fill="${GO}"/>
<line x1="80" y1="36" x2="80" y2="62" stroke="${ST}" stroke-width="2.5" stroke-linecap="round" transform="rotate(180,80,50)"/>
<g style="transform-origin:80px 42px;animation:bug-arm ${DUR} ease-in-out infinite">
  <line x1="80" y1="42" x2="58" y2="30" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<line x1="80" y1="42" x2="102" y2="30" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:80px 58px;animation:bug-leg ${DUR} ease-in-out infinite">
  <line x1="80" y1="58" x2="100" y2="78" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<line x1="80" y1="58" x2="62" y2="78" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>`,'dead bug'),

  pullover: ()=>svgWrap(`
<circle cx="80" cy="40" r="8" fill="${GO}"/>
<line x1="80" y1="48" x2="80" y2="72" stroke="${ST}" stroke-width="2.5" stroke-linecap="round" transform="rotate(90,80,60)"/>
<g style="transform-origin:80px 35px;animation:arm-po ${DUR} ease-in-out infinite">
  <line x1="80" y1="35" x2="60" y2="22" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
  <line x1="80" y1="35" x2="100" y2="22" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<rect x="30" y="55" width="100" height="8" rx="4" fill="rgba(232,150,10,0.15)"/>`,'pull-over'),

  crunch: ()=>svgWrap(`
<line x1="80" y1="10" x2="80" y2="30" stroke="rgba(232,150,10,0.3)" stroke-width="2"/>
<line x1="60" y1="10" x2="100" y2="10" stroke="rgba(232,150,10,0.2)" stroke-width="1.5"/>
<g style="transform-origin:80px 48px;animation:crunch-trunk ${DUR} ease-in-out infinite">
  <circle cx="80" cy="36" r="8" fill="${GO}"/>
  <line x1="80" y1="44" x2="80" y2="68" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="80" y1="50" x2="65" y2="60" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="80" y1="50" x2="95" y2="60" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="80" y1="68" x2="70" y2="88" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="68" x2="90" y2="88" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
</g>`,'crunch câble'),

  overhead_ext: ()=>svgWrap(stick(`
<line x1="65" y1="32" x2="65" y2="18" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="95" y1="32" x2="95" y2="18" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:65px 18px;animation:arm-ext-oh ${DUR} ease-in-out infinite">
  <line x1="65" y1="18" x2="65" y2="6" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 18px;animation:arm-ext-oh ${DUR} ease-in-out infinite">
  <line x1="95" y1="18" x2="95" y2="6" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'extension overhead'),

  rear_fly: ()=>svgWrap(`
<circle cx="80" cy="30" r="8" fill="${GO}"/>
<line x1="80" y1="38" x2="80" y2="62" stroke="${ST}" stroke-width="2.5" stroke-linecap="round" transform="rotate(40,80,38)"/>
<line x1="80" y1="62" x2="68" y2="80" stroke="${ST}" stroke-width="2" stroke-linecap="round" transform="rotate(40,80,38)"/>
<line x1="80" y1="62" x2="92" y2="80" stroke="${ST}" stroke-width="2" stroke-linecap="round" transform="rotate(40,80,38)"/>
<g style="transform-origin:70px 48px;animation:arm-lat-l ${DUR} ease-in-out infinite">
  <line x1="70" y1="48" x2="50" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:90px 48px;animation:arm-lat-r ${DUR} ease-in-out infinite">
  <line x1="90" y1="48" x2="110" y2="52" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`,'oiseau / rear delt'),

  pallof: ()=>svgWrap(stick(`
<line x1="140" y1="32" x2="148" y2="32" stroke="rgba(232,150,10,0.3)" stroke-width="2"/>
<g style="transform-origin:65px 36px;animation:pallof-arms ${DUR} ease-in-out infinite">
  <line x1="65" y1="36" x2="95" y2="36" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'pallof press'),

  vacuum: ()=>svgWrap(`
<circle cx="80" cy="20" r="8" fill="${GO}"/>
<line x1="80" y1="28" x2="80" y2="55" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="80" y1="55" x2="68" y2="80" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="80" y1="55" x2="92" y2="80" stroke="${ST}" stroke-width="2" stroke-linecap="round"/>
<line x1="65" y1="32" x2="52" y2="45" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="95" y1="32" x2="108" y2="45" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="80" cy="44" rx="14" ry="8" fill="none" stroke="${GO}" stroke-width="2" stroke-dasharray="3,2">
  <animate attributeName="rx" values="14;8;14" dur="${DUR}" repeatCount="indefinite"/>
  <animate attributeName="ry" values="8;4;8" dur="${DUR}" repeatCount="indefinite"/>
</ellipse>`,'vacuum abdominal'),

  respiration: ()=>svgWrap(`
<line x1="132" y1="20" x2="132" y2="78" stroke="rgba(232,150,10,0.3)" stroke-width="3" stroke-linecap="round"/>
<line x1="14" y1="78" x2="136" y2="78" stroke="rgba(232,150,10,0.2)" stroke-width="1.5"/>
<circle cx="30" cy="68" r="8" fill="${GO}"/>
<line x1="38" y1="72" x2="84" y2="72" stroke="${ST}" stroke-width="3" stroke-linecap="round"/>
<line x1="84" y1="72" x2="106" y2="48" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="106" y1="48" x2="130" y2="48" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="60" cy="66" rx="14" ry="6" fill="none" stroke="${GO}" stroke-width="2" stroke-dasharray="3,2">
  <animate attributeName="ry" values="6;10;6" dur="5s" repeatCount="indefinite"/>
  <animate attributeName="cy" values="66;63;66" dur="5s" repeatCount="indefinite"/>
</ellipse>`,'respiration 90/90'),

  band_pull_apart: ()=>svgWrap(stick(`
<line x1="18" y1="30" x2="142" y2="30" stroke="rgba(232,150,10,0.25)" stroke-width="2" stroke-dasharray="4,3"/>
<g style="transform-origin:65px 32px;animation:band-l ${DUR} ease-in-out infinite">
  <line x1="65" y1="32" x2="78" y2="30" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:95px 32px;animation:band-r ${DUR} ease-in-out infinite">
  <line x1="95" y1="32" x2="82" y2="30" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>`),'band pull-apart'),

  bird_dog: ()=>svgWrap(`
<circle cx="38" cy="42" r="7" fill="${GO}"/>
<line x1="44" y1="44" x2="108" y2="50" stroke="${ST}" stroke-width="3" stroke-linecap="round"/>
<line x1="62" y1="46" x2="64" y2="74" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<line x1="98" y1="49" x2="100" y2="74" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
<g style="transform-origin:50px 45px;animation:bug-arm ${DUR} ease-in-out infinite">
  <line x1="50" y1="45" x2="22" y2="36" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<g style="transform-origin:108px 50px;animation:bug-leg ${DUR} ease-in-out infinite">
  <line x1="108" y1="50" x2="136" y2="42" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
</g>
<line x1="14" y1="76" x2="146" y2="76" stroke="rgba(232,150,10,0.2)" stroke-width="1.5"/>`,'bird dog'),

  hollow_body: ()=>svgWrap(`
<g style="animation:plank-pulse 2s ease-in-out infinite">
  <path d="M28 58 Q80 36 132 58" fill="none" stroke="${GO}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="28" cy="58" r="6" fill="${GO}"/>
  <line x1="28" y1="58" x2="12" y2="48" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="132" y1="58" x2="148" y2="46" stroke="${ST}" stroke-width="2.5" stroke-linecap="round"/>
</g>
<line x1="10" y1="74" x2="150" y2="74" stroke="rgba(232,150,10,0.2)" stroke-width="1.5"/>
<text x="80" y="86" text-anchor="middle" font-family="Inter,sans-serif" font-size="8" fill="rgba(232,150,10,0.5)">MAINTIEN</text>`,'hollow body'),
};

// ─── SVG MUSCLE MAP ───────────────────────────────────────────────────────────
const MN = {chest:"Pectoraux","front-delt":"Delts antérieurs","side-delt":"Delts latéraux","rear-delt":"Delts postérieurs",biceps:"Biceps",triceps:"Triceps",forearms:"Avant-bras",abs:"Abdominaux",obliques:"Obliques",traps:"Trapèzes",lats:"Grand dorsal",rhomboids:"Rhomboïdes","lower-back":"Lombaires",glutes:"Fessiers",hamstrings:"Ischio-jambiers",quads:"Quadriceps",calves:"Mollets"};

function svgMap(muscles) {
  const pp = muscles.p || [], ss = muscles.s || [];
  const c = id => pp.includes(id)?'az-mp':ss.includes(id)?'az-ms':'az-mi';
  const oc = id => pp.includes(id)?'var(--az-mp)':ss.includes(id)?'var(--az-ms)':'var(--az-mi)';
  return `<svg viewBox="0 0 290 285" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:290px;display:block;margin:0 auto">
<text x="68" y="11" text-anchor="middle" font-family="Inter" font-size="8" fill="#aaa" font-weight="700" letter-spacing="1">AVANT</text>
<text x="222" y="11" text-anchor="middle" font-family="Inter" font-size="8" fill="#aaa" font-weight="700" letter-spacing="1">ARRIÈRE</text>
<line x1="145" y1="4" x2="145" y2="278" stroke="#e5e0d5" stroke-width="1" stroke-dasharray="4,3"/>
<!-- FRONT -->
<circle cx="68" cy="26" r="14" fill="#f0ece3" stroke="#c8c0b4" stroke-width="1.5"/>
<rect x="63" y="40" width="10" height="7" rx="3" fill="#e5e0d5"/>
<path d="M49,50 Q68,46 87,50 L89,61 Q68,57 47,61Z" class="${c('traps')}"/>
<path d="M45,60 Q68,55 91,60 Q89,75 68,72 Q47,75 45,60Z" class="${c('chest')}"/>
<path d="M45,72 Q68,69 91,72 Q89,92 68,89 Q47,92 45,72Z" class="${c('chest')}"/>
<ellipse cx="35" cy="63" rx="11" ry="9" class="${c('front-delt')}"/>
<ellipse cx="101" cy="63" rx="11" ry="9" class="${c('front-delt')}"/>
<ellipse cx="24" cy="71" rx="8" ry="8" class="${c('side-delt')}"/>
<ellipse cx="112" cy="71" rx="8" ry="8" class="${c('side-delt')}"/>
<ellipse cx="18" cy="96" rx="8" ry="17" class="${c('biceps')}"/>
<ellipse cx="118" cy="96" rx="8" ry="17" class="${c('biceps')}"/>
<ellipse cx="28" cy="96" rx="6" ry="14" class="${c('triceps')}"/>
<ellipse cx="108" cy="96" rx="6" ry="14" class="${c('triceps')}"/>
<ellipse cx="14" cy="124" rx="6" ry="13" class="${c('forearms')}"/>
<ellipse cx="122" cy="124" rx="6" ry="13" class="${c('forearms')}"/>
<rect x="57" y="93" width="22" height="45" rx="5" class="${c('abs')}"/>
<path d="M57,99 Q47,117 49,139" stroke-width="9" stroke-linecap="round" fill="none" stroke="${oc('obliques')}"/>
<path d="M79,99 Q89,117 87,139" stroke-width="9" stroke-linecap="round" fill="none" stroke="${oc('obliques')}"/>
<path d="M52,140 Q68,145 84,140 L86,151 Q68,147 50,151Z" fill="#e8e3d9"/>
<ellipse cx="53" cy="193" rx="17" ry="33" class="${c('quads')}"/>
<ellipse cx="83" cy="193" rx="17" ry="33" class="${c('quads')}"/>
<circle cx="53" cy="229" r="8" fill="#e5e0d5"/>
<circle cx="83" cy="229" r="8" fill="#e5e0d5"/>
<ellipse cx="51" cy="252" rx="10" ry="17" class="${c('calves')}"/>
<ellipse cx="85" cy="252" rx="10" ry="17" class="${c('calves')}"/>
<!-- BACK -->
<circle cx="222" cy="26" r="14" fill="#f0ece3" stroke="#c8c0b4" stroke-width="1.5"/>
<rect x="217" y="40" width="10" height="7" rx="3" fill="#e5e0d5"/>
<path d="M199,50 Q222,44 245,50 L247,71 Q222,65 197,71Z" class="${c('traps')}"/>
<ellipse cx="185" cy="66" rx="12" ry="9" class="${c('rear-delt')}"/>
<ellipse cx="259" cy="66" rx="12" ry="9" class="${c('rear-delt')}"/>
<path d="M197,72 Q185,106 187,136 Q197,132 201,106 Q201,88 197,72Z" class="${c('lats')}"/>
<path d="M247,72 Q259,106 257,136 Q247,132 243,106 Q243,88 247,72Z" class="${c('lats')}"/>
<ellipse cx="222" cy="97" rx="17" ry="15" class="${c('rhomboids')}"/>
<ellipse cx="174" cy="96" rx="7" ry="15" class="${c('triceps')}"/>
<ellipse cx="270" cy="96" rx="7" ry="15" class="${c('triceps')}"/>
<rect x="209" y="135" width="26" height="19" rx="5" class="${c('lower-back')}"/>
<ellipse cx="208" cy="173" rx="18" ry="19" class="${c('glutes')}"/>
<ellipse cx="236" cy="173" rx="18" ry="19" class="${c('glutes')}"/>
<ellipse cx="207" cy="213" rx="15" ry="28" class="${c('hamstrings')}"/>
<ellipse cx="237" cy="213" rx="15" ry="28" class="${c('hamstrings')}"/>
<circle cx="207" cy="243" r="7" fill="#e5e0d5"/>
<circle cx="237" cy="243" r="7" fill="#e5e0d5"/>
<ellipse cx="205" cy="253" rx="10" ry="17" class="${c('calves')}"/>
<ellipse cx="239" cy="253" rx="10" ry="17" class="${c('calves')}"/>
<!-- Legend -->
<circle cx="10" cy="278" r="5" fill="var(--az-mp)"/>
<text x="18" y="282" font-family="Inter" font-size="8" fill="#888">Primaire</text>
<circle cx="73" cy="278" r="5" fill="var(--az-ms)"/>
<text x="81" y="282" font-family="Inter" font-size="8" fill="#888">Secondaire</text>
<circle cx="148" cy="278" r="5" fill="var(--az-mi)"/>
<text x="156" y="282" font-family="Inter" font-size="8" fill="#888">Inactif</text>
</svg>`;
}

  A.FICHES = FICHES;
  A.fiche = function (key) { return BY_KEY[key] || null; };
  A.FICHES_UI = { anim: function (k) { return SVG_ANIM[k] ? SVG_ANIM[k]() : ''; }, hasAnim: function (k) { return !!SVG_ANIM[k]; }, muscleMap: svgMap, muscleNames: MN };
})(typeof window !== 'undefined' ? window : globalThis);
