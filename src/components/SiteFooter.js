/**
 * SiteFooter Component
 * 
 * Renders copyright, dynamic year, legal links, and status text.
 */

export class SiteFooter {
  /**
   * @param {Object} props
   * @param {Object} props.footer - Footer configuration
   * @param {Object} props.brand - Brand configuration
   * @param {Object} props.features - Feature flags
   */
  constructor({ footer = {}, brand = {}, features = {} } = {}) {
    this.footer = footer;
    this.brand = brand;
    this.features = features;
  }

  /**
   * Renders footer HTML.
   * @returns {string}
   */
  render() {
    const { copyrightTemplate, links, statusText } = this.footer;
    const brandName = this.brand.name || 'Brand';
    const currentYear = new Date().getFullYear().toString();

    let copyrightText = copyrightTemplate || '© {YEAR} {BRAND_NAME}. All rights reserved.';
    copyrightText = copyrightText
      .replace(/\{YEAR\}/g, currentYear)
      .replace(/\{BRAND_NAME\}/g, brandName);

    let linksHtml = '';
    if (this.features.showFooterLinks !== false && Array.isArray(links) && links.length > 0) {
      const items = links.map(link => {
        if (!link || !link.label || !link.url) return '';
        const targetRel = link.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${link.url}" class="footer-nav-link" ${targetRel}>${link.label}</a>`;
      }).filter(Boolean);

      if (items.length > 0) {
        linksHtml = `<div class="footer-links-group">${items.join('<span class="footer-link-divider" aria-hidden="true">•</span>')}</div>`;
      }
    }

    const statusHtml = statusText
      ? `<div class="footer-status-pill"><span class="status-indicator-dot"></span><span>${statusText}</span></div>`
      : '';

    return `
      <footer class="site-footer" role="contentinfo">
        <div class="footer-inner">
          <p id="footer-copyright" class="footer-copyright">${copyrightText}</p>
          ${linksHtml}
          ${statusHtml}
        </div>
      </footer>
    `;
  }
}
