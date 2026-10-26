// Menus de la semaine — logique de l'application (aucune dépendance, aucun serveur).

const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const PERSONNES_BASE = 4; // les quantités de recettes.js sont pour 4 personnes
const $ = (sel) => document.querySelector(sel);

const etat = {
  criteres: null,
  menus: [] // { creneau, recetteId, valide, refusees: [] }
};
const preferes = new Set();
const eviter = new Set();

// ---------- Utilitaires ----------

const normaliser = (txt) => txt.toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
// "tomates" doit trouver "tomate" et inversement
const racine = (txt) => { const n = normaliser(txt); return n.length > 4 ? n.replace(/(s|x)$/, "") : n; };
const contient = (recette, terme) => {
  const r = racine(terme);
  if (!r) return false;
  return recette.ingredients.some(([, , nom]) => normaliser(nom).includes(r)) ||
    normaliser(recette.nom).includes(r) || normaliser(recette.categorie).includes(r);
};
const dollars = (n) => n.toLocaleString("fr-CA", { style: "currency", currency: PRIX_DATA.devise });
const recetteParId = (id) => RECETTES.find((r) => r.id === id);

function sauver() {
  try {
    localStorage.setItem("menus-semaine", JSON.stringify({
      criteres: etat.criteres, menus: etat.menus, preferes: [...preferes], eviter: [...eviter]
    }));
  } catch (e) { /* stockage indisponible : on continue sans */ }
}

function charger() {
  try {
    return JSON.parse(localStorage.getItem("menus-semaine")) || null;
  } catch (e) { return null; }
}

// ---------- Formulaire ----------

function construireFormulaire() {
  $("#liste-magasins").innerHTML = PRIX_DATA.magasins.map((m) =>
    `<label><input type="checkbox" name="magasin" value="${m.id}"> ${m.nom}</label>`).join("");
  $("#liste-allergenes").innerHTML = ALLERGENES.map((a) =>
    `<label><input type="checkbox" name="allergene" value="${a.id}"> ${a.nom}</label>`).join("");

  brancherChips("#saisie-preferes", "#chips-preferes", preferes);
  brancherChips("#saisie-eviter", "#chips-eviter", eviter);
}

function brancherChips(selSaisie, selChips, ensemble) {
  const saisie = $(selSaisie);
  const ajouter = () => {
    saisie.value.split(",").map((v) => v.trim()).filter(Boolean).forEach((v) => ensemble.add(v));
    saisie.value = "";
    afficherChips(selChips, ensemble);
  };
  saisie.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); ajouter(); }
  });
  saisie.addEventListener("blur", ajouter);
  $(selChips).addEventListener("click", (e) => {
    const valeur = e.target.dataset.retirer;
    if (valeur) { ensemble.delete(valeur); afficherChips(selChips, ensemble); }
  });
}

function afficherChips(selChips, ensemble) {
  $(selChips).innerHTML = [...ensemble].map((v) =>
    `<span class="chip">${echapper(v)}<button type="button" data-retirer="${echapper(v)}" aria-label="Retirer">×</button></span>`).join("");
}

function echapper(txt) {
  return String(txt).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function lireCriteres() {
  const coches = (nom) => [...document.querySelectorAll(`input[name="${nom}"]:checked`)].map((i) => i.value);
  return {
    budget: Number($("#budget").value),
    personnes: Number($("#personnes").value),
    jours: Number($("#jours").value),
    repasParJour: Number($("#repasParJour").value),
    difficulte: Number($("#difficulte").value),
    temps: Number($("#temps").value),
    calories: Number($("#calories").value),
    magasins: coches("magasin"),
    allergenes: coches("allergene"),
    preferes: [...preferes],
    eviter: [...eviter]
  };
}

function remplirFormulaire(c) {
  ["budget", "personnes", "jours", "repasParJour", "difficulte", "temps", "calories"].forEach((k) => { $("#" + k).value = c[k]; });
  document.querySelectorAll('input[name="magasin"]').forEach((i) => { i.checked = c.magasins.includes(i.value); });
  document.querySelectorAll('input[name="allergene"]').forEach((i) => { i.checked = c.allergenes.includes(i.value); });
}

// ---------- Calculs ----------

// ---------- Prix (prix.js) ----------

// "Pommes de terre" et "pomme de terre" donnent la même clé
const clePrix = (nom) => normaliser(nom).split(" ").map((m) => (m.length > 3 ? m.replace(/[sx]$/, "") : m)).join(" ");
const TABLE_PRIX = new Map(Object.entries(PRIX_DATA.ingredients).map(([nom, p]) => [clePrix(nom), p]));
const UNITES_MASSE = { g: 0.001, kg: 1 };
const UNITES_VOLUME = { cl: 0.01, L: 1 };
const UNITES_PLACARD = ["c. à s.", "c. à c."]; // épices, huiles… : considérées comme déjà au placard

// Coût (prix moyen Québec) d'une quantité d'ingrédient, ou null si non chiffrable
function coutIngredient(q, u, nom) {
  const p = TABLE_PRIX.get(clePrix(nom));
  if (q === null || UNITES_PLACARD.includes(u)) return 0;
  if (!p) return null;
  const masse = u in UNITES_MASSE ? q * UNITES_MASSE[u] : u in UNITES_VOLUME ? q * UNITES_VOLUME[u] : null; // 1 L ≈ 1 kg
  const pieces = masse === null ? q : null;
  let quantite = null;
  if (p.par === "unité") quantite = pieces ?? (p.poids ? masse / p.poids : null);
  else quantite = masse ?? (p.poids ? pieces * p.poids : null);
  return quantite === null ? null : quantite * p.prix;
}

// Coût d'une recette pour 4 personnes, au prix moyen
const coutRecetteBase = (recette) =>
  recette.ingredients.reduce((s, [q, u, nom]) => s + (coutIngredient(q, u, nom) || 0), 0);

// Coefficient moyen des magasins choisis (1 si aucun)
function coefMagasins(c) {
  const choisis = PRIX_DATA.magasins.filter((m) => c.magasins.includes(m.id));
  if (!choisis.length) return 1;
  return choisis.reduce((s, m) => s + m.coef, 0) / choisis.length;
}

const coutPortion = (recette, c) => coutRecetteBase(recette) / PERSONNES_BASE * coefMagasins(c);
const nbRepas = (c) => c.jours * c.repasParJour;
const plafondPortion = (c) => c.budget / (nbRepas(c) * c.personnes);

function estCompatible(recette, c) {
  if (recette.difficulte > c.difficulte) return false;
  if (recette.temps > c.temps) return false;
  if (recette.calories > c.calories) return false;
  if (coutPortion(recette, c) > plafondPortion(c)) return false;
  if (recette.allergenes.some((a) => c.allergenes.includes(a))) return false;
  if (c.eviter.some((t) => contient(recette, t))) return false;
  return true;
}

const scorePreference = (recette, c) => c.preferes.filter((t) => contient(recette, t)).length;

// Choisit une recette parmi les candidates : préférences d'abord, de la variété, un peu de hasard.
function choisir(candidates, c, dejaChoisies) {
  if (!candidates.length) return null;
  const categories = dejaChoisies.map((id) => recetteParId(id)?.categorie);
  const note = (r) => scorePreference(r, c) * 3
    - categories.filter((cat) => cat === r.categorie).length * 0.8
    + Math.random() * 2;
  return candidates.map((r) => ({ r, n: note(r) })).sort((a, b) => b.n - a.n)[0].r;
}

function libellesCreneaux(c) {
  const libelles = [];
  for (let j = 0; j < c.jours; j++) {
    if (c.repasParJour === 2) libelles.push(`${JOURS[j]} — déjeuner`);
    libelles.push(c.repasParJour === 2 ? `${JOURS[j]} — dîner` : JOURS[j]);
  }
  return libelles;
}

// ---------- Génération et remplacement ----------

function genererMenus(c) {
  const compatibles = RECETTES.filter((r) => estCompatible(r, c));
  const alertes = [];

  if (!compatibles.length) {
    etat.menus = [];
    afficherAlerte("Aucune recette ne correspond à tous tes critères. Augmente le budget, la durée, les calories ou la difficulté.");
    return;
  }
  if (compatibles.length < nbRepas(c)) {
    alertes.push(`Seulement ${compatibles.length} recette(s) compatible(s) pour ${nbRepas(c)} repas : certaines reviendront plusieurs fois. Élargis tes critères pour plus de variété.`);
  }

  const choisies = [];
  etat.menus = libellesCreneaux(c).map((creneau) => {
    let candidates = compatibles.filter((r) => !choisies.includes(r.id));
    if (!candidates.length) candidates = compatibles; // pas assez de recettes : on autorise les doublons
    const r = choisir(candidates, c, choisies);
    choisies.push(r.id);
    return { creneau, recetteId: r.id, valide: false, refusees: [] };
  });
  afficherAlerte(alertes.join(" "));
}

function proposerAutre(index) {
  const c = etat.criteres;
  const menu = etat.menus[index];
  menu.refusees.push(menu.recetteId);

  const ailleurs = etat.menus.filter((_, i) => i !== index).map((m) => m.recetteId);
  const compatibles = RECETTES.filter((r) => estCompatible(r, c));
  let candidates = compatibles.filter((r) => !menu.refusees.includes(r.id) && !ailleurs.includes(r.id));

  if (!candidates.length) {
    // Tout a été proposé : on repart de zéro pour ce créneau (sauf le plat qu'on vient de refuser)
    menu.refusees = [menu.recetteId];
    candidates = compatibles.filter((r) => r.id !== menu.recetteId && !ailleurs.includes(r.id));
    if (!candidates.length) candidates = compatibles.filter((r) => r.id !== menu.recetteId);
    afficherAlerte(candidates.length
      ? `Toutes les recettes compatibles ont été proposées pour « ${menu.creneau} » : on recommence le tour.`
      : "Aucune autre recette ne correspond à tes critères. Élargis-les pour avoir plus de choix.");
    if (!candidates.length) { menu.refusees.pop(); return; }
  }

  menu.recetteId = choisir(candidates, c, ailleurs).id;
  menu.valide = false;
  sauver();
  afficherMenus();
}

// ---------- Photos (TheMealDB, mise en cache locale) ----------

const cachePhotos = (() => {
  try { return JSON.parse(localStorage.getItem("photos-recettes")) || {}; } catch (e) { return {}; }
})();

async function photoRecette(recette) {
  if (recette.id in cachePhotos) return cachePhotos[recette.id];
  let url = null;
  try {
    const rep = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recette.photo)}`);
    const data = await rep.json();
    url = data.meals?.[0]?.strMealThumb || null;
    if (!url && recette.photoIng) {
      // Secours : une photo d'un plat avec le même ingrédient principal
      const rep2 = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(recette.photoIng)}`);
      const data2 = await rep2.json();
      if (data2.meals?.length) url = data2.meals[recette.id.length % data2.meals.length].strMealThumb;
    }
  } catch (e) {
    return null; // hors ligne : on affiche l'emoji, sans mémoriser l'échec
  }
  cachePhotos[recette.id] = url;
  try { localStorage.setItem("photos-recettes", JSON.stringify(cachePhotos)); } catch (e) { /* ignoré */ }
  return url;
}

function appliquerPhoto(element, recette) {
  photoRecette(recette).then((url) => {
    if (!url || element.dataset.recette !== recette.id) return;
    const img = new Image();
    img.onload = () => {
      element.style.backgroundImage = `url("${url}")`;
      element.querySelector(".emoji")?.remove();
    };
    img.src = url;
  });
}

// ---------- Affichage ----------

function afficherAlerte(message) {
  const el = $("#alerte");
  el.textContent = message || "";
  el.classList.toggle("cache", !message);
}

function afficherEtape(id) {
  ["#etape-criteres", "#etape-menus", "#etape-courses"].forEach((s) => $(s).classList.toggle("cache", s !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function afficherResume() {
  const c = etat.criteres;
  const total = etat.menus.reduce((s, m) => s + coutPortion(recetteParId(m.recetteId), c) * c.personnes, 0);
  const valides = etat.menus.filter((m) => m.valide).length;
  const classe = total > c.budget ? "depasse" : "ok";
  $("#resume-budget").innerHTML =
    `<strong>${valides}/${etat.menus.length}</strong> repas validés · ` +
    `Coût estimé : <span class="${classe}">${dollars(total)}</span> pour un budget de ${dollars(c.budget)} · ` +
    `${c.personnes} pers. · max ${dollars(plafondPortion(c))} par portion`;
  $("#btn-courses").disabled = !etat.menus.length || valides < etat.menus.length;
}

function afficherMenus() {
  const c = etat.criteres;
  const grille = $("#grille-menus");
  grille.innerHTML = "";

  etat.menus.forEach((m, i) => {
    const r = recetteParId(m.recetteId);
    const carte = document.createElement("article");
    carte.className = "menu" + (m.valide ? " valide" : "");
    carte.innerHTML = `
      <div class="creneau">${m.creneau}</div>
      <div class="photo" data-recette="${r.id}" data-detail="${r.id}">
        <span class="emoji">${r.emoji}</span>
        ${m.valide ? '<span class="badge-valide">✓ Validé</span>' : ""}
      </div>
      <div class="corps">
        <h3 data-detail="${r.id}">${r.nom}</h3>
        <div class="infos">
          <span>⏱ ${r.temps} min</span>
          <span>📊 ${DIFFICULTES[r.difficulte]}</span>
          <span>🔥 ${r.calories} kcal</span>
          <span>💶 ${dollars(coutPortion(r, c) * c.personnes)}</span>
        </div>
        <div class="boutons">
          ${m.valide
            ? `<button class="bouton" data-action="annuler" data-index="${i}">Annuler</button>`
            : `<button class="bouton btn-valider" data-action="valider" data-index="${i}">✓ Valider</button>`}
          <button class="bouton" data-action="autre" data-index="${i}">↻ Autre</button>
        </div>
      </div>`;
    grille.appendChild(carte);
    appliquerPhoto(carte.querySelector(".photo"), r);
  });
  afficherResume();
}

function formaterQte(qte, unite) {
  if (qte === null) return "";
  let q = qte;
  if (["g", "cl", "L", "kg"].includes(unite)) {
    q = unite === "g" && q > 50 ? Math.round(q / 10) * 10 : Math.round(q * 10) / 10;
  } else {
    q = Math.ceil(q * 2) / 2; // pièces, cuillères… arrondi au demi supérieur
  }
  return `${q.toLocaleString("fr-CA")}${unite ? " " + unite : ""}`;
}

function ouvrirDetail(id) {
  const r = recetteParId(id);
  const c = etat.criteres;
  const ratio = c.personnes / PERSONNES_BASE;
  const allergenes = r.allergenes.map((a) => ALLERGENES.find((x) => x.id === a).nom).join(", ") || "aucun allergène majeur identifié";

  $("#contenu-modale").innerHTML = `
    <div class="modale-photo" data-recette="${r.id}"><span class="emoji">${r.emoji}</span></div>
    <div class="modale-corps">
      <h2>${r.nom}</h2>
      <div class="infos">
        <span>⏱ ${r.temps} min</span>
        <span>📊 ${DIFFICULTES[r.difficulte]}</span>
        <span>🔥 ${r.calories} kcal / pers.</span>
        <span>💶 ${dollars(coutPortion(r, c) * c.personnes)} (${dollars(coutPortion(r, c))} / pers.)</span>
      </div>
      <h3>Ingrédients pour ${c.personnes} personne${c.personnes > 1 ? "s" : ""}</h3>
      <ul>${r.ingredients.map(([q, u, nom]) => `<li>${q === null ? "" : "<strong>" + formaterQte(q * ratio, u) + "</strong> "}${nom}${q === null ? " (selon goût)" : ""}</li>`).join("")}</ul>
      <h3>Préparation</h3>
      <ol>${r.etapes.map((e) => `<li>${e}</li>`).join("")}</ol>
      <p class="infos"><span>⚠️ Allergènes : ${allergenes}</span></p>
    </div>`;
  appliquerPhoto($("#contenu-modale .modale-photo"), r);
  $("#modale").showModal();
}

function listeCourses() {
  const c = etat.criteres;
  const ratio = c.personnes / PERSONNES_BASE;
  const total = new Map();
  etat.menus.forEach((m) => {
    recetteParId(m.recetteId).ingredients.forEach(([q, u, nom]) => {
      const cle = `${normaliser(nom)}|${u}`;
      const ligne = total.get(cle) || { nom, unite: u, qte: q === null ? null : 0 };
      if (q !== null) ligne.qte = (ligne.qte || 0) + q * ratio;
      total.set(cle, ligne);
    });
  });
  return [...total.values()].sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

function afficherCourses() {
  const lignes = listeCourses();
  const coef = coefMagasins(etat.criteres);
  let total = 0;
  $("#liste-courses").innerHTML = lignes.map((l) => {
    const cout = coutIngredient(l.qte, l.unite, l.nom);
    total += (cout || 0) * coef;
    const prix = cout ? ` <em class="prix">≈ ${dollars(cout * coef)}</em>` : "";
    return `<li><label><input type="checkbox"><span>${l.qte === null ? "" : "<strong>" + formaterQte(l.qte, l.unite) + "</strong> "}${l.nom}${prix}</span></label></li>`;
  }).join("");
  $("#total-courses").textContent = `Total estimé : ${dollars(total)} (épices et huiles non comptées)`;
  afficherEtape("#etape-courses");
}

// ---------- Évènements ----------

$("#form-criteres").addEventListener("submit", (e) => {
  e.preventDefault();
  // Récupère une saisie en cours non validée par Entrée
  ["#saisie-preferes", "#saisie-eviter"].forEach((s) => $(s).dispatchEvent(new Event("blur")));
  etat.criteres = lireCriteres();
  genererMenus(etat.criteres);
  sauver();
  afficherMenus();
  afficherEtape("#etape-menus");
});

$("#grille-menus").addEventListener("click", (e) => {
  const detail = e.target.closest("[data-detail]");
  if (detail) return ouvrirDetail(detail.dataset.detail);
  const bouton = e.target.closest("[data-action]");
  if (!bouton) return;
  const i = Number(bouton.dataset.index);
  if (bouton.dataset.action === "autre") return proposerAutre(i);
  etat.menus[i].valide = bouton.dataset.action === "valider";
  sauver();
  afficherMenus();
});

$("#btn-tout-valider").addEventListener("click", () => {
  etat.menus.forEach((m) => { m.valide = true; });
  sauver();
  afficherMenus();
});

$("#btn-courses").addEventListener("click", afficherCourses);
$("#btn-modifier").addEventListener("click", () => afficherEtape("#etape-criteres"));
$("#btn-retour-menus").addEventListener("click", () => afficherEtape("#etape-menus"));
$("#btn-imprimer").addEventListener("click", () => window.print());
$("#btn-copier").addEventListener("click", async () => {
  const texte = listeCourses().map((l) => `- ${l.qte === null ? "" : formaterQte(l.qte, l.unite) + " "}${l.nom}`).join("\n");
  try {
    await navigator.clipboard.writeText(texte);
    $("#btn-copier").textContent = "Copié ✓";
  } catch (e) {
    $("#btn-copier").textContent = "Copie impossible";
  }
  setTimeout(() => { $("#btn-copier").textContent = "Copier la liste"; }, 2000);
});

$("#fermer-modale").addEventListener("click", () => $("#modale").close());
$("#modale").addEventListener("click", (e) => { if (e.target.id === "modale") $("#modale").close(); });

// ---------- Démarrage ----------

$("#source-prix").textContent = `${PRIX_DATA.source}, mise à jour ${PRIX_DATA.miseAJour}`;
construireFormulaire();
const sauvegarde = charger();
if (sauvegarde?.criteres) {
  (sauvegarde.preferes || []).forEach((v) => preferes.add(v));
  (sauvegarde.eviter || []).forEach((v) => eviter.add(v));
  afficherChips("#chips-preferes", preferes);
  afficherChips("#chips-eviter", eviter);
  remplirFormulaire(sauvegarde.criteres);
  etat.criteres = sauvegarde.criteres;
  etat.menus = (sauvegarde.menus || []).filter((m) => recetteParId(m.recetteId));
  if (etat.menus.length) {
    afficherMenus();
    afficherEtape("#etape-menus");
  }
}
