/**
 * Brand Configuration: Aura Cloud
 * Identifier: aura-cloud
 * Layout Preset: centered-minimalist
 */
export const CONFIG = {
  brand: {
    name: 'Aura Cloud',
    domain: 'auracloud.io',
    tagline: 'Autonomous Infrastructure Platform',
    badge: 'Private Beta Access',
    logoUrl: '',
    faviconUrl: ''
  },

  theme: {
    preset: 'centered-minimalist',
    mode: 'dark',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    borderRadius: '14px',
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

  content: {
    headline: 'Next-generation cloud infrastructure is on the horizon.',
    subheadline: 'We are engineering an ultra-low latency compute platform designed for autonomous AI agents and real-time workloads.',
    description: '',
    countdownLabel: 'Public Launch In'
  },

  launch: {
    mode: 'fixed',
    launchAt: '2026-10-09T09:47:50+01:00',
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    onLaunch: {
      headline: 'Aura Cloud is now officially live.',
      subheadline: 'The compute platform is open to developers worldwide. Deploy your first cluster today.',
      statusBadge: 'Platform Live',
      ctaLabel: 'Launch Console',
      ctaUrl: 'https://auracloud.io/console'
    }
  },

  cta: {
    primary: {
      label: 'Request Early Access',
      url: 'https://auracloud.io/access',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Read Architecture Paper',
      url: 'https://auracloud.io/docs/architecture',
      style: 'secondary',
      openInNewTab: true
    }
  },

  emailSignup: {
    title: 'Get notified the moment we go live',
    placeholder: 'name@company.com',
    buttonLabel: 'Join Priority Waitlist',
    successMessage: 'Welcome to the inner circle. We will send you access credentials at launch.',
    errorMessage: 'Unable to process subscription. Please check your email and try again.',
    disclaimer: 'Zero spam. Only high-signal technical updates and early access invitations.',
    integration: {
      type: 'webhook',
      endpoint: 'https://formspree.io/f/sample-demo-endpoint',
      method: 'POST',
      emailFieldName: 'email'
    }
  },

  social: {
    x: 'https://x.com/auracloud',
    github: 'https://github.com/auracloud',
    discord: 'https://discord.gg/auracloud',
    linkedin: 'https://linkedin.com/company/auracloud',
    email: 'contact@auracloud.io'
  },

  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. Built with speed and precision.',
    links: [
      { label: 'Privacy Policy', url: '/privacy', openInNewTab: false },
      { label: 'Terms of Service', url: '/terms', openInNewTab: false },
      { label: 'Security Overview', url: '/security', openInNewTab: false }
    ],
    statusText: 'All Systems Operational'
  },

  seo: {
    title: 'Aura Cloud — Next-Gen Autonomous Infrastructure',
    description: 'Ultra-low latency compute platform crafted for autonomous AI agents and real-time workloads. Launching October 2026.',
    themeColor: '#08090d',
    twitterCard: 'summary_large_image',
    twitterHandle: '@auracloud'
  },

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
