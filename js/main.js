(function () {
  // ===== À CHANGER : mets ton vrai numéro =====
  var NUMERO_WHATSAPP = "2290128894743";  // 2290128894743, sans + ni espaces
  var NUMERO_APPEL = "+2290128894347";    // avec +2290128894743
  var MESSAGE = "Bonjour, je suis intéressé par vos véhicules.";
  // ============================================

  document.addEventListener("click", function (e) {
    var el = e.target.closest("a, button");
    if (!el) return;
    var texte = (el.textContent || "").toLowerCase();

    if (texte.indexOf("whatsapp") !== -1) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var m = (el.href || "").match(/[?&]text=([^&]*)/);
      var msg = m ? m[1] : encodeURIComponent(MESSAGE);
      window.location.href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + msg;
    } else if (texte.indexOf("appeler") !== -1) {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href = "tel:" + NUMERO_APPEL;
    }
  }, true);
})();// Fonctions communes à toutes les pages
(function () {
  const C = window.SITE_CONFIG || {};
  const V = window.VEHICLES || [];

  // Image de remplacement (si la photo n'existe pas)
  const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">' +
    '<rect width="800" height="500" fill="#1a1a1a"/>' +
    '<text x="400" y="260" fill="#C9A24B" font-size="36" text-anchor="middle" font-family="sans-serif">Photo à venir</text></svg>'
  );
  document.addEventListener("error", function (e) {
    const el = e.target;
    if (el.tagName !== "IMG") return;
    if (el.classList.contains("logo-img")) { el.style.display = "none"; return; }
    if (!el.dataset.fb) { el.dataset.fb = "1"; el.src = PLACEHOLDER; }
  }, true);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function formatPrix(n) {
    return new Intl.NumberFormat("fr-FR").format(n) + " " + (C.devise || "FCFA");
  }
  function formatKm(n) {
    return new Intl.NumberFormat("fr-FR").format(n) + " km";
  }

  // WhatsApp avec message automatique
  function whatsappLink(v) {
    const msg = v
      ? "Bonjour, je suis intéressé par la " + v.marque + " " + v.modele + " " + v.annee + " (réf. " + v.id + ") vue sur votre site."
      : "Bonjour, je souhaite avoir des informations sur vos véhicules.";
    return "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(msg);
  }

  // Favoris (localStorage)
  function getFavs() {
    try { return JSON.parse(localStorage.getItem("favoris") || "[]"); }
    catch (e) { return []; }
  }
  function saveFavs(list) {
    try { localStorage.setItem("favoris", JSON.stringify(list)); } catch (e) {}
  }
  function updateFavUI() {
    const favs = getFavs();
    document.querySelectorAll("[data-fav-count]").forEach(el => el.textContent = favs.length);
    document.querySelectorAll("[data-fav]").forEach(btn => {
      const on = favs.includes(Number(btn.dataset.fav));
      btn.classList.toggle("is-fav", on);
      btn.textContent = on ? "♥" : "♡";
      btn.setAttribute("aria-label", on ? "Retirer des favoris" : "Ajouter aux favoris");
    });
  }
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    const id = Number(btn.dataset.fav);
    let favs = getFavs();
    favs = favs.includes(id) ? favs.filter(x => x !== id) : favs.concat(id);
    saveFavs(favs);
    updateFavUI();
    document.dispatchEvent(new CustomEvent("favoris:change"));
  });

  // Carte véhicule
  function createCard(v) {
    const photo = (v.photos && v.photos[0]) || "";
    const vendu = v.statut === "vendu";
    return '<article class="card' + (vendu ? " is-sold" : "") + '">' +
      '<a class="card-img" href="vehicule.html?id=' + v.id + '">' +
        '<img src="' + esc(photo) + '" alt="' + esc(v.marque + " " + v.modele) + '" loading="lazy">' +
        '<span class="badge ' + (vendu ? "badge-sold" : "badge-ok") + '">' + (vendu ? "Vendu" : "Disponible") + '</span>' +
        (v.demo ? '<span class="badge badge-demo">Exemple</span>' : "") +
      '</a>' +
      '<button class="fav-btn" data-fav="' + v.id + '" aria-label="Ajouter aux favoris">♡</button>' +
      '<div class="card-body">' +
        '<h3>' + esc(v.marque + " " + v.modele) + '</h3>' +
        '<p class="price">' + formatPrix(v.prix) + '</p>' +
        '<p class="meta">' + v.annee + " · " + formatKm(v.km) + " · " + esc(v.carburant) + " · " + esc(v.transmission) + '</p>' +
        '<p class="loc">📍 ' + esc(v.localisation) + '</p>' +
        '<div class="card-actions">' +
          '<a class="btn btn-small btn-dark" href="vehicule.html?id=' + v.id + '">Détails</a>' +
          '<a class="btn btn-small btn-wa" href="' + whatsappLink(v) + '" target="_blank" rel="noopener">WhatsApp</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }
  function renderGrid(el, list) {
    if (!el) return;
    el.innerHTML = list.length ? list.map(createCard).join("") : '<p class="empty">Aucun véhicule à afficher.</p>';
    updateFavUI();
  }

  // Remplissage automatique depuis config.js
  function applyConfig() {
    document.querySelectorAll("[data-config]").forEach(el => { el.textContent = C[el.dataset.config] || ""; });
    document.querySelectorAll("[data-config-src]").forEach(el => { el.src = C[el.dataset.configSrc] || ""; });
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = whatsappLink(); });
    document.querySelectorAll("[data-tel]").forEach(el => { el.href = "tel:" + (C.telephone || "").replace(/\s/g, ""); });
    document.querySelectorAll("[data-mail]").forEach(el => { el.href = "mailto:" + (C.email || ""); });
    document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  // Menu mobile
  function initMenu() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (!burger || !nav) return;
    burger.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      burger.textContent = open ? "✕" : "☰";
    });
  }

  // Accueil : populaires + dernières annonces
  function initHome() {
    const pop = document.getElementById("popularGrid");
    const last = document.getElementById("latestGrid");
    if (pop) renderGrid(pop, V.filter(v => v.populaire && v.statut === "disponible").slice(0, 3));
    if (last) renderGrid(last, V.slice().sort((a, b) => b.id - a.id).slice(0, 6));
  }

  // Partage avec les autres fichiers (catalogue.js, details.js)
  window.App = { esc, formatPrix, formatKm, whatsappLink, getFavs, createCard, renderGrid, updateFavUI };

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initMenu();
    initHome();
    updateFavUI();
  });
})();
