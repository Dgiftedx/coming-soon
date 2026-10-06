/**
 * Brand Configuration: Hyperion Dynamics
 * Identifier: hyperion-dynamics
 * Layout Preset: split-screen
 */
export const CONFIG = {
  brand: {
    name: 'Hyperion Dynamics',
    domain: 'hyperiondynamics.space',
    tagline: 'Autonomous Orbital Cargo Logistics',
    badge: 'Mission Flight 04',
    logoUrl: '',
    faviconUrl: ''
  },

  theme: {
    preset: 'split-screen',
    mode: 'dark',
    fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontFamilyMono: '"JetBrains Mono", ui-monospace, monospace',
    borderRadius: '16px',
    colors: {
      bgCanvas: '#05070f',
      bgSurface: 'rgba(10, 15, 30, 0.75)',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      textMuted: '#475569',
      accent: '#06b6d4', // Cyan
      accentLive: '#3b82f6', // Electric Blue
      borderSubtle: 'rgba(6, 182, 212, 0.15)'
    }
  },

  content: {
    headline: 'Scheduled freight delivery to Low Earth Orbit.',
    subheadline: 'Autonomous payload insertion with sub-meter rendezvous precision. Lowering orbital transit cost by 90%.',
    description: 'Serving sovereign space agencies, satellite constellations, and research habitats.',
    countdownLabel: 'T-Minus To Orbital Launch'
  },

  launch: {
    mode: 'fixed',
    launchAt: '2026-12-01T14:30:00Z',
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs'
    },
    onLaunch: {
      headline: 'Mission 04 Has Cleared The Launch Pad.',
      subheadline: 'Vehicle is currently in low earth orbit insertion phase. Telemetry feed is live.',
      statusBadge: 'Mission Active',
      ctaLabel: 'View Telemetry Stream',
      ctaUrl: 'https://hyperiondynamics.space/telemetry'
    }
  },

  cta: {
    primary: {
      label: 'Reserve Payload Mass',
      url: 'https://hyperiondynamics.space/reserve',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Mission Payload Guide (PDF)',
      url: 'https://hyperiondynamics.space/docs/payload-guide.pdf',
      style: 'secondary',
      openInNewTab: true
    }
  },

  emailSignup: {
    title: 'Subscribe to Launch Alerts & NOTAMs',
    placeholder: 'payload-engineer@aerospace.com',
    buttonLabel: 'Transmit',
    successMessage: 'Frequency locked. Launch telemetry alerts and launch window notifications confirmed.',
    errorMessage: 'Transmission failure. Please verify email and retry.',
    disclaimer: 'Technical mission dispatches only.',
    integration: {
      type: 'webhook',
      endpoint: 'https://api.hyperiondynamics.space/v1/mission-alerts',
      method: 'POST',
      emailFieldName: 'subscriberEmail'
    }
  },

  social: {
    x: 'https://x.com/hyperionorbital',
    github: 'https://github.com/hyperiondynamics',
    youtube: 'https://youtube.com/@hyperiondynamics',
    discord: 'https://discord.gg/hyperion',
    email: 'flight-ops@hyperiondynamics.space'
  },

  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. Launch Site Cape Canaveral.',
    links: [
      { label: 'Safety & NOTAM', url: '/safety', openInNewTab: false },
      { label: 'Payload Specifications', url: '/specs', openInNewTab: false },
      { label: 'Flight Manifest', url: '/manifest', openInNewTab: false }
    ],
    statusText: 'Telemetry Link: 100% Signal'
  },

  seo: {
    title: 'Hyperion Dynamics — Autonomous Orbital Cargo Logistics',
    description: 'Scheduled freight delivery to Low Earth Orbit. Payload reservation for flight 04 now open.',
    themeColor: '#05070f',
    twitterCard: 'summary_large_image',
    twitterHandle: '@hyperionorbital'
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
