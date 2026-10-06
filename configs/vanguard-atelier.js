/**
 * Brand Configuration: Vanguard Atelier
 * Identifier: vanguard-atelier
 * Layout Preset: centered-minimalist
 */
export const CONFIG = {
  brand: {
    name: 'Vanguard Atelier',
    domain: 'vanguard-atelier.com',
    tagline: 'Haute Horlogerie & Objects of Permanence',
    badge: 'Edition 01 / Fall 2026',
    logoUrl: '',
    faviconUrl: ''
  },

  theme: {
    preset: 'centered-minimalist',
    mode: 'dark',
    fontFamily: '"Cinzel", "Bodoni MT", "Didot", "Times New Roman", serif',
    fontFamilyMono: 'ui-monospace, monospace',
    borderRadius: '4px',
    colors: {
      bgCanvas: '#0e0e10',
      bgSurface: 'rgba(24, 24, 28, 0.6)',
      textPrimary: '#f5f5f7',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      accent: '#d4af37', // Gold / Champagne
      accentLive: '#e2d4a8',
      borderSubtle: 'rgba(212, 175, 55, 0.15)'
    }
  },

  content: {
    headline: 'Time, distilled to its absolute essence.',
    subheadline: 'An exclusive collection of numbered mechanical timepieces crafted by hand in Geneva.',
    description: 'Limited to two hundred numbered references worldwide. Private salon viewings commence upon release.',
    countdownLabel: 'Private Unveiling In'
  },

  launch: {
    mode: 'fixed',
    launchAt: '2026-11-15T18:00:00+01:00',
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    onLaunch: {
      headline: 'The Collection is Now Revealed.',
      subheadline: 'Private commission requests are now open for Edition 01.',
      statusBadge: 'Collection Live',
      ctaLabel: 'Request Private Viewing',
      ctaUrl: 'https://vanguard-atelier.com/salon'
    }
  },

  cta: {
    primary: {
      label: 'Request Collector Portfolio',
      url: 'https://vanguard-atelier.com/portfolio',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Read The Manifesto',
      url: 'https://vanguard-atelier.com/manifesto',
      style: 'outline',
      openInNewTab: false
    }
  },

  emailSignup: {
    title: 'Inquire for Private Allocation',
    placeholder: 'Enter your preferred email',
    buttonLabel: 'Request Allocation',
    successMessage: 'Your inquiry has been received. Our concierge will contact you privately.',
    errorMessage: 'Unable to register inquiry. Please reach out to concierge@vanguard-atelier.com.',
    disclaimer: 'Discretion assured. Private communications only.',
    integration: {
      type: 'webhook',
      endpoint: 'https://api.vanguard-atelier.com/inquiries',
      method: 'POST',
      emailFieldName: 'collectorEmail'
    }
  },

  social: {
    instagram: 'https://instagram.com/vanguardatelier',
    x: 'https://x.com/vanguardatelier',
    email: 'concierge@vanguard-atelier.com'
  },

  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. Geneva, Switzerland. All rights reserved.',
    links: [
      { label: 'Private Salon', url: '/salon', openInNewTab: false },
      { label: 'Provenance', url: '/provenance', openInNewTab: false },
      { label: 'Legal Notice', url: '/legal', openInNewTab: false }
    ],
    statusText: 'Geneva Atelier Active'
  },

  seo: {
    title: 'Vanguard Atelier — Objects of Permanence',
    description: 'Exclusive collection of numbered mechanical timepieces crafted in Geneva. Unveiling November 2026.',
    themeColor: '#0e0e10',
    twitterCard: 'summary_large_image'
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
