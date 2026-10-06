/**
 * Brand Configuration: Excelxpress Courier
 * Identifier: excelxpress-courier
 * Layout Preset: split-screen
 * Industry: Global Express Delivery, Air Freight & Cargo Logistics
 * 
 * @type {import('../types.js').AppConfig}
 */
export const CONFIG = {
  brand: {
    name: 'Excelxpress Courier',
    domain: 'excelxpresscourier.com',
    tagline: 'Global Express Freight, Cargo Logistics & Parcel Delivery',
    badge: 'Global Network Launch',
    logoUrl: '',
    faviconUrl: ''
  },

  theme: {
    preset: 'split-screen',
    mode: 'dark',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    borderRadius: '12px',
    colors: {
      bgCanvas: '#090b10',
      bgSurface: 'rgba(17, 22, 33, 0.75)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      accent: '#f59e0b', // High-visibility logistics amber
      accentLive: '#10b981',
      borderSubtle: 'rgba(245, 158, 11, 0.15)'
    }
  },

  content: {
    headline: 'Next-day global parcel delivery across 180+ countries.',
    subheadline: 'Automated customs clearance, real-time satellite telemetry, and dedicated air-cargo routes for enterprise supply chains and rapid eCommerce fulfillment.',
    description: 'IATA & WCO certified global freight network with temperature-controlled cold chain and time-critical white-glove dispatch.',
    countdownLabel: 'Global Network Dispatch Commences In'
  },

  launch: {
    mode: 'fixed',
    launchAt: '2026-11-28T08:00:00Z', // UTC Global dispatch hour
    displayUnits: ['days', 'hours', 'minutes', 'seconds'],
    unitLabels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    onLaunch: {
      headline: 'Excelxpress Courier Network Is Now Live.',
      subheadline: 'Worldwide booking, air manifest tracking, and cargo dispatch are open across all international hubs.',
      statusBadge: 'Global Network Active',
      ctaLabel: 'Track & Book Shipment',
      ctaUrl: 'https://excelxpresscourier.com/ship'
    }
  },

  cta: {
    primary: {
      label: 'Open Corporate Shipping Account',
      url: 'https://excelxpresscourier.com/register',
      style: 'primary',
      openInNewTab: true
    },
    secondary: {
      label: 'Download Global Route Guide',
      url: 'https://excelxpresscourier.com/routes.pdf',
      style: 'secondary',
      openInNewTab: true
    }
  },

  emailSignup: {
    title: 'Get Priority Air Cargo & Parcel Rates',
    placeholder: 'logistics-manager@enterprise.com',
    buttonLabel: 'Request Commercial Rates',
    successMessage: 'Thank you. Our international freight coordinator will send your volume rate schedule and API credentials.',
    errorMessage: 'Unable to submit request. Please reach out directly to dispatch@excelxpresscourier.com.',
    disclaimer: 'Enterprise freight dispatch. Dedicated account manager included.',
    integration: {
      type: 'webhook',
      endpoint: 'https://api.excelxpresscourier.com/v1/commercial-inquiries',
      method: 'POST',
      emailFieldName: 'contactEmail'
    }
  },

  social: {
    x: 'https://x.com/excelxpress',
    linkedin: 'https://linkedin.com/company/excelxpress-courier',
    email: 'dispatch@excelxpresscourier.com'
  },

  footer: {
    copyrightTemplate: '© {YEAR} {BRAND_NAME}. Global Air & Ground Logistics Hubs. All rights reserved.',
    links: [
      { label: 'Customs & Compliance', url: '/compliance', openInNewTab: false },
      { label: 'Dangerous Goods Policy', url: '/hazmat', openInNewTab: false },
      { label: 'Terms of Carriage', url: '/terms', openInNewTab: false }
    ],
    statusText: 'Air Hubs: All Flights On Schedule'
  },

  seo: {
    title: 'Excelxpress Courier — Global Express Parcel Delivery & Freight Forwarding',
    description: 'Next-day international express delivery, air cargo, and customs clearance across 180+ countries. Launching November 2026.',
    themeColor: '#090b10',
    twitterCard: 'summary_large_image',
    twitterHandle: '@excelxpress'
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
