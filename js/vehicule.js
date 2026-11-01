const liste =
  typeof vehicles !== "undefined" ? vehicles :
  typeof vehicules !== "undefined" ? vehicules :
  typeof VEHICULES !== "undefined" ? VEHICULES : [];

const NUMERO = (typeof CONFIG !== "undefined" && CONFIG.whatsapp) || "22997000000";

const id = new URLSearchParams(location.search).get("id");
const v = liste.find(x => String(x.id) === id);
const zone = document.getElementById("fiche");

if (!v) {
  zone.innerHTML = "<p>Véhicule introuvable.</p>";
} else {
  const nom = `${v.marque || ""} ${v.modele || ""} ${v.annee || ""}`.trim();
  const message = encodeURIComponent("Bonjour, je suis intéressé par : " + nom);
  const details = Object.entries(v)
    .filter(([k]) => !["id", "image", "images", "prix"].includes(k))
    .map(([k, val]) => `<p><strong>${k} :</strong> ${val}</p>`).join("");

  document.title = nom;
  zone.innerHTML = `
    <img src="${v.image || (v.images && v.images[0]) || ""}" alt="${nom}">
    <h1>${nom}</h1>
    <p class="prix">${Number(v.prix).toLocaleString("fr-FR")} FCFA</p>
    <div class="details">${details}</div>
    <a class="btn" href="https://wa.me/${NUMERO}?text=${message}">Contacter sur WhatsApp</a>`;
}
