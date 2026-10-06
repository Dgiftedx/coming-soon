/**
 * EmailSignup Component
 * 
 * Production-ready email capture integration supporting webhooks,
 * Formspree, Mailchimp, or custom REST endpoints with honeypot spam protection,
 * client validation, and accessible feedback states.
 */

export class EmailSignup {
  /**
   * @param {Object} props
   * @param {Object} props.emailSignup - Email signup configuration
   * @param {Object} props.features - Feature flags
   */
  constructor({ emailSignup = {}, features = {} } = {}) {
    this.config = emailSignup;
    this.features = features;
  }

  /**
   * Renders the email capture form HTML.
   * @returns {string}
   */
  render() {
    if (this.features.showEmailSignup === false) {
      return '';
    }

    const {
      title,
      placeholder = 'Enter your work email',
      buttonLabel = 'Notify Me',
      disclaimer = 'We respect your privacy. Unsubscribe at any time.',
      integration
    } = this.config;

    const hasIntegration = integration && integration.endpoint;

    // If enabled but no endpoint configured, display integration placeholder instructions
    if (!hasIntegration) {
      return `
        <div class="email-signup-container integration-placeholder">
          ${title ? `<h3 class="signup-title">${title}</h3>` : ''}
          <div class="placeholder-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p><strong>Email capture integration pending:</strong> Configure <code>emailSignup.integration.endpoint</code> in <code>config.js</code> to activate live submissions (Formspree, Zapier, or webhook).</p>
          </div>
        </div>
      `;
    }

    return `
      <section class="email-signup-container" aria-label="Newsletter Signup">
        ${title ? `<h3 class="signup-title">${title}</h3>` : ''}
        
        <form id="email-signup-form" class="email-signup-form" novalidate>
          <!-- Anti-spam Honeypot -->
          <div class="sr-only" aria-hidden="true">
            <label for="form-bot-trap">Do not fill this out if human</label>
            <input id="form-bot-trap" type="text" name="_gotcha" tabindex="-1" autocomplete="off">
          </div>

          <div class="input-action-group">
            <input
              type="email"
              id="signup-email-input"
              name="${integration.emailFieldName || 'email'}"
              class="signup-input"
              placeholder="${placeholder}"
              required
              autocomplete="email"
              aria-label="Email address"
              aria-describedby="signup-feedback"
            />
            <button type="submit" id="signup-submit-btn" class="signup-submit-btn">
              <span class="btn-text">${buttonLabel}</span>
              <span class="btn-spinner" aria-hidden="true" style="display: none;">
                <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                </svg>
              </span>
            </button>
          </div>

          <div id="signup-feedback" class="signup-feedback" role="alert" aria-live="polite"></div>

          ${disclaimer ? `<p class="signup-disclaimer">${disclaimer}</p>` : ''}
        </form>
      </section>
    `;
  }

  /**
   * Binds submission event listener to the form element.
   * 
   * @param {HTMLFormElement} formEl
   */
  bindEvents(formEl) {
    if (!formEl) return;

    const { integration, successMessage, errorMessage } = this.config;
    if (!integration || !integration.endpoint) return;

    const emailInput = formEl.querySelector('#signup-email-input');
    const submitBtn = formEl.querySelector('#signup-submit-btn');
    const feedbackEl = formEl.querySelector('#signup-feedback');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnSpinner = submitBtn?.querySelector('.btn-spinner');
    const botTrap = formEl.querySelector('#form-bot-trap');

    formEl.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Bot spam check
      if (botTrap && botTrap.value) {
        console.warn('Bot submission blocked via honeypot.');
        return;
      }

      const email = emailInput?.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (feedbackEl) {
          feedbackEl.className = 'signup-feedback error';
          feedbackEl.textContent = 'Please provide a valid email address.';
        }
        if (emailInput) emailInput.focus();
        return;
      }

      // Set Loading State
      if (submitBtn) submitBtn.disabled = true;
      if (btnText && btnSpinner) {
        btnText.style.opacity = '0';
        btnSpinner.style.display = 'inline-block';
      }
      if (feedbackEl) {
        feedbackEl.className = 'signup-feedback';
        feedbackEl.textContent = '';
      }

      try {
        const payload = {
          [integration.emailFieldName || 'email']: email,
          ...(integration.extraFields || {})
        };

        const method = (integration.method || 'POST').toUpperCase();
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(integration.headers || {})
        };

        let response;
        if (integration.type === 'form') {
          // Native FormData submission
          const formData = new FormData(formEl);
          response = await fetch(integration.endpoint, {
            method: method,
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
        } else {
          // JSON webhook submission
          response = await fetch(integration.endpoint, {
            method: method,
            headers: headers,
            body: JSON.stringify(payload)
          });
        }

        if (response.ok) {
          if (feedbackEl) {
            feedbackEl.className = 'signup-feedback success';
            feedbackEl.textContent = successMessage || 'Thank you! You have been added to our early access list.';
          }
          if (emailInput) {
            emailInput.value = '';
            emailInput.disabled = true;
          }
          if (submitBtn) {
            submitBtn.style.display = 'none';
          }
        } else {
          throw new Error(`HTTP status ${response.status}`);
        }
      } catch (err) {
        console.error('Email subscription error:', err);
        if (feedbackEl) {
          feedbackEl.className = 'signup-feedback error';
          feedbackEl.textContent = errorMessage || 'Unable to submit right now. Please try again later.';
        }
        if (submitBtn) submitBtn.disabled = false;
        if (btnText && btnSpinner) {
          btnText.style.opacity = '1';
          btnSpinner.style.display = 'none';
        }
      }
    });
  }
}
