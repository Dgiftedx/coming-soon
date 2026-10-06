# Configuration Reference & Schema Guide

This document provides a comprehensive reference for all available configuration options, types, default values, and file conventions in the multi-brand prelaunch website architecture.

---

## 📁 Configuration File Conventions

Each brand configuration is stored as a standalone ES module in the `configs/` directory:

```
configs/
├── template.js              # Clean starter template
├── aura-cloud.js            # Brand: Aura Cloud (Preset: centered-minimalist)
├── vanguard-atelier.js      # Brand: Vanguard Atelier (Preset: centered-minimalist)
└── hyperion-dynamics.js     # Brand: Hyperion Dynamics (Preset: split-screen)
```

During build/deployment on Cloudflare Pages, `scripts/build.js <brand-id>` validates and activates `configs/<brand-id>.js` by copying it to `config.js` for the browser to consume.

> [!WARNING]
> **SECURITY NOTICE: Configurations are 100% Client-Facing and Public.**
> All files in `configs/` and `config.js` are loaded directly by visitors' browsers. Never put private database credentials, secret API keys, or proprietary backend tokens in these files.

---

## Configuration Schema Hierarchy

```typescript
AppConfig
├── brand: BrandConfig
├── theme: ThemeConfig
├── content: HeroContentConfig
├── launch: LaunchConfig
├── cta: CallToActionConfig
├── emailSignup: EmailSignupConfig
├── social: SocialLinksConfig
├── footer: FooterConfig
├── seo: SEOConfig
└── features: FeatureFlagsConfig
```

---

## 1. Brand Configuration (`brand`)

Controls brand identity, domain, typography badge, and logo assets.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` *(required)* | `string` | `'Brand Name'` | The official name of your brand or company. |
| `domain` | `string` | `''` | Canonical domain name (e.g. `'auracloud.io'`). |
| `tagline` | `string` | `''` | Secondary slogan displayed alongside brand name. |
| `badge` | `string` | `''` | Kicker pill badge displayed above hero (e.g. `'Preview Release'`). |
| `logoUrl` | `string` | `''` | Image URL or raw inline `<svg>` string. If empty, a minimalist geometric icon is rendered. |
| `faviconUrl` | `string` | `''` | Custom favicon image URL or SVG data URI. |

### Example:
```javascript
brand: {
  name: 'Aura Cloud',
  domain: 'auracloud.io',
  tagline: 'Autonomous Infrastructure Platform',
  badge: 'Private Beta Access',
  logoUrl: '',
  faviconUrl: ''
}
```

---

## 2. Theme & Layout Configuration (`theme`)

Controls the visual layout preset, light/dark mode, typography font stacks, border radius, and color tokens.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `preset` | `'centered-minimalist' \| 'split-screen' \| 'elegant-gradient'` | `'centered-minimalist'` | Layout structure preset. |
| `mode` | `'dark' \| 'light' \| 'auto'` | `'dark'` | Color theme. `'auto'` dynamically listens to the OS `prefers-color-scheme`. |
| `fontFamily` | `string` | System font stack | Primary typography font stack. |
| `fontFamilyMono` | `string` | Monospace stack | Font stack for countdown numbers and tabular data. |
| `borderRadius` | `string` | `'14px'` | CSS border radius for cards and buttons. |
| `colors` | `ThemeColors` | `{}` | Optional color token overrides. |

### Theme Colors (`theme.colors`):
- `bgCanvas`: Page background color (e.g. `'#08090d'`).
- `bgSurface`: Card and surface background color (e.g. `'rgba(18, 21, 30, 0.65)'`).
- `textPrimary`: Main headline and body text color (e.g. `'#f8fafc'`).
- `textSecondary`: Subtitle text color (e.g. `'#94a3b8'`).
- `textMuted`: Label and caption color (e.g. `'#64748b'`).
- `accent`: Primary highlight / accent color (e.g. `'#38bdf8'`).
- `accentLive`: Accent color when site reaches live state (e.g. `'#10b981'`).
- `borderSubtle`: Card and container border color (e.g. `'rgba(255, 255, 255, 0.08)'`).

---

## 3. Hero Content Configuration (`content`)

Controls the main headlines, body copy, and countdown section labels.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headline` *(required)* | `string` | `''` | Main hero headline (uses automatic text balancing). |
| `subheadline` | `string` | `''` | Supporting subtitle / value proposition. |
| `description` | `string` | `''` | Optional extended paragraph copy. |
| `countdownLabel` | `string` | `'Launching in'` | Label displayed above the countdown digit cards. |

---

## 4. Countdown Engine Configuration (`launch`)

Controls the launch date or duration, display units, custom unit labels, and post-launch behavior.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'fixed' \| 'duration'` | `'fixed'` | Countdown calculation mode. |
| `launchAt` | `string (ISO 8601)` | `''` | Required if `mode: 'fixed'`. ISO 8601 timestamp with explicit timezone offset (e.g. `'2026-10-09T09:47:50+01:00'`). |
| `durationHours` | `number` | `undefined` | Required if `mode: 'duration'`. Relative duration in hours resolved once into an authoritative timestamp. |
| `displayUnits` | `CountdownUnit[]` | `['days', 'hours', 'minutes', 'seconds']` | Which time units to render in the countdown grid. |
| `unitLabels` | `Object` | `{ days: 'Days', ... }` | Custom labels for time units. |
| `onLaunch` | `OnLaunchContentConfig` | `{}` | Message and CTA displayed once the timer hits zero. |

### Post-Launch State (`launch.onLaunch`):
```javascript
onLaunch: {
  headline: 'We are now live.',
  subheadline: 'Welcome to the new platform.',
  statusBadge: 'Platform Live',
  ctaLabel: 'Enter Console',
  ctaUrl: 'https://domain.com/app'
}
```

---

## 5. Call to Action (`cta`)

Defines primary and secondary action buttons.

```javascript
cta: {
  primary: {
    label: 'Request Early Access',
    url: 'https://domain.com/signup',
    style: 'primary', // 'primary' | 'secondary' | 'outline'
    openInNewTab: true
  },
  secondary: {
    label: 'Read Documentation',
    url: '/docs',
    style: 'secondary',
    openInNewTab: false
  }
}
```

---

## 6. Email Capture Integration (`emailSignup`)

Controls early-access newsletter capture with webhook, Formspree, or custom API endpoints.

| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Header text above form. |
| `placeholder` | `string` | Input field placeholder text. |
| `buttonLabel` | `string` | Submit button text. |
| `successMessage` | `string` | Accessible feedback message on success. |
| `errorMessage` | `string` | Accessible feedback message on error. |
| `disclaimer` | `string` | Privacy notice below the input. |
| `integration` | `EmailSignupIntegration` | Real backend webhook / form endpoint configuration. |

### Integration Details:
```javascript
emailSignup: {
  title: 'Get notified the moment we go live',
  placeholder: 'name@company.com',
  buttonLabel: 'Join Priority Waitlist',
  successMessage: 'Welcome! We will notify you at launch.',
  errorMessage: 'Unable to submit right now. Please try again.',
  disclaimer: 'Zero spam. Unsubscribe at any time.',
  integration: {
    type: 'webhook', // 'webhook' | 'form' | 'mailchimp'
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
    method: 'POST',
    emailFieldName: 'email',
    headers: { 'X-Custom-Header': 'value' },
    extraFields: { source: 'coming-soon-landing' }
  }
}
```

---

## 7. Social Links (`social`)

Configures social platform links. Clean SVG glyphs are automatically matched:

```javascript
social: {
  x: 'https://x.com/username',
  github: 'https://github.com/org',
  linkedin: 'https://linkedin.com/company/name',
  discord: 'https://discord.gg/invite',
  instagram: 'https://instagram.com/username',
  youtube: 'https://youtube.com/@channel',
  threads: 'https://threads.net/@username',
  bluesky: 'https://bsky.app/profile/username',
  telegram: 'https://t.me/channel',
  email: 'contact@domain.com',
  custom: [
    { label: 'Medium', url: 'https://medium.com/@brand' }
  ]
}
```

---

## 8. Footer & Compliance (`footer`)

```javascript
footer: {
  copyrightTemplate: '© {YEAR} {BRAND_NAME}. All rights reserved.',
  links: [
    { label: 'Privacy Policy', url: '/privacy', openInNewTab: false },
    { label: 'Terms of Service', url: '/terms', openInNewTab: false }
  ],
  statusText: 'All Systems Operational'
}
```

---

## 9. SEO & Metadata (`seo`)

```javascript
seo: {
  title: 'Brand — Coming Soon',
  description: 'Something remarkable is on its way.',
  themeColor: '#08090d',
  canonicalUrl: 'https://domain.com',
  ogImage: 'https://domain.com/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterHandle: '@brand'
}
```

---

## 10. Feature Flags (`features`)

Toggle individual sections or elements on or off cleanly:

```javascript
features: {
  showBrandBadge: true,      // Kicker pill in header
  showCountdown: true,       // Countdown timer section
  showCta: true,             // CTA button group
  showEmailSignup: true,     // Email signup container
  showSocialLinks: true,     // Social icons bar
  showFooterLinks: true,     // Legal links in footer
  showBackgroundGlow: true   // Ambient background glow and grid
}
```
