// ---------- Mobile nav toggle ----------
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle && sidebar) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // close menu after clicking a nav link (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Active section highlighting ----------
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === currentId);
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// ---------- Animated metric counters ----------
const counters = document.querySelectorAll('.metric-num');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));
