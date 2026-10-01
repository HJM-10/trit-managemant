const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

export const siteFooter = `<footer class="site-footer">
  <div class="wrap footer-content">
    <div class="footer-brand-block">
      <a class="brand original-brand" href="index.html" aria-label="TRST Maintenance home"><img src="assets/trst-logo.jpg" width="184" height="63" alt="TRST"><span class="original-brand-name">MAINTENANCE LTD</span></a>
      <p>Good hands. Great results.</p>
      <span>Plumbing, heating & property care.</span>
    </div>
    <div class="footer-contact-block"><h2>Let’s talk.</h2><a href="tel:+441902635925">01902 635925</a><a href="mailto:info@trst-maintenance.co.uk">info@trst-maintenance.co.uk</a></div>
    <div class="footer-address-block"><h2>Based in Willenhall.</h2><address>149 Stringes Lane<br>Willenhall, WV13 1LW</address></div>
  </div>
  <div class="wrap footer-meta"><span>© 2026 TRST Maintenance Ltd.</span><button class="plain-link" id="concept-info">About this prototype</button><span class="footer-credit">Designed & developed by <a href="https://atarionsolutions.com/" target="_blank" rel="noopener noreferrer">Atarion Solutions <span aria-hidden="true">↗</span></a></span></div>
</footer>`;

export const contactPage = `<section class="wrap contact-compact" aria-labelledby="contact-heading">
  <div class="contact-heading"><p class="eyebrow">CONTACT TRST</p><h1 id="contact-heading">Let’s get it <span>sorted.</span></h1><p>A small fix or a bigger plan. Start with a conversation.</p></div>
  <div class="contact-panel">
    <div class="contact-direct">
      <a class="contact-channel" href="tel:+441902635925">${icon('phone')}<span><small>CALL THE TEAM</small><strong>01902 635925</strong><span>For questions and current availability.</span></span><b aria-hidden="true">↗</b></a>
      <a class="contact-channel" href="mailto:info@trst-maintenance.co.uk">${icon('message')}<span><small>SEND AN EMAIL</small><strong>info@trst-maintenance.co.uk</strong><span>Tell us what your property needs.</span></span><b aria-hidden="true">↗</b></a>
      <div class="contact-location">${icon('pin')}<div><small>WILLENHALL, WEST MIDLANDS</small><address>149 Stringes Lane, Willenhall, WV13 1LW</address><a href="https://www.google.com/maps/search/?api=1&query=149%20Stringes%20Lane%20Willenhall%20WV13%201LW" target="_blank" rel="noopener noreferrer">View on Google Maps <span aria-hidden="true">↗</span></a></div></div>
    </div>
    <div class="contact-quote-card"><div class="contact-quote-icon">${icon('house')}</div><p class="eyebrow">HAVE A PROJECT IN MIND?</p><h2>A few details.<br>A clear starting point.</h2><p>Choose a service and tell us a little about the job.</p><button class="button white" data-quote>Start a free quote <span aria-hidden="true">↗</span></button><p class="contact-demo">Demo form — your details are not sent or saved.</p></div>
  </div>
</section>`;
