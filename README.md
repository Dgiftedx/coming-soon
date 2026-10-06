# Universal Prelaunch Website Template

A production-ready, configuration-driven, and accessible "Coming Soon" website template. Built to be deployed across multiple domains and brands from the **SAME** GitHub repository using Cloudflare Pages without rewriting application code.

---

## 🌟 Key Architecture Features

- **Multi-Brand Cloudflare Pages Support**: Manage multiple brand domains from a single GitHub repository using isolated configurations in `configs/`.
- **Single Source of Truth Configuration**: Brand identity, themes, copy, countdown, CTAs, email capture, and SEO are configured in standalone ES modules.
- **TypeScript Schema & Runtime Validation**: Full type safety with [`types.ts`](file:///var/www/html/coming-soon/types.ts) and runtime validation via [`src/config-validator.js`](file:///var/www/html/coming-soon/src/config-validator.js).
- **Zero-Drift Countdown Engine**: Timezone-safe calculations with tab visibility synchronization, non-negative clamping, permanent expiration freeze, and screen reader announcements (`aria-live="polite"`).
- **3 Responsive Layout Presets**:
  - `centered-minimalist` (Default sleek vertical stack)
  - `split-screen` (Dual-column desktop layout for deep-tech / complex products)
  - `elegant-gradient` (Frosted glassmorphism card with mesh glow backdrop)
- **Real Email Capture Integration**: Production-ready form with honeypot anti-spam defense, client-side validation, loading states, and support for Webhooks, Formspree, Mailchimp, or custom APIs.
- **Accessibility & Performance**:
  - Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`).
  - Zero Cumulative Layout Shift (CLS) via `tabular-nums` and reserved bounding boxes.
  - Full keyboard `:focus-visible` accessibility and WCAG AAA contrast compliance.
  - OS reduced-motion preference support (`@media (prefers-reduced-motion: reduce)`).
- **Zero Runtime Dependencies**: Runs natively on any static web host, CDN, or server out of the box.

---

## 📁 Repository Structure

```
├── configs/                     # Dedicated directory for all brand configurations
│   ├── template.js              # Clean starter template with documentation
│   ├── aura-cloud.js            # Brand: Aura Cloud (Preset: centered-minimalist)
│   ├── vanguard-atelier.js      # Brand: Vanguard Atelier (Preset: centered-minimalist)
│   └── hyperion-dynamics.js     # Brand: Hyperion Dynamics (Preset: split-screen)
├── scripts/
│   └── build.js                 # Configuration selector & validation build script
├── src/
│   ├── app.js                   # Application coordinator & controller
│   ├── config-validator.js      # Schema validation, error reporting, and fallbacks
│   ├── countdown.js             # Pure logic timezone-aware countdown calculations
│   ├── theme.js                 # Dynamic CSS token & color scheme manager
│   └── components/
│       ├── SiteHeader.js        # Brand logo, name, kicker badge
│       ├── HeroSection.js       # Headline, subtitle, description
│       ├── CountdownTimer.js    # Digit cards, tabular numbers, live transition
│       ├── CallToAction.js      # Primary/secondary action buttons
│       ├── EmailSignup.js       # Real webhook submission with honeypot & feedback
│       ├── SocialLinks.js       # Accessible SVG icons for 10+ platforms
│       └── SiteFooter.js        # Copyright, dynamic year, legal links, status
├── tests/
│   ├── countdown.test.mjs       # Unit tests for countdown math & boundary conditions
│   ├── config-validator.test.mjs# Unit tests for schema validation & brand configs
│   └── build-script.test.mjs    # Unit tests for build selector & path traversal security
├── config.js                    # Active brand configuration (generated at build)
├── index.html                   # Semantic HTML5 entry container
├── styles.css                   # Responsive styles, layout presets, dark/light themes
├── package.json                 # Project scripts and metadata
├── CONFIG_REFERENCE.md          # Complete configuration documentation
├── DEPLOYMENT_GUIDE.md          # Cloudflare Pages multi-project setup guide
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start & Local Development

### 1. Select a Brand Configuration:
```bash
# List all available brands in configs/
node scripts/build.js --list

# Activate a specific brand
node scripts/build.js aura-cloud
# or: node scripts/build.js vanguard-atelier
# or: node scripts/build.js hyperion-dynamics
```

### 2. Start Local HTTP Server:
```bash
# Python 3
python3 -m http.server 8080

# PHP
php -S localhost:8080

# Node.js
npx serve .
```

Visit `http://localhost:8080` in your web browser.

---

## 🧪 Automated Testing

Execute the automated test suites using Node.js:

```bash
npm test
# or: node tests/countdown.test.mjs && node tests/config-validator.test.mjs && node tests/build-script.test.mjs
```

### Test Coverage Summary (131/131 Tests Passed):
- **Countdown Engine (49 tests)**: Fixed-date ISO 8601 calculations across multiple timezone offsets (UTC, +01:00, -04:00, +09:00), duration resolution, 1-second boundary transitions, non-negative zero-clamping, string padding, screen reader accessibility announcements.
- **Config Validator (38 tests)**: Dynamic validation of all files in `configs/`, required field detection, graceful fallback recovery for unrecognized presets/modes, duration vs fixed date rules.
- **Build Selector Script (44 tests)**: Configuration discovery, safe brand file copying, source configuration non-modification verification, path traversal & command injection rejection, missing and unknown identifier handling.

---

## 🌐 Cloudflare Pages Deployment (Multiple Brands, Same Repo)

To deploy multiple websites from this single repository:

1. Connect your repository to **Cloudflare Pages**.
2. Create a separate Pages project for each brand with the following settings:

| Project Name | Build Command | Build Output Directory |
| :--- | :--- | :--- |
| `aura-cloud-site` | `node scripts/build.js aura-cloud` | `.` |
| `vanguard-site` | `node scripts/build.js vanguard-atelier` | `.` |
| `hyperion-site` | `node scripts/build.js hyperion-dynamics` | `.` |

---

## 📖 Further Documentation

- **[Configuration Reference (`CONFIG_REFERENCE.md`)](file:///var/www/html/coming-soon/CONFIG_REFERENCE.md)**: Detailed documentation of every field, option, type, and security policies.
- **[Deployment Guide (`DEPLOYMENT_GUIDE.md`)](file:///var/www/html/coming-soon/DEPLOYMENT_GUIDE.md)**: Exhaustive guide for Cloudflare Pages multi-project architecture, countdown safety, and backend webhook setups.
