// Prix des ingrédients au Québec ($ CA) — FICHIER GÉNÉRÉ par outils/maj-prix.js, modifiable à la main.
// prix : prix par « par » (kg, L ou unité) ; poids : kg par pièce (conversion pièces <-> kg) ;
// statcan : motif de recherche du produit dans le tableau 18-10-0245-01 de Statistique Canada.
// magasins.coef : écart de prix de l'enseigne par rapport à la moyenne québécoise (1 = moyenne).
const PRIX_DATA = {
  "devise": "CAD",
  "source": "Statistique Canada, tableau 18-10-0245-01 (Québec, 2026-09) + estimations",
  "miseAJour": "2026-11-10",
  "magasins": [
    {
      "id": "costco",
      "nom": "Costco",
      "coef": 0.85
    },
    {
      "id": "superc",
      "nom": "Super C",
      "coef": 0.9
    },
    {
      "id": "walmart",
      "nom": "Walmart",
      "coef": 0.93
    }
  ],
  "ingredients": {
    "ail": {
      "prix": 0.15,
      "par": "unité"
    },
    "aubergine": {
      "prix": 2,
      "par": "unité",
      "poids": 0.35
    },
    "avocat": {
      "prix": 1.15,
      "par": "unité",
      "poids": 0.2,
      "statcan": "Avocado",
      "sourcePrix": "StatCan 2026-09"
    },
    "baguette": {
      "prix": 3,
      "par": "unité"
    },
    "basilic": {
      "prix": 2.5,
      "par": "unité"
    },
    "beurre": {
      "prix": 12.33,
      "par": "kg",
      "statcan": "^Butter",
      "sourcePrix": "StatCan 2026-09"
    },
    "bouillon de légumes": {
      "prix": 3,
      "par": "L"
    },
    "bouquet garni": {
      "prix": 2.5,
      "par": "unité"
    },
    "brocoli": {
      "prix": 1.92,
      "par": "unité",
      "poids": 0.4,
      "statcan": "Broccoli",
      "sourcePrix": "StatCan 2026-09"
    },
    "bœuf haché": {
      "prix": 16.43,
      "par": "kg",
      "statcan": "Ground beef",
      "sourcePrix": "StatCan 2026-09"
    },
    "bœuf à braiser": {
      "prix": 20.57,
      "par": "kg",
      "statcan": "Beef stewing",
      "sourcePrix": "StatCan 2026-09"
    },
    "cabillaud": {
      "prix": 4.5,
      "par": "unité",
      "poids": 0.15
    },
    "cacahuètes": {
      "prix": 9.96,
      "par": "kg",
      "statcan": "Peanuts",
      "sourcePrix": "StatCan 2026-09"
    },
    "carotte": {
      "prix": 2.47,
      "par": "kg",
      "poids": 0.12,
      "statcan": "^Carrots",
      "sourcePrix": "StatCan 2026-09"
    },
    "champignons": {
      "prix": 7.67,
      "par": "kg",
      "statcan": "Mushrooms",
      "sourcePrix": "StatCan 2026-09"
    },
    "chapelure": {
      "prix": 6,
      "par": "kg"
    },
    "cheddar": {
      "prix": 0.35,
      "par": "unité",
      "poids": 0.02
    },
    "chou rouge": {
      "prix": 2.23,
      "par": "kg",
      "statcan": "Cabbage",
      "sourcePrix": "StatCan 2026-09"
    },
    "ciboulette": {
      "prix": 2.5,
      "par": "unité"
    },
    "citron": {
      "prix": 0.92,
      "par": "unité",
      "poids": 0.12,
      "statcan": "Lemons",
      "sourcePrix": "StatCan 2026-09"
    },
    "citron confit": {
      "prix": 2,
      "par": "unité"
    },
    "citron vert": {
      "prix": 0.7,
      "par": "unité",
      "poids": 0.07,
      "statcan": "Limes",
      "sourcePrix": "StatCan 2026-09"
    },
    "concombre": {
      "prix": 1.43,
      "par": "unité",
      "poids": 0.35,
      "statcan": "Cucumber",
      "sourcePrix": "StatCan 2026-09"
    },
    "coulis de tomate": {
      "prix": 6.37,
      "par": "kg",
      "statcan": "Tomato sauce|Pasta sauce",
      "sourcePrix": "StatCan 2026-09"
    },
    "courgette": {
      "prix": 1.5,
      "par": "unité",
      "poids": 0.25,
      "statcan": "Zucchini"
    },
    "crevettes": {
      "prix": 25.13,
      "par": "kg",
      "statcan": "Shrimp",
      "sourcePrix": "StatCan 2026-09"
    },
    "crème fraîche": {
      "prix": 4.45,
      "par": "L",
      "statcan": "^(Table |Whipping )?cream(?! cheese)",
      "sourcePrix": "StatCan 2026-09"
    },
    "cuisses de poulet": {
      "prix": 2.19,
      "par": "unité",
      "poids": 0.25,
      "statcan": "Chicken drumsticks|Chicken thighs",
      "sourcePrix": "StatCan 2026-09"
    },
    "emmental râpé": {
      "prix": 22,
      "par": "kg"
    },
    "farine": {
      "prix": 1.98,
      "par": "kg",
      "statcan": "^Wheat flour|^Flour",
      "sourcePrix": "StatCan 2026-09"
    },
    "farine de sarrasin": {
      "prix": 8,
      "par": "kg"
    },
    "fenouil": {
      "prix": 3,
      "par": "unité"
    },
    "filets de colin": {
      "prix": 18,
      "par": "kg"
    },
    "filets de poulet": {
      "prix": 14.39,
      "par": "kg",
      "statcan": "Chicken breasts",
      "sourcePrix": "StatCan 2026-09"
    },
    "frites surgelées": {
      "prix": 4.5,
      "par": "kg",
      "statcan": "French fries"
    },
    "fromage frais": {
      "prix": 14,
      "par": "kg",
      "statcan": "Cream cheese"
    },
    "gingembre": {
      "prix": 0.8,
      "par": "unité"
    },
    "gnocchis": {
      "prix": 7,
      "par": "kg"
    },
    "haricots rouges": {
      "prix": 3.28,
      "par": "kg",
      "statcan": "Canned beans|Kidney beans",
      "sourcePrix": "StatCan 2026-09"
    },
    "haricots verts": {
      "prix": 7,
      "par": "kg"
    },
    "herbes de provence": {
      "prix": 0,
      "par": "unité"
    },
    "jambon": {
      "prix": 0.6,
      "par": "unité",
      "poids": 0.025,
      "statcan": "^(Sliced )?ham\\b"
    },
    "jaune d'œuf": {
      "prix": 0.45,
      "par": "unité"
    },
    "lait": {
      "prix": 2.94,
      "par": "L",
      "statcan": "^Milk",
      "sourcePrix": "StatCan 2026-09"
    },
    "lait de coco": {
      "prix": 6,
      "par": "L"
    },
    "lardons": {
      "prix": 14.88,
      "par": "kg",
      "statcan": "^Bacon",
      "sourcePrix": "StatCan 2026-09"
    },
    "lasagnes": {
      "prix": 0.25,
      "par": "unité"
    },
    "lentilles corail": {
      "prix": 3.28,
      "par": "kg",
      "statcan": "Lentils",
      "sourcePrix": "StatCan 2026-09"
    },
    "menthe": {
      "prix": 2.5,
      "par": "unité"
    },
    "moules": {
      "prix": 7,
      "par": "kg"
    },
    "mozzarella": {
      "prix": 16,
      "par": "kg"
    },
    "navet": {
      "prix": 2,
      "par": "unité"
    },
    "nouilles": {
      "prix": 6,
      "par": "kg"
    },
    "nouilles de riz": {
      "prix": 7,
      "par": "kg"
    },
    "oignon": {
      "prix": 4.72,
      "par": "kg",
      "poids": 0.15,
      "statcan": "^Onions",
      "sourcePrix": "StatCan 2026-09"
    },
    "oignon rouge": {
      "prix": 0.8,
      "par": "unité"
    },
    "olives noires": {
      "prix": 15,
      "par": "kg"
    },
    "olives vertes": {
      "prix": 15,
      "par": "kg"
    },
    "pain de mie": {
      "prix": 0.17,
      "par": "unité",
      "statcan": "^White bread",
      "poids": 0.03,
      "sourcePrix": "StatCan 2026-09"
    },
    "pains à burger": {
      "prix": 0.7,
      "par": "unité"
    },
    "parmesan": {
      "prix": 35,
      "par": "kg"
    },
    "persil": {
      "prix": 2,
      "par": "unité"
    },
    "poireau": {
      "prix": 2,
      "par": "unité"
    },
    "pois chiches": {
      "prix": 4,
      "par": "kg",
      "statcan": "Chickpeas"
    },
    "poivron": {
      "prix": 0.7,
      "par": "unité",
      "poids": 0.18,
      "statcan": "Peppers",
      "sourcePrix": "StatCan 2026-09"
    },
    "pomme de terre": {
      "prix": 0.76,
      "par": "kg",
      "poids": 0.2,
      "statcan": "^Potatoes",
      "sourcePrix": "StatCan 2026-09"
    },
    "poulet entier (1,5 kg)": {
      "prix": 9.58,
      "par": "unité",
      "poids": 1.5,
      "statcan": "Whole chicken",
      "sourcePrix": "StatCan 2026-09"
    },
    "pousses de soja": {
      "prix": 6,
      "par": "kg"
    },
    "pâte brisée": {
      "prix": 4,
      "par": "unité"
    },
    "pâtes à pizza": {
      "prix": 3.5,
      "par": "unité"
    },
    "quinoa": {
      "prix": 10,
      "par": "kg"
    },
    "reblochon": {
      "prix": 18,
      "par": "unité"
    },
    "riz": {
      "prix": 5.41,
      "par": "kg",
      "statcan": "^White rice|^Rice",
      "sourcePrix": "StatCan 2026-09"
    },
    "riz arborio": {
      "prix": 8,
      "par": "kg"
    },
    "riz basmati": {
      "prix": 5,
      "par": "kg"
    },
    "salade": {
      "prix": 2.19,
      "par": "unité",
      "statcan": "Romaine|Lettuce",
      "sourcePrix": "StatCan 2026-09"
    },
    "saumon": {
      "prix": 3.95,
      "par": "unité",
      "poids": 0.15,
      "statcan": "Salmon",
      "sourcePrix": "StatCan 2026-09"
    },
    "semoule": {
      "prix": 5,
      "par": "kg"
    },
    "spaghetti": {
      "prix": 6.6,
      "par": "kg",
      "statcan": "^Dry.*pasta|^Pasta|Spaghetti",
      "sourcePrix": "StatCan 2026-09"
    },
    "steaks hachés": {
      "prix": 2.5,
      "par": "unité",
      "poids": 0.12
    },
    "sucre": {
      "prix": 1.27,
      "par": "kg",
      "statcan": "^White sugar|^Sugar",
      "sourcePrix": "StatCan 2026-09"
    },
    "thon": {
      "prix": 2.3,
      "par": "unité",
      "statcan": "tuna"
    },
    "tofu ferme": {
      "prix": 7.46,
      "par": "kg",
      "statcan": "Tofu",
      "sourcePrix": "StatCan 2026-09"
    },
    "tomate": {
      "prix": 0.75,
      "par": "unité",
      "poids": 0.15,
      "statcan": "^Tomatoes",
      "sourcePrix": "StatCan 2026-09"
    },
    "tomates cerises": {
      "prix": 9,
      "par": "kg"
    },
    "tomates concassées": {
      "prix": 2.41,
      "par": "kg",
      "statcan": "Canned tomatoes",
      "sourcePrix": "StatCan 2026-09"
    },
    "veau (épaule)": {
      "prix": 28,
      "par": "kg"
    },
    "vin blanc": {
      "prix": 16,
      "par": "L"
    },
    "vin rouge": {
      "prix": 16,
      "par": "L"
    },
    "échalote": {
      "prix": 0.5,
      "par": "unité"
    },
    "échine de porc": {
      "prix": 8.34,
      "par": "kg",
      "statcan": "Pork loin|Pork shoulder",
      "sourcePrix": "StatCan 2026-09"
    },
    "épinards": {
      "prix": 7.8,
      "par": "kg",
      "statcan": "Spinach",
      "sourcePrix": "StatCan 2026-09"
    },
    "œuf": {
      "prix": 0.34,
      "par": "unité",
      "statcan": "^Eggs",
      "sourcePrix": "StatCan 2026-09"
    },
    "céleri": {
      "prix": 1.93,
      "par": "unité",
      "poids": 0.05,
      "statcan": "^Celery",
      "sourcePrix": "StatCan 2026-09"
    }
  }
};
