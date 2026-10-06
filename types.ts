/**
 * Prelaunch Website Template - TypeScript Type Definitions
 * 
 * Complete schema definitions for all configuration modules, themes,
 * countdown modes, layout presets, and optional integrations.
 */

export type LayoutPreset = 'centered-minimalist' | 'split-screen' | 'elegant-gradient';

export type ThemeMode = 'dark' | 'light' | 'auto';

export type CountdownMode = 'fixed' | 'duration';

export type CountdownUnit = 'days' | 'hours' | 'minutes' | 'seconds';

export interface BrandConfig {
  /** The name of your brand or company */
  name: string;
  /** Primary domain or website URL (e.g. "acme.com") */
  domain?: string;
  /** Optional tagline or slogan (e.g. "Next-generation intelligence") */
  tagline?: string;
  /** Optional kicker badge shown above the headline (e.g. "Private Beta") */
  badge?: string;
  /** Optional custom logo image URL, or raw inline SVG string. If omitted, a clean geometric icon is rendered */
  logoUrl?: string;
  /** Optional custom favicon URL or data URI */
  faviconUrl?: string;
}

export interface ThemeColors {
  /** Background canvas color (e.g. "#08090d") */
  bgCanvas?: string;
  /** Surface / card background color (e.g. "rgba(18, 21, 30, 0.7)") */
  bgSurface?: string;
  /** Primary text color (e.g. "#f8fafc") */
  textPrimary?: string;
  /** Secondary supporting text color (e.g. "#94a3b8") */
  textSecondary?: string;
  /** Muted label text color (e.g. "#64748b") */
  textMuted?: string;
  /** Accent brand / highlight color (e.g. "#38bdf8") */
  accent?: string;
  /** Accent color used when site transitions to live state (e.g. "#10b981") */
  accentLive?: string;
  /** Subtle border color (e.g. "rgba(255, 255, 255, 0.08)") */
  borderSubtle?: string;
}

export interface ThemeConfig {
  /** Visual layout preset */
  preset: LayoutPreset;
  /** Color theme mode: 'dark' (default), 'light', or 'auto' (respects OS prefers-color-scheme) */
  mode?: ThemeMode;
  /** Base font family stack */
  fontFamily?: string;
  /** Monospace / tabular font family stack */
  fontFamilyMono?: string;
  /** Card border radius (e.g. "12px", "16px", "8px") */
  borderRadius?: string;
  /** Custom color overrides */
  colors?: ThemeColors;
}

export interface HeroContentConfig {
  /** Main hero headline */
  headline: string;
  /** Concise supporting sentence or value proposition */
  subheadline?: string;
  /** Optional extended description paragraph */
  description?: string;
  /** Label displayed above the countdown cards (e.g. "Launching in") */
  countdownLabel?: string;
}

export interface OnLaunchContentConfig {
  /** Headline displayed once countdown reaches zero */
  headline: string;
  /** Subheadline displayed once countdown reaches zero */
  subheadline?: string;
  /** Status badge text displayed upon launch (e.g. "Now Available") */
  statusBadge?: string;
  /** Primary CTA button text shown post-launch (e.g. "Enter Platform") */
  ctaLabel?: string;
  /** Primary CTA destination URL post-launch */
  ctaUrl?: string;
}

export interface LaunchConfig {
  /** Countdown mode: 'fixed' (ISO 8601 date) or 'duration' (authoritative relative duration) */
  mode?: CountdownMode;
  /** Authoritative ISO 8601 launch timestamp with explicit timezone (e.g. "2026-10-09T09:47:50+01:00") */
  launchAt?: string;
  /** Authoritative duration in hours from setup/build reference (used when mode is 'duration') */
  durationHours?: number;
  /** Which countdown units to display. Defaults to ['days', 'hours', 'minutes', 'seconds'] */
  displayUnits?: CountdownUnit[];
  /** Custom display labels for units */
  unitLabels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  /** Content and behavior once the countdown reaches zero */
  onLaunch?: OnLaunchContentConfig;
}

export interface CtaButton {
  /** Button label */
  label: string;
  /** Destination URL or anchor (e.g. "https://...", "mailto:...", "#signup") */
  url: string;
  /** Optional visual style: 'primary' (default) or 'secondary' / 'outline' */
  style?: 'primary' | 'secondary' | 'outline';
  /** Whether link opens in a new tab with rel="noopener noreferrer" */
  openInNewTab?: boolean;
}

export interface CallToActionConfig {
  /** Primary action button */
  primary?: CtaButton;
  /** Optional secondary action button (e.g. "Read Whitepaper") */
  secondary?: CtaButton;
}

export interface EmailSignupIntegration {
  /** Integration provider type: 'webhook' (POST endpoint), 'form' (native action POST/GET), or 'mailchimp' */
  type: 'webhook' | 'form' | 'mailchimp';
  /** Target endpoint URL (e.g. "https://formspree.io/f/...", "https://api.yourdomain.com/subscribe") */
  endpoint: string;
  /** HTTP method for submission (defaults to 'POST') */
  method?: 'POST' | 'GET';
  /** Key name for the email field in the payload (defaults to 'email') */
  emailFieldName?: string;
  /** Optional custom headers to send with the fetch request */
  headers?: Record<string, string>;
  /** Optional static extra payload fields (e.g. { listId: 'beta-users' }) */
  extraFields?: Record<string, string>;
}

export interface EmailSignupConfig {
  /** Title or callout above the input field */
  title?: string;
  /** Placeholder text for input */
  placeholder?: string;
  /** Button submit label */
  buttonLabel?: string;
  /** Success message shown upon successful submission */
  successMessage?: string;
  /** Error message shown upon failed submission */
  errorMessage?: string;
  /** Sub-text / disclaimer below the form (e.g. "No spam, unsubscribe at any time.") */
  disclaimer?: string;
  /** Real backend or webhook integration config */
  integration?: EmailSignupIntegration;
}

export interface SocialLinksConfig {
  twitter?: string;
  x?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  instagram?: string;
  youtube?: string;
  threads?: string;
  bluesky?: string;
  mastodon?: string;
  telegram?: string;
  email?: string;
  custom?: Array<{
    label: string;
    url: string;
    iconSvg?: string;
  }>;
}

export interface FooterLink {
  label: string;
  url: string;
  openInNewTab?: boolean;
}

export interface FooterConfig {
  /** Copyright string template. '{YEAR}' is replaced with the current year */
  copyrightTemplate?: string;
  /** Optional footer links (e.g. Privacy Policy, Terms) */
  links?: FooterLink[];
  /** Optional status text (e.g. "All Systems Operational") */
  statusText?: string;
}

export interface SEOConfig {
  /** Page title tag */
  title?: string;
  /** Meta description */
  description?: string;
  /** Canonical URL */
  canonicalUrl?: string;
  /** Open Graph share image URL */
  ogImage?: string;
  /** Open Graph title override */
  ogTitle?: string;
  /** Open Graph description override */
  ogDescription?: string;
  /** Twitter Card type (e.g. "summary_large_image") */
  twitterCard?: 'summary' | 'summary_large_image';
  /** Twitter handle (e.g. "@acme") */
  twitterHandle?: string;
  /** Mobile browser theme color */
  themeColor?: string;
}

export interface FeatureFlagsConfig {
  /** Toggle brand badge in header */
  showBrandBadge?: boolean;
  /** Toggle countdown timer section */
  showCountdown?: boolean;
  /** Toggle CTA button group */
  showCta?: boolean;
  /** Toggle email signup form */
  showEmailSignup?: boolean;
  /** Toggle social links */
  showSocialLinks?: boolean;
  /** Toggle footer legal links */
  showFooterLinks?: boolean;
  /** Toggle ambient background geometry/glow */
  showBackgroundGlow?: boolean;
}

export interface AppConfig {
  brand: BrandConfig;
  theme: ThemeConfig;
  content: HeroContentConfig;
  launch: LaunchConfig;
  cta?: CallToActionConfig;
  emailSignup?: EmailSignupConfig;
  social?: SocialLinksConfig;
  footer?: FooterConfig;
  seo?: SEOConfig;
  features?: FeatureFlagsConfig;
}
