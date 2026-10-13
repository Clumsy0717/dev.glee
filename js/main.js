/* ============================================================
   GHOST OF TSUSHIMA LOADING SCREEN (SHOWS ON EVERY RELOAD)
============================================================ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  const barFill = document.getElementById('loaderBarFill');
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

  const logs = [
    '> UNSHEATHING_BLADE',
    '> HONING_PRECISION',
    '> FORGING_INTERFACE',
    '> AWAKENING_SPIRIT',
    '> READY_FOR_HONOR'
  ];

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 1;

    if (progress > 100) progress = 100;

    if (barFill) barFill.style.width = `${progress}%`;
    if (counter) counter.textContent = `${progress}%`;

    if (status) {
      if (progress < 25) status.textContent = logs[0];
      else if (progress < 50) status.textContent = logs[1];
      else if (progress < 75) status.textContent = logs[2];
      else if (progress < 95) status.textContent = logs[3];
      else status.textContent = logs[4];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hide');
        document.body.classList.add('ready');
        setTimeout(() => loader.remove(), 800);
      }, 400);
    }
  }, 110);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoader);
} else {
  initLoader();
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
   KUROSAWA MODE (black and white film look, works with light or dark)
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
  const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1) : 0);

    let current = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y + 160) current = i; });
    if (max > 0 && y >= max - 4) current = sections.length - 1;
    links.forEach((a, i) => {
      a.classList.toggle('active', i === current);
      if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
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

/* If an icon fails to load, swap it for the skill's first letter */
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
    image: 'images/projects/hotel-management.jpg', // preview picture (put your file here)
    link: '#'                                       // site URL, shows the "View site" button when set
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

/* Preview picture with a graceful placeholder if the image is missing */
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
      // 1. Show the success popup notification
      showPopup('Message Sent Successfully!');
      // 2. Clear all input texts from the form
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

  // Hide the popup automatically after 3.5 seconds
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
  loadActivity();
  renderProjects('all');
  handleNetworkChange();
});