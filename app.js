/* ═══════════════════════════════════════════════════════════
   I-MARATHON APP — Independence Marathon SPA
   Hash-based routing · 12 pages · CI v4.0
   ═══════════════════════════════════════════════════════════ */

const S = CONFIG.site;
const app = document.getElementById('app');

/* ─── ANALYTICS ─── */
function trackEvent(event, detail) {
  console.log(`[I-Marathon] ${event}`, detail || '');
  if (window.dataLayer) window.dataLayer.push({ event, detail });
}

/* ─── TOAST ─── */
function showToast(msg, type = 'success') {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

/* ─── MOBILE NAV ─── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ─── FORM HELPERS ─── */
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePhone(p) { return /^[\+]?[\d\s\-()]{7,}$/.test(p); }

function setFieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('error');
  let err = el.parentNode.querySelector('.form-error');
  if (!err) { err = document.createElement('div'); err.className = 'form-error'; el.parentNode.appendChild(err); }
  err.textContent = msg;
}

function clearErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(e => e.remove());
}

/* ─── FOOTER NEWSLETTER ─── */
function submitFooterNewsletter() {
  const email = document.getElementById('footerEmail').value.trim();
  if (!validateEmail(email)) { showToast('Please enter a valid email', 'error'); return; }
  trackEvent('newsletter_signup', email);
  showToast('Welcome to the I-Marathon community!');
  document.getElementById('footerEmail').value = '';
}

/* ─── FAQ TOGGLE ─── */
function toggleFaq(el) {
  el.classList.toggle('open');
}

/* ─── COUNTDOWN ─── */
function updateCountdown() {
  const target = new Date(S.raceDate);
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const el = document.getElementById('countdown');
  if (el) {
    el.innerHTML = `
      <div class="countdown__item"><div class="countdown__value">${String(days).padStart(2,'0')}</div><div class="countdown__label">DAYS</div></div>
      <div class="countdown__item"><div class="countdown__value">${String(hours).padStart(2,'0')}</div><div class="countdown__label">HOURS</div></div>
      <div class="countdown__item"><div class="countdown__value">${String(minutes).padStart(2,'0')}</div><div class="countdown__label">MINS</div></div>
      <div class="countdown__item"><div class="countdown__value">${String(seconds).padStart(2,'0')}</div><div class="countdown__label">SECS</div></div>
    `;
  }
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── ROUTING ─── */
function getRoute() { return (window.location.hash.replace('#', '') || '/'); }
function navigate(route) { window.location.hash = '#' + route; }

function updateActiveLinks(route) {
  document.querySelectorAll('[data-route]').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-route') === route);
  });
}

function updateMeta(route) {
  const seo = CONFIG.seo[route];
  if (seo) {
    document.title = seo.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = seo.desc;
  }
}

/* ═══════════════════════════════════════════════
   PAGE RENDERERS
   ═══════════════════════════════════════════════ */

function renderHome() {
  return `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__content">
        <div class="hero__label">REGISTRATION OPEN · ${S.location}</div>
        <h1 class="t-display t-hero hero__title">INDEPENDENCE<br>MARATHON</h1>
        <p class="hero__subtitle">KAMPALA · UGANDA · 2026</p>
        <p class="hero__date">${S.date.toUpperCase()} · NORTHERN BYPASS ROUTE</p>
        <div class="countdown" id="countdown"></div>
        <div class="hero__actions">
          <a href="#/register" class="btn btn--crimson btn--lg" onclick="trackEvent('register_click','hero')">Register Now</a>
          <a href="#/course" class="btn btn--outline">View Route</a>
          <a href="#/about" class="btn btn--outline">Our Story</a>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <div class="stats-bar">
      <div class="stats-bar__item"><div class="stats-bar__value">10,000+</div><div class="stats-bar__label">RUNNERS</div></div>
      <div class="stats-bar__item"><div class="stats-bar__value">5</div><div class="stats-bar__label">CATEGORIES</div></div>
      <div class="stats-bar__item"><div class="stats-bar__value">42K</div><div class="stats-bar__label">FULL MARATHON</div></div>
      <div class="stats-bar__item"><div class="stats-bar__value">UGX 250M</div><div class="stats-bar__label">PRIZE FUND</div></div>
      <div class="stats-bar__item"><div class="stats-bar__value">2ND</div><div class="stats-bar__label">EDITION</div></div>
    </div>

    <!-- FOUR PILLARS -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--crimson section-head__label">Our Foundation</span>
          <h2 class="t-display t-h1 section-head__title">FOUR PILLARS</h2>
        </div>
        <div class="grid-4">
          ${CONFIG.pillars.map(p => `
            <div class="pillar-card reveal" style="border-top-color:${p.color}">
              <span class="pillar-card__icon" style="color:${p.color}">${p.icon}</span>
              <h3 class="pillar-card__title" style="color:${p.color}">${p.title}</h3>
              <p class="pillar-card__desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- RACE ESSENTIALS -->
    <section class="section section--white">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--crimson section-head__label">At a Glance</span>
          <h2 class="t-display t-h1 section-head__title">RACE ESSENTIALS</h2>
        </div>
        <div class="grid-3">
          <!-- Fees snapshot -->
          <div class="card reveal">
            <div class="card__body">
              <span class="badge badge--crimson mb-12">Entry Fees</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;letter-spacing:2px;margin-bottom:16px;color:var(--text-dark)">CATEGORIES & PRICING</h3>
              ${CONFIG.fees.map(f => `
                <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:0.82rem">
                  <span style="font-weight:600;color:var(--text-dark)">${f.category}</span>
                  <span style="color:var(--crimson);font-weight:700">${f.early}</span>
                </div>
              `).join('')}
              <p style="font-size:0.72rem;color:var(--text-dark-mid);margin-top:16px">Early bird prices shown. <a href="#/register" style="color:var(--crimson)">See all pricing →</a></p>
            </div>
          </div>
          <!-- Course snapshot -->
          <div class="card reveal">
            <div class="card__img">🗺️</div>
            <div class="card__body">
              <span class="badge badge--crimson mb-12">The Route</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;letter-spacing:2px;margin-bottom:12px;color:var(--text-dark)">NORTHERN BYPASS</h3>
              <p style="font-size:0.85rem;color:var(--text-dark-mid);margin-bottom:16px;line-height:1.6">A premium route through Kampala's Northern Bypass corridor with GPX downloads, elevation profiles, and interactive maps for all categories.</p>
              <a href="#/course" class="btn btn--outline-dark btn--sm">View Course →</a>
            </div>
          </div>
          <!-- Race week snapshot -->
          <div class="card reveal">
            <div class="card__body">
              <span class="badge badge--gold mb-12">Race Week</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;letter-spacing:2px;margin-bottom:16px;color:var(--text-dark)">THU–SUN PROGRAMME</h3>
              ${CONFIG.raceWeekSchedule.slice(0, 3).map(d => `
                <div style="margin-bottom:14px">
                  <div style="font-family:var(--font-display);font-weight:600;font-size:0.78rem;color:var(--crimson);letter-spacing:1px;margin-bottom:4px">${d.day.toUpperCase()}</div>
                  <div style="font-size:0.8rem;color:var(--text-dark-mid)">${d.events[0]}</div>
                </div>
              `).join('')}
              <a href="#/course" class="btn btn--outline-dark btn--sm mt-24">Full Schedule →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RACE DAY TEASER -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--gold section-head__label">11 October 2026</span>
          <h2 class="t-display t-h1 section-head__title">RACE DAY HUB</h2>
          <p class="section-head__desc">Live tracking, spectator guide, digital cheer cards, and real-time results — all in one place on race day.</p>
        </div>
        <div class="grid-3">
          ${[
            { icon: '📍', title: 'LIVE TRACKING', desc: 'Track any runner by bib number or name. GPS updates every 60 seconds.', accent: 'var(--crimson)' },
            { icon: '👁️', title: 'SPECTATOR GUIDE', desc: 'Optimal viewing spots along the Northern Bypass with estimated arrival times.', accent: 'var(--white)' },
            { icon: '📣', title: 'DIGITAL CHEER', desc: 'Send personalised cheer messages to runners via SMS and social media.', accent: 'var(--gold)' },
          ].map(f => `
            <div class="raceday-card reveal" style="border-top-color:${f.accent}">
              <div class="raceday-card__icon">${f.icon}</div>
              <h4 class="raceday-card__title">${f.title}</h4>
              <p class="raceday-card__desc">${f.desc}</p>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-32">
          <a href="#/race-day" class="btn btn--outline">Explore Race Day Hub →</a>
        </div>
      </div>
    </section>

    <!-- COMMUNITY STORIES -->
    <section class="section section--white">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--crimson section-head__label">The Movement</span>
          <h2 class="t-display t-h1 section-head__title">COMMUNITY VOICES</h2>
        </div>
        <div class="grid-3">
          ${[
            { name: 'Grace Namutebi', role: 'First-time runner, 2025', quote: 'I never thought I could run 10K. Independence Marathon gave me a community that believed in me before I believed in myself.' },
            { name: 'David Ssempala', role: 'Kampala Road Runners Club', quote: 'This is more than a race. It\'s a celebration of who we are as Ugandans. Our club runs with pride every year.' },
            { name: 'Sarah Akello', role: 'Corporate participant, MTN Uganda', quote: 'Our entire office trained together. The corporate relay brought our team closer than any retreat ever could.' },
          ].map(t => `
            <div class="testimonial reveal">
              <div class="testimonial__stars">★★★★★</div>
              <p class="testimonial__quote">"${t.quote}"</p>
              <div class="testimonial__name">${t.name}</div>
              <div class="testimonial__role">${t.role}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SPONSORS STRIP -->
    <section class="section">
      <div class="container text-center">
        <span class="badge badge--gold mb-16">Partnerships</span>
        <h2 class="t-display t-h2 mb-32">SPONSORS & PARTNERS</h2>
        <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:32px">
          ${['Title Sponsor', 'Gold 1', 'Gold 2', 'Silver 1', 'Silver 2'].map(s => `
            <div class="sponsor-logo">${s}</div>
          `).join('')}
        </div>
        <a href="#/sponsors" class="btn btn--outline">Become a Partner →</a>
      </div>
    </section>

    <!-- FAQ PREVIEW -->
    <section class="section section--white">
      <div class="container" style="max-width:760px">
        <div class="section-head">
          <h2 class="t-display t-h1 section-head__title">FAQ</h2>
        </div>
        ${CONFIG.faqs.slice(0, 6).map(faq => `
          <div class="faq-item" onclick="toggleFaq(this)">
            <button class="faq-item__q">${faq.q}<span class="faq-item__arrow">▾</span></button>
            <div class="faq-item__a"><div class="faq-item__a-inner">${faq.a}</div></div>
          </div>
        `).join('')}
        <div class="text-center mt-32">
          <a href="#/contact" class="btn btn--outline-dark btn--sm">View All FAQs →</a>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER CTA -->
    <section class="section">
      <div class="container" style="max-width:680px">
        <div class="cta-block" style="flex-direction:column;text-align:center;align-items:center;border-color:rgba(177,18,38,0.3)">
          <h2 class="cta-block__title">JOIN THE MOVEMENT</h2>
          <p class="cta-block__desc mb-24">Sign up for race updates, training tips, and community news.</p>
          <div style="display:flex;gap:8px;max-width:400px;width:100%">
            <input type="email" placeholder="Your email" id="homeEmail" class="form-input" style="flex:1">
            <button class="btn btn--crimson" onclick="
              var e=document.getElementById('homeEmail').value.trim();
              if(!validateEmail(e)){showToast('Please enter a valid email','error');return}
              trackEvent('newsletter_signup',e);showToast('Welcome to the I-Marathon community!');
              document.getElementById('homeEmail').value='';
            ">Join</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ─── ABOUT ─── */
function renderAbout() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Our Story</span>
        <h1 class="t-display t-h1 page-hero__title">ABOUT INDEPENDENCE MARATHON</h1>
        <p class="page-hero__desc">More than a race. A national movement anchored in belonging, ownership, participation, and pride.</p>
      </div>
    </section>
    <section class="section section--white">
      <div class="container" style="max-width:800px">
        <div class="crimson-line mb-24"></div>
        <h2 class="t-display t-h2 mb-16" style="color:var(--text-dark)">THE STORY</h2>
        <p style="color:var(--text-dark-mid);line-height:1.8;margin-bottom:20px">Independence Marathon is Uganda's premier national endurance event — a structured social movement anchored in four pillars: BELONG, OWN, BE PART, and PRIDE. Born from the spirit of independence, this marathon celebrates what it means to be Ugandan through the universal language of running.</p>
        <p style="color:var(--text-dark-mid);line-height:1.8;margin-bottom:20px">In 2026, we elevate the experience with a premium route along the Northern Bypass, world-class chip timing, live GPS tracking, and a digital experience benchmarked against the world's best marathons — including the TCS New York City Marathon, Standard Chartered Nairobi Marathon, and Fort Portal City Marathon.</p>
        <p style="color:var(--text-dark-mid);line-height:1.8;margin-bottom:40px">Our vision is to deliver a premium, cinematic, and functionally robust event that converts visitors into runners, informs sponsors, engages communities, and celebrates national pride year-round.</p>

        <div class="divider"></div>

        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">THE FOUR PILLARS</h2>
        <div class="grid-2 mb-48">
          ${CONFIG.pillars.map(p => `
            <div style="padding:24px;border-left:3px solid ${p.color === '#FFFFFF' ? 'var(--charcoal)' : p.color}">
              <h3 style="font-family:var(--font-display);font-size:1.1rem;letter-spacing:3px;color:${p.color === '#FFFFFF' ? 'var(--text-dark)' : p.color};margin-bottom:8px">${p.title}</h3>
              <p style="font-size:0.88rem;color:var(--text-dark-mid);line-height:1.6">${p.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">CSR & COMMUNITY IMPACT</h2>
        <p style="color:var(--text-dark-mid);line-height:1.8;margin-bottom:20px">Independence Marathon is committed to community reinvestment. A portion of every registration fee supports grassroots running programmes, school sports infrastructure, and community health initiatives across Uganda.</p>
        <p style="color:var(--text-dark-mid);line-height:1.8;margin-bottom:32px">Our sustainability commitment includes eco-conscious race operations, waste reduction targets, and partnerships with environmental organisations.</p>

        <div class="gap-center">
          <a href="#/register" class="btn btn--crimson">Register Now</a>
          <a href="#/sponsors" class="btn btn--outline-dark">Partner With Us</a>
        </div>
      </div>
    </section>
  `;
}

/* ─── REGISTER ─── */
function renderRegister() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Join the Movement</span>
        <h1 class="t-display t-h1 page-hero__title">REGISTER</h1>
        <p class="page-hero__desc">Secure your place at Independence Marathon 2026. Choose your category and complete registration below.</p>
      </div>
    </section>
    <section class="section section--white">
      <div class="container">
        <!-- FEES TABLE -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">ENTRY FEES & CATEGORIES</h2>
        <div class="table-wrap mb-48">
          <table>
            <thead><tr><th>Category</th><th>Early Bird</th><th>Standard</th><th>Late</th><th>International</th></tr></thead>
            <tbody>
              ${CONFIG.fees.map(f => `
                <tr><td style="font-weight:600">${f.category}</td><td style="color:var(--crimson);font-weight:700">${f.early}</td><td>${f.standard}</td><td>${f.late}</td><td>${f.intl}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">START TIMES & CUT-OFFS</h2>
        <div class="table-wrap mb-48">
          <table>
            <thead><tr><th>Event</th><th>Gun Time</th><th>Assembly</th><th>Cut-off</th></tr></thead>
            <tbody>
              ${CONFIG.startTimes.map(t => `
                <tr><td style="font-weight:600">${t.event}</td><td style="font-weight:700">${t.time}</td><td>${t.assembly}</td><td>${t.cutoff}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="divider"></div>

        <!-- HOW TO REGISTER -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">HOW TO REGISTER</h2>
        <div class="steps mb-48" style="max-width:640px">
          <div class="step-item"><div class="step-num">1</div><div class="step-content"><div class="step-title" style="color:var(--text-dark)">Complete the form below</div><div class="step-desc">Personal details, category selection, emergency contact, and indemnity agreement.</div></div></div>
          <div class="step-item"><div class="step-num">2</div><div class="step-content"><div class="step-title" style="color:var(--text-dark)">Make payment</div><div class="step-desc">MTN Mobile Money, Airtel Money, Visa/Mastercard, or USD card for international runners.</div></div></div>
          <div class="step-item"><div class="step-num">3</div><div class="step-content"><div class="step-title" style="color:var(--text-dark)">Receive confirmation</div><div class="step-desc">Auto-email with bib number, start wave, kit collection details, and runner guide PDF.</div></div></div>
          <div class="step-item"><div class="step-num">4</div><div class="step-content"><div class="step-title" style="color:var(--text-dark)">Collect your race kit</div><div class="step-desc">Bring ID and confirmation to the Expo at Kololo Airstrip (Thursday or Friday).</div></div></div>
        </div>

        <!-- REGISTRATION FORM -->
        <div style="max-width:720px;margin:0 auto">
          <h2 class="t-display t-h2 mb-8" style="color:var(--text-dark)">REGISTRATION FORM</h2>
          <p style="color:var(--text-dark-mid);margin-bottom:24px;font-size:0.9rem">Fields marked * are required. Complete payment after submission.</p>
          <div id="regFormContainer">
            <div id="registrationForm">
              <div class="form-grid">
                <div class="form-group"><label class="form-label">First Name *</label><input type="text" id="regFirstName" class="form-input" placeholder="First name"></div>
                <div class="form-group"><label class="form-label">Last Name *</label><input type="text" id="regLastName" class="form-input" placeholder="Last name"></div>
              </div>
              <div class="form-grid">
                <div class="form-group"><label class="form-label">Email *</label><input type="email" id="regEmail" class="form-input" placeholder="you@email.com"></div>
                <div class="form-group"><label class="form-label">Phone *</label><input type="tel" id="regPhone" class="form-input" placeholder="+256 7XX XXX XXX"></div>
              </div>
              <div class="form-grid">
                <div class="form-group"><label class="form-label">Race Category *</label>
                  <select id="regCategory" class="form-select">
                    <option value="">Select category</option>
                    ${CONFIG.fees.map(f => `<option value="${f.category}">${f.category}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group"><label class="form-label">T-Shirt Size *</label>
                  <select id="regTshirt" class="form-select"><option value="">Select</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option></select>
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group"><label class="form-label">Gender</label>
                  <select id="regGender" class="form-select"><option value="">Select</option><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option></select>
                </div>
                <div class="form-group"><label class="form-label">Date of Birth *</label><input type="date" id="regDob" class="form-input"></div>
              </div>
              <div class="form-group"><label class="form-label">Nationality</label><input type="text" id="regNationality" class="form-input" placeholder="Country"></div>
              <div class="form-group"><label class="form-label">Emergency Contact Name & Phone *</label><input type="text" id="regEmergency" class="form-input" placeholder="Name — +256 7XX XXX XXX"></div>
              <div class="form-group"><label class="form-label">Running Club (optional)</label><input type="text" id="regClub" class="form-input" placeholder="Club name"></div>
              <div class="form-group"><label class="form-label">Promo / Discount Code</label><input type="text" id="regPromo" class="form-input" placeholder="Enter code if applicable"></div>
              <div class="ohnohoney"><input type="text" id="regHoney" tabindex="-1" autocomplete="off"></div>
              <div class="form-group"><label class="form-check"><input type="checkbox" id="regTerms"> I agree to the <a href="#" style="color:var(--crimson)">Terms & Conditions</a>, <a href="#" style="color:var(--crimson)">Privacy Policy</a>, and <a href="#" style="color:var(--crimson)">Indemnity Declaration</a>. *</label></div>
              <div class="form-group"><label class="form-check"><input type="checkbox" id="regNewsletter" checked> Send me race updates and training tips by email.</label></div>
              <button class="btn btn--crimson btn--lg" style="width:100%;margin-top:8px" onclick="submitRegistration()">COMPLETE REGISTRATION</button>
            </div>
          </div>
          <div style="margin-top:24px;padding:20px;background:rgba(0,0,0,0.03);border:1px solid rgba(0,0,0,0.06);font-size:0.82rem;color:var(--text-dark-mid)">
            <strong style="color:var(--text-dark)">Payment Options:</strong><br>
            MTN Mobile Money · Airtel Money · Visa/Mastercard (local & international)<br>
            USD card option for international participants · Secure PCI-DSS compliant via Pesapal
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ─── COURSE ─── */
function renderCourse() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">The Route</span>
        <h1 class="t-display t-h1 page-hero__title">COURSE & ROUTE</h1>
        <p class="page-hero__desc">A premium route along Kampala's Northern Bypass. GPX downloads, elevation profiles, and aid station maps for all categories.</p>
      </div>
    </section>
    <section class="section section--white">
      <div class="container">
        <!-- ROUTE DOWNLOADS -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">ROUTE DOWNLOADS</h2>
        <div class="grid-4 mb-48">
          ${Object.entries(CONFIG.routeLinks).map(([dist, links]) => `
            <div class="route-card" style="border-color:rgba(0,0,0,0.08)">
              <div class="route-card__title" style="color:var(--text-dark)">${dist}</div>
              <div class="route-card__links">
                <a href="${links.gpx}" class="btn btn--outline-dark btn--sm">📥 GPX</a>
                <a href="${links.strava}" class="btn btn--outline-dark btn--sm">🏃 Strava</a>
                <a href="${links.google}" class="btn btn--outline-dark btn--sm">🗺️ Map</a>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- COURSE MARKERS -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">COURSE MARKERS</h2>
        <div class="mb-48">
          ${CONFIG.courseMarkers.map(m => `
            <div class="course-marker">
              <div class="course-marker__km">${m.km}</div>
              <div>
                <div class="course-marker__name">${m.name}</div>
                <div class="course-marker__desc">${m.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- AID STATIONS -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">AID STATIONS & MEDICAL</h2>
        <div class="table-wrap mb-32">
          <table>
            <thead><tr><th>Station</th><th>Location</th><th>Water</th><th>Electrolytes</th><th>Medical</th></tr></thead>
            <tbody>
              ${CONFIG.aidStations.map(s => `
                <tr><td style="font-weight:600">${s.name}</td><td>${s.location}</td><td>${s.water ? '✓' : '—'}</td><td>${s.electrolytes ? '✓' : '—'}</td><td>${s.medical}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

/* ─── RUNNER HUB ─── */
function renderRunnerHub() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Authenticated Portal</span>
        <h1 class="t-display t-h1 page-hero__title">RUNNER HUB</h1>
        <p class="page-hero__desc">Your personal race command centre. Dashboard, training plans, runner's guide, and race day tools.</p>
      </div>
    </section>
    <section class="section section--charcoal">
      <div class="container">
        <div class="grid-2">
          <!-- Login -->
          <div>
            <h2 class="t-display t-h2 mb-16">RUNNER LOGIN</h2>
            <p class="text-mid mb-24" style="font-size:0.9rem;line-height:1.6">Log in with your confirmation number and email to access your personal dashboard, training plans, and race day tools.</p>
            <div style="background:rgba(255,255,255,0.04);padding:32px;border:1px solid var(--border)">
              <div class="form-group"><label class="form-label">Email Address</label><input type="email" class="form-input" placeholder="your@email.com"></div>
              <div class="form-group"><label class="form-label">Confirmation Number</label><input type="text" class="form-input" placeholder="IM-2026-XXXX"></div>
              <button class="btn btn--crimson" style="width:100%" onclick="showToast('Runner Hub login will be active after registration opens')">LOG IN</button>
              <p style="font-size:0.75rem;color:var(--text-light);margin-top:12px;text-align:center">Forgot your confirmation number? <a href="#/contact" style="color:var(--crimson)">Contact us</a></p>
            </div>
          </div>
          <!-- Features -->
          <div>
            <h2 class="t-display t-h2 mb-24">WHAT'S INSIDE</h2>
            ${[
              { icon: '🎫', title: 'Personal Dashboard', desc: 'Bib number, category, wave, start time, kit collection slot.' },
              { icon: '📋', title: "Runner's Guide PDF", desc: 'Race logistics, hydration map, medical stations, start procedure.' },
              { icon: '🏋️', title: 'Training Plans', desc: '8 and 16-week programmes: beginner, intermediate, advanced.' },
              { icon: '📍', title: 'Live Tracking Link', desc: 'Share your race day tracking link with family and friends.' },
              { icon: '🏅', title: 'Finisher Certificate', desc: 'Personalised PDF with your name, time, position, category.' },
              { icon: '📱', title: 'Race Notifications', desc: 'SMS and email alerts at start, halfway, and finish.' },
            ].map(f => `
              <div style="display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--border)">
                <span style="font-size:1.5rem;flex-shrink:0">${f.icon}</span>
                <div>
                  <div style="font-family:var(--font-display);font-size:0.8rem;letter-spacing:2px;font-weight:600;margin-bottom:4px">${f.title.toUpperCase()}</div>
                  <div style="font-size:0.82rem;color:var(--text-mid)">${f.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="divider"></div>

        <!-- TRAINING PLANS -->
        <h2 class="t-display t-h2 mb-24">TRAINING PLANS</h2>
        <div class="grid-3">
          ${CONFIG.trainingPlans.map(p => `
            <div class="card">
              <div class="card__body">
                <span class="badge badge--crimson mb-12">${p.level}</span>
                <h3 style="font-family:var(--font-display);font-size:1rem;letter-spacing:2px;margin-bottom:8px">${p.weeks} WEEKS · ${p.distance}</h3>
                <p style="font-size:0.85rem;color:var(--text-mid);line-height:1.6;margin-bottom:16px">${p.desc}</p>
                <a href="#" class="btn btn--outline btn--sm">📥 Download PDF</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ─── COMMUNITY ─── */
function renderCommunity() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">The Movement</span>
        <h1 class="t-display t-h1 page-hero__title">COMMUNITY</h1>
        <p class="page-hero__desc">Running clubs, volunteer opportunities, school activation, and community stories.</p>
      </div>
    </section>
    <section class="section section--white">
      <div class="container">
        <div class="grid-4 mb-48">
          ${[
            { icon: '🏃', title: 'Running Clubs', desc: 'Find an affiliated club near you' },
            { icon: '🤝', title: 'Volunteer', desc: 'Be part of race day operations' },
            { icon: '🎓', title: 'Schools', desc: 'Youth activation programme' },
            { icon: '⭐', title: 'Ambassadors', desc: 'Champion the movement' },
          ].map(c => `
            <div style="background:var(--black);padding:24px;cursor:pointer;transition:transform 0.3s;display:flex;align-items:center;gap:16px" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
              <span style="font-size:1.8rem">${c.icon}</span>
              <div>
                <h4 style="font-family:var(--font-display);font-size:0.85rem;font-weight:600;letter-spacing:2px;color:var(--white)">${c.title.toUpperCase()}</h4>
                <p style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-top:4px">${c.desc}</p>
              </div>
              <span style="margin-left:auto;color:var(--crimson)">→</span>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- VOLUNTEER SIGN-UP -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">VOLUNTEER SIGN-UP</h2>
        <div style="max-width:600px">
          <p style="color:var(--text-dark-mid);margin-bottom:24px;font-size:0.9rem;line-height:1.6">Join our volunteer team and help deliver an unforgettable race experience. Choose your preferred role and availability.</p>
          <div id="volunteerFormContainer">
            <div class="form-grid">
              <div class="form-group"><label class="form-label">Full Name *</label><input type="text" id="volName" class="form-input" placeholder="Your name"></div>
              <div class="form-group"><label class="form-label">Email *</label><input type="email" id="volEmail" class="form-input" placeholder="you@email.com"></div>
            </div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" id="volPhone" class="form-input" placeholder="+256 7XX XXX XXX"></div>
            <div class="form-group"><label class="form-label">Preferred Role</label>
              <select id="volRole" class="form-select"><option value="">Select</option><option>Course Marshal</option><option>Hydration Station</option><option>Finish Line</option><option>Expo & Registration</option><option>Medical Support</option><option>Any Role</option></select>
            </div>
            <button class="btn btn--crimson" style="width:100%" onclick="submitVolunteer()">SIGN UP AS VOLUNTEER</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ─── SPONSORS ─── */
function renderSponsors() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Partnerships</span>
        <h1 class="t-display t-h1 page-hero__title">SPONSORS & PARTNERS</h1>
        <p class="page-hero__desc">Gold, Silver, Bronze & In-Kind packages available. 10,000+ runners. National media reach.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="t-display t-h2 mb-32">PARTNERSHIP PACKAGES</h2>
        <div class="grid-3 mb-48">
          ${CONFIG.sponsorTiers.map(t => `
            <div class="card">
              <div class="card__body">
                <span class="badge ${t.tier.includes('Gold') || t.tier.includes('Title') ? 'badge--gold' : 'badge--white'} mb-12">${t.tier}</span>
                <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;letter-spacing:2px;margin-bottom:16px">${t.price}</div>
                ${t.perks.map(p => `<div class="checklist-item" style="border-bottom-color:var(--border)"><span class="checklist-check">✓</span>${p}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- ENQUIRY FORM -->
        <h2 class="t-display t-h2 mb-16">SPONSOR ENQUIRY</h2>
        <p class="text-mid mb-24" style="font-size:0.9rem">Interested in partnering? Fill in the form below and our team will get back to you within 2 business days.</p>
        <div style="max-width:600px" id="sponsorFormContainer">
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Contact Name *</label><input type="text" id="spName" class="form-input" placeholder="Full name"></div>
            <div class="form-group"><label class="form-label">Organisation *</label><input type="text" id="spOrg" class="form-input" placeholder="Company name"></div>
          </div>
          <div class="form-grid">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" id="spEmail" class="form-input" placeholder="you@company.com"></div>
            <div class="form-group"><label class="form-label">Phone</label><input type="tel" id="spPhone" class="form-input" placeholder="+256 7XX XXX XXX"></div>
          </div>
          <div class="form-group"><label class="form-label">Interested Tier</label>
            <select id="spTier" class="form-select"><option value="">Select tier</option>${CONFIG.sponsorTiers.map(t => `<option>${t.tier}</option>`).join('')}</select>
          </div>
          <div class="form-group"><label class="form-label">Message</label><textarea id="spMessage" class="form-textarea" placeholder="Tell us about your organisation and how you'd like to partner"></textarea></div>
          <div class="ohnohoney"><input type="text" id="spHoney" tabindex="-1" autocomplete="off"></div>
          <button class="btn btn--gold" style="width:100%" onclick="submitSponsorInquiry()">SUBMIT ENQUIRY</button>
        </div>
      </div>
    </section>
  `;
}

/* ─── RESULTS ─── */
function renderResults() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Performance</span>
        <h1 class="t-display t-h1 page-hero__title">RESULTS & RECORDS</h1>
        <p class="page-hero__desc">2025 results, winners gallery, and finisher certificate downloads.</p>
      </div>
    </section>
    <section class="section section--white">
      <div class="container">
        <!-- SEARCH -->
        <div class="tracker-bar mb-48" style="background:rgba(0,0,0,0.02);border-color:rgba(0,0,0,0.08)">
          <span class="tracker-bar__label" style="color:var(--text-dark)">SEARCH RESULTS:</span>
          <div class="tracker-bar__input-group">
            <input class="tracker-bar__input" placeholder="Search by name or bib number..." style="background:var(--white);border-color:rgba(0,0,0,0.12);color:var(--text-dark)">
            <button class="tracker-bar__btn">🔍</button>
          </div>
        </div>

        <!-- PRIZE MONEY -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">PRIZE MONEY (2026)</h2>
        <div class="table-wrap mb-48">
          <table>
            <thead><tr><th>Category</th><th>1st Place</th><th>2nd Place</th><th>3rd Place</th></tr></thead>
            <tbody>
              ${CONFIG.prizes.map(p => `<tr><td style="font-weight:600">${p.category}</td><td style="color:var(--crimson);font-weight:700">${p.first}</td><td>${p.second}</td><td>${p.third}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="divider"></div>

        <!-- 2025 RESULTS -->
        <h2 class="t-display t-h2 mb-24" style="color:var(--text-dark)">2025 PODIUM RESULTS</h2>
        <div class="table-wrap mb-32">
          <table>
            <thead><tr><th>Pos</th><th>Name</th><th>Category</th><th>Time</th><th>Gender</th><th>Nat</th></tr></thead>
            <tbody>
              ${CONFIG.results2025.map(r => `
                <tr>
                  <td><span class="pos-badge pos-badge--${r.pos}">${r.pos}</span></td>
                  <td style="font-weight:500">${r.name}</td>
                  <td>${r.cat}</td>
                  <td style="font-family:var(--font-display);font-weight:600;letter-spacing:1px">${r.time}</td>
                  <td><span class="gender-tag gender-tag--${r.gender}">${r.gender === 'M' ? 'MEN' : 'WOMEN'}</span></td>
                  <td>${r.nationality}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="gap-center mt-32">
          <a href="#" class="btn btn--outline-dark">📥 Full 2025 Results CSV</a>
          <a href="#" class="btn btn--outline-dark">🏅 Finisher Certificate</a>
        </div>
      </div>
    </section>
  `;
}

/* ─── RACE DAY ─── */
function renderRaceDay() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--live mb-12">● RACE DAY</span>
        <h1 class="t-display t-h1 page-hero__title">RACE DAY HUB</h1>
        <p class="page-hero__desc">Live tracking, spectator guide, digital cheer cards, leaderboard, and real-time results.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <!-- TRACKER -->
        <div class="tracker-bar mb-48">
          <span class="tracker-bar__label">TRACK A RUNNER:</span>
          <div class="tracker-bar__input-group">
            <input class="tracker-bar__input" placeholder="Enter bib number or runner name...">
            <button class="tracker-bar__btn">🔍</button>
          </div>
        </div>

        <!-- FEATURES -->
        <div class="grid-3 mb-48">
          ${[
            { icon: '📍', title: 'LIVE TRACKING', desc: 'Track any runner in real-time by bib or name. GPS updates every 60 seconds on an interactive map.', accent: 'var(--crimson)' },
            { icon: '👁️', title: 'SPECTATOR GUIDE', desc: 'Optimal viewing locations along the Northern Bypass with estimated runner arrival times and transport links.', accent: 'var(--white)' },
            { icon: '📣', title: 'DIGITAL CHEER CARDS', desc: 'Create and send personalised cheer messages to runners via SMS or social media. Share the love!', accent: 'var(--gold)' },
            { icon: '🏆', title: 'LIVE LEADERBOARD', desc: 'Real-time top 10 leaders by category and gender. Updated continuously as runners cross checkpoints.', accent: 'var(--crimson)' },
            { icon: '⏱️', title: 'WAVE TRACKER', desc: 'Live countdown and wave release status. Know exactly when your runner starts and track from the gun.', accent: 'var(--white)' },
            { icon: '📊', title: 'RESULTS FEED', desc: 'As runners cross the finish line, results populate in real time. Filter by category, gender, or name.', accent: 'var(--gold)' },
          ].map(f => `
            <div class="raceday-card" style="border-top-color:${f.accent}">
              <div class="raceday-card__icon">${f.icon}</div>
              <h4 class="raceday-card__title">${f.title}</h4>
              <p class="raceday-card__desc">${f.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- RACE DAY SCHEDULE -->
        <h2 class="t-display t-h2 mb-24">RACE DAY SCHEDULE</h2>
        ${CONFIG.raceWeekSchedule.map(d => `
          <div style="margin-bottom:28px">
            <h3 style="font-family:var(--font-display);font-size:0.85rem;letter-spacing:2px;color:var(--crimson);margin-bottom:12px">${d.day.toUpperCase()}</h3>
            ${d.events.map(e => `<div style="padding:8px 0;font-size:0.88rem;color:var(--text-mid);border-bottom:1px solid var(--border)">${e}</div>`).join('')}
          </div>
        `).join('')}

        <div class="divider"></div>

        <!-- EMERGENCY INFO -->
        <div class="cta-block" style="border-color:rgba(177,18,38,0.3)">
          <div>
            <h3 class="cta-block__title" style="font-size:1.1rem">EMERGENCY & MEDICAL</h3>
            <p class="cta-block__desc">Race day emergency contacts, medical stations, and safety information will be published 48 hours before race day.</p>
          </div>
          <a href="#/contact" class="btn btn--crimson btn--sm">Contact Team</a>
        </div>
      </div>
    </section>
  `;
}

/* ─── MEDIA ─── */
function renderMedia() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Gallery</span>
        <h1 class="t-display t-h1 page-hero__title">MEDIA & HIGHLIGHTS</h1>
        <p class="page-hero__desc">Photo gallery, video highlights, press kit, and media accreditation.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <!-- VIDEO -->
        <div style="background:var(--charcoal);aspect-ratio:16/9;max-height:480px;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:32px;cursor:pointer">
          <div style="text-align:center;position:relative;z-index:2">
            <div style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
              <span style="font-size:1.5rem;margin-left:4px">▶</span>
            </div>
            <div style="font-family:var(--font-display);font-size:0.9rem;letter-spacing:3px">2025 HIGHLIGHT REEL</div>
            <div style="font-size:0.75rem;color:var(--text-light);margin-top:4px">3:42</div>
          </div>
        </div>

        <!-- GALLERY -->
        <h2 class="t-display t-h2 mb-24">PHOTO GALLERY</h2>
        <div class="gallery-grid mb-48">
          ${[...Array(12)].map((_, i) => `
            <div class="gallery-item">
              <span>📷</span>
              <div class="gallery-item__overlay">VIEW</div>
            </div>
          `).join('')}
        </div>

        <!-- DOWNLOADS -->
        <div class="gap-center">
          <a href="#" class="btn btn--outline">📥 Press Kit (ZIP)</a>
          <a href="#" class="btn btn--outline">📋 Media Accreditation</a>
          <a href="#" class="btn btn--outline">📸 All Photos</a>
        </div>
      </div>
    </section>
  `;
}

/* ─── CONTACT ─── */
function renderContact() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--crimson mb-12">Get in Touch</span>
        <h1 class="t-display t-h1 page-hero__title">CONTACT US</h1>
        <p class="page-hero__desc">Questions about registration, sponsorship, volunteering, or media? We're here to help.</p>
      </div>
    </section>
    <section class="section section--charcoal">
      <div class="container">
        <div class="grid-2">
          <div>
            <h2 class="t-display t-h2 mb-24">GET IN TOUCH</h2>
            <div style="margin-bottom:24px;display:flex;gap:16px;align-items:flex-start">
              <span style="color:var(--crimson);font-size:1.2rem;margin-top:2px">📍</span>
              <div><div style="font-size:0.68rem;letter-spacing:2px;color:var(--text-light);margin-bottom:4px">LOCATION</div><div style="font-size:0.92rem">${S.location}</div></div>
            </div>
            <div style="margin-bottom:24px;display:flex;gap:16px;align-items:flex-start">
              <span style="color:var(--crimson);font-size:1.2rem;margin-top:2px">✉️</span>
              <div><div style="font-size:0.68rem;letter-spacing:2px;color:var(--text-light);margin-bottom:4px">EMAIL</div><div style="font-size:0.92rem"><a href="mailto:${S.email}" style="color:var(--white)">${S.email}</a></div></div>
            </div>
            <div style="margin-bottom:24px;display:flex;gap:16px;align-items:flex-start">
              <span style="color:var(--crimson);font-size:1.2rem;margin-top:2px">📱</span>
              <div><div style="font-size:0.68rem;letter-spacing:2px;color:var(--text-light);margin-bottom:4px">PHONE</div><div style="font-size:0.92rem"><a href="tel:${S.phone.replace(/\s/g,'')}" style="color:var(--white)">${S.phone}</a></div></div>
            </div>
            <div style="margin-bottom:24px;display:flex;gap:16px;align-items:flex-start">
              <span style="color:#25D366;font-size:1.2rem;margin-top:2px">💬</span>
              <div><div style="font-size:0.68rem;letter-spacing:2px;color:var(--text-light);margin-bottom:4px">WHATSAPP</div><div><a href="https://wa.me/${S.whatsapp}" target="_blank" style="color:#25D366;font-size:0.92rem">Chat with us on WhatsApp</a></div></div>
            </div>
            <div style="margin-bottom:24px;display:flex;gap:16px;align-items:flex-start">
              <span style="color:var(--crimson);font-size:1.2rem;margin-top:2px">@</span>
              <div><div style="font-size:0.68rem;letter-spacing:2px;color:var(--text-light);margin-bottom:4px">SOCIAL</div><div style="font-size:0.92rem">@imarathonug</div></div>
            </div>
          </div>

          <!-- CONTACT FORM -->
          <div style="background:rgba(255,255,255,0.04);padding:32px;border:1px solid var(--border)">
            <h3 style="font-family:var(--font-display);font-size:0.9rem;letter-spacing:2px;margin-bottom:24px">SEND A MESSAGE</h3>
            <div id="contactFormContainer">
              <div class="form-grid">
                <div class="form-group"><label class="form-label">Name *</label><input type="text" id="ctName" class="form-input" placeholder="Your name"></div>
                <div class="form-group"><label class="form-label">Email *</label><input type="email" id="ctEmail" class="form-input" placeholder="you@email.com"></div>
              </div>
              <div class="form-group"><label class="form-label">Subject</label>
                <select id="ctSubject" class="form-select"><option>General Enquiry</option><option>Registration Support</option><option>Sponsorship</option><option>Media / Press</option><option>Volunteer</option></select>
              </div>
              <div class="form-group"><label class="form-label">Message *</label><textarea id="ctMessage" class="form-textarea" placeholder="Your message..."></textarea></div>
              <div class="ohnohoney"><input type="text" id="ctHoney" tabindex="-1" autocomplete="off"></div>
              <button class="btn btn--crimson" style="width:100%" onclick="submitContactForm()">SEND MESSAGE</button>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- FULL FAQS -->
        <h2 class="t-display t-h2 mb-32">FREQUENTLY ASKED QUESTIONS</h2>
        <div style="max-width:760px">
          ${CONFIG.faqs.map(faq => `
            <div class="faq-item" onclick="toggleFaq(this)">
              <button class="faq-item__q">${faq.q}<span class="faq-item__arrow">▾</span></button>
              <div class="faq-item__a"><div class="faq-item__a-inner">${faq.a}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ═══════════════════════════════════════════════
   FORM SUBMISSIONS
   ═══════════════════════════════════════════════ */

function submitRegistration() {
  clearErrors('registrationForm');
  const fn = document.getElementById('regFirstName').value.trim();
  const ln = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const cat = document.getElementById('regCategory').value;
  const tshirt = document.getElementById('regTshirt').value;
  const terms = document.getElementById('regTerms').checked;
  const honey = document.getElementById('regHoney').value;
  if (honey) return;

  let valid = true;
  if (!fn) { setFieldError('regFirstName', 'Required'); valid = false; }
  if (!ln) { setFieldError('regLastName', 'Required'); valid = false; }
  if (!email || !validateEmail(email)) { setFieldError('regEmail', 'Valid email required'); valid = false; }
  if (!phone || !validatePhone(phone)) { setFieldError('regPhone', 'Valid phone required'); valid = false; }
  if (!cat) { setFieldError('regCategory', 'Select a category'); valid = false; }
  if (!tshirt) { setFieldError('regTshirt', 'Select a size'); valid = false; }
  if (!terms) { showToast('Please accept the terms and conditions', 'error'); valid = false; }
  if (!valid) return;

  trackEvent('registration_submit', { category: cat, email });
  document.getElementById('regFormContainer').innerHTML = `
    <div class="form-success">
      <div style="font-size:2.5rem;margin-bottom:12px">🏅</div>
      <h3 style="font-size:1.1rem;margin-bottom:8px;color:var(--success)">Registration Received!</h3>
      <p style="color:var(--text-dark-mid);font-size:0.88rem;margin-bottom:12px">Thank you, ${fn}! Your registration for the <strong>${cat}</strong> has been received.</p>
      <p style="color:var(--text-dark-mid);font-size:0.82rem">A confirmation email with payment instructions will be sent to <strong>${email}</strong>. Complete payment within 48 hours to secure your place.</p>
      <p style="color:var(--text-light);font-size:0.75rem;margin-top:16px">Registration ID: IM-${Date.now().toString(36).toUpperCase()}</p>
    </div>
  `;
  showToast('Registration submitted successfully!');
}

function submitSponsorInquiry() {
  const name = document.getElementById('spName').value.trim();
  const org = document.getElementById('spOrg').value.trim();
  const email = document.getElementById('spEmail').value.trim();
  const honey = document.getElementById('spHoney').value;
  if (honey) return;
  if (!name || !org || !email || !validateEmail(email)) { showToast('Please fill in name, organisation, and email', 'error'); return; }
  trackEvent('sponsor_inquiry', { name, org, email });
  document.getElementById('sponsorFormContainer').innerHTML = `
    <div class="form-success"><div style="font-size:2rem;margin-bottom:12px">🤝</div><h3 style="color:var(--success)">Enquiry Sent!</h3><p style="color:var(--text-mid);font-size:0.88rem;margin-top:8px">Thank you, ${name}. We'll respond within 2 business days at <strong>${email}</strong>.</p></div>
  `;
  showToast('Sponsor enquiry sent!');
}

function submitContactForm() {
  const name = document.getElementById('ctName').value.trim();
  const email = document.getElementById('ctEmail').value.trim();
  const msg = document.getElementById('ctMessage').value.trim();
  const honey = document.getElementById('ctHoney').value;
  if (honey) return;
  if (!name || !email || !validateEmail(email) || !msg) { showToast('Please fill in name, email, and message', 'error'); return; }
  trackEvent('contact_submit', { name, email });
  document.getElementById('contactFormContainer').innerHTML = `
    <div class="form-success"><div style="font-size:2rem;margin-bottom:12px">✉️</div><h3 style="color:var(--success)">Message Sent!</h3><p style="color:var(--text-mid);font-size:0.88rem;margin-top:8px">Thanks, ${name}. We'll respond to <strong>${email}</strong> as soon as possible.</p></div>
  `;
  showToast('Message sent!');
}

function submitVolunteer() {
  const name = document.getElementById('volName').value.trim();
  const email = document.getElementById('volEmail').value.trim();
  if (!name || !email || !validateEmail(email)) { showToast('Please fill in name and email', 'error'); return; }
  trackEvent('volunteer_signup', { name, email });
  document.getElementById('volunteerFormContainer').innerHTML = `
    <div class="form-success"><div style="font-size:2rem;margin-bottom:12px">🤝</div><h3 style="color:var(--success)">Welcome to the Team!</h3><p style="color:var(--text-dark-mid);font-size:0.88rem;margin-top:8px">Thank you, ${name}. We'll be in touch at <strong>${email}</strong> with volunteer details.</p></div>
  `;
  showToast('Volunteer registration received!');
}

/* ═══════════════════════════════════════════════
   ROUTER
   ═══════════════════════════════════════════════ */

const routes = {
  '/': renderHome,
  '/about': renderAbout,
  '/register': renderRegister,
  '/course': renderCourse,
  '/runner-hub': renderRunnerHub,
  '/community': renderCommunity,
  '/sponsors': renderSponsors,
  '/results': renderResults,
  '/race-day': renderRaceDay,
  '/media': renderMedia,
  '/contact': renderContact,
};

let countdownInterval = null;

function render() {
  const route = getRoute();
  const renderer = routes[route] || routes['/'];

  window.scrollTo(0, 0);
  app.innerHTML = renderer();

  updateActiveLinks(route);
  updateMeta(route);
  initReveal();

  // Start countdown on home page
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  if (route === '/') {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
