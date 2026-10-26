// Sends website enquiries to the "Bizabler-S website enquiries" Google Form (owned by enablers26@gmail.com),
// which writes each one as a row in its linked Google Sheet. Trustablers enquiries are told apart by the
// Source column ("Trustablers: …"). To give Trustablers its own form, replace ENDPOINT and the IDs below
// (open the form's public link, view source, and search for the question title).
(() => {
  'use strict';

  const ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSdgVcUfVClB4lujiQS6Hn-g2P9DkokH21f5S9kEdGtmCtd1Mw/formResponse';

  const FIELDS = {
    name: 'entry.1200407560',        // Full name (required)
    email: 'entry.147584759',        // Email (required)
    phone: 'entry.847922021',        // Phone / WhatsApp (required)
    company: 'entry.2049157548',     // Company or business idea
    need: 'entry.483049035',         // What do you need? (area of law)
    message: 'entry.1863758479',     // Message
    source: 'entry.112055437',       // Source: which site and page sent it
  };

  // Google Forms does not allow cross-site reads, so the response is opaque: a resolved promise means the
  // request left the browser, a rejection means it could not (offline, blocked).
  async function send(data) {
    const body = new URLSearchParams();
    for (const [key, id] of Object.entries(FIELDS)) {
      const v = data[key];
      if (v !== undefined && v !== null && String(v).trim() !== '') body.append(id, String(v).trim());
    }
    await fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body });
  }

  const validEmail = (s) => /^\S+@\S+\.\S+$/.test(String(s || '').trim());
  const validPhone = (s) => String(s || '').replace(/\D/g, '').length >= 7;

  window.TRUST_LEAD = { send, validEmail, validPhone };

  // Phones: the floating WhatsApp button steps aside while the enquiry form is on screen,
  // so it never covers the fields or the send button (see .form-in-view in styles.css).
  const form = document.getElementById('form');
  if (form && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => document.body.classList.toggle('form-in-view', en.isIntersecting)).observe(form);
  }
})();
