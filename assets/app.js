(() => {
  "use strict";
  const T = {
    ca: { hi: "> hola, sóc", lead: "Em dedico a construir coses: programari, circuits i peces impreses en 3D. Aquí hi ha una selecció del que faig.",
      btn_projects: "Veure projectes", h_projects: "Projectes", h_about: "Una mica de mi",
      a3d_t: "Impressió 3D", a3d_d: "M'encanta dissenyar i imprimir peces: des de prototips funcionals fins a petits objectes del dia a dia.",
      ard_t: "Arduino", ard_d: "Vaig començar programant Arduinos de manera autodidacta, i d'aquí va néixer el gust per programar i crear.",
      lng_t: "Idiomes", lng_d: "M'agrada aprendre idiomes. Ara parlo:", more: "Veure al GitHub" },
    es: { hi: "> hola, soy", lead: "Me dedico a construir cosas: software, circuitos y piezas impresas en 3D. Aquí tienes una selección de lo que hago.",
      btn_projects: "Ver proyectos", h_projects: "Proyectos", h_about: "Un poco sobre mí",
      a3d_t: "Impresión 3D", a3d_d: "Me encanta diseñar e imprimir piezas: desde prototipos funcionales hasta pequeños objetos del día a día.",
      ard_t: "Arduino", ard_d: "Empecé programando Arduinos de forma autodidacta, y de ahí nació el gusto por programar y crear.",
      lng_t: "Idiomas", lng_d: "Me gusta aprender idiomas. Ahora hablo:", more: "Ver en GitHub" },
    en: { hi: "> hi, I'm", lead: "I like building things: software, circuits and 3D-printed parts. Here's a selection of what I do.",
      btn_projects: "See projects", h_projects: "Projects", h_about: "A bit about me",
      a3d_t: "3D printing", a3d_d: "I love designing and printing parts: from functional prototypes to small everyday objects.",
      ard_t: "Arduino", ard_d: "I started out programming Arduinos, self-taught, and that's where my love of coding and making came from.",
      lng_t: "Languages", lng_d: "I enjoy learning languages. Currently I speak:", more: "View on GitHub" }
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let lang = "ca";
  try { lang = localStorage.getItem("lang") || (navigator.language || "ca").slice(0, 2); }
  catch (e) { lang = (navigator.language || "ca").slice(0, 2); }
  if (!T[lang]) lang = "ca";

  let data = { github: "SeergiCureero", projects: [], languages: [] };

  function render() {
    document.documentElement.lang = lang;
    $$("[data-i]").forEach((el) => (el.textContent = T[lang][el.dataset.i]));
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === lang));

    const gh = "https://github.com/" + data.github;
    const cards = data.projects.map((p) => `<div class="card">
        <h3>${esc(p.name)}</h3>
        <p>${esc((p.d && (p.d[lang] || p.d.en)) || "")}</p>
        <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="links">${(p.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>
      </div>`);
    cards.push(`<a class="card" href="${esc(gh)}" target="_blank" rel="noopener">
      <h3>GitHub<span>↗</span></h3><p>github.com/${esc(data.github)}</p>
      <div class="tags"><span class="tag">${esc(T[lang].more)}</span></div></a>`);
    $("#project-grid").innerHTML = cards.join("");

    $("#langs").innerHTML = data.languages
      .map((l) => `<span class="tag ${l.level && l.level !== "native" ? "dim" : ""}">${esc(l.name)}</span>`).join("");
    $("#gh-link").href = gh;
  }

  $$(".lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.l;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  }));
  $("#yr").textContent = new Date().getFullYear();

  fetch("data/content.json")
    .then((r) => r.json())
    .then((j) => { data = j; render(); })
    .catch((e) => { console.error("No s'ha pogut carregar data/content.json", e); render(); });
  render();
})();
