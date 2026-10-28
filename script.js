// ===== Dina projekt — redigera den här listan =====
const PROJECTS = [
  {
    title: "Nexvio",
    description: "AI-driven ekonomiplattform som jag bygger på egen hand, med frontend, backend, autentisering och databas.",
    highlights: [
      "REST-API:er i FastAPI med registrering, inloggning och JWT-autentisering.",
      "Datamodeller och migreringar med SQLAlchemy och Alembic mot PostgreSQL.",
      "OpenAI API och OCR som gör om fakturor, kvitton och kontoutdrag till strukturerad data.",
      "Testskript i Python som verifierar AI-utdata och dokumenttolkning.",
      "Backend och databas containeriserade med Docker Compose.",
    ],
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/allawiiiiii/Nexvio",
  },
  {
    title: "E-COM 3.0",
    description: "Skrivbordsbaserat e-handelssystem för hantering av produkter, kunder och ordrar.",
    highlights: [
      "Produktsökning, lagerhantering och databasintegration med JDBC och SQLite.",
      "Lagerbaserad arkitektur med service- och repository-mönster.",
      "Grafiskt gränssnitt byggt i Java Swing.",
    ],
    tags: ["Java", "SQLite", "JDBC", "Java Swing"],
  },
];

// Ord som skrivs ut i hero-rubriken
const TYPED_WORDS = ["webbappar.", "REST-API:er.", "AI-drivna tjänster."];

// ===== Rendera projektkort =====
const projectsEl = document.getElementById("projects");

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

projectsEl.innerHTML = PROJECTS.map((p) => `
  <article class="card">
    <div class="card-top">
      <span class="card-icon" aria-hidden="true">{ }</span>
      <div class="card-links">
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}
      </div>
    </div>
    <h3>${escapeHtml(p.title)}</h3>
    <p>${escapeHtml(p.description)}</p>
    ${p.highlights ? `<ul class="bullets">${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>` : ""}
    <ul class="tags">${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
  </article>
`).join("");

// ===== Skrivmaskinseffekt =====
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typedEl.textContent = TYPED_WORDS[0];
} else {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  (function tick() {
    const word = TYPED_WORDS[wordIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 90;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % TYPED_WORDS.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  })();
}

// ===== Visa sektioner vid scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Mobilmeny =====
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
    toggle.textContent = "☰";
  });
});

// ===== Årtal i footern =====
document.getElementById("year").textContent = new Date().getFullYear();
