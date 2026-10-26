// Base de recettes. Quantités pour 4 personnes. Le coût est calculé à partir de prix.js.
// ingredients : [quantité, unité, nom] — quantité null = « selon goût ».
// photo : nom du plat sur TheMealDB (recherche de la photo) ; photoIng : ingrédient principal (photo de secours).
// allergenes : gluten, lactose, oeuf, poisson, crustaces, mollusques, arachide, fruits_coque, soja, sesame, celeri, moutarde.

const RECETTES = [
  {
    id: "ratatouille", nom: "Ratatouille provençale", emoji: "🍆", categorie: "végétarien",
    difficulte: 1, temps: 60, calories: 320, photo: "Ratatouille", photoIng: "Aubergine",
    allergenes: [],
    ingredients: [[2, "", "aubergines"], [3, "", "courgettes"], [2, "", "poivrons"], [6, "", "tomates"], [2, "", "oignons"], [3, "gousses", "ail"], [4, "c. à s.", "huile d'olive"], [null, "", "herbes de Provence"], [200, "g", "riz"]],
    etapes: ["Couper tous les légumes en dés.", "Faire revenir oignons et ail dans l'huile d'olive.", "Ajouter poivrons, aubergines puis courgettes, cuire 10 min.", "Ajouter les tomates et les herbes, laisser mijoter 40 min à feu doux.", "Servir avec le riz cuit."]
  },
  {
    id: "poulet-basquaise", nom: "Poulet basquaise", emoji: "🍗", categorie: "volaille",
    difficulte: 2, temps: 60, calories: 480, photo: "Chicken Basquaise", photoIng: "Chicken",
    allergenes: [],
    ingredients: [[4, "", "cuisses de poulet"], [3, "", "poivrons"], [4, "", "tomates"], [2, "", "oignons"], [2, "gousses", "ail"], [2, "c. à s.", "huile d'olive"], [1, "c. à c.", "piment d'Espelette"], [250, "g", "riz"]],
    etapes: ["Faire dorer le poulet dans l'huile, réserver.", "Faire revenir oignons, ail et poivrons émincés.", "Ajouter les tomates concassées et le piment.", "Remettre le poulet, couvrir et cuire 40 min.", "Servir avec le riz."]
  },
  {
    id: "boeuf-bourguignon", nom: "Bœuf bourguignon", emoji: "🥩", categorie: "bœuf",
    difficulte: 3, temps: 180, calories: 620, photo: "Beef Bourguignon", photoIng: "Beef",
    allergenes: ["gluten"],
    ingredients: [[800, "g", "bœuf à braiser"], [150, "g", "lardons"], [4, "", "carottes"], [2, "", "oignons"], [250, "g", "champignons"], [75, "cl", "vin rouge"], [2, "c. à s.", "farine"], [1, "", "bouquet garni"], [800, "g", "pommes de terre"]],
    etapes: ["Faire dorer la viande en morceaux avec les lardons.", "Ajouter oignons et carottes, saupoudrer de farine.", "Mouiller avec le vin rouge, ajouter le bouquet garni.", "Laisser mijoter 2 h 30 à couvert.", "Ajouter les champignons 20 min avant la fin.", "Servir avec les pommes de terre vapeur."]
  },
  {
    id: "bolognaise", nom: "Spaghetti bolognaise", emoji: "🍝", categorie: "bœuf",
    difficulte: 1, temps: 45, calories: 650, photo: "Spaghetti Bolognese", photoIng: "Minced Beef",
    allergenes: ["gluten", "celeri"],
    ingredients: [[400, "g", "spaghetti"], [400, "g", "bœuf haché"], [1, "", "oignon"], [1, "", "carotte"], [1, "branche", "céleri"], [500, "g", "coulis de tomate"], [2, "c. à s.", "huile d'olive"]],
    etapes: ["Hacher oignon, carotte et céleri, les faire revenir.", "Ajouter la viande et la faire dorer.", "Verser le coulis, laisser mijoter 30 min.", "Cuire les spaghetti al dente et servir nappés de sauce."]
  },
  {
    id: "lasagnes", nom: "Lasagnes à la bolognaise", emoji: "🧀", categorie: "bœuf",
    difficulte: 2, temps: 90, calories: 720, photo: "Lasagne", photoIng: "Minced Beef",
    allergenes: ["gluten", "lactose", "oeuf"],
    ingredients: [[12, "feuilles", "lasagnes"], [500, "g", "bœuf haché"], [600, "g", "coulis de tomate"], [1, "", "oignon"], [50, "cl", "lait"], [40, "g", "beurre"], [40, "g", "farine"], [100, "g", "emmental râpé"]],
    etapes: ["Préparer une sauce bolognaise (oignon, viande, coulis) 20 min.", "Préparer la béchamel : beurre, farine, puis lait en fouettant.", "Alterner dans un plat : béchamel, pâtes, bolognaise.", "Terminer par béchamel et fromage.", "Cuire 40 min à 180 °C."]
  },
  {
    id: "couscous-poulet", nom: "Couscous au poulet et légumes", emoji: "🥘", categorie: "volaille",
    difficulte: 2, temps: 75, calories: 580, photo: "Chicken Couscous", photoIng: "Chicken",
    allergenes: ["gluten"],
    ingredients: [[4, "", "cuisses de poulet"], [300, "g", "semoule"], [3, "", "carottes"], [2, "", "courgettes"], [1, "", "navet"], [250, "g", "pois chiches"], [1, "", "oignon"], [2, "c. à c.", "ras el hanout"]],
    etapes: ["Faire dorer le poulet avec l'oignon et les épices.", "Couvrir d'eau, ajouter carottes et navet, cuire 30 min.", "Ajouter courgettes et pois chiches, cuire 15 min.", "Préparer la semoule à l'eau bouillante.", "Servir le bouillon, la viande et les légumes sur la semoule."]
  },
  {
    id: "shakshuka", nom: "Shakshuka (œufs à la tomate)", emoji: "🍳", categorie: "végétarien",
    difficulte: 1, temps: 30, calories: 350, photo: "Shakshuka", photoIng: "Eggs",
    allergenes: ["oeuf", "gluten"],
    ingredients: [[8, "", "œufs"], [800, "g", "tomates concassées"], [2, "", "poivrons"], [1, "", "oignon"], [1, "c. à c.", "cumin"], [1, "c. à c.", "paprika"], [1, "", "baguette"]],
    etapes: ["Faire revenir oignon et poivrons émincés.", "Ajouter les tomates et les épices, mijoter 10 min.", "Creuser des puits et y casser les œufs.", "Couvrir et cuire 8 min jusqu'à ce que les blancs prennent.", "Servir avec du pain."]
  },
  {
    id: "nicoise", nom: "Salade niçoise au thon", emoji: "🥗", categorie: "poisson",
    difficulte: 1, temps: 25, calories: 430, photo: "Tuna Nicoise", photoIng: "Tuna",
    allergenes: ["poisson", "oeuf", "moutarde"],
    ingredients: [[2, "boîtes", "thon"], [4, "", "œufs"], [400, "g", "pommes de terre"], [200, "g", "haricots verts"], [4, "", "tomates"], [80, "g", "olives noires"], [1, "", "salade"], [1, "c. à c.", "moutarde"]],
    etapes: ["Cuire les œufs durs (10 min) et les pommes de terre.", "Cuire les haricots verts 8 min.", "Préparer une vinaigrette à la moutarde.", "Assembler salade, légumes, thon, œufs et olives.", "Arroser de vinaigrette."]
  },
  {
    id: "soupe-oignon", nom: "Soupe à l'oignon gratinée", emoji: "🧅", categorie: "végétarien",
    difficulte: 2, temps: 60, calories: 410, photo: "French Onion Soup", photoIng: "Onion",
    allergenes: ["gluten", "lactose"],
    ingredients: [[6, "", "oignons"], [40, "g", "beurre"], [1, "c. à s.", "farine"], [1.2, "L", "bouillon de légumes"], [1, "", "baguette"], [150, "g", "emmental râpé"]],
    etapes: ["Émincer les oignons et les faire fondre 20 min dans le beurre.", "Saupoudrer de farine, mouiller avec le bouillon.", "Laisser mijoter 20 min.", "Verser dans des bols, couvrir de pain et de fromage.", "Gratiner 5 min sous le gril."]
  },
  {
    id: "quiche", nom: "Quiche lorraine et salade", emoji: "🥧", categorie: "porc",
    difficulte: 1, temps: 50, calories: 610, photo: "Quiche lorraine", photoIng: "Bacon",
    allergenes: ["gluten", "lactose", "oeuf"],
    ingredients: [[1, "", "pâte brisée"], [200, "g", "lardons"], [3, "", "œufs"], [20, "cl", "crème fraîche"], [20, "cl", "lait"], [1, "", "salade"]],
    etapes: ["Préchauffer le four à 180 °C.", "Faire revenir les lardons.", "Battre œufs, crème et lait.", "Garnir la pâte de lardons, verser l'appareil.", "Cuire 35 min. Servir avec la salade."]
  },
  {
    id: "risotto-champignons", nom: "Risotto aux champignons", emoji: "🍄", categorie: "végétarien",
    difficulte: 2, temps: 40, calories: 540, photo: "Mushroom risotto", photoIng: "Mushrooms",
    allergenes: ["lactose"],
    ingredients: [[300, "g", "riz arborio"], [400, "g", "champignons"], [1, "", "oignon"], [1, "L", "bouillon de légumes"], [10, "cl", "vin blanc"], [60, "g", "parmesan"], [30, "g", "beurre"]],
    etapes: ["Faire revenir l'oignon et les champignons.", "Ajouter le riz, le nacrer 2 min.", "Déglacer au vin blanc.", "Ajouter le bouillon louche par louche en remuant (18 min).", "Hors du feu, incorporer beurre et parmesan."]
  },
  {
    id: "saumon-four", nom: "Saumon au four et légumes rôtis", emoji: "🐟", categorie: "poisson",
    difficulte: 1, temps: 35, calories: 520, photo: "Baked salmon with fennel & tomatoes", photoIng: "Salmon",
    allergenes: ["poisson"],
    ingredients: [[4, "pavés", "saumon"], [2, "", "courgettes"], [300, "g", "tomates cerises"], [1, "", "fenouil"], [1, "", "citron"], [3, "c. à s.", "huile d'olive"]],
    etapes: ["Préchauffer le four à 200 °C.", "Disposer les légumes coupés, arroser d'huile, enfourner 15 min.", "Ajouter le saumon et les rondelles de citron.", "Cuire encore 12 min."]
  },
  {
    id: "chili", nom: "Chili con carne", emoji: "🌶️", categorie: "bœuf",
    difficulte: 1, temps: 50, calories: 590, photo: "Chilli con carne", photoIng: "Kidney Beans",
    allergenes: [],
    ingredients: [[400, "g", "bœuf haché"], [400, "g", "haricots rouges"], [400, "g", "tomates concassées"], [1, "", "oignon"], [1, "", "poivron"], [2, "c. à c.", "épices chili"], [250, "g", "riz"]],
    etapes: ["Faire revenir oignon et poivron.", "Ajouter la viande et les épices, faire dorer.", "Ajouter tomates et haricots égouttés.", "Mijoter 30 min. Servir avec le riz."]
  },
  {
    id: "curry-pois-chiches", nom: "Curry de pois chiches et épinards", emoji: "🍛", categorie: "végétarien",
    difficulte: 1, temps: 30, calories: 450, photo: "Chickpea curry", photoIng: "Chickpeas",
    allergenes: [],
    ingredients: [[500, "g", "pois chiches"], [40, "cl", "lait de coco"], [400, "g", "tomates concassées"], [200, "g", "épinards"], [1, "", "oignon"], [2, "c. à s.", "curry"], [250, "g", "riz basmati"]],
    etapes: ["Faire revenir l'oignon avec le curry.", "Ajouter tomates, lait de coco et pois chiches.", "Mijoter 15 min, ajouter les épinards 2 min.", "Servir avec le riz basmati."]
  },
  {
    id: "poulet-coco", nom: "Poulet curry coco", emoji: "🥥", categorie: "volaille",
    difficulte: 1, temps: 35, calories: 560, photo: "Chicken Curry", photoIng: "Chicken",
    allergenes: [],
    ingredients: [[600, "g", "filets de poulet"], [40, "cl", "lait de coco"], [1, "", "oignon"], [1, "", "poivron"], [2, "c. à s.", "pâte de curry"], [250, "g", "riz basmati"]],
    etapes: ["Couper le poulet en dés et le faire dorer.", "Ajouter oignon, poivron et pâte de curry.", "Verser le lait de coco, mijoter 15 min.", "Servir avec le riz."]
  },
  {
    id: "gratin-dauphinois", nom: "Gratin dauphinois et jambon", emoji: "🥔", categorie: "porc",
    difficulte: 2, temps: 75, calories: 640, photo: "Gratin dauphinois", photoIng: "Potatoes",
    allergenes: ["lactose"],
    ingredients: [[1.2, "kg", "pommes de terre"], [50, "cl", "lait"], [25, "cl", "crème fraîche"], [2, "gousses", "ail"], [4, "tranches", "jambon"], [1, "", "salade"]],
    etapes: ["Préchauffer le four à 160 °C.", "Éplucher et trancher finement les pommes de terre.", "Les cuire 10 min dans le lait et l'ail.", "Verser dans un plat avec la crème, cuire 1 h.", "Servir avec le jambon et la salade."]
  },
  {
    id: "omelette", nom: "Omelette aux champignons et salade", emoji: "🥚", categorie: "végétarien",
    difficulte: 1, temps: 15, calories: 380, photo: "Omelette", photoIng: "Eggs",
    allergenes: ["oeuf", "lactose"],
    ingredients: [[10, "", "œufs"], [300, "g", "champignons"], [20, "g", "beurre"], [1, "", "salade"], [null, "", "ciboulette"]],
    etapes: ["Faire sauter les champignons au beurre.", "Battre les œufs avec la ciboulette.", "Verser sur les champignons, cuire à feu moyen.", "Plier et servir avec la salade."]
  },
  {
    id: "carbonara", nom: "Pâtes carbonara", emoji: "🍝", categorie: "porc",
    difficulte: 1, temps: 20, calories: 700, photo: "Spaghetti alla Carbonara", photoIng: "Bacon",
    allergenes: ["gluten", "oeuf", "lactose"],
    ingredients: [[400, "g", "spaghetti"], [200, "g", "lardons"], [4, "", "œufs"], [80, "g", "parmesan"], [null, "", "poivre"]],
    etapes: ["Cuire les pâtes.", "Faire dorer les lardons.", "Battre jaunes d'œufs et parmesan.", "Hors du feu, mélanger pâtes, lardons et œufs avec un peu d'eau de cuisson.", "Poivrer généreusement."]
  },
  {
    id: "hachis", nom: "Hachis parmentier", emoji: "🥧", categorie: "bœuf",
    difficulte: 2, temps: 60, calories: 610, photo: "Shepherd's Pie", photoIng: "Minced Beef",
    allergenes: ["lactose"],
    ingredients: [[1, "kg", "pommes de terre"], [500, "g", "bœuf haché"], [2, "", "oignons"], [20, "cl", "lait"], [40, "g", "beurre"], [60, "g", "emmental râpé"]],
    etapes: ["Cuire les pommes de terre et en faire une purée avec lait et beurre.", "Faire revenir oignons et viande.", "Dans un plat : viande puis purée.", "Parsemer de fromage, gratiner 20 min à 200 °C."]
  },
  {
    id: "crepes-salees", nom: "Galettes jambon-fromage-œuf", emoji: "🥞", categorie: "porc",
    difficulte: 2, temps: 40, calories: 560, photo: "Crepes", photoIng: "Ham",
    allergenes: ["oeuf", "lactose"],
    ingredients: [[250, "g", "farine de sarrasin"], [8, "", "œufs"], [8, "tranches", "jambon"], [150, "g", "emmental râpé"], [20, "g", "beurre"], [1, "", "salade"]],
    etapes: ["Mélanger farine, 1 œuf, 60 cl d'eau et une pincée de sel, reposer 30 min.", "Cuire une galette dans une poêle beurrée.", "Garnir de jambon, fromage et casser un œuf au centre.", "Replier les bords et cuire jusqu'à ce que l'œuf prenne."]
  },
  {
    id: "dahl", nom: "Dahl de lentilles corail", emoji: "🍲", categorie: "végétarien",
    difficulte: 1, temps: 30, calories: 420, photo: "Dal fry", photoIng: "Lentils",
    allergenes: [],
    ingredients: [[300, "g", "lentilles corail"], [40, "cl", "lait de coco"], [400, "g", "tomates concassées"], [1, "", "oignon"], [1, "morceau", "gingembre"], [2, "c. à c.", "curcuma"], [200, "g", "riz basmati"]],
    etapes: ["Faire revenir oignon, gingembre et curcuma.", "Ajouter lentilles, tomates, lait de coco et 50 cl d'eau.", "Cuire 20 min en remuant.", "Servir avec le riz."]
  },
  {
    id: "wok-tofu", nom: "Wok de légumes au tofu", emoji: "🥢", categorie: "végétarien",
    difficulte: 1, temps: 25, calories: 400, photo: "Tofu stir fry", photoIng: "Tofu",
    allergenes: ["soja", "sesame", "gluten"],
    ingredients: [[400, "g", "tofu ferme"], [250, "g", "nouilles"], [1, "", "brocoli"], [2, "", "carottes"], [1, "", "poivron"], [4, "c. à s.", "sauce soja"], [1, "c. à s.", "huile de sésame"]],
    etapes: ["Couper le tofu en dés et le faire dorer.", "Faire sauter les légumes en lanières 5 min.", "Ajouter les nouilles cuites, le tofu et la sauce soja.", "Finir avec l'huile de sésame."]
  },
  {
    id: "cabillaud", nom: "Cabillaud, riz et brocolis", emoji: "🐠", categorie: "poisson",
    difficulte: 1, temps: 25, calories: 390, photo: "Cod", photoIng: "Cod",
    allergenes: ["poisson", "lactose"],
    ingredients: [[4, "dos", "cabillaud"], [250, "g", "riz"], [1, "", "brocoli"], [1, "", "citron"], [20, "g", "beurre"]],
    etapes: ["Cuire le riz.", "Cuire le brocoli à la vapeur 8 min.", "Poêler le cabillaud au beurre 4 min par face.", "Servir avec un filet de citron."]
  },
  {
    id: "poulet-roti", nom: "Poulet rôti et pommes de terre", emoji: "🍗", categorie: "volaille",
    difficulte: 1, temps: 90, calories: 620, photo: "Roast chicken", photoIng: "Chicken",
    allergenes: [],
    ingredients: [[1, "", "poulet entier (1,5 kg)"], [1, "kg", "pommes de terre"], [4, "gousses", "ail"], [2, "c. à s.", "huile d'olive"], [null, "", "thym"]],
    etapes: ["Préchauffer le four à 200 °C.", "Badigeonner le poulet d'huile, saler, ajouter le thym.", "Disposer les pommes de terre en quartiers et l'ail autour.", "Cuire 1 h 15 en arrosant régulièrement."]
  },
  {
    id: "tartiflette", nom: "Tartiflette", emoji: "🧀", categorie: "porc",
    difficulte: 2, temps: 60, calories: 850, photo: "Tartiflette", photoIng: "Potatoes",
    allergenes: ["lactose"],
    ingredients: [[1, "kg", "pommes de terre"], [1, "", "reblochon"], [200, "g", "lardons"], [2, "", "oignons"], [10, "cl", "crème fraîche"], [1, "", "salade"]],
    etapes: ["Cuire les pommes de terre à l'eau, les trancher.", "Faire revenir oignons et lardons.", "Mélanger avec les pommes de terre et la crème dans un plat.", "Couvrir du reblochon coupé en deux, cuire 25 min à 200 °C."]
  },
  {
    id: "soupe-legumes", nom: "Velouté de légumes et tartines", emoji: "🥕", categorie: "végétarien",
    difficulte: 1, temps: 40, calories: 330, photo: "Vegetable soup", photoIng: "Carrots",
    allergenes: ["gluten", "lactose"],
    ingredients: [[4, "", "carottes"], [2, "", "poireaux"], [3, "", "pommes de terre"], [1, "", "oignon"], [1, "L", "bouillon de légumes"], [1, "", "baguette"], [100, "g", "fromage frais"]],
    etapes: ["Éplucher et couper les légumes.", "Faire revenir l'oignon et les poireaux.", "Ajouter carottes, pommes de terre et bouillon, cuire 25 min.", "Mixer. Servir avec des tartines de fromage frais."]
  },
  {
    id: "burger", nom: "Burger maison et potatoes", emoji: "🍔", categorie: "bœuf",
    difficulte: 2, temps: 45, calories: 820, photo: "Burger", photoIng: "Beef",
    allergenes: ["gluten", "lactose", "sesame", "moutarde"],
    ingredients: [[4, "", "pains à burger"], [4, "", "steaks hachés"], [4, "tranches", "cheddar"], [2, "", "tomates"], [1, "", "oignon rouge"], [1, "", "salade"], [800, "g", "pommes de terre"], [1, "c. à s.", "moutarde"]],
    etapes: ["Couper les pommes de terre en quartiers, rôtir 35 min à 200 °C.", "Cuire les steaks, poser le cheddar en fin de cuisson.", "Toaster les pains.", "Monter les burgers : sauce, salade, steak, tomate, oignon."]
  },
  {
    id: "pizza", nom: "Pizza margherita maison", emoji: "🍕", categorie: "végétarien",
    difficulte: 2, temps: 40, calories: 720, photo: "Margherita", photoIng: "Mozzarella",
    allergenes: ["gluten", "lactose"],
    ingredients: [[2, "", "pâtes à pizza"], [300, "g", "coulis de tomate"], [250, "g", "mozzarella"], [null, "", "basilic"], [2, "c. à s.", "huile d'olive"], [1, "", "salade"]],
    etapes: ["Préchauffer le four à 250 °C.", "Étaler la pâte, napper de coulis.", "Répartir la mozzarella, arroser d'huile.", "Cuire 12 min, ajouter le basilic à la sortie."]
  },
  {
    id: "croque", nom: "Croque-monsieur et salade", emoji: "🥪", categorie: "porc",
    difficulte: 1, temps: 20, calories: 590, photo: "Croque Monsieur", photoIng: "Ham",
    allergenes: ["gluten", "lactose"],
    ingredients: [[16, "tranches", "pain de mie"], [8, "tranches", "jambon"], [150, "g", "emmental râpé"], [30, "g", "beurre"], [1, "", "salade"]],
    etapes: ["Beurrer le pain de mie.", "Garnir de jambon et de fromage.", "Cuire 10 min à 200 °C ou à l'appareil.", "Servir avec la salade."]
  },
  {
    id: "tajine", nom: "Tajine de poulet citron-olives", emoji: "🍋", categorie: "volaille",
    difficulte: 2, temps: 75, calories: 540, photo: "Chicken tagine", photoIng: "Chicken",
    allergenes: ["gluten"],
    ingredients: [[4, "", "cuisses de poulet"], [1, "", "citron confit"], [100, "g", "olives vertes"], [2, "", "oignons"], [2, "c. à c.", "ras el hanout"], [300, "g", "semoule"]],
    etapes: ["Faire dorer le poulet avec oignons et épices.", "Ajouter 30 cl d'eau, couvrir, mijoter 40 min.", "Ajouter citron confit et olives, cuire 15 min.", "Servir avec la semoule."]
  },
  {
    id: "moules", nom: "Moules marinières et frites", emoji: "🦪", categorie: "fruits de mer",
    difficulte: 2, temps: 40, calories: 640, photo: "Mussels", photoIng: "Mussels",
    allergenes: ["mollusques", "lactose", "celeri"],
    ingredients: [[2, "kg", "moules"], [2, "", "échalotes"], [20, "cl", "vin blanc"], [30, "g", "beurre"], [1, "branche", "céleri"], [800, "g", "frites surgelées"], [null, "", "persil"]],
    etapes: ["Gratter et laver les moules.", "Faire revenir échalotes et céleri au beurre.", "Ajouter moules et vin blanc, couvrir 6 min en remuant.", "Cuire les frites au four. Parsemer de persil et servir."]
  },
  {
    id: "steak-haricots", nom: "Steak haché et haricots verts", emoji: "🥩", categorie: "bœuf",
    difficulte: 1, temps: 20, calories: 460, photo: "Steak", photoIng: "Beef",
    allergenes: ["lactose"],
    ingredients: [[4, "", "steaks hachés"], [600, "g", "haricots verts"], [20, "g", "beurre"], [2, "gousses", "ail"], [null, "", "persil"]],
    etapes: ["Cuire les haricots verts 10 min à l'eau salée.", "Les faire sauter au beurre avec l'ail.", "Cuire les steaks selon la cuisson souhaitée.", "Parsemer de persil."]
  },
  {
    id: "taboule-poulet", nom: "Taboulé au poulet grillé", emoji: "🥙", categorie: "volaille",
    difficulte: 1, temps: 30, calories: 480, photo: "Tabbouleh", photoIng: "Chicken",
    allergenes: ["gluten"],
    ingredients: [[250, "g", "semoule"], [500, "g", "filets de poulet"], [3, "", "tomates"], [1, "", "concombre"], [1, "bouquet", "menthe"], [2, "", "citrons"], [4, "c. à s.", "huile d'olive"]],
    etapes: ["Gonfler la semoule à l'eau chaude.", "Couper tomates et concombre en dés, ciseler la menthe.", "Mélanger avec citron et huile, réfrigérer.", "Griller le poulet et le servir tranché sur le taboulé."]
  },
  {
    id: "blanquette", nom: "Blanquette de veau", emoji: "🍲", categorie: "veau",
    difficulte: 3, temps: 150, calories: 620, photo: "Blanquette de veau", photoIng: "Veal",
    allergenes: ["lactose", "oeuf", "gluten"],
    ingredients: [[800, "g", "veau (épaule)"], [3, "", "carottes"], [250, "g", "champignons"], [1, "", "oignon"], [20, "cl", "crème fraîche"], [1, "", "jaune d'œuf"], [30, "g", "farine"], [250, "g", "riz"]],
    etapes: ["Couvrir le veau d'eau froide avec oignon et carottes, cuire 1 h 30.", "Réserver la viande, filtrer le bouillon.", "Faire un roux (beurre + farine), mouiller avec le bouillon.", "Ajouter champignons, crème et jaune d'œuf hors du feu.", "Remettre la viande, servir avec le riz."]
  },
  {
    id: "pad-thai", nom: "Pad thaï aux crevettes", emoji: "🍤", categorie: "fruits de mer",
    difficulte: 2, temps: 30, calories: 590, photo: "Pad Thai", photoIng: "Prawns",
    allergenes: ["crustaces", "arachide", "oeuf", "soja", "poisson", "gluten"],
    ingredients: [[250, "g", "nouilles de riz"], [300, "g", "crevettes"], [2, "", "œufs"], [150, "g", "pousses de soja"], [50, "g", "cacahuètes"], [3, "c. à s.", "sauce soja"], [2, "c. à s.", "nuoc-mâm"], [1, "", "citron vert"]],
    etapes: ["Réhydrater les nouilles.", "Faire sauter les crevettes, réserver.", "Brouiller les œufs dans le wok.", "Ajouter nouilles, sauces, pousses de soja et crevettes.", "Servir avec cacahuètes concassées et citron vert."]
  },
  {
    id: "buddha-bowl", nom: "Buddha bowl quinoa-avocat", emoji: "🥑", categorie: "végétarien",
    difficulte: 1, temps: 30, calories: 520, photo: "Buddha bowl", photoIng: "Avocado",
    allergenes: ["sesame"],
    ingredients: [[250, "g", "quinoa"], [2, "", "avocats"], [250, "g", "pois chiches"], [2, "", "carottes"], [200, "g", "chou rouge"], [2, "c. à s.", "tahini"], [1, "", "citron"]],
    etapes: ["Cuire le quinoa 12 min.", "Rôtir les pois chiches épicés 15 min au four.", "Râper carottes et chou, trancher l'avocat.", "Composer les bols, napper de sauce tahini-citron."]
  },
  {
    id: "gnocchis", nom: "Gnocchis tomate-mozzarella", emoji: "🍅", categorie: "végétarien",
    difficulte: 1, temps: 25, calories: 560, photo: "Gnocchi", photoIng: "Mozzarella",
    allergenes: ["gluten", "lactose", "oeuf"],
    ingredients: [[800, "g", "gnocchis"], [500, "g", "coulis de tomate"], [250, "g", "mozzarella"], [1, "", "oignon"], [null, "", "basilic"]],
    etapes: ["Faire revenir l'oignon, ajouter le coulis, mijoter 10 min.", "Poêler les gnocchis jusqu'à coloration.", "Mélanger avec la sauce dans un plat, couvrir de mozzarella.", "Gratiner 10 min à 200 °C."]
  },
  {
    id: "poisson-pane", nom: "Poisson pané maison et purée", emoji: "🐟", categorie: "poisson",
    difficulte: 1, temps: 35, calories: 560, photo: "Fish fingers", photoIng: "White Fish",
    allergenes: ["poisson", "gluten", "oeuf", "lactose"],
    ingredients: [[600, "g", "filets de colin"], [100, "g", "chapelure"], [2, "", "œufs"], [50, "g", "farine"], [1, "kg", "pommes de terre"], [20, "cl", "lait"], [30, "g", "beurre"]],
    etapes: ["Cuire les pommes de terre et faire une purée avec lait et beurre.", "Passer le poisson dans la farine, l'œuf puis la chapelure.", "Le poêler 3 min par face.", "Servir avec la purée et un filet de citron."]
  },
  {
    id: "porc-caramel", nom: "Porc au caramel et riz", emoji: "🍖", categorie: "porc",
    difficulte: 2, temps: 45, calories: 600, photo: "Caramel pork", photoIng: "Pork",
    allergenes: ["soja", "poisson", "gluten"],
    ingredients: [[600, "g", "échine de porc"], [60, "g", "sucre"], [3, "c. à s.", "sauce soja"], [2, "c. à s.", "nuoc-mâm"], [2, "", "oignons"], [250, "g", "riz"]],
    etapes: ["Faire un caramel brun avec le sucre et un peu d'eau.", "Ajouter le porc en dés et les oignons, bien enrober.", "Ajouter sauces et 20 cl d'eau, mijoter 30 min.", "Servir avec le riz."]
  }
];


const ALLERGENES = [
  { id: "gluten", nom: "Gluten" }, { id: "lactose", nom: "Lactose / lait" }, { id: "oeuf", nom: "Œufs" },
  { id: "poisson", nom: "Poisson" }, { id: "crustaces", nom: "Crustacés" }, { id: "mollusques", nom: "Mollusques" },
  { id: "arachide", nom: "Arachide" }, { id: "fruits_coque", nom: "Fruits à coque" }, { id: "soja", nom: "Soja" },
  { id: "sesame", nom: "Sésame" }, { id: "celeri", nom: "Céleri" }, { id: "moutarde", nom: "Moutarde" }
];

const DIFFICULTES = { 1: "Facile", 2: "Moyen", 3: "Difficile" };
