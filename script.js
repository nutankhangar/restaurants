/* ── THEME TOGGLE (Dark/Light Mode) ──────────────────── */
const themeToggleBtn = document.getElementById('themeToggle');
const rootElement = document.documentElement;

const storedTheme = localStorage.getItem('ishtihar-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
  rootElement.setAttribute('data-theme', 'dark');
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    rootElement.removeAttribute('data-theme');
    localStorage.setItem('ishtihar-theme', 'light');
  } else {
    rootElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('ishtihar-theme', 'dark');
  }
});

/* ── MOBILE NAV (Event Delegation) ───────────────────── */
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('primary-nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.classList.toggle('active', isOpen); 
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEALS ──────────────────────────────────── */
const revealObs = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      e.target.classList.add('in'); 
      observer.unobserve(e.target); 
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── REDUCED MOTION ──────────────────────────────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  const carousel = document.querySelector('.carousel-track');
  const sticker = document.querySelector('.retro-sticker');
  const marquee = document.querySelector('.marquee-track');
  if (carousel) carousel.style.animation = 'none';
  if (sticker) sticker.style.animation = 'none';
  if (marquee) marquee.style.animation = 'none';
}