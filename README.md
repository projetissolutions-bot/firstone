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
| `recettes.js` | Base de 39 recettes + coefficients de prix des magasins — modifiable pour ajouter des plats |

## Limites connues

- Prix, calories et coefficients magasins sont des **estimations**, pas des prix réels.
- Photos récupérées sur TheMealDB (API gratuite) par nom de plat ; à défaut, photo d'un plat au même ingrédient principal, ou emoji si hors ligne. La photo peut donc être approximative.

## Mise en ligne

Copier les 4 fichiers sur un hébergement statique (OVH, GitHub Pages…).
