/* ============================================================
   GHOST OF TSUSHIMA LOADING SCREEN
============================================================ */
function initLoader() {
  const loader = document.getElementById('skeleton-loader');
  const barFill = document.getElementById('loaderBarFill');
  const counter = document.getElementById('loaderCounter');
  const status = document.getElementById('loaderStatus');

  if (!loader) {
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
const SKILL_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  design: 'Design & Tools'
};

const SKILLS = [
  { name: 'HTML5', cat: 'frontend', desc: 'Semantic, accessible markup and clean page structure.' },
  { name: 'CSS3', cat: 'frontend', desc: 'Flexbox, Grid, and responsive layouts that hold up on any screen.' },
  { name: 'JavaScript', cat: 'frontend', desc: 'DOM scripting, events, and interactive interfaces like this portfolio.' },
  { name: 'Bootstrap', cat: 'frontend', desc: 'Fast responsive layouts using the grid and component system.' },
  { name: 'PHP', cat: 'backend', desc: 'Server-side logic, form handling, and database-driven pages.' },
  { name: 'Python', cat: 'backend', desc: 'Desktop apps and scripts, including the Tkinter inventory app.' },
  { name: 'MySQL', cat: 'database', desc: 'Database design, queries, and CRUD operations.' },
  { name: 'Figma', cat: 'design', desc: 'User flows and high-fidelity, polished interface designs.' },
  { name: 'Prototyping', cat: 'design', desc: 'Interactive prototypes to test ideas before building them.' },
  { name: 'Git and GitHub', cat: 'design', desc: 'Version control and project hosting.' }
];

function renderSkills(filter = 'all') {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  container.innerHTML = '';

  SKILLS.filter((s) => filter === 'all' || s.cat === filter).forEach((skill) => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3 class="skill-name">${skill.name}</h3>
      <p class="skill-cat"><span class="cat-dot ${skill.cat}"></span>${SKILL_CATEGORIES[skill.cat]}</p>
      <p class="skill-desc">${skill.desc}</p>
    `;
    container.appendChild(card);
  });
}

function filterSkills(cat, btnElement) {
  btnElement.parentElement.querySelectorAll('.filter').forEach((b) => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btnElement.classList.add('active');
  btnElement.setAttribute('aria-pressed', 'true');
  renderSkills(cat);
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
    link: 'https://github.com/Clumsy0717'
  }
];

function tagsMarkup(tags) {
  return tags.map((t) => `<li class="tag">${t}</li>`).join('');
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
      <p class="project-status"><span class="status-dot ${proj.dot}"></span>${proj.status}</p>
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.desc}</p>
      <ul class="tag-list">${tagsMarkup(proj.tags)}</ul>
      <button type="button" class="btn btn-ghost btn-sm project-btn" onclick="openProjectModal('${proj.id}')">View details</button>
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

  if (proj.link && proj.link !== '#') {
    const label = proj.link.includes('github.com') ? 'View on GitHub' : 'Open project';
    const open = document.createElement('a');
    open.className = 'btn btn-gold btn-sm';
    open.href = proj.link;
    open.target = '_blank';
    open.rel = 'noopener';
    open.textContent = label;
    actions.appendChild(open);
  }

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
async function submitSpideyForm(event) {
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
  const screen = document.getElementById('offline-screen');
  if (!screen) return;
  screen.style.display = navigator.onLine ? 'none' : 'flex';
}
window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

/* ============================================================
   INIT
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  setupScrollTop();
  setupTypewriter();
  setupModal();
  setupRevealSlider();
  renderSkills('all');
  loadActivity();
  renderProjects('all');
  handleNetworkChange();
});