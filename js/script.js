/* ==========================================================
   1. CONTENT: edit everything here. All values are SAMPLE
   placeholders. Leave a field empty ("") to hide it.
   ========================================================== */
const CONFIG = {
  name: "Muhammed Savad ",
  title: "Full Stack Developer",
  roles: ["MERN Stack Developer", "Frontend Engineer", "Problem Solver"],
  headline: "I build fast, accessible web applications.",
  intro: "Replace this with two or three sentences about what you do and the value you bring to teams and clients.",
  available: true,
  profileImage: "https://images.immediate.co.uk/production/volatile/sites/3/2020/10/Fight-Club-78eaa0f-e1701346119793.jpg?quality=90&resize=633,422", // e.g. "assets/images/me.jpg". Empty shows your initials.
  resume: "",       // e.g. "assets/resume.pdf". Empty hides the button.

  about: {
    paragraphs: [
      "Sample: introduce yourself and your career journey in a few honest sentences.",
      "Sample: describe your main specialisations, how you approach problems, and your professional goals."
    ],
    stats: [] // e.g. [{ value: "3+", label: "Years of experience" }]. Only add figures you can verify.
  },

  contact: {
    email: "savsavad85@gmail.com",
    phone: "+9947801268",      // international format
    whatsapp: "9947801268",    // digits only, with country code, no "+"
    whatsappMessage: "Hi, I found your portfolio and would like to connect.",
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    instagram: "https://www.instagram.com/svvadh?xtok=MXEzc2c3Y2xjZXg1cg==",
    location: "malappuram,india"
  },

  skills: [
    { category: "Frontend", icon: "layout-dashboard", items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"] },
    { category: "Backend", icon: "server", items: ["Node.js", "Express", "REST APIs"] },
    { category: "Databases", icon: "database", items: ["MongoDB", "PostgreSQL"] },
    { category: "Tools", icon: "wrench", items: ["Git", "GitHub", "VS Code", "Figma"] }
  ],

  // category must match one of the filter names produced here (shown automatically)
  projects: [
    { title: "Sample Project One", category: "Web Development", description: "Short description of the problem it solves.", features: ["Key feature one", "Key feature two"], tech: ["React", "Node.js"], image: "", live: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics", description: "Short description of the problem it solves.", features: ["Key feature one"], tech: ["Python", "Power BI"], image: "", live: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Data Science", description: "Short description of the problem it solves.", features: ["Key feature one"], tech: ["Python", "scikit-learn"], image: "", live: "", code: "", caseStudy: "" }
  ],

  experience: [
    { role: "Sample Role or Degree", org: "Company or Institution", start: "2023", end: "Present", points: ["Sample responsibility or achievement."], tech: ["JavaScript"] }
  ],

  achievements: [] // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025", link: "" }]. Empty hides the section.
};

/* ==========================================================
   2. APP LOGIC
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ext = 'target="_blank" rel="noopener noreferrer"';
const icon = (n) => `<i data-lucide="${n}" aria-hidden="true"></i>`;

const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function placeholderImage(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><rect width="640" height="400" fill="#1b2130"/><path d="M0 40h640M0 120h640M0 200h640M0 280h640M0 360h640M80 0v400M240 0v400M400 0v400M560 0v400" stroke="#2a3246" stroke-width="1"/><text x="320" y="210" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#8d98b0">${esc(label)}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- Static bindings ---------- */
function renderBasics() {
  const c = CONFIG;
  document.title = `${c.name} | ${c.title} Portfolio`;
  const bind = { logo: c.name, greeting: `Hi, I'm ${c.name}.`, headline: c.headline, intro: c.intro, name: c.name };
  $$("[data-bind]").forEach((el) => { el.textContent = bind[el.dataset.bind] ?? ""; });

  $("#availability").hidden = !c.available;
  $("#nav-desktop").innerHTML = NAV.map(([id, l]) => `<li><a class="nav-link" href="#${id}">${l}</a></li>`).join("");
  $("#nav-mobile").innerHTML = NAV.map(([id, l]) => `<li><a class="nav-link" href="#${id}">${l}</a></li>`).join("")
    + `<li><a class="btn btn-primary mt-2 w-full" href="#contact">Let's Connect</a></li>`;
  $("#footer-nav").innerHTML = NAV.map(([id, l]) => `<li><a class="muted hover:underline" href="#${id}">${l}</a></li>`).join("");

  $("#avatar").innerHTML = `<div class="avatar-frame">${c.profileImage
    ? `<img src="${esc(c.profileImage)}" alt="Portrait of ${esc(c.name)}" width="400" height="400" fetchpriority="high">`
    : `<span aria-hidden="true">${esc(initials(c.name))}</span>`}</div>`;

  $("#about-body").innerHTML = c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = c.about.stats.map((s) => `<li class="card"><p class="font-heading text-2xl font-bold">${esc(s.value)}</p><p class="text-sm muted">${esc(s.label)}</p></li>`).join("");
  const resume = $("#resume-btn");
  if (c.resume) { resume.href = c.resume; resume.hidden = false; }
}

/* ---------- Contact, socials ---------- */
function renderContact() {
  const k = CONFIG.contact;
  const digits = (k.whatsapp || "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits}${k.whatsappMessage ? "?text=" + encodeURIComponent(k.whatsappMessage) : ""}` : "";
  const items = [
    k.email && { i: "mail", t: "Email", d: k.email, href: `mailto:${k.email}` },
    k.phone && { i: "phone", t: "Phone", d: k.phone, href: `tel:${k.phone.replace(/[^\d+]/g, "")}` },
    wa && { i: "message-circle", t: "WhatsApp", d: "Chat on WhatsApp", href: wa, ext: true },
    k.linkedin && { i: "linkedin", t: "LinkedIn", d: "View my profile", href: k.linkedin, ext: true },
    k.github && { i: "github", t: "GitHub", d: "Browse my code", href: k.github, ext: true },
    k.instagram && { i: "instagram", t: "Instagram", d: "Follow along", href: k.instagram, ext: true }
  ].filter(Boolean);

  const cards = items.map((x) => `<a class="card contact-card" href="${esc(x.href)}" ${x.ext ? ext : ""}>
      <span class="ico">${icon(x.i)}</span><span><span class="block font-heading font-semibold">${x.t}</span><span class="block text-sm muted">${esc(x.d)}</span></span></a>`);
  if (k.location) cards.push(`<div class="card contact-card"><span class="ico">${icon("map-pin")}</span><span><span class="block font-heading font-semibold">Location</span><span class="block text-sm muted">${esc(k.location)}</span></span></div>`);
  $("#contact-grid").innerHTML = cards.join("");

  const socials = items.filter((x) => ["LinkedIn", "GitHub", "Instagram"].includes(x.t))
    .map((x) => `<li><a class="icon-btn" href="${esc(x.href)}" ${ext} aria-label="${x.t} (opens in a new tab)">${icon(x.i)}</a></li>`).join("");
  $("#hero-socials").innerHTML = socials;
  $("#footer-socials").innerHTML = socials;
}

/* ---------- Skills, projects, experience, achievements ---------- */
function renderSkills() {
  $("#skills-grid").innerHTML = CONFIG.skills.filter((s) => s.items.length).map((s) => `
    <div class="card hoverable reveal">
      <h3 class="flex items-center gap-2"><span style="color:var(--accent)">${icon(s.icon || "code")}</span>${esc(s.category)}</h3>
      <ul class="mt-4 flex flex-wrap gap-2">${s.items.map((i) => `<li class="badge">${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderProjects() {
  const cats = ["All", ...new Set(CONFIG.projects.map((p) => p.category))];
  const filters = $("#filters");
  filters.innerHTML = cats.length > 2 ? cats.map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "";

  $("#projects-grid").innerHTML = CONFIG.projects.map((p) => {
    const links = [
      p.live && `<a class="link-inline" href="${esc(p.live)}" ${ext}>${icon("external-link")}Live demo</a>`,
      p.code && `<a class="link-inline" href="${esc(p.code)}" ${ext}>${icon("github")}Source code</a>`,
      p.caseStudy && `<a class="link-inline" href="${esc(p.caseStudy)}" ${ext}>${icon("file-text")}Case study</a>`
    ].filter(Boolean).join("");
    return `<article class="card hoverable project reveal flex flex-col" data-category="${esc(p.category)}">
      <img class="project-thumb" src="${esc(p.image || placeholderImage(p.title))}" alt="Screenshot of ${esc(p.title)}" width="640" height="400" loading="lazy">
      <h3 class="mt-4">${esc(p.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed muted">${esc(p.description)}</p>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-sm muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      <ul class="mt-4 flex flex-wrap gap-2">${p.tech.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>
      ${links ? `<div class="mt-5 flex flex-wrap gap-x-5 gap-y-2 pt-1">${links}</div>` : ""}
    </article>`;
  }).join("");
}

function renderTimeline() {
  $("#timeline").innerHTML = CONFIG.experience.map((e) => `<li class="reveal">
      <p class="text-sm muted">${esc(e.start)} to ${esc(e.end)}</p>
      <h3 class="font-heading text-xl font-semibold">${esc(e.role)}</h3>
      <p style="color:var(--accent)">${esc(e.org)}</p>
      <ul class="mt-3 list-disc space-y-1 pl-5 muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${e.tech?.length ? `<ul class="mt-3 flex flex-wrap gap-2">${e.tech.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>` : ""}
    </li>`).join("");
}

function renderAchievements() {
  const list = CONFIG.achievements;
  if (!list.length) return;
  $("#achievements").hidden = false;
  $("#certs-grid").innerHTML = list.map((a) => {
    const body = `<span style="color:var(--accent)">${icon("award")}</span><h3 class="mt-3">${esc(a.title)}</h3><p class="mt-1 text-sm muted">${esc([a.issuer, a.year].filter(Boolean).join(", "))}</p>`;
    return a.link ? `<a class="card reveal" href="${esc(a.link)}" ${ext}>${body}</a>` : `<div class="card reveal">${body}</div>`;
  }).join("");
}

/* ---------- Behaviour ---------- */
function initTheme() {
  const root = document.documentElement;
  const btn = $("#theme-toggle");
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  root.setAttribute("data-theme", saved || "dark"); // default: dark
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  });
}

function initMenu() {
  const toggle = $("#menu-toggle"), menu = $("#mobile-menu");
  const set = (open) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = icon(open ? "x" : "menu");
    window.lucide?.createIcons();
  };
  toggle.addEventListener("click", () => set(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); toggle.focus(); } });
  window.matchMedia("(min-width: 768px)").addEventListener("change", (m) => { if (m.matches) set(false); });
}

function initScrollSpy() {
  const links = $$(".nav-link");
  const sections = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => {
        const on = l.getAttribute("href") === `#${en.target.id}`;
        l.classList.toggle("active", on);
        on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => io.observe(s));
}

function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("visible"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

function initFilters() {
  const wrap = $("#filters");
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    $$("[data-filter]", wrap).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    $$(".project").forEach((card) => { card.hidden = btn.dataset.filter !== "All" && card.dataset.category !== btn.dataset.filter; });
  });
}

function initTypewriter() {
  const el = $("#role-text");
  const roles = CONFIG.roles.length ? CONFIG.roles : [CONFIG.title];
  if (reduceMotion || roles.length === 1) { el.textContent = roles[0]; return; }
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

function initMisc() {
  $("#year").textContent = new Date().getFullYear();
  $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}

document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
  renderBasics(); renderContact(); renderSkills(); renderProjects(); renderTimeline(); renderAchievements();
  window.lucide?.createIcons();
  initTheme(); initMenu(); initScrollSpy(); initReveal(); initFilters(); initTypewriter(); initMisc();
});
window.addEventListener("load", () => window.lucide?.createIcons());
