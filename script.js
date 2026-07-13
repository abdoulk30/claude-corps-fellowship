// --- Typing effect ---
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'whoami',
  'full-stack developer, ai-native builder',
  'applying to embed at a host org for a year'
];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typedTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typedTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 55);
}
typeLoop();

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('main .section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-links a[data-section="${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(sec => navObserver.observe(sec));

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});
navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setTimeout(() => navLinksList.classList.remove('open'), 0));
});

// --- Lightbox for certificates / delegation plan ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxLabel = document.getElementById('lightboxLabel');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('[data-full]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    lightboxImg.src = trigger.getAttribute('data-full');
    lightboxLabel.textContent = trigger.getAttribute('data-label') || '';
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// --- Delegation plan flip card ---
const delegationFlipCard = document.getElementById('delegationFlipCard');
if (delegationFlipCard) {
  delegationFlipCard.addEventListener('click', () => {
    delegationFlipCard.classList.toggle('flipped');
  });
}
