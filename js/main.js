/* ============================================================
   LOADING SCREEN: ring progress, then a katana slash opens the page
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
    setTimeout(() => loader.classList.add('is-done'), 250);       // content fades
    setTimeout(() => loader.classList.add('is-slashing'), 650);   // slash is drawn
    setTimeout(() => {                                            // page splits open
      loader.classList.add('is-open');
      document.body.classList.add('ready');
      document.body.classList.remove('is-loading');
    }, 1000);
    setTimeout(() => loader.remove(), 2100);
  }

  function tick(now) {
    const t = Math.min((now - startedAt) / MIN_MS, 1);
    let target = (1 - Math.pow(1 - t, 2.2)) * 100;
    if (!pageLoaded) target = Math.min(target, 92);       // wait for the real load event
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
   EXPERIENCE, EDUCATION AND CERTIFICATES
   Edit the three lists below. Remove any sample entry you do not need.
============================================================ */
const EXPERIENCE_DATA = [
  {
    role: 'Your Role Title',                 // EDIT: e.g. Web Developer Intern
    org: 'Company or Organization',          // EDIT
    location: 'City, Philippines',           // EDIT (optional)
    period: 'Month Year - Present',          // EDIT
    type: 'Internship',                      // EDIT: Internship, Freelance, Part-time, Volunteer...
    points: [
      'Describe one thing you built or improved, and the result it had.',
      'Mention the tools you used and how you worked with the team.'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript']
  },
  {
    role: 'Another Role or Project',
    org: 'Organization or Client',
    location: '',
    period: 'Month Year - Month Year',
    type: 'Freelance',
    points: ['A short, specific achievement. Numbers help, for example "cut load time by 40%".'],
    tags: ['PHP', 'MySQL']
  }
];

const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'Your University Name',          // EDIT
    location: 'City, Philippines',           // EDIT (optional)
    years: 'Year - Present',                 // EDIT
    note: 'Add honors, your thesis topic, or what you focus on in your studies.', // EDIT
    tags: ['Web Development', 'Databases', 'UI Design']
  },
  {
    degree: 'Senior High School',
    school: 'Your School Name',              // EDIT
    location: '',
    years: 'Year - Year',                    // EDIT
    note: 'Track or strand, and any awards.',// EDIT
    tags: []
  }
];

const CERTIFICATES_DATA = [
  {
    title: 'Certificate Title',              // EDIT
    issuer: 'Issuing Organization',          // EDIT
    date: 'Month Year',                      // EDIT
    image: 'images/certificates/certificate-1.jpg', // put your certificate picture here
    link: ''                                 // optional: credential or verification URL
  },
  {
    title: 'Another Certificate',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    image: 'images/certificates/certificate-2.jpg',
    link: ''
  },
  {
    title: 'Third Certificate',
    issuer: 'Issuing Organization',
    date: 'Month Year',
    image: 'images/certificates/certificate-3.jpg',
    link: ''
  }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function renderExperience() {
  const list = document.getElementById('experienceContainer');
  if (!list) return;
  if (!EXPERIENCE_DATA.length) {
    list.innerHTML = '<li class="empty-note">Experience coming soon.</li>';
    return;
  }
  list.innerHTML = EXPERIENCE_DATA.map((item) => `
    <li class="timeline-item">
      <div class="timeline-meta">
        <span class="timeline-period">${esc(item.period)}</span>
        ${item.type ? `<span class="timeline-type">${esc(item.type)}</span>` : ''}
      </div>
      <div class="timeline-card">
        <h3 class="timeline-role">${esc(item.role)}</h3>
        <p class="timeline-org">${esc(item.org)}${item.location ? `, ${esc(item.location)}` : ''}</p>
        ${item.points && item.points.length ? `<ul class="timeline-points">${item.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
        ${item.tags && item.tags.length ? `<ul class="tag-list">${tagsMarkup(item.tags.map(esc))}</ul>` : ''}
      </div>
    </li>`).join('');
}

function renderEducation() {
  const grid = document.getElementById('educationContainer');
  if (!grid) return;
  if (!EDUCATION_DATA.length) {
    grid.innerHTML = '<p class="empty-note">Education coming soon.</p>';
    return;
  }
  grid.innerHTML = EDUCATION_DATA.map((edu) => `
    <article class="edu-card">
      <span class="edu-watermark" aria-hidden="true">学</span>
      <p class="edu-years">${esc(edu.years)}</p>
      <h3 class="edu-degree">${esc(edu.degree)}</h3>
      <p class="edu-school">${esc(edu.school)}${edu.location ? `, ${esc(edu.location)}` : ''}</p>
      ${edu.note ? `<p class="edu-note">${esc(edu.note)}</p>` : ''}
      ${edu.tags && edu.tags.length ? `<ul class="tag-list">${tagsMarkup(edu.tags.map(esc))}</ul>` : ''}
    </article>`).join('');
}

/* Certificate picture with a placeholder if the image file is missing */
function certPreview(cert) {
  const img = cert.image
    ? `<img src="${esc(cert.image)}" alt="Certificate: ${esc(cert.title)}" loading="lazy" onerror="this.remove()">`
    : '';
  return `<span class="preview-fallback">Certificate preview</span>${img}`;
}

function renderCertificates() {
  const grid = document.getElementById('certificatesContainer');
  if (!grid) return;
  if (!CERTIFICATES_DATA.length) {
    grid.innerHTML = '<p class="empty-note">Certificates coming soon.</p>';
    return;
  }
  grid.innerHTML = CERTIFICATES_DATA.map((cert, i) => `
    <article class="cert-card">
      <button type="button" class="project-preview cert-preview" onclick="openCertModal(${i})" aria-label="View certificate: ${esc(cert.title)}">${certPreview(cert)}</button>
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

let certLastFocus = null;

function openCertModal(index) {
  const cert = CERTIFICATES_DATA[index];
  if (!cert) return;
  certLastFocus = document.activeElement;

  document.getElementById('certModalMedia').innerHTML = certPreview(cert);
  document.getElementById('certModalTitle').textContent = cert.title;
  document.getElementById('certModalMeta').textContent = cert.issuer + (cert.date ? `, ${cert.date}` : '');

  const actions = document.getElementById('certModalActions');
  actions.innerHTML = cert.link
    ? `<a class="btn btn-gold btn-sm" href="${esc(cert.link)}" target="_blank" rel="noopener">Verify credential</a>`
    : '';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn btn-outline btn-sm';
  close.textContent = 'Close';
  close.addEventListener('click', closeCertModal);
  actions.appendChild(close);

  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  close.focus();
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('active');
  document.body.style.overflow = '';
  if (certLastFocus) certLastFocus.focus();
}

function setupCertModal() {
  const overlay = document.getElementById('certModal');
  if (!overlay) return;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCertModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeCertModal();
  });
}

/* ============================================================
   ABOUT TABS: experience, education, certifications
============================================================ */
function setupAboutTabs() {
  const tabs = Array.from(document.querySelectorAll('.about-tab'));
  if (!tabs.length) return;
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

  function select(index, focus) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle('active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (panels[i]) panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });
  select(0);
}

/* ============================================================
   SCROLL REVEAL: sections ease in as they come into view
============================================================ */
function setupScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(
    '.section-head, .section > .container > .section-title, .about-grid > *, .arsenal, ' +
    '.filters, .projects-grid, .activity, .contact-grid > *, .timeline, .edu-grid, .cert-grid'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  targets.forEach((el) => {
    el.classList.add('js-reveal');
    observer.observe(el);
  });
}

/* ============================================================
   THEME TOGGLE (DIRECTOR'S CUT LIGHT MODE)
============================================================ */
function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

/* ============================================================
   KUROSAWA MODE
============================================================ */
function setupKurosawaMode() {
  const btn = document.getElementById('kurosawaToggle');
  const root = document.documentElement;
  if (!btn) return;

  const sync = () => {
    const on = root.getAttribute('data-mode') === 'kurosawa';
    btn.setAttribute('aria-pressed', String(on));
    return on;
  };
  sync();

  btn.addEventListener('click', () => {
    const turningOn = root.getAttribute('data-mode') !== 'kurosawa';
    if (turningOn) root.setAttribute('data-mode', 'kurosawa');
    else root.removeAttribute('data-mode');
    try { localStorage.setItem('kurosawa', turningOn ? 'on' : 'off'); } catch (e) {}
    sync();
    showPopup(turningOn ? 'Kurosawa mode on' : 'Kurosawa mode off');
  });
}

/* ============================================================
   NAVIGATION
============================================================ */
function setupNav() {
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  if (!nav || !toggle) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

/* ============================================================
   SCROLL TO TOP BUTTON
============================================================ */
function setupScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });
}

function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/* Nav state: shadow on scroll, progress bar, active section link */
function setupScrollSpy() {
  const nav = document.getElementById('siteNav');
  const bar = document.getElementById('scrollProgress');
  const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]')).map((a) => ({
    el: a,
    ids: [a.getAttribute('href').slice(1)].concat(a.dataset.also ? a.dataset.also.split(' ') : [])
  }));
  const ids = Array.from(new Set(links.flatMap((l) => l.ids)));
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1) : 0);

    let currentId = sections.length ? sections[0].id : '';
    sections.forEach((s) => { if (s.offsetTop <= y + 160) currentId = s.id; });
    if (max > 0 && y >= max - 4 && sections.length) currentId = sections[sections.length - 1].id;

    links.forEach((l) => {
      const on = l.ids.includes(currentId);
      l.el.classList.toggle('active', on);
      if (on) l.el.setAttribute('aria-current', 'true'); else l.el.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ============================================================
   HERO TYPEWRITER
============================================================ */
function setupTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = ['Frontend Development', 'UI/UX Architecture', 'Database Logic', 'PHP & Python'];
  const TYPE_MS = 70;
  const DELETE_MS = 35;
  const CYCLE_MS = 5000;
  let index = 0;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    setInterval(() => {
      index = (index + 1) % phrases.length;
      el.textContent = phrases[index];
    }, CYCLE_MS);
    return;
  }

  function cycle() {
    const text = phrases[index];
    const startedAt = Date.now();
    let count = 0;

    function type() {
      count++;
      el.textContent = text.slice(0, count);
      if (count < text.length) {
        setTimeout(type, TYPE_MS);
        return;
      }
      const elapsed = Date.now() - startedAt;
      const hold = Math.max(CYCLE_MS - elapsed - text.length * DELETE_MS, 800);
      setTimeout(erase, hold);
    }

    function erase() {
      if (count > 0) {
        count--;
        el.textContent = text.slice(0, count);
        setTimeout(erase, DELETE_MS);
        return;
      }
      index = (index + 1) % phrases.length;
      cycle();
    }

    type();
  }

  setTimeout(cycle, 600);
}

/* ============================================================
   SPOTLIGHT REVEAL
============================================================ */
function setupRevealSlider() {
  const card = document.getElementById('revealCard');
  const spotlight = document.getElementById('spotlightLayer');
  if (!card || !spotlight) return;

  const moveTo = (clientX, clientY) => {
    const rect = card.getBoundingClientRect();
    spotlight.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
    spotlight.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
  };

  card.addEventListener('mousemove', (e) => moveTo(e.clientX, e.clientY));

  card.addEventListener('touchstart', (e) => {
    spotlight.classList.add('on');
    moveTo(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  card.addEventListener('touchmove', (e) => {
    moveTo(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  card.addEventListener('touchend', () => spotlight.classList.remove('on'));
  card.addEventListener('touchcancel', () => spotlight.classList.remove('on'));
}

/* ============================================================
   SKILLS
============================================================ */
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const PROTOTYPE_SVG = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="8" width="36" height="28" rx="3"/><path d="M6 16h36"/><path d="M25 24l13 5-6 2.5-2.5 6z"/></svg>';

const SKILLS = [
  { name: 'HTML5',       cat: 'frontend', icon: 'html5/html5-original.svg' },
  { name: 'CSS3',        cat: 'frontend', icon: 'css3/css3-original.svg' },
  { name: 'JavaScript',  cat: 'frontend', icon: 'javascript/javascript-original.svg' },
  { name: 'Bootstrap',   cat: 'frontend', icon: 'bootstrap/bootstrap-original.svg' },
  { name: 'PHP',         cat: 'backend',  icon: 'php/php-original.svg' },
  { name: 'Python',      cat: 'backend',  icon: 'python/python-original.svg' },
  { name: 'MySQL',       cat: 'database', icon: 'mysql/mysql-original.svg' },
  { name: 'Figma',       cat: 'design',   icon: 'figma/figma-original.svg' },
  { name: 'Prototyping', cat: 'design',   svg: PROTOTYPE_SVG },
  { name: 'Git',         cat: 'design',   icon: 'git/git-original.svg' },
  { name: 'GitHub',      cat: 'design',   icon: 'github/github-original.svg', invert: true }
];

const SKILL_GROUPS = [
  { key: 'frontend', label: 'Frontend',       jp: '壱' },
  { key: 'backend',  label: 'Backend',        jp: '弐' },
  { key: 'database', label: 'Database',       jp: '参' },
  { key: 'design',   label: 'Design & Tools', jp: '肆' }
];

function skillChip(skill) {
  const icon = skill.svg
    ? skill.svg
    : `<img src="${DEVICON}/${skill.icon}" alt="" width="28" height="28" data-letter="${skill.name[0]}">`;
  return `<li class="skill-chip"><span class="skill-icon${skill.invert ? ' invert' : ''}">${icon}</span><span class="skill-name">${skill.name}</span></li>`;
}

function attachIconFallbacks(root) {
  root.querySelectorAll('.skill-icon img').forEach((img) => {
    const swap = () => {
      const mono = document.createElement('span');
      mono.className = 'skill-mono';
      mono.textContent = img.dataset.letter || '';
      img.replaceWith(mono);
    };
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });
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
      <ul class="arsenal-items">${SKILLS.filter((s) => s.cat === group.key).map(skillChip).join('')}</ul>
    </div>`).join('');
  attachIconFallbacks(container);
}

/* ============================================================
   GITHUB ACTIVITY
============================================================ */
const GITHUB_USER = 'Clumsy0717';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function renderHeatmap(days) {
  const body = document.getElementById('activityBody');
  const foot = document.getElementById('activityFoot');
  const totalEl = document.getElementById('activityTotal');

  days.sort((a, b) => a.date.localeCompare(b.date));

  const weeks = [];
  let week = new Array(parseLocalDate(days[0].date).getDay()).fill(null);
  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  const total = days.reduce((sum, d) => sum + d.count, 0);
  const grid = document.createElement('div');
  grid.className = 'heatmap';
  grid.style.setProperty('--weeks', weeks.length);
  grid.setAttribute('role', 'img');
  grid.setAttribute('aria-label', `${total} GitHub contributions in the last year`);

  const labels = [];
  let prevMonth = -1;
  weeks.forEach((w, i) => {
    const first = w.find(Boolean);
    const month = parseLocalDate(first.date).getMonth();
    if (month !== prevMonth) {
      labels.push({ index: i, month });
      prevMonth = month;
    }
  });
  if (labels.length > 1 && labels[1].index - labels[0].index < 3) labels.shift();
  labels.forEach((l) => {
    const el = document.createElement('span');
    el.className = 'heatmap-month';
    el.textContent = MONTH_NAMES[l.month];
    el.style.gridColumn = `${l.index + 1} / span ${Math.min(3, weeks.length - l.index)}`;
    grid.appendChild(el);
  });

  weeks.forEach((w, wi) => {
    w.forEach((day, di) => {
      if (!day) return;
      const cell = document.createElement('span');
      const level = Math.max(0, Math.min(4, day.level || 0));
      cell.className = `heatmap-cell lv${level}`;
      cell.style.gridColumn = String(wi + 1);
      cell.style.gridRow = String(di + 2);
      const label = parseLocalDate(day.date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
      });
      cell.title = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${label}`;
      grid.appendChild(cell);
    });
  });

  body.innerHTML = '';
  body.appendChild(grid);
  totalEl.textContent = `${total.toLocaleString('en-US')} contributions in the last year`;
  foot.hidden = false;
}

async function loadActivity() {
  const body = document.getElementById('activityBody');
  if (!body) return;

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.contributions) || !data.contributions.length) {
      throw new Error('No contribution data');
    }
    renderHeatmap(data.contributions);
  } catch (err) {
    body.innerHTML = `<p class="activity-status">Activity could not be loaded right now. <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">View on GitHub</a>.</p>`;
  }
}

/* ============================================================
   PROJECTS
============================================================ */
const PROJECTS_DATA = [
  {
    id: 'p1',
    title: 'Hotel Management System',
    desc: 'Full-featured booking & room reservation system engineered using structured backend logic.',
    type: 'dev',
    status: 'In development',
    dot: 'orange',
    tags: ['Backend', 'Console App'],
    image: 'images/projects/hotel-management.jpg',
    link: '#'
  },
  {
    id: 'p2',
    title: 'Grocery Inventory App',
    desc: 'Desktop application built for managing stock levels, inventory records, and exporting CSV reports.',
    type: 'dev',
    status: 'In development',
    dot: 'orange',
    tags: ['Python', 'Tkinter', 'CSV'],
    image: 'images/projects/grocery-inventory.jpg',
    link: '#'
  },
  {
    id: 'p3',
    title: 'Glee Portfolio Website',
    desc: 'Interactive modern portfolio website with responsive design, custom modals, and dynamic components.',
    type: 'live',
    status: 'Live',
    dot: 'green',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'images/projects/portfolio.jpg',
    link: 'https://github.com/Clumsy0717'
  }
];

function tagsMarkup(tags) {
  return tags.map((t) => `<li class="tag">${t}</li>`).join('');
}

function previewInner(proj) {
  const img = proj.image
    ? `<img src="${proj.image}" alt="Preview of ${proj.title}" loading="lazy" onerror="this.remove()">`
    : '';
  return `<span class="preview-fallback">Preview coming soon</span>${img}`;
}

function siteButton(proj) {
  const hasLink = proj.link && proj.link !== '#';
  return hasLink
    ? `<a class="btn btn-gold btn-sm" href="${proj.link}" target="_blank" rel="noopener">View site</a>`
    : `<span class="btn btn-sm btn-disabled" aria-disabled="true">Site coming soon</span>`;
}

function renderProjects(filterType = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = '';

  const filtered = filterType === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.type === filterType);

  filtered.forEach((proj) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-preview">${previewInner(proj)}</div>
      <div class="project-body">
        <p class="project-status"><span class="status-dot ${proj.dot}"></span>${proj.status}</p>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.desc}</p>
        <ul class="tag-list">${tagsMarkup(proj.tags)}</ul>
        <div class="project-actions">
          ${siteButton(proj)}
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
   PROJECT MODAL
============================================================ */
let lastFocusedElement = null;

function openProjectModal(id) {
  const proj = PROJECTS_DATA.find((p) => p.id === id);
  if (!proj) return;

  lastFocusedElement = document.activeElement;

  document.getElementById('modalProjectTitle').textContent = proj.title;
  document.getElementById('modalProjectDesc').textContent = proj.desc;
  document.getElementById('modalProjectStatus').innerHTML =
    `<span class="status-dot ${proj.dot}"></span>${proj.status}`;
  document.getElementById('modalProjectTags').innerHTML = tagsMarkup(proj.tags);

  const actions = document.getElementById('modalProjectActions');
  actions.innerHTML = '';

  document.getElementById('modalProjectPreview').innerHTML = previewInner(proj);
  actions.insertAdjacentHTML('beforeend', siteButton(proj));

  const close = document.createElement('button');
  close.type = 'button';
  close.id = 'modalCloseBtn';
  close.className = 'btn btn-ghost btn-sm';
  close.textContent = 'Close';
  close.addEventListener('click', closeProjectModal);
  actions.appendChild(close);

  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  close.focus();
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

function setupModal() {
  const overlay = document.getElementById('projectModal');
  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeProjectModal();
  });
}

/* ============================================================
   CONTACT FORM + TOAST
============================================================ */
async function submitContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const btn = document.getElementById('submitBtn');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    const result = await response.json();

    if (result.success) {
      showPopup('Message Sent Successfully!');
      form.reset();
    } else {
      showPopup(result.message || 'Failed to send message. Please try again.');
    }
  } catch (error) {
    showPopup('Network error. Please try again.');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

function showPopup(text) {
  const popupEl = document.getElementById('popup');
  if (!popupEl) return;

  popupEl.textContent = text;
  popupEl.classList.add('show');

  clearTimeout(showPopup.timer);
  showPopup.timer = setTimeout(() => {
    popupEl.classList.remove('show');
  }, 3500);
}

/* ============================================================
   NETWORK DETECTION
============================================================ */
function handleNetworkChange() {
  const screen = document.getElementById('offlineScreen');
  if (!screen) return;
  screen.style.display = navigator.onLine ? 'none' : 'flex';
}
window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupKurosawaMode();
  setupNav();
  setupScrollSpy();
  setupScrollTop();
  setupTypewriter();
  setupModal();
  setupRevealSlider();
  renderSkills();
  renderExperience();
  renderEducation();
  renderCertificates();
  setupCertModal();
  setupAboutTabs();
  setupScrollReveal();
  loadActivity();
  renderProjects('all');
  handleNetworkChange();
});