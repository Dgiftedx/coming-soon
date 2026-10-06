/**
 * CountdownTimer Component
 * 
 * Renders high-precision, CLS-free countdown digits, accessible ARIA live
 * regions, and manages the smooth transition to the post-launch live state.
 */

import { padZero, formatAccessibleCountdown } from '../countdown.js';

export class CountdownTimer {
  /**
   * @param {Object} props
   * @param {Object} props.launch - Launch configuration object
   * @param {Object} props.content - Content configuration
   * @param {Object} props.features - Feature flags
   */
  constructor({ launch = {}, content = {}, features = {} } = {}) {
    this.launch = launch;
    this.content = content;
    this.features = features;
    this.displayUnits = launch.displayUnits || ['days', 'hours', 'minutes', 'seconds'];
    this.unitLabels = launch.unitLabels || {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    };
  }

  /**
   * Renders the countdown section HTML.
   * @returns {string}
   */
  render() {
    if (this.features.showCountdown === false) {
      return '';
    }

    const countdownLabel = this.content.countdownLabel || 'Launching in';
    const onLaunch = this.launch.onLaunch || {};

    const unitCardsHtml = this.displayUnits.map(unit => {
      const label = this.unitLabels[unit] || unit.charAt(0).toUpperCase() + unit.slice(1);
      return `
        <div class="countdown-card" data-unit="${unit}">
          <span id="${unit}-value" class="countdown-value" aria-hidden="true">--</span>
          <span class="countdown-unit">${label}</span>
        </div>
      `;
    }).join('');

    return `
      <section class="countdown-section" aria-labelledby="countdown-label">
        <h2 id="countdown-label" class="countdown-label">${countdownLabel}</h2>

        <div id="countdown-grid" class="countdown-grid count-${this.displayUnits.length}" role="timer" aria-live="off">
          ${unitCardsHtml}
        </div>

        <!-- Post-Launch Live State Container (hidden until timer finishes) -->
        <div id="live-container" class="live-container" role="status" aria-live="polite" style="display: none;">
          <div class="live-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span id="live-badge-text">${onLaunch.statusBadge || 'Platform Live'}</span>
          </div>
          <h3 id="live-headline" class="live-headline">${onLaunch.headline || 'We are now live.'}</h3>
          <p id="live-subheadline" class="live-subheadline">${onLaunch.subheadline || 'Welcome to our platform.'}</p>
          ${onLaunch.ctaLabel && onLaunch.ctaUrl ? `
            <div class="live-cta-wrapper">
              <a href="${onLaunch.ctaUrl}" class="cta-button cta-primary">${onLaunch.ctaLabel}</a>
            </div>
          ` : ''}
        </div>

        <!-- Screen reader live announcement region -->
        <div id="countdown-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
      </section>
    `;
  }

  /**
   * Updates existing DOM elements with new time values.
   * 
   * @param {Object} domElements - Cached DOM elements
   * @param {Object} state - Result from calculateTimeRemaining
   */
  update(domElements, state) {
    if (!state.isValid) {
      this.showInvalidConfig(domElements);
      return;
    }

    if (state.isExpired) {
      this.transitionToLive(domElements);
      return;
    }

    // Update each visible unit element
    this.displayUnits.forEach(unit => {
      const el = domElements[`${unit}Value`] || document.getElementById(`${unit}-value`);
      if (el) {
        let val;
        if (unit === 'days') val = padZero(state.days);
        else if (unit === 'hours') {
          // If days is not displayed, show total accumulated hours
          val = !this.displayUnits.includes('days') ? padZero(state.totalHours) : padZero(state.hours);
        }
        else if (unit === 'minutes') val = padZero(state.minutes);
        else if (unit === 'seconds') val = padZero(state.seconds);

        if (el.textContent !== val) {
          el.textContent = val;
        }
      }
    });

    // Update ARIA announcement
    const announcer = domElements.liveAnnouncer || document.getElementById('countdown-announcer');
    if (announcer) {
      // Announce every minute on 0 seconds, or countdown of the final 10 seconds
      if (state.seconds === 0 || (state.days === 0 && state.hours === 0 && state.minutes === 0 && state.seconds <= 10)) {
        announcer.textContent = formatAccessibleCountdown(state, this.displayUnits);
      }
    }

    const grid = domElements.countdownContainer || document.getElementById('countdown-grid');
    if (grid) {
      grid.setAttribute('aria-label', formatAccessibleCountdown(state, this.displayUnits));
    }
  }

  /**
   * Transitions the countdown UI smoothly to the live state.
   */
  transitionToLive(domElements) {
    const grid = domElements.countdownContainer || document.getElementById('countdown-grid');
    const label = domElements.countdownLabel || document.getElementById('countdown-label');
    const liveContainer = domElements.liveContainer || document.getElementById('live-container');
    const announcer = domElements.liveAnnouncer || document.getElementById('countdown-announcer');
    const brandBadge = domElements.brandBadge || document.getElementById('brand-badge');

    if (grid) grid.style.display = 'none';
    if (label) label.style.display = 'none';
    if (liveContainer) liveContainer.style.display = 'flex';

    if (brandBadge) {
      const badgeText = this.launch.onLaunch?.statusBadge || 'Now Live';
      brandBadge.innerHTML = `<span>${badgeText}</span>`;
      brandBadge.classList.add('badge-live');
    }

    if (announcer) {
      announcer.textContent = 'The countdown has finished. The site is now live.';
    }
  }

  /**
   * Shows a graceful fallback state if launch timestamp is invalid.
   */
  showInvalidConfig(domElements) {
    this.displayUnits.forEach(unit => {
      const el = domElements[`${unit}Value`] || document.getElementById(`${unit}-value`);
      if (el) el.textContent = '--';
    });
    const label = domElements.countdownLabel || document.getElementById('countdown-label');
    if (label) label.textContent = 'Launch schedule';
  }
}
