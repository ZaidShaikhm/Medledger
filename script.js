/* ================================================================
   MEDLEDGER — PHARMA BILLING  |  script.js
   ================================================================ */

/* ── Footer year ─────────────────────────────────────────────────── */
document.getElementById('footer-year').textContent = new Date().getFullYear();


/* ── RX Card date ───────────────────────────────────────────────── */
(function setRxDate() {
  const el = document.getElementById('rx-date');
  if (!el) return;
  const now = new Date();
  const formatted = now.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  el.textContent = formatted;
})();


/* ── Navbar: mobile hamburger ────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileAnch = document.querySelectorAll('.nav-mobile a');

hamburger.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.getElementById('nav-mobile').setAttribute('aria-hidden', String(!isOpen));
});

mobileAnch.forEach(a => {
  a.addEventListener('click', () => {
    navbar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.getElementById('nav-mobile').setAttribute('aria-hidden', 'true');
  });
});

/* Close mobile nav on outside click */
document.addEventListener('click', (e) => {
  if (navbar.classList.contains('open') && !navbar.contains(e.target)) {
    navbar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ── Scroll reveal (IntersectionObserver) ───────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => revealObserver.observe(el));


/* ── Product tabs ────────────────────────────────────────────────── */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Deactivate all
    tabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((p) => p.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('panel-' + target).classList.add('active');
  });
});


/* ── Form validation ─────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

const FIELDS = ['fullName', 'businessName', 'businessType', 'phone', 'email'];

/**
 * Show or clear an inline error for a field.
 * @param {string} fieldId
 * @param {string} msg   — empty string clears the error
 */
function setError(fieldId, msg) {
  const input  = document.getElementById(fieldId);
  const errEl  = document.getElementById('err-' + fieldId);
  if (!input || !errEl) return;

  errEl.textContent = msg;

  // Wrap selects in .select-wrap
  const wrap = input.closest('.select-wrap');
  if (wrap) {
    wrap.classList.toggle('error', !!msg);
  } else {
    input.classList.toggle('error', !!msg);
  }
}

function clearErrors() {
  FIELDS.forEach((id) => setError(id, ''));
}

/**
 * Validate the form data object and write inline errors.
 * Returns true only when all fields are valid.
 */
function validateForm(data) {
  clearErrors();
  let valid = true;

  if (!data.fullName.trim()) {
    setError('fullName', 'Full name is required.');
    valid = false;
  }

  if (!data.businessName.trim()) {
    setError('businessName', 'Pharmacy or business name is required.');
    valid = false;
  }

  if (!data.businessType) {
    setError('businessType', 'Please select a business type.');
    valid = false;
  }

  if (!data.phone.trim()) {
    setError('phone', 'Phone number is required.');
    valid = false;
  } else if (!PHONE_RE.test(data.phone.trim())) {
    setError('phone', 'Enter a valid 10-digit phone number.');
    valid = false;
  }

  if (!data.email.trim()) {
    setError('email', 'Email address is required.');
    valid = false;
  } else if (!EMAIL_RE.test(data.email.trim())) {
    setError('email', 'Enter a valid email address.');
    valid = false;
  }

  return valid;
}

// Live-clear individual errors as the user corrects them
FIELDS.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => setError(id, ''));
  el.addEventListener('change', () => setError(id, ''));
});

// Form submit
document.getElementById('lead-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    fullName:     form.fullName.value,
    businessName: form.businessName.value,
    businessType: form.businessType.value,
    phone:        form.phone.value,
    email:        form.email.value,
  };

  if (!validateForm(data)) {
    // Focus the first errored field
    const firstErr = FIELDS.find((id) => {
      const el = document.getElementById('err-' + id);
      return el && el.textContent.trim() !== '';
    });
    if (firstErr) document.getElementById(firstErr).focus();
    return;
  }

  /* ── In production: POST data to your CRM / backend here ────── */

  // Tailor the success message by business type
  const msgEl = document.getElementById('modal-msg');
  if (data.businessType === 'Wholesaler') {
    msgEl.textContent = 'Our wholesale team will reach out with distributor pricing within one business day.';
  } else {
    msgEl.textContent = 'Our retail team will reach out to schedule your free 30-minute demo within one business day.';
  }

  openModal();
  form.reset();
  clearErrors();
});


/* ── Modal helpers ───────────────────────────────────────────────── */
const modal = document.getElementById('modal');

function openModal() {
  modal.classList.add('open');
  document.getElementById('modal-ok').focus();
  // Trap focus inside modal (basic: allow Tab to cycle through focusable children)
  modal.addEventListener('keydown', trapFocus);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.removeEventListener('keydown', trapFocus);
  document.body.style.overflow = '';
}

function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const focusables = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
  const first = focusables[0];
  const last  = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-ok').addEventListener('click', closeModal);

// Click outside modal box to close
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
