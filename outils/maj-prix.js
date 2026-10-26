#!/usr/bin/env node
// Met à jour prix.js avec les prix moyens du Québec publiés par Statistique Canada
// (tableau 18-10-0245-01 « Prix de détail moyens mensuels de certains produits »)
// et recalcule l'écart de prix des magasins à partir de outils/panier-test.csv.
//
// Utilisation (Node 18 ou plus) :
//   node outils/maj-prix.js                 télécharge le tableau sur le site de Statistique Canada
//   node outils/maj-prix.js fichier.zip     utilise un fichier déjà téléchargé (.zip ou .csv, version anglaise)
//   node outils/maj-prix.js --magasins      recalcule seulement les coefficients des magasins

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const RACINE = path.join(__dirname, "..");
const FICHIER_PRIX = path.join(RACINE, "prix.js");
const FICHIER_PANIER = path.join(__dirname, "panier-test.csv");
const URL_TABLEAU = "https://www150.statcan.gc.ca/n1/tbl/csv/18100245-eng.zip";
const MARQUEUR = "const PRIX_DATA = ";

// ---------- Lecture / écriture de prix.js ----------

function lirePrix() {
  const texte = fs.readFileSync(FICHIER_PRIX, "utf8");
  const debut = texte.indexOf(MARQUEUR);
  const entete = texte.slice(0, debut);
  const json = texte.slice(debut + MARQUEUR.length).trim().replace(/;$/, "");
  return { entete, data: JSON.parse(json) };
}

function ecrirePrix({ entete, data }) {
  fs.writeFileSync(FICHIER_PRIX, `${entete}${MARQUEUR}${JSON.stringify(data, null, 2)};\n`);
}

// ---------- Fichiers ----------

// Extrait le premier .csv (hors métadonnées) d'une archive zip, sans dépendance
function extraireCsvDuZip(tampon) {
  let fin = tampon.length - 22;
  while (fin >= 0 && tampon.readUInt32LE(fin) !== 0x06054b50) fin--;
  if (fin < 0) throw new Error("Archive zip illisible");
  const nbEntrees = tampon.readUInt16LE(fin + 10);
  let pos = tampon.readUInt32LE(fin + 16);
  for (let i = 0; i < nbEntrees; i++) {
    const methode = tampon.readUInt16LE(pos + 10);
    const tailleCompressee = tampon.readUInt32LE(pos + 20);
    const lgNom = tampon.readUInt16LE(pos + 28);
    const lgExtra = tampon.readUInt16LE(pos + 30);
    const lgComm = tampon.readUInt16LE(pos + 32);
    const offsetLocal = tampon.readUInt32LE(pos + 42);
    const nom = tampon.toString("utf8", pos + 46, pos + 46 + lgNom);
    pos += 46 + lgNom + lgExtra + lgComm;
    if (!nom.toLowerCase().endsWith(".csv") || /metadata/i.test(nom)) continue;
    const debutDonnees = offsetLocal + 30 + tampon.readUInt16LE(offsetLocal + 26) + tampon.readUInt16LE(offsetLocal + 28);
    const donnees = tampon.subarray(debutDonnees, debutDonnees + tailleCompressee);
    return (methode === 8 ? zlib.inflateRawSync(donnees) : donnees).toString("utf8");
  }
  throw new Error("Aucun fichier CSV dans l'archive");
}

function lireCsv(texte, separateur = ",") {
  const lignes = [];
  let ligne = [], champ = "", guillemets = false;
  texte = texte.replace(/^﻿/, "");
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (guillemets) {
      if (c === '"' && texte[i + 1] === '"') { champ += '"'; i++; }
      else if (c === '"') guillemets = false;
      else champ += c;
    } else if (c === '"') guillemets = true;
    else if (c === separateur) { ligne.push(champ); champ = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && texte[i + 1] === "\n") i++;
      ligne.push(champ); lignes.push(ligne); ligne = []; champ = "";
    } else champ += c;
  }
  if (champ || ligne.length) { ligne.push(champ); lignes.push(ligne); }
  const [entetes, ...reste] = lignes.filter((l) => l.some((v) => v.trim()));
  return reste.map((l) => Object.fromEntries(entetes.map((e, i) => [e.trim(), (l[i] || "").trim()])));
}

async function chargerTableau(chemin) {
  if (chemin) {
    const tampon = fs.readFileSync(chemin);
    return chemin.toLowerCase().endsWith(".zip") ? extraireCsvDuZip(tampon) : tampon.toString("utf8");
  }
  console.log(`Téléchargement de ${URL_TABLEAU} …`);
  const reponse = await fetch(URL_TABLEAU);
  if (!reponse.ok) throw new Error(`Téléchargement impossible (HTTP ${reponse.status})`);
  return extraireCsvDuZip(Buffer.from(await reponse.arrayBuffer()));
}

// ---------- Statistique Canada ----------

// Dernier prix connu au Québec pour chaque produit : { "Ground beef, per kilogram": { prix, mois } }
function prixQuebec(lignes) {
  const champ = (l, ...noms) => noms.map((n) => l[n]).find((v) => v !== undefined);
  const resultat = {};
  for (const l of lignes) {
    if (champ(l, "GEO") !== "Quebec") continue;
    const produit = champ(l, "Products", "Product", "Produits");
    const valeur = parseFloat(champ(l, "VALUE"));
    const mois = champ(l, "REF_DATE");
    if (!produit || Number.isNaN(valeur)) continue;
    if (!resultat[produit] || mois > resultat[produit].mois) resultat[produit] = { prix: valeur, mois };
  }
  return resultat;
}

// Taille du format vendu d'après le libellé : { masse: kg } ou { pieces: n }
function formatDuLibelle(libelle) {
  const l = libelle.toLowerCase();
  if (/per kilogram/.test(l)) return { masse: 1 };
  if (/per litre/.test(l)) return { masse: 1 };
  if (/dozen/.test(l)) return { pieces: 12 * (parseFloat(l) || 1) };
  const m = l.match(/(\d+(?:\.\d+)?)\s*(kilograms?|kg|grams?|g|litres?|l|millilitres?|ml)\b/);
  if (m) {
    const n = parseFloat(m[1]);
    const facteur = /^(kilogram|kg|litre|l$)/.test(m[2]) ? 1 : 0.001;
    return { masse: n * facteur };
  }
  if (/per unit|, unit|each/.test(l)) return { pieces: 1 };
  return null;
}

// Convertit le prix StatCan dans l'unité de l'ingrédient (kg, L ou unité)
function convertir(prix, format, ingredient) {
  if (ingredient.par === "unité") {
    if (format.pieces) return prix / format.pieces;
    return ingredient.poids ? (prix / format.masse) * ingredient.poids : null;
  }
  if (format.masse) return prix / format.masse;
  return ingredient.poids ? prix / (format.pieces * ingredient.poids) : null;
}

function mettreAJourIngredients(data, prixQc) {
  const produits = Object.keys(prixQc);
  const rapport = { ok: [], sansProduit: [], sansConversion: [] };
  let dernierMois = "";

  for (const [nom, ing] of Object.entries(data.ingredients)) {
    if (!ing.statcan) continue;
    const motif = new RegExp(ing.statcan, "i");
    const produit = produits.find((p) => motif.test(p));
    if (!produit) { rapport.sansProduit.push(`${nom} (motif « ${ing.statcan} »)`); continue; }
    const format = formatDuLibelle(produit);
    const prix = format && convertir(prixQc[produit].prix, format, ing);
    if (!prix) { rapport.sansConversion.push(`${nom} ← ${produit}`); continue; }
    const ancien = ing.prix;
    ing.prix = Math.round(prix * 100) / 100;
    ing.sourcePrix = `StatCan ${prixQc[produit].mois}`;
    if (prixQc[produit].mois > dernierMois) dernierMois = prixQc[produit].mois;
    rapport.ok.push(`${nom} : ${ancien} → ${ing.prix} $/${ing.par}  (${produit})`);
  }

  console.log(`\n✔ ${rapport.ok.length} ingrédient(s) mis à jour :`);
  rapport.ok.forEach((l) => console.log("   " + l));
  if (rapport.sansProduit.length) {
    console.log(`\n⚠ Produit introuvable dans le tableau (prix estimé conservé) — corriger le motif « statcan » dans prix.js :`);
    rapport.sansProduit.forEach((l) => console.log("   " + l));
  }
  if (rapport.sansConversion.length) {
    console.log(`\n⚠ Format non convertible (ajouter « poids » dans prix.js) :`);
    rapport.sansConversion.forEach((l) => console.log("   " + l));
  }
  if (rapport.ok.length) {
    data.source = `Statistique Canada, tableau 18-10-0245-01 (Québec, ${dernierMois}) + estimations`;
  }
  return rapport.ok.length;
}

// ---------- Coefficients des magasins ----------

const mediane = (v) => { const t = [...v].sort((a, b) => a - b); const m = t.length >> 1; return t.length % 2 ? t[m] : (t[m - 1] + t[m]) / 2; };

function mettreAJourMagasins(data) {
  if (!fs.existsSync(FICHIER_PANIER)) return;
  const lignes = lireCsv(fs.readFileSync(FICHIER_PANIER, "utf8"), ";");
  const nombre = (v) => parseFloat(String(v || "").replace(",", "."));
  console.log("\nCoefficients des magasins (panier-test.csv) :");
  for (const magasin of data.magasins) {
    const ratios = lignes.map((l) => {
      const ing = data.ingredients[l.cle];
      const prix = nombre(l[magasin.id]);
      const quantite = nombre(l.quantite);
      if (!ing || !prix || !quantite) return null;
      return (prix / quantite) / ing.prix;
    }).filter((r) => r);
    if (ratios.length < 3) {
      console.log(`   ${magasin.nom} : ${ratios.length} prix relevé(s), il en faut au moins 3 — coefficient inchangé (${magasin.coef})`);
      continue;
    }
    magasin.coef = Math.round(mediane(ratios) * 100) / 100;
    console.log(`   ${magasin.nom} : ${magasin.coef} (médiane de ${ratios.length} produits)`);
  }
}

// ---------- Programme ----------

async function main() {
  const arg = process.argv[2];
  const prix = lirePrix();

  if (arg !== "--magasins") {
    const lignes = lireCsv(await chargerTableau(arg));
    const prixQc = prixQuebec(lignes);
    console.log(`${Object.keys(prixQc).length} produits trouvés pour le Québec.`);
    if (!Object.keys(prixQc).length) throw new Error("Aucune ligne « Quebec » : vérifier que le fichier est la version anglaise du tableau 18-10-0245-01.");
    mettreAJourIngredients(prix.data, prixQc);
  }
  mettreAJourMagasins(prix.data);
  prix.data.miseAJour = new Date().toISOString().slice(0, 10);
  ecrirePrix(prix);
  console.log("\nprix.js enregistré.");
}

if (require.main === module) {
  main().catch((e) => { console.error("Erreur : " + e.message); process.exit(1); });
}

module.exports = { lirePrix, ecrirePrix, lireCsv, extraireCsvDuZip, formatDuLibelle, convertir, prixQuebec };
