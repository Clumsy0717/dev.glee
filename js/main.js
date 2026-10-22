/* ============================================================
   LOADING SCREEN & INITIALIZATION
============================================================ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  const ring = document.getElementById('loaderRing');
  const counter = document.getElementById('loaderCounter');
  const status = document.getElementById('loaderStatus');

  if (!loader) {
    document.body.classList.add('ready');
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.remove();
    document.body.classList.add('ready');
    return;
  }

  document.body.classList.add('is-loading');

  const CIRCUMFERENCE = 2 * Math.PI * 21;
  const MIN_MS = 2400;
  const STATUSES = [
    [0, 'Preparing the scene'],
    [30, 'Gathering assets'],
    [60, 'Sharpening the blade'],
    [90, 'Almost ready']
  ];
  const startedAt = performance.now();
  let pageLoaded = document.readyState === 'complete';
  let progress = 0;
  if (!pageLoaded) window.addEventListener('load', () => { pageLoaded = true; }, { once: true });

  function render(value) {
    if (ring) ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - value / 100));
    if (counter) counter.textContent = `${value}%`;
    if (status) {
      const current = STATUSES.filter(([min]) => value >= min).pop();
      if (current && status.textContent !== current[1]) status.textContent = current[1];
    }
  }

  function finish() {
    render(100);
    setTimeout(() => loader.classList.add('is-done'), 250);
    setTimeout(() => loader.classList.add('is-slashing'), 650);
    setTimeout(() => {
      loader.classList.add('is-open');
      document.body.classList.add('ready');
      document.body.classList.remove('is-loading');
    }, 1000);
    setTimeout(() => loader.remove(), 2100);
  }

  function tick(now) {
    const t = Math.min((now - startedAt) / MIN_MS, 1);
    let target = (1 - Math.pow(1 - t, 2.2)) * 100;
    if (!pageLoaded) target = Math.min(target, 92);
    progress += Math.max(0, target - progress) * 0.14;
    if (target >= 100 && progress > 99.4) progress = 100;
    render(Math.floor(progress));
    if (progress >= 100) { finish(); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoader);
} else {
  initLoader();
}

/* ============================================================
   DATA CONFIGURATIONS
============================================================ */
const EXPERIENCE_DATA = [
  {
    role: 'Encoder',
    org: 'Company',
    location: 'Villasis, Pangasinan',
    period: 'March 2024 - Present',
    type: 'Volunteer',
    points: [
      'I encode the papers and find receipt, and I hand write the other receipts',
      'Excel and Google Sheets are used to encode the data'
    ],
    tags: ['Excel', 'Google Sheets']
  },
  {
    role: 'Marketing Staff',
    org: 'Organization',
    location: 'Villasis, Pangasinan',
    period: 'July 2024 - January 2025',
    type: 'Part-time',
    points: ['Advertising School promos and events', 'I use social media to promote the school', 'Handing out flyers and posters to promote the school'],
    tags: ['Flyers', 'Posters', 'Social Media']
  }
];

const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'University Of Eastern Pangasinan',
    location: 'Binalonan, Pangasinan',
    years: '2025 - Present',
    note: 'Web Development Focus',
    tags: ['Web Development', 'Databases', 'UI Design']
  },
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Panpacific University',
    location: 'Urdaneta, Pangasinan',
    years: '2024 - 2025',
    note: 'Web Development Focus',
    tags: ['Web Development', 'Databases', 'UI Design']
  },
  {
    degree: 'Senior High School',
    school: 'Don Ramon E Costales Memorial National Highschool',
    location: 'Villasis, Pangasinan',
    years: '2022 - 2024',
    note: 'TVL - CSS, TESDA NCII CSS Passer, Grade 12 S.Y 2023 - 2024 With Honors',
    tags: []
  }
];

const CERTIFICATES_DATA = [
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy Program',
    date: 'November 2024',
    image: 'images/certificates/pythonessentials1.png',
    link: 'files/Python_Essentials_1.pdf'
  },
  {
    title: 'Intro to Cybersecurity',
    issuer: 'Cisco Networking Academy Program',
    date: 'October 2024',
    image: 'images/certificates/Intro_Cybersecurity.png',
    link: 'files/Intro_Cybersecurity.pdf'
  },
  {
    title: 'NC2 in Computer System Servicing',
    issuer: 'TESDA',
    date: 'May 2024',
    image: 'images/certificates/NC2.png',
    link: ''
  }
];

const PROJECTS_DATA = [
  {
    id: 'p1',
    title: 'Glee Portfolio Website',
    desc: 'Interactive modern portfolio website with responsive design, custom modals, and dynamic components.',
    type: 'live',
    status: 'Live',
    dot: 'green',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'images/projects/Portfolio.png',
    link: 'https://devglee.vercel.app/'
  },
  {
    id: 'p2',
    title: 'Read me when you need me',
    desc: 'A little book of love, comfort, and reminders.',
    type: 'live',
    status: 'Live',
    dot: 'green',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/projects/ReadMeWhenYouNeedMe.png',
    link: 'https://read-me-when-you-need-me-z1a2.vercel.app/'
  },
  {
    id: 'p3',
    title: 'Library Management System',
    desc: 'Web-based application allowing users to manage and track library books with CRUD logic and quick lookup features.',
    type: 'dev',
    status: 'In development',
    dot: 'orange',
    tags: ['PHP', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    image: 'images/projects/grocery-inventory.jpg',
    link: '#'
  }
];

const SKILLS = [
  { name: 'HTML5',       cat: 'frontend', icon: 'devicon-html5-plain colored' },
  { name: 'CSS3',        cat: 'frontend', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript',  cat: 'frontend', icon: 'devicon-javascript-plain colored' },
  { name: 'Bootstrap',   cat: 'frontend', icon: 'devicon-bootstrap-plain colored' },
  { name: 'PHP',         cat: 'backend',  icon: 'devicon-php-plain colored' },
  { name: 'Python',      cat: 'backend',  icon: 'devicon-python-plain colored' },
  { name: 'MySQL',       cat: 'database', icon: 'devicon-mysql-plain colored' },
  { name: 'Figma',       cat: 'design',   icon: 'devicon-figma-plain colored' },
  { name: 'Git',         cat: 'design',   icon: 'devicon-git-plain colored' },
  { name: 'GitHub',      cat: 'design',   icon: 'devicon-github-original' }
];

const SKILL_GROUPS = [
  { key: 'frontend', label: 'Frontend',       jp: '壱' },
  { key: 'backend',  label: 'Backend',        jp: '弐' },
  { key: 'database', label: 'Database',       jp: '参' },
  { key: 'design',   label: 'Design & Tools', jp: '肆' }
];

const ICON_MAP = {
  'HTML': 'devicon-html5-plain colored',
  'HTML5': 'devicon-html5-plain colored',
  'CSS': 'devicon-css3-plain colored',
  'CSS3': 'devicon-css3-plain colored',
  'JavaScript': 'devicon-javascript-plain colored',
  'JS': 'devicon-javascript-plain colored',
  'PHP': 'devicon-php-plain colored',
  'Python': 'devicon-python-plain colored',
  'SQL': 'devicon-mysql-plain colored',
  'MySQL': 'devicon-mysql-plain colored',
  'Bootstrap': 'devicon-bootstrap-plain colored',
  'Git': 'devicon-git-plain colored',
  'GitHub': 'devicon-github-original'
};

/* Helper Functions */
function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function tagsMarkup(tags) {
  return tags.map((t) => {
    const iconClass = ICON_MAP[t] || ICON_MAP[t.toUpperCase()];
    const iconHtml = iconClass ? `<i class="${iconClass}"></i> ` : '';
    return `<li class="tag">${iconHtml}${esc(t)}</li>`;
  }).join('');
}

/* ============================================================
   RENDERERS & TABS
============================================================ */
function renderExperience() {
  const list = document.getElementById('experienceContainer');
  if (!list) return;
  list.innerHTML = EXPERIENCE_DATA.map((item) => `
    <li class="timeline-item">
      <div class="timeline-meta">
        <span class="timeline-period">${esc(item.period)}</span>
        ${item.type ? `<span class="timeline-type">${esc(item.type)}</span>` : ''}
      </div>
      <div class="timeline-card">
        <h3 class="timeline-role">${esc(item.role)}</h3>
        <p class="timeline-org">${esc(item.org)}${item.location ? `, ${esc(item.location)}` : ''}</p>
        ${item.points ? `<ul class="timeline-points">${item.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
        ${item.tags ? `<ul class="tag-list">${tagsMarkup(item.tags)}</ul>` : ''}
      </div>
    </li>`).join('');
}

function renderEducation() {
  const grid = document.getElementById('educationContainer');
  if (!grid) return;
  grid.innerHTML = EDUCATION_DATA.map((edu) => `
    <article class="edu-card">
      <span class="edu-watermark" aria-hidden="true">学</span>
      <p class="edu-years">${esc(edu.years)}</p>
      <h3 class="edu-degree">${esc(edu.degree)}</h3>
      <p class="edu-school">${esc(edu.school)}${edu.location ? `, ${esc(edu.location)}` : ''}</p>
      ${edu.note ? `<p class="edu-note">${esc(edu.note)}</p>` : ''}
      ${edu.tags ? `<ul class="tag-list">${tagsMarkup(edu.tags)}</ul>` : ''}
    </article>`).join('');
}

function renderCertificates() {
  const grid = document.getElementById('certificatesContainer');
  if (!grid) return;
  grid.innerHTML = CERTIFICATES_DATA.map((cert, i) => `
    <article class="cert-card">
      <button type="button" class="project-preview cert-preview" onclick="openCertModal(${i})" aria-label="View certificate: ${esc(cert.title)}">
        <img src="${esc(cert.image)}" alt="Certificate: ${esc(cert.title)}" loading="lazy">
      </button>
      <div class="cert-body">
        <h3 class="cert-title">${esc(cert.title)}</h3>
        <p class="cert-meta">${esc(cert.issuer)}${cert.date ? `, ${esc(cert.date)}` : ''}</p>
        <div class="project-actions">
          <button type="button" class="btn btn-gold btn-sm" onclick="openCertModal(${i})">View certificate</button>
          ${cert.link ? `<a class="btn btn-ghost btn-sm" href="${esc(cert.link)}" target="_blank" rel="noopener">Verify</a>` : ''}
        </div>
      </div>
    </article>`).join('');
}

function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  container.innerHTML = SKILL_GROUPS.map((group) => `
    <div class="arsenal-row">
      <div class="arsenal-label">
        <span class="arsenal-jp" aria-hidden="true">${group.jp}</span>
        <h3>${group.label}</h3>
      </div>
      <ul class="arsenal-items">
        ${SKILLS.filter((s) => s.cat === group.key).map((skill) => `
          <li class="skill-chip">
            <span class="skill-icon"><i class="${skill.icon}"></i></span>
            <span class="skill-name">${skill.name}</span>
          </li>
        `).join('')}
      </ul>
    </div>`).join('');
}

function renderProjects(filterType = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = '';

  const filtered = filterType === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.type === filterType);

  filtered.forEach((proj) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-preview">
        <img src="${proj.image}" alt="Preview of ${proj.title}" loading="lazy">
      </div>
      <div class="project-body">
        <p class="project-status"><span class="status-dot ${proj.dot}"></span>${proj.status}</p>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.desc}</p>
        <ul class="tag-list">${tagsMarkup(proj.tags)}</ul>
        <div class="project-actions">
          ${proj.link && proj.link !== '#' 
            ? `<a class="btn btn-gold btn-sm" href="${proj.link}" target="_blank" rel="noopener">View site</a>` 
            : `<span class="btn btn-sm btn-disabled" aria-disabled="true">In progress</span>`}
          <button type="button" class="btn btn-ghost btn-sm" onclick="openProjectModal('${proj.id}')">Details</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProjects(type, btnElement) {
  btnElement.parentElement.querySelectorAll('.filter').forEach((b) => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btnElement.classList.add('active');
  btnElement.setAttribute('aria-pressed', 'true');
  renderProjects(type);
}

/* ============================================================
   UI HELPERS, MODALS & INTERACTIONS
============================================================ */
function setupAboutTabs() {
  const tabs = Array.from(document.querySelectorAll('.about-tab'));
  if (!tabs.length) return;
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

  function select(index) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle('active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (panels[i]) panels[i].hidden = !on;
    });
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)));
  select(0);
}

function openCertModal(index) {
  const cert = CERTIFICATES_DATA[index];
  if (!cert) return;
  document.getElementById('certModalMedia').innerHTML = `<img src="${esc(cert.image)}" alt="Certificate: ${esc(cert.title)}">`;
  document.getElementById('certModalTitle').textContent = cert.title;
  document.getElementById('certModalMeta').textContent = cert.issuer + (cert.date ? `, ${cert.date}` : '');
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = '';
}

function openProjectModal(id) {
  const proj = PROJECTS_DATA.find((p) => p.id === id);
  if (!proj) return;
  document.getElementById('modalProjectTitle').textContent = proj.title;
  document.getElementById('modalProjectDesc').textContent = proj.desc;
  document.getElementById('modalProjectStatus').innerHTML = `<span class="status-dot ${proj.dot}"></span>${proj.status}`;
  document.getElementById('modalProjectTags').innerHTML = tagsMarkup(proj.tags);
  document.getElementById('modalProjectPreview').innerHTML = `<img src="${proj.image}" alt="Preview of ${proj.title}">`;
  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

function setupModalListeners() {
  ['certModal', 'projectModal'].forEach((id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); document.body.style.overflow = ''; });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertModal();
      closeProjectModal();
    }
  });
}

function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'light');
  });
}

function setupKurosawaMode() {
  const btn = document.getElementById('kurosawaToggle');
  const root = document.documentElement;
  if (!btn) return;
  btn.addEventListener('click', () => {
    const turningOn = root.getAttribute('data-mode') !== 'kurosawa';
    if (turningOn) root.setAttribute('data-mode', 'kurosawa');
    else root.removeAttribute('data-mode');
    btn.setAttribute('aria-pressed', String(turningOn));
  });
}

function setupNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  if (!nav || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

function setupScrollSpy() {
  const nav = document.getElementById('siteNav');
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1) : 0);
  }, { passive: true });
}

function setupScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  }, { passive: true });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = ['Frontend Development', 'UI/UX Architecture', 'Database Logic', 'PHP & Python'];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % phrases.length;
    el.textContent = phrases[index];
  }, 3000);
}

function setupScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.section-head, .section-title, .arsenal, .projects-grid, .timeline, .edu-grid, .cert-grid');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach((el) => {
    el.classList.add('js-reveal');
    observer.observe(el);
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupKurosawaMode();
  setupNav();
  setupScrollSpy();
  setupScrollTop();
  setupTypewriter();
  setupModalListeners();
  renderSkills();
  renderExperience();
  renderEducation();
  renderCertificates();
  setupAboutTabs();
  setupScrollReveal();
  renderProjects('all');
});