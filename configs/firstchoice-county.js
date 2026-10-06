/**
 * Brand Configuration: Firstchoice County
 * Identifier: firstchoice-county
 * Layout Preset: elegant-gradient
 * Industry: Digital Banking, Commercial Treasury & Private Wealth
 * 
 * @type {import('../types.js').AppConfig}
 */
export const CONFIG = {
  brand: {
    name: 'Firstchoice County',
    domain: 'firstchoicecounty.com',
    tagline: 'Private Digital Wealth & Modern Commercial Banking',
    badge: 'Charter Member Preview',
    logoUrl: '',
    faviconUrl: ''
  },

  theme: {
    preset: 'elegant-gradient',
    mode: 'dark',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    borderRadius: '14px',
    colors: {
      bgCanvas: '#070a12',
      bgSurface: 'rgba(13, 19, 36, 0.72)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      accent: '#10b981', // Emerald green
      accentLive: '#34d399',
      borderSubtle: 'rgba(16, 185, 129, 0.15)'
    }
  },

  content: {
    headline: 'The next chapter in private and commercial digital banking.',
    subheadline: 'Seamless treasury management, high-yield corporate vaults, and concierge private wealth banking built for modern enterprises.',
    description: 'FDIC-insured deposit custody up to $5M through our insured depository program banks.',
    countdownLabel: 'Founding Member Access Opens In'
  },

  launch: {
    mode: 'fixed',
    launchAt: '2026-11-10T09:00:00-05:00', // US Eastern Time
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    onLaunch: {
      headline: 'Firstchoice County is now open.',
      subheadline: 'Digital client enrollment is officially active for corporate and private wealth accounts.',
      statusBadge: 'Charter Enrollment Open',
      ctaLabel: 'Open Commercial Account',
      ctaUrl: 'https://firstchoicecounty.com/onboarding'
    }
  },

  cta: {
    primary: {
      label: 'Request Charter Membership',
      url: 'https://firstchoicecounty.com/charter',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Explore Treasury Services',
      url: 'https://firstchoicecounty.com/treasury',
      style: 'secondary',
      openInNewTab: true
    }
  },

  emailSignup: {
    title: 'Join the Priority Founding Member Cohort',
    placeholder: 'executive@organization.com',
    buttonLabel: 'Join Cohort',
    successMessage: 'Your charter inquiry has been received. Our private client team will reach out with your enrollment dossier.',
    errorMessage: 'Unable to process inquiry. Please reach out to privateclients@firstchoicecounty.com.',
    disclaimer: 'Strict confidentiality. Regulated banking custody network.',
    integration: {
      type: 'webhook',
      endpoint: 'https://api.firstchoicecounty.com/v1/charter-waitlist',
      method: 'POST',
      emailFieldName: 'executiveEmail'
    }
  },

  social: {
    linkedin: 'https://linkedin.com/company/firstchoice-county',
    x: 'https://x.com/firstchoicebank',
    email: 'concierge@firstchoicecounty.com'
  },

  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. Banking services provided by partner member FDIC banks. All rights reserved.',
    links: [
      { label: 'Security & Custody', url: '/security', openInNewTab: false },
      { label: 'Privacy Policy', url: '/privacy', openInNewTab: false },
      { label: 'Terms of Banking', url: '/terms', openInNewTab: false }
    ],
    statusText: 'Banking Core: 99.999% SLA'
  },

  seo: {
    title: 'Firstchoice County — Next-Generation Digital Commercial Banking',
    description: 'Seamless treasury management, high-yield commercial vaults, and concierge private banking for modern enterprises. Launching Fall 2026.',
    themeColor: '#070a12',
    twitterCard: 'summary_large_image',
    twitterHandle: '@firstchoicebank'
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
