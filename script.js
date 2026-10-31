// ===== Dina projekt — redigera den här listan =====
const PROJECTS = [
  {
    title: "Nexvio",
    description: {
      sv: "AI-driven ekonomiplattform som jag bygger på egen hand, med frontend, backend, autentisering och databas.",
      en: "AI-driven finance platform I'm building on my own, covering frontend, backend, authentication and database.",
    },
    highlights: {
      sv: [
        "REST-API:er i FastAPI med registrering, inloggning och JWT-autentisering.",
        "Datamodeller och migreringar med SQLAlchemy och Alembic mot PostgreSQL.",
        "OpenAI API och OCR som gör om fakturor, kvitton och kontoutdrag till strukturerad data.",
        "Testskript i Python som verifierar AI-utdata och dokumenttolkning.",
        "Backend och databas containeriserade med Docker Compose.",
      ],
      en: [
        "REST APIs in FastAPI with registration, login and JWT authentication.",
        "Data models and migrations with SQLAlchemy and Alembic on PostgreSQL.",
        "OpenAI API and OCR that turn invoices, receipts and bank statements into structured data.",
        "Python test scripts that verify AI output and document parsing.",
        "Backend and database containerised with Docker Compose.",
      ],
    },
    tags: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/allawiiiiii/Nexvio",
  },
  {
    title: "E-COM 3.0",
    description: {
      sv: "Skrivbordsbaserat e-handelssystem för hantering av produkter, kunder och ordrar.",
      en: "Desktop e-commerce system for managing products, customers and orders.",
    },
    highlights: {
      sv: [
        "Produktsökning, lagerhantering och databasintegration med JDBC och SQLite.",
        "Lagerbaserad arkitektur med service- och repository-mönster.",
        "Grafiskt gränssnitt byggt i Java Swing.",
      ],
      en: [
        "Product search, inventory management and database integration with JDBC and SQLite.",
        "Layered architecture using service and repository patterns.",
        "Graphical interface built with Java Swing.",
      ],
    },
    tags: ["Java", "SQLite", "JDBC", "Java Swing"],
    github: "https://github.com/allawiiiiii/ecom3",
  },
  {
    title: "Everything Madrid",
    description: {
      sv: "Fansida om Real Madrid med spelarkort som laddas dynamiskt från en JSON-fil.",
      en: "Real Madrid fan site with player cards loaded dynamically from a JSON file.",
    },
    highlights: {
      sv: [
        "Spelarkort som hämtas med fetch och byggs upp med DOM-manipulering.",
        "Sökfunktion som filtrerar spelare i realtid.",
        "Växlar mellan vyer utan att ladda om sidan.",
      ],
      en: [
        "Player cards fetched with fetch and built with DOM manipulation.",
        "Search that filters players in real time.",
        "Switches between views without reloading the page.",
      ],
    },
    tags: ["JavaScript", "HTML", "CSS", "JSON"],
    github: "https://github.com/allawiiiiii/Everything-Madrid",
  },
];

// Ord som skrivs ut i hero-rubriken
const TYPED_WORDS = {
  sv: ["webbappar.", "REST-API:er.", "AI-drivna tjänster."],
  en: ["web apps.", "REST APIs.", "AI-powered services."],
};

// ===== Engelska texter — svenskan läses direkt från index.html =====
const EN = {
  "meta.title": "Ali Erbeia — Software Developer",
  "nav.about": "About me",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "hero.hi": "Hi, my name is",
  "hero.build": "I build",
  "hero.lead": "Software developer with professional experience in React and TypeScript and hands-on full-stack experience from my own projects. I'm passionate about problem solving, backend development and AI.",
  "hero.cta": "See my projects",
  "hero.cv": "Download CV (Swedish)",
  "about.p1": "I'm a trained software developer specialising in testing, and I currently work part-time as a developer at Caiator AB in Helsingborg, Sweden, building React and TypeScript frontends from Figma designs.",
  "about.p2": "In my spare time I'm building Nexvio, an AI-driven finance platform, from scratch with Next.js, FastAPI and PostgreSQL. I like understanding the whole chain, from database and API to user interface.",
  "about.tech": "Technologies I work with:",
  "about.testing": "Unit, integration &amp; E2E testing",
  "about.languages": "Languages: fluent Swedish, English and Arabic, basic French.",
  "exp.caiator.date": "Sep 2025 — present",
  "exp.caiator.role": 'Software Developer, part-time <span class="accent">@ Caiator AB</span>',
  "exp.caiator.bullets": `
    <li>Develop frontend features in React and TypeScript, both in existing code and in new components.</li>
    <li>Revamped a customer-facing demo product and built a nine-step survey from Figma designs, together with a UI/UX designer.</li>
    <li>Contributed to an AI initiative by implementing an AI agent in Microsoft Teams.</li>
    <li>Work with Git/GitHub, branches and code-reviewed pull requests.</li>`,
  "exp.jensen.date": "Aug 2024 — May 2026",
  "exp.jensen.role": 'Software Developer, Testing <span class="accent">@ Jensen Yrkeshögskola</span>',
  "exp.jensen.text": "Higher vocational degree in Malmö, including two 12-week internships.",
  "exp.halmstad.role": 'MSc Engineering, Intelligent Systems <span class="accent">@ Halmstad University</span>',
  "exp.halmstad.text": "Master of Science in Engineering programme in intelligent systems (not completed).",
  "contact.kicker": "04. What's next?",
  "contact.title": "Get in touch",
  "contact.lead": "Have a job, a project or just want to say hi? My inbox is always open.",
  "contact.cta": "Say hello",
  "footer.built": "Built by Ali Erbeia",
};

const UI = {
  sv: { menuOpen: "Öppna meny", switchTo: "EN", switchLabel: "Switch to English" },
  en: { menuOpen: "Open menu", switchTo: "SV", switchLabel: "Byt till svenska" },
};

// Spara de svenska originaltexterna så att vi kan växla tillbaka
const i18nEls = document.querySelectorAll("[data-i18n]");
const SV = { "meta.title": document.title };
i18nEls.forEach((el) => { SV[el.dataset.i18n] = el.innerHTML; });

let lang = "sv";

// ===== Rendera projektkort =====
const projectsEl = document.getElementById("projects");

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderProjects() {
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
      <p>${escapeHtml(p.description[lang])}</p>
      ${p.highlights ? `<ul class="bullets">${p.highlights[lang].map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>` : ""}
      <ul class="tags">${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
    </article>
  `).join("");
}

// ===== Språkväxling =====
const langToggle = document.querySelector(".lang-toggle");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

function setLang(newLang) {
  lang = newLang;
  const texts = lang === "en" ? EN : SV;
  document.documentElement.lang = lang;
  document.title = texts["meta.title"];
  i18nEls.forEach((el) => { el.innerHTML = texts[el.dataset.i18n]; });

  langToggle.textContent = UI[lang].switchTo;
  langToggle.setAttribute("aria-label", UI[lang].switchLabel);
  toggle.setAttribute("aria-label", UI[lang].menuOpen);

  renderProjects();
  restartTyping();
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

langToggle.addEventListener("click", () => setLang(lang === "sv" ? "en" : "sv"));

// ===== Skrivmaskinseffekt =====
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let typingTimer;

function restartTyping() {
  clearTimeout(typingTimer);
  const words = TYPED_WORDS[lang];

  if (reduceMotion) {
    typedEl.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  (function tick() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 90;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    typingTimer = setTimeout(tick, delay);
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

// ===== Start: sparat språk, annars webbläsarens språk =====
let startLang;
try { startLang = localStorage.getItem("lang"); } catch (e) {}
if (!startLang) startLang = navigator.language.toLowerCase().startsWith("sv") ? "sv" : "en";
setLang(startLang);
