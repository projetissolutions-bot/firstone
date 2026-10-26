// Prix des ingrédients au Québec ($ CA) — FICHIER GÉNÉRÉ par outils/maj-prix.js, modifiable à la main.
// prix : prix par « par » (kg, L ou unité) ; poids : kg par pièce (conversion pièces <-> kg) ;
// statcan : motif de recherche du produit dans le tableau 18-10-0245-01 de Statistique Canada.
// magasins.coef : écart de prix de l'enseigne par rapport à la moyenne québécoise (1 = moyenne).
const PRIX_DATA = {
  "devise": "CAD",
  "source": "Estimations de départ (non vérifiées)",
  "miseAJour": "2026-10-26",
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
      "prix": 1.75,
      "par": "unité",
      "poids": 0.2,
      "statcan": "Avocado"
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
      "prix": 12,
      "par": "kg",
      "statcan": "^Butter"
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
      "prix": 3,
      "par": "unité",
      "poids": 0.4,
      "statcan": "Broccoli"
    },
    "bœuf haché": {
      "prix": 12,
      "par": "kg",
      "statcan": "Ground beef"
    },
    "bœuf à braiser": {
      "prix": 20,
      "par": "kg",
      "statcan": "Beef stewing"
    },
    "cabillaud": {
      "prix": 4.5,
      "par": "unité",
      "poids": 0.15
    },
    "cacahuètes": {
      "prix": 10,
      "par": "kg",
      "statcan": "Peanuts"
    },
    "carotte": {
      "prix": 2.2,
      "par": "kg",
      "poids": 0.12,
      "statcan": "^Carrots"
    },
    "champignons": {
      "prix": 9,
      "par": "kg",
      "statcan": "Mushrooms"
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
      "prix": 2.5,
      "par": "kg",
      "statcan": "Cabbage"
    },
    "ciboulette": {
      "prix": 2.5,
      "par": "unité"
    },
    "citron": {
      "prix": 0.9,
      "par": "unité",
      "poids": 0.12,
      "statcan": "Lemons"
    },
    "citron confit": {
      "prix": 2,
      "par": "unité"
    },
    "citron vert": {
      "prix": 0.6,
      "par": "unité",
      "poids": 0.07,
      "statcan": "Limes"
    },
    "concombre": {
      "prix": 1.5,
      "par": "unité",
      "poids": 0.35,
      "statcan": "Cucumber"
    },
    "coulis de tomate": {
      "prix": 4,
      "par": "kg",
      "statcan": "Tomato sauce|Pasta sauce"
    },
    "courgette": {
      "prix": 1.5,
      "par": "unité",
      "poids": 0.25,
      "statcan": "Zucchini"
    },
    "crevettes": {
      "prix": 25,
      "par": "kg",
      "statcan": "Shrimp"
    },
    "crème fraîche": {
      "prix": 8,
      "par": "L",
      "statcan": "^(Table |Whipping )?cream(?! cheese)"
    },
    "cuisses de poulet": {
      "prix": 2.5,
      "par": "unité",
      "poids": 0.25,
      "statcan": "Chicken drumsticks|Chicken thighs"
    },
    "emmental râpé": {
      "prix": 22,
      "par": "kg"
    },
    "farine": {
      "prix": 2.5,
      "par": "kg",
      "statcan": "^Wheat flour|^Flour"
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
      "prix": 17,
      "par": "kg",
      "statcan": "Chicken breasts"
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
      "prix": 4,
      "par": "kg",
      "statcan": "Canned beans|Kidney beans"
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
      "prix": 2.4,
      "par": "L",
      "statcan": "^Milk"
    },
    "lait de coco": {
      "prix": 6,
      "par": "L"
    },
    "lardons": {
      "prix": 16,
      "par": "kg",
      "statcan": "^Bacon"
    },
    "lasagnes": {
      "prix": 0.25,
      "par": "unité"
    },
    "lentilles corail": {
      "prix": 6,
      "par": "kg",
      "statcan": "Lentils"
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
      "prix": 3.3,
      "par": "kg",
      "poids": 0.15,
      "statcan": "^Onions"
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
      "prix": 0.18,
      "par": "unité",
      "statcan": "^White bread",
      "poids": 0.03
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
      "prix": 2,
      "par": "unité",
      "poids": 0.18,
      "statcan": "Peppers"
    },
    "pomme de terre": {
      "prix": 2,
      "par": "kg",
      "poids": 0.2,
      "statcan": "^Potatoes"
    },
    "poulet entier (1,5 kg)": {
      "prix": 14,
      "par": "unité",
      "poids": 1.5,
      "statcan": "Whole chicken"
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
      "prix": 4,
      "par": "kg",
      "statcan": "^White rice|^Rice"
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
      "prix": 2.5,
      "par": "unité",
      "statcan": "Romaine|Lettuce"
    },
    "saumon": {
      "prix": 5.5,
      "par": "unité",
      "poids": 0.15,
      "statcan": "Salmon"
    },
    "semoule": {
      "prix": 5,
      "par": "kg"
    },
    "spaghetti": {
      "prix": 4,
      "par": "kg",
      "statcan": "^Dry.*pasta|^Pasta|Spaghetti"
    },
    "steaks hachés": {
      "prix": 2.5,
      "par": "unité",
      "poids": 0.12
    },
    "sucre": {
      "prix": 2.5,
      "par": "kg",
      "statcan": "^White sugar|^Sugar"
    },
    "thon": {
      "prix": 2.3,
      "par": "unité",
      "statcan": "tuna"
    },
    "tofu ferme": {
      "prix": 8,
      "par": "kg",
      "statcan": "Tofu"
    },
    "tomate": {
      "prix": 0.8,
      "par": "unité",
      "poids": 0.15,
      "statcan": "^Tomatoes"
    },
    "tomates cerises": {
      "prix": 9,
      "par": "kg"
    },
    "tomates concassées": {
      "prix": 3.5,
      "par": "kg",
      "statcan": "Canned tomatoes"
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
      "prix": 11,
      "par": "kg",
      "statcan": "Pork loin|Pork shoulder"
    },
    "épinards": {
      "prix": 12,
      "par": "kg",
      "statcan": "Spinach"
    },
    "œuf": {
      "prix": 0.45,
      "par": "unité",
      "statcan": "^Eggs"
    },
    "céleri": {
      "prix": 0.4,
      "par": "unité",
      "poids": 0.05,
      "statcan": "^Celery"
    }
  }
};
