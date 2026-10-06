/**
 * Brand Configuration Template
 * 
 * Duplicate this file to `configs/your-brand-id.js` when creating a new brand.
 * All brand customization is centralized here.
 * 
 * ⚠️ SECURITY NOTE: This configuration is loaded by client browsers and is 100% PUBLIC.
 * Never place private API keys, database credentials, or private secrets in this file.
 * 
 * @type {import('../types.js').AppConfig}
 */
export const CONFIG = {
  /**
   * 1. BRAND IDENTITY
   */
  brand: {
    // Official name of your brand or company (REQUIRED)
    name: 'Acme Technologies',
    // Primary website domain (e.g. "acme.com")
    domain: 'acme.com',
    // Optional tagline displayed alongside brand name
    tagline: 'Building the next evolution of technology',
    // Optional kicker badge above headline (e.g. "Private Beta", "Coming Fall 2026")
    badge: 'Coming Soon',
    // Custom logo: image URL or inline SVG string. Leave empty for geometric mark.
    logoUrl: '',
    // Custom favicon URL or data URI
    faviconUrl: ''
  },

  /**
   * 2. THEME & VISUAL PRESET
   */
  theme: {
    // Layout preset: 'centered-minimalist' | 'split-screen' | 'elegant-gradient'
    preset: 'centered-minimalist',
    // Color scheme: 'dark' | 'light' | 'auto' (respects OS prefers-color-scheme)
    mode: 'dark',
    // Base typography font stack
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
    // Monospace / tabular numbers font stack
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    // Card border radius (e.g. '14px', '8px', '4px', '20px')
    borderRadius: '14px',
    // Custom color palette overrides
    colors: {
      bgCanvas: '#08090d',
      bgSurface: 'rgba(18, 21, 30, 0.65)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      accent: '#38bdf8',
      accentLive: '#10b981',
      borderSubtle: 'rgba(255, 255, 255, 0.08)'
    }
  },

  /**
   * 3. HERO CONTENT & COPY
   */
  content: {
    // Main hero headline (REQUIRED)
    headline: 'Something remarkable is on its way.',
    // Supporting value proposition
    subheadline: 'We are putting the final touches on a refined new digital experience.',
    // Optional extended paragraph
    description: '',
    // Section label above countdown cards
    countdownLabel: 'Launching in'
  },

  /**
   * 4. COUNTDOWN ENGINE CONFIGURATION
   * 
   * ⚠️ COUNTDOWN SAFETY REQUIREMENT:
   * Always set an explicit fixed ISO 8601 launch timestamp with timezone offset.
   * Never use a dynamic relative date that resets when the page is built or visited.
   * 
   * Examples:
   *   - "2026-11-01T12:00:00Z"        (UTC)
   *   - "2026-11-01T13:00:00+01:00"    (CET / UTC+1)
   *   - "2026-11-01T08:00:00-04:00"    (EDT / UTC-4)
   */
  launch: {
    mode: 'fixed',
    // Authoritative launch timestamp
    launchAt: '2026-12-01T00:00:00Z',
    // Units to display: ['days', 'hours', 'minutes', 'seconds']
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    // Behavior and copy displayed once the countdown reaches zero
    onLaunch: {
      headline: 'We are now live.',
      subheadline: 'Welcome to our platform. Explore what we have built.',
      statusBadge: 'Now Available',
      ctaLabel: 'Get Started',
      ctaUrl: '/'
    }
  },

  /**
   * 5. CALL TO ACTION (CTA)
   */
  cta: {
    primary: {
      label: 'Request Access',
      url: 'https://acme.com/access',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Learn More',
      url: '/about',
      style: 'secondary',
      openInNewTab: false
    }
  },

  /**
   * 6. EMAIL CAPTURE INTEGRATION
   */
  emailSignup: {
    title: 'Be the first to know when we launch',
    placeholder: 'Enter your email address',
    buttonLabel: 'Notify Me',
    successMessage: 'Thank you! You will be notified at launch.',
    errorMessage: 'Unable to submit right now. Please try again later.',
    disclaimer: 'We respect your privacy. Zero spam.',
    // Set to your webhook, Formspree, or custom API endpoint
    integration: {
      type: 'webhook',
      endpoint: 'https://formspree.io/f/sample-endpoint',
      method: 'POST',
      emailFieldName: 'email'
    }
  },

  /**
   * 7. SOCIAL CHANNELS
   */
  social: {
    x: 'https://x.com/acme',
    github: 'https://github.com/acme',
    linkedin: 'https://linkedin.com/company/acme',
    discord: 'https://discord.gg/acme',
    email: 'contact@acme.com'
  },

  /**
   * 8. FOOTER & LEGAL
   */
  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. All rights reserved.',
    links: [
      { label: 'Privacy Policy', url: '/privacy', openInNewTab: false },
      { label: 'Terms of Service', url: '/terms', openInNewTab: false }
    ],
    statusText: 'All Systems Operational'
  },

  /**
   * 9. SEO & SOCIAL CARDS
   */
  seo: {
    title: 'Acme — Coming Soon',
    description: 'Something remarkable is on its way. Launching soon.',
    themeColor: '#08090d',
    twitterCard: 'summary_large_image'
  },

  /**
   * 10. FEATURE FLAGS
   */
  features: {
    showBrandBadge: true,
    showCountdown: true,
    showCta: true,
    showEmailSignup: true,
    showSocialLinks: true,
    showFooterLinks: true,
    showBackgroundGlow: true
  }
};
