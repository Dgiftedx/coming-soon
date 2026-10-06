/**
 * SiteHeader Component
 * 
 * Renders the top brand header, logo, brand name, and optional status badge.
 */

export class SiteHeader {
  /**
   * @param {Object} props
   * @param {Object} props.brand - Brand configuration object
   * @param {Object} props.features - Feature flags
   */
  constructor({ brand = {}, features = {} } = {}) {
    this.brand = brand;
    this.features = features;
  }

  /**
   * Generates default minimalist geometric SVG mark if no custom logo is provided.
   */
  getDefaultLogoSvg() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    `;
  }

  /**
   * Renders the header HTML.
   * @returns {string}
   */
  render() {
    const { name, badge, logoUrl, tagline } = this.brand;
    const showBadge = this.features.showBrandBadge !== false && Boolean(badge);

    let logoHtml = '';
    if (logoUrl) {
      if (logoUrl.trim().startsWith('<svg')) {
        logoHtml = `<span class="brand-icon" aria-hidden="true">${logoUrl}</span>`;
      } else {
        logoHtml = `<img src="${logoUrl}" alt="${name} logo" class="brand-logo-img" />`;
      }
    } else {
      logoHtml = `<span class="brand-icon" aria-hidden="true">${this.getDefaultLogoSvg()}</span>`;
    }

    const badgeHtml = showBadge
      ? `<div id="brand-badge" class="brand-badge" role="status"><span>${badge}</span></div>`
      : '';

    const taglineHtml = tagline
      ? `<span class="brand-tagline">${tagline}</span>`
      : '';

    return `
      <header class="site-header" role="banner">
        <a href="/" class="brand-identity" aria-label="${name || 'Home'}">
          ${logoHtml}
          <div class="brand-text-group">
            <span id="brand-name" class="brand-name">${name || ''}</span>
            ${taglineHtml}
          </div>
        </a>
        ${badgeHtml}
      </header>
    `;
  }
}
