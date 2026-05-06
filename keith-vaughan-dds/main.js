/* ===================================================
   Keith E. Vaughan, DDS — Site Scripts
   =================================================== */

/* --- Mobile nav toggle --- */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

/* Close mobile nav when a link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* --- Sticky header shadow on scroll --- */
const header = document.getElementById('top').closest('.site-header') || document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,.35)'
    : '0 2px 12px rgba(0,0,0,.25)';
}, { passive: true });

/* --- Active nav link highlight on scroll --- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* --- Contact form handling --- */
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  /* Basic validation */
  const required = ['firstName', 'lastName', 'email'];
  let valid = true;

  required.forEach(id => {
    const field = document.getElementById(id);
    const value = field.value.trim();
    field.style.borderColor = value ? '' : 'var(--red, #e53e3e)';
    if (!value) valid = false;
  });

  const emailField = document.getElementById('email');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
  if (!emailOk) {
    emailField.style.borderColor = 'var(--red, #e53e3e)';
    valid = false;
  }

  if (!valid) return;

  /* Simulate submission */
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    btn.textContent = '✓ Request Sent!';
    btn.style.background = 'var(--teal)';
    btn.style.borderColor = 'var(--teal)';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3500);
  }, 1200);
});

/* Re-clear red borders on input */
form.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => { el.style.borderColor = ''; });
});

/* --- Scroll-reveal animation --- */
const revealEls = document.querySelectorAll(
  '.service-card, .why-card, .testimonial-card, .about__image-wrap, .about__content, .trust-item'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
