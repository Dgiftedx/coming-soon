/**
 * Theme & Layout Style Manager
 * 
 * Injects dynamic CSS variables, manages layout presets,
 * and handles light/dark/auto color-scheme transitions.
 */

export class ThemeManager {
  /**
   * @param {Object} themeConfig - The validated theme configuration.
   */
  constructor(themeConfig = {}) {
    this.config = themeConfig;
    this.mediaQueryListener = null;
  }

  /**
   * Applies the theme configuration to the document.
   */
  apply() {
    this.applyLayoutPreset();
    this.applyColorMode();
    this.applyCustomVariables();
  }

  /**
   * Sets the layout preset class on the body element.
   */
  applyLayoutPreset() {
    const preset = this.config.preset || 'centered-minimalist';
    document.body.classList.remove(
      'layout-centered-minimalist',
      'layout-split-screen',
      'layout-elegant-gradient'
    );
    document.body.classList.add(`layout-${preset}`);
  }

  /**
   * Configures color-scheme and light/dark mode listeners.
   */
  applyColorMode() {
    const mode = this.config.mode || 'dark';

    // Remove previous listener if exists
    if (this.mediaQueryListener) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (mql.removeEventListener) {
        mql.removeEventListener('change', this.mediaQueryListener);
      }
      this.mediaQueryListener = null;
    }

    if (mode === 'auto') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const updateAutoTheme = (e) => {
        const isDark = e.matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      };

      updateAutoTheme(mql);
      this.mediaQueryListener = updateAutoTheme;
      if (mql.addEventListener) {
        mql.addEventListener('change', this.mediaQueryListener);
      }
    } else {
      document.documentElement.setAttribute('data-theme', mode);
      document.documentElement.style.colorScheme = mode;
    }
  }

  /**
   * Injects custom CSS variables into :root
   */
  applyCustomVariables() {
    const root = document.documentElement;
    const { fontFamily, fontFamilyMono, borderRadius, colors } = this.config;

    if (fontFamily) {
      root.style.setProperty('--font-family-base', fontFamily);
    }
    if (fontFamilyMono) {
      root.style.setProperty('--font-family-mono', fontFamilyMono);
    }
    if (borderRadius) {
      root.style.setProperty('--radius-card', borderRadius);
    }

    if (colors && typeof colors === 'object') {
      const colorMapping = {
        bgCanvas: '--bg-canvas',
        bgSurface: '--bg-surface',
        textPrimary: '--text-primary',
        textSecondary: '--text-secondary',
        textMuted: '--text-muted',
        accent: '--accent-primary',
        accentLive: '--accent-live',
        borderSubtle: '--border-subtle'
      };

      Object.entries(colorMapping).forEach(([configKey, cssVar]) => {
        if (colors[configKey]) {
          root.style.setProperty(cssVar, colors[configKey]);
        }
      });
    }
  }
}
