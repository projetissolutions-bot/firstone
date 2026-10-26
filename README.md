# Menus de la semaine

Application web qui propose des recettes pour la semaine selon tes critères, avec validation repas par repas et liste de courses.

## Utilisation

Ouvre `index.html` dans un navigateur (double-clic). Aucune installation, aucun serveur.

1. **Critères** : budget, magasins, aliments préférés, aliments à éviter / allergies, difficulté max, durée max, calories max par repas, nombre de personnes (+ nombre de jours et repas par jour).
2. **Validation** : chaque repas s'affiche avec une photo. « ✓ Valider » le garde, « ↻ Autre » en propose un nouveau jusqu'à validation. Clic sur la photo ou le titre = détail (ingrédients adaptés au nombre de personnes, préparation, durée, difficulté, calories, allergènes).
3. **Liste de courses** : générée quand tous les repas sont validés (cochable, copiable, imprimable).

Critères et menus sont mémorisés dans le navigateur.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `style.css` | Apparence |
| `app.js` | Logique (filtrage, propositions, détail, courses) |
| `recettes.js` | Base de 39 recettes — modifiable pour ajouter des plats |
| `prix.js` | Prix des ingrédients au Québec ($ CA) et écart de prix par magasin (Costco, Super C, Walmart) |
| `outils/maj-prix.js` | Met à jour `prix.js` depuis Statistique Canada et recalcule les écarts magasins |
| `outils/panier-test.csv` | Panier test à remplir avec les prix relevés en magasin |
| `.github/workflows/maj-prix.yml` | Lance la mise à jour automatiquement le 10 de chaque mois |

## Prix

Le coût d'une recette = somme de ses ingrédients (prix moyen québécois) × écart de prix des magasins choisis. Épices, huiles et condiments (en cuillères) sont considérés comme déjà au placard.

**1. Prix moyens — Statistique Canada** (tableau 18-10-0245-01, mensuel, gratuit)
- Automatique : sur GitHub, onglet *Actions* > *Mise à jour des prix* > *Run workflow*. Ensuite, ça tourne seul chaque mois.
- Ou à la main (Node 18+ installé) : `node outils/maj-prix.js` dans le dossier du projet.
- Le rapport affiche les ingrédients non trouvés : corriger leur motif `statcan` dans `prix.js` (nom anglais du produit dans le tableau). Les autres gardent leur prix estimé.

**2. Écart par magasin — panier test**
1. Ouvrir `outils/panier-test.csv` dans Excel ou Google Sheets.
2. Pour chaque produit relevé : `quantite` dans l'unité indiquée (ex. `2` pour un paquet de 2 kg, `30` pour 30 œufs), puis le prix payé dans la colonne du magasin.
3. Lancer `node outils/maj-prix.js --magasins`. Il faut au moins 3 produits par magasin.

## Limites connues

- Tant que la mise à jour n'a pas tourné, prix et coefficients magasins sont des **estimations** (affichées en bas de page).
- Calories indicatives.
- Photos récupérées sur TheMealDB (API gratuite) par nom de plat ; à défaut, photo d'un plat au même ingrédient principal, ou emoji si hors ligne. La photo peut donc être approximative.

## Mise en ligne

Copier les 4 fichiers sur un hébergement statique (OVH, GitHub Pages…).
