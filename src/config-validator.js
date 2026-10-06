/**
 * Configuration Validator & Normalizer
 * 
 * Provides runtime schema verification, detailed diagnostics,
 * and safe fallback defaults to ensure rock-solid production stability.
 */

import { parseIsoTimestamp } from './countdown.js';

export const VALID_PRESETS = ['centered-minimalist', 'split-screen', 'elegant-gradient'];
export const VALID_THEME_MODES = ['dark', 'light', 'auto'];
export const VALID_COUNTDOWN_UNITS = ['days', 'hours', 'minutes', 'seconds'];
export const VALID_SIGNUP_TYPES = ['webhook', 'form', 'mailchimp'];

/**
 * Default fallback configuration used when non-fatal optional values are omitted
 */
export const DEFAULT_CONFIG = {
  brand: {
    name: 'Brand Name',
    domain: '',
    tagline: '',
    badge: 'Coming Soon',
    logoUrl: '',
    faviconUrl: ''
  },
  theme: {
    preset: 'centered-minimalist',
    mode: 'dark',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    borderRadius: '12px',
    colors: {}
  },
  content: {
    headline: 'Something remarkable is on the way.',
    subheadline: 'We are crafting a refined new digital experience.',
    description: '',
    countdownLabel: 'Launching in'
  },
  launch: {
    mode: 'fixed',
    launchAt: '',
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    onLaunch: {
      headline: 'We are now live.',
      subheadline: 'Welcome to our platform. Explore what we have built.',
      statusBadge: 'Now Live',
      ctaLabel: 'Get Started',
      ctaUrl: '/'
    }
  },
  cta: {
    primary: null,
    secondary: null
  },
  emailSignup: {
    title: 'Be the first to know',
    placeholder: 'Enter your work email',
    buttonLabel: 'Notify Me',
    successMessage: 'Thank you. We will notify you at launch.',
    errorMessage: 'Something went wrong. Please check your email and try again.',
    disclaimer: 'We respect your privacy. No spam, ever.',
    integration: null
  },
  social: {},
  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. All rights reserved.',
    links: [],
    statusText: ''
  },
  seo: {
    title: '',
    description: '',
    themeColor: '#08090d',
    twitterCard: 'summary_large_image'
  },
  features: {
    showBrandBadge: true,
    showCountdown: true,
    showCta: true,
    showEmailSignup: false,
    showSocialLinks: true,
    showFooterLinks: true,
    showBackgroundGlow: true
  }
};

/**
 * Validates a configuration object against expected types and constraints.
 * 
 * @param {Object} rawConfig - The user-supplied configuration object.
 * @returns {{ isValid: boolean, errors: string[], warnings: string[], config: Object }}
 */
export function validateConfig(rawConfig) {
  const errors = [];
  const warnings = [];

  if (!rawConfig || typeof rawConfig !== 'object') {
    return {
      isValid: false,
      errors: ['Configuration must be a valid non-null object.'],
      warnings: [],
      config: DEFAULT_CONFIG
    };
  }

  // 1. BRAND VALIDATION
  const brand = { ...DEFAULT_CONFIG.brand, ...(rawConfig.brand || {}) };
  if (!rawConfig.brand || !rawConfig.brand.name || typeof rawConfig.brand.name !== 'string' || !rawConfig.brand.name.trim()) {
    errors.push('config.brand.name is required and must be a non-empty string.');
  }

  // 2. THEME VALIDATION
  const theme = {
    ...DEFAULT_CONFIG.theme,
    ...(rawConfig.theme || {}),
    colors: { ...DEFAULT_CONFIG.theme.colors, ...(rawConfig.theme?.colors || {}) }
  };
  if (theme.preset && !VALID_PRESETS.includes(theme.preset)) {
    warnings.push(`config.theme.preset "${theme.preset}" is not recognized. Expected one of: ${VALID_PRESETS.join(', ')}. Falling back to "${DEFAULT_CONFIG.theme.preset}".`);
    theme.preset = DEFAULT_CONFIG.theme.preset;
  }
  if (theme.mode && !VALID_THEME_MODES.includes(theme.mode)) {
    warnings.push(`config.theme.mode "${theme.mode}" is not recognized. Expected one of: ${VALID_THEME_MODES.join(', ')}. Falling back to "dark".`);
    theme.mode = 'dark';
  }

  // 3. CONTENT VALIDATION
  const content = { ...DEFAULT_CONFIG.content, ...(rawConfig.content || {}) };
  if (!rawConfig.content || !rawConfig.content.headline || typeof rawConfig.content.headline !== 'string' || !rawConfig.content.headline.trim()) {
    errors.push('config.content.headline is required and must be a non-empty string.');
  }

  // 4. LAUNCH & COUNTDOWN VALIDATION
  const launch = {
    ...DEFAULT_CONFIG.launch,
    ...(rawConfig.launch || {}),
    unitLabels: { ...DEFAULT_CONFIG.launch.unitLabels, ...(rawConfig.launch?.unitLabels || {}) },
    onLaunch: { ...DEFAULT_CONFIG.launch.onLaunch, ...(rawConfig.launch?.onLaunch || {}) }
  };

  if (!rawConfig.launch) {
    errors.push('config.launch section is required.');
  } else {
    const mode = launch.mode || 'fixed';
    if (mode === 'duration') {
      if (typeof launch.durationHours !== 'number' || launch.durationHours <= 0) {
        errors.push('When config.launch.mode is "duration", config.launch.durationHours must be a positive number.');
      }
    } else {
      // Fixed date mode
      if (!launch.launchAt || typeof launch.launchAt !== 'string') {
        errors.push('config.launch.launchAt is required as an ISO 8601 string (e.g. "2026-10-09T09:47:50+01:00").');
      } else {
        const parsedMs = parseIsoTimestamp(launch.launchAt);
        if (parsedMs === null) {
          errors.push(`config.launch.launchAt "${launch.launchAt}" is not a valid ISO 8601 date string.`);
        }
      }
    }

    if (Array.isArray(launch.displayUnits)) {
      const invalidUnits = launch.displayUnits.filter(u => !VALID_COUNTDOWN_UNITS.includes(u));
      if (invalidUnits.length > 0) {
        warnings.push(`Invalid countdown units in config.launch.displayUnits: ${invalidUnits.join(', ')}. Allowed units: ${VALID_COUNTDOWN_UNITS.join(', ')}.`);
        launch.displayUnits = launch.displayUnits.filter(u => VALID_COUNTDOWN_UNITS.includes(u));
      }
    } else {
      launch.displayUnits = DEFAULT_CONFIG.launch.displayUnits;
    }
  }

  // 5. CALL TO ACTION VALIDATION
  const cta = { ...DEFAULT_CONFIG.cta, ...(rawConfig.cta || {}) };
  if (cta.primary && (!cta.primary.label || !cta.primary.url)) {
    warnings.push('config.cta.primary must have both "label" and "url". Disabling primary CTA.');
    cta.primary = null;
  }
  if (cta.secondary && (!cta.secondary.label || !cta.secondary.url)) {
    warnings.push('config.cta.secondary must have both "label" and "url". Disabling secondary CTA.');
    cta.secondary = null;
  }

  // 6. EMAIL SIGNUP VALIDATION
  const emailSignup = { ...DEFAULT_CONFIG.emailSignup, ...(rawConfig.emailSignup || {}) };
  const features = { ...DEFAULT_CONFIG.features, ...(rawConfig.features || {}) };

  if (features.showEmailSignup) {
    if (!emailSignup.integration || !emailSignup.integration.endpoint) {
      warnings.push(
        'config.features.showEmailSignup is true, but config.emailSignup.integration.endpoint is not configured. Email signup will display in demonstration mode.'
      );
    } else if (emailSignup.integration.type && !VALID_SIGNUP_TYPES.includes(emailSignup.integration.type)) {
      warnings.push(`config.emailSignup.integration.type "${emailSignup.integration.type}" is invalid. Expected one of: ${VALID_SIGNUP_TYPES.join(', ')}.`);
    }
  }

  // 7. SOCIAL LINKS VALIDATION
  const social = { ...rawConfig.social };

  // 8. FOOTER VALIDATION
  const footer = {
    ...DEFAULT_CONFIG.footer,
    ...(rawConfig.footer || {}),
    links: Array.isArray(rawConfig.footer?.links) ? rawConfig.footer.links : DEFAULT_CONFIG.footer.links
  };

  // 9. SEO & METADATA VALIDATION
  const seo = {
    ...DEFAULT_CONFIG.seo,
    ...(rawConfig.seo || {})
  };
  if (!seo.title && brand.name) {
    seo.title = `${brand.name} — Coming Soon`;
  }
  if (!seo.description && content.headline) {
    seo.description = `${content.headline} ${content.subheadline || ''}`.trim();
  }

  const sanitizedConfig = {
    brand,
    theme,
    content,
    launch,
    cta,
    emailSignup,
    social,
    footer,
    seo,
    features
  };

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    config: sanitizedConfig
  };
}

/**
 * Resolves the authoritative launch timestamp milliseconds.
 * 
 * For 'fixed' mode: parses the ISO timestamp.
 * For 'duration' mode: calculates launch time from reference start (e.g. build time or server time).
 * 
 * @param {Object} launchConfig
 * @param {number} [referenceTimeMs=Date.now()]
 * @returns {number|null}
 */
export function resolveLaunchTimestamp(launchConfig, referenceTimeMs = Date.now()) {
  if (!launchConfig) return null;

  if (launchConfig.mode === 'duration' && typeof launchConfig.durationHours === 'number') {
    return referenceTimeMs + (launchConfig.durationHours * 3600 * 1000);
  }

  if (launchConfig.launchAt) {
    return parseIsoTimestamp(launchConfig.launchAt);
  }

  return null;
}
