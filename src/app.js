/**
 * Prelaunch Application Coordinator & Controller
 * 
 * Orchestrates configuration validation, dynamic theme application,
 * layout composition, zero-drift countdown scheduling, and accessible DOM updates.
 */

import { CONFIG } from '../config.js';
import { validateConfig, resolveLaunchTimestamp } from './config-validator.js';
import { calculateTimeRemaining } from './countdown.js';
import { ThemeManager } from './theme.js';
import { SiteHeader } from './components/SiteHeader.js';
import { HeroSection } from './components/HeroSection.js';
import { CountdownTimer } from './components/CountdownTimer.js';
import { CallToAction } from './components/CallToAction.js';
import { EmailSignup } from './components/EmailSignup.js';
import { SocialLinks } from './components/SocialLinks.js';
import { SiteFooter } from './components/SiteFooter.js';

export class ComingSoonApp {
  constructor(rawConfig = CONFIG) {
    this.rawConfig = rawConfig;
    this.validationResult = validateConfig(rawConfig);
    this.config = this.validationResult.config;
    this.resolvedLaunchMs = null;
    this.timerIntervalId = null;
    this.isTransitionedToLive = false;
    this.components = {};
    this.domElements = {};
  }

  /**
   * Initializes the application.
   */
  init() {
    this.logDiagnostics();
    this.applyTheme();
    this.applySEOAndHeadMetadata();
    this.mountLayout();
    this.cacheDOMElements();
    this.bindInteractions();
    this.initCountdownEngine();
    this.setupVisibilityListener();
  }

  /**
   * Prints configuration warnings/errors to the console for developers.
   */
  logDiagnostics() {
    if (!this.validationResult.isValid) {
      console.error(
        '⚠️ [ComingSoonApp] Configuration Errors detected:',
        this.validationResult.errors
      );
    }
    if (this.validationResult.warnings.length > 0) {
      console.warn(
        'ℹ️ [ComingSoonApp] Configuration Warnings:',
        this.validationResult.warnings
      );
    }
  }

  /**
   * Applies the theme custom variables and layout classes.
   */
  applyTheme() {
    const themeManager = new ThemeManager(this.config.theme);
    themeManager.apply();
  }

  /**
   * Applies SEO title, description, favicons, and social sharing tags.
   */
  applySEOAndHeadMetadata() {
    const { seo, brand } = this.config;
    if (!seo) return;

    if (seo.title) {
      document.title = seo.title;
    }

    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', seo.description);
    setMeta('name', 'theme-color', seo.themeColor || this.config.theme?.colors?.bgCanvas || '#08090d');

    // OpenGraph
    setMeta('property', 'og:title', seo.ogTitle || seo.title);
    setMeta('property', 'og:description', seo.ogDescription || seo.description);
    if (seo.ogImage) setMeta('property', 'og:image', seo.ogImage);
    if (brand.domain) setMeta('property', 'og:url', `https://${brand.domain}`);

    // Twitter Card
    setMeta('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMeta('name', 'twitter:title', seo.ogTitle || seo.title);
    setMeta('name', 'twitter:description', seo.ogDescription || seo.description);
    if (seo.twitterHandle) setMeta('name', 'twitter:site', seo.twitterHandle);
    if (seo.ogImage) setMeta('name', 'twitter:image', seo.ogImage);

    // Favicon override if specified
    if (brand.faviconUrl) {
      let iconLink = document.querySelector('link[rel="icon"]');
      if (iconLink) {
        iconLink.href = brand.faviconUrl;
      }
    }
  }

  /**
   * Mounts components into the page according to the selected layout preset.
   */
  mountLayout() {
    const appRoot = document.getElementById('app-root') || document.body;
    const { brand, content, launch, cta, emailSignup, social, footer, features, theme } = this.config;

    this.components.header = new SiteHeader({ brand, features });
    this.components.hero = new HeroSection({ content });
    this.components.countdown = new CountdownTimer({ launch, content, features });
    this.components.cta = new CallToAction({ cta, features });
    this.components.signup = new EmailSignup({ emailSignup, features });
    this.components.social = new SocialLinks({ social, features });
    this.components.footer = new SiteFooter({ footer, brand, features });

    const preset = theme.preset || 'centered-minimalist';

    let mainContentHtml = '';

    if (preset === 'split-screen') {
      mainContentHtml = `
        <main class="hero-section split-layout-container">
          <div class="split-column split-col-primary">
            ${this.components.hero.render()}
            <div class="split-col-social-desktop">
              ${this.components.social.render()}
            </div>
          </div>
          <div class="split-column split-col-secondary">
            <div class="split-action-card">
              ${this.components.countdown.render()}
              ${this.components.cta.render()}
              ${this.components.signup.render()}
            </div>
            <div class="split-col-social-mobile">
              ${this.components.social.render()}
            </div>
          </div>
        </main>
      `;
    } else if (preset === 'elegant-gradient') {
      mainContentHtml = `
        <main class="hero-section gradient-layout-container">
          ${this.components.hero.render()}
          <div class="gradient-glass-card">
            ${this.components.countdown.render()}
            ${this.components.cta.render()}
            ${this.components.signup.render()}
          </div>
          ${this.components.social.render()}
        </main>
      `;
    } else {
      // Default: centered-minimalist
      mainContentHtml = `
        <main class="hero-section centered-layout-container">
          ${this.components.hero.render()}
          ${this.components.countdown.render()}
          ${this.components.cta.render()}
          ${this.components.signup.render()}
          ${this.components.social.render()}
        </main>
      `;
    }

    const showGlow = features.showBackgroundGlow !== false;
    const backgroundHtml = showGlow ? `
      <div class="background-layer" aria-hidden="true">
        <div class="background-grid"></div>
        <div class="background-glow"></div>
      </div>
    ` : '';

    appRoot.innerHTML = `
      ${backgroundHtml}
      <div class="page-shell">
        ${this.components.header.render()}
        ${mainContentHtml}
        ${this.components.footer.render()}
      </div>
    `;
  }

  /**
   * Caches commonly referenced DOM nodes.
   */
  cacheDOMElements() {
    this.domElements = {
      countdownContainer: document.getElementById('countdown-grid'),
      countdownLabel: document.getElementById('countdown-label'),
      liveContainer: document.getElementById('live-container'),
      liveAnnouncer: document.getElementById('countdown-announcer'),
      brandBadge: document.getElementById('brand-badge'),
      daysValue: document.getElementById('days-value'),
      hoursValue: document.getElementById('hours-value'),
      minutesValue: document.getElementById('minutes-value'),
      secondsValue: document.getElementById('seconds-value'),
      signupForm: document.getElementById('email-signup-form')
    };
  }

  /**
   * Binds component event listeners (form submissions, CTAs).
   */
  bindInteractions() {
    if (this.domElements.signupForm && this.components.signup) {
      this.components.signup.bindEvents(this.domElements.signupForm);
    }
  }

  /**
   * Resolves the authoritative launch timestamp and starts the interval timer.
   */
  initCountdownEngine() {
    if (this.config.features.showCountdown === false) {
      return;
    }

    this.resolvedLaunchMs = resolveLaunchTimestamp(this.config.launch);

    // Initial immediate tick
    this.tick();

    // Zero-drift alignment to the start of the next full second
    const now = Date.now();
    const delayToNextSecond = 1000 - (now % 1000);

    setTimeout(() => {
      this.tick();
      if (!this.isTransitionedToLive && this.resolvedLaunchMs) {
        this.timerIntervalId = setInterval(() => this.tick(), 1000);
      }
    }, delayToNextSecond);
  }

  /**
   * Re-synchronizes countdown immediately upon tab regaining visibility
   * to compensate for mobile/browser background timer throttling.
   */
  setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !this.isTransitionedToLive) {
        this.tick();
      }
    });
  }

  /**
   * Single timer tick execution.
   */
  tick() {
    if (this.isTransitionedToLive) return;

    if (!this.resolvedLaunchMs) {
      if (this.components.countdown) {
        this.components.countdown.showInvalidConfig(this.domElements);
      }
      return;
    }

    const state = calculateTimeRemaining(this.resolvedLaunchMs, Date.now());

    if (!state.isValid) {
      if (this.components.countdown) {
        this.components.countdown.showInvalidConfig(this.domElements);
      }
      return;
    }

    if (state.isExpired) {
      this.isTransitionedToLive = true;
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId);
        this.timerIntervalId = null;
      }
      if (this.components.countdown) {
        this.components.countdown.transitionToLive(this.domElements);
      }
      return;
    }

    if (this.components.countdown) {
      this.components.countdown.update(this.domElements, state);
    }
  }
}

// Bootstrap application once DOM content is parsed
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new ComingSoonApp();
    app.init();
  });
}
