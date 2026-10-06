/**
 * CallToAction Component
 * 
 * Renders primary and secondary action buttons with accessible attributes
 * and safe external link handling.
 */

export class CallToAction {
  /**
   * @param {Object} props
   * @param {Object} props.cta - CTA configuration object
   * @param {Object} props.features - Feature flags
   */
  constructor({ cta = {}, features = {} } = {}) {
    this.cta = cta;
    this.features = features;
  }

  /**
   * Renders a single CTA button.
   * 
   * @param {Object} btn - Button config
   * @param {string} defaultStyle - 'primary' or 'secondary'
   * @returns {string}
   */
  renderButton(btn, defaultStyle = 'primary') {
    if (!btn || !btn.label || !btn.url) return '';

    const style = btn.style || defaultStyle;
    const isExternal = btn.url.startsWith('http://') || btn.url.startsWith('https://');
    const openNewTab = btn.openInNewTab !== undefined ? btn.openInNewTab : isExternal;
    const targetRel = openNewTab ? 'target="_blank" rel="noopener noreferrer"' : '';

    return `
      <a href="${btn.url}" class="cta-button cta-${style}" ${targetRel}>
        <span>${btn.label}</span>
        ${isExternal && openNewTab ? `
          <svg class="cta-external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        ` : ''}
      </a>
    `;
  }

  /**
   * Renders the CTA group HTML.
   * @returns {string}
   */
  render() {
    if (this.features.showCta === false || !this.cta) {
      return '';
    }

    const { primary, secondary } = this.cta;
    const primaryHtml = this.renderButton(primary, 'primary');
    const secondaryHtml = this.renderButton(secondary, 'secondary');

    if (!primaryHtml && !secondaryHtml) {
      return '';
    }

    return `
      <div class="cta-group" role="group" aria-label="Actions">
        ${primaryHtml}
        ${secondaryHtml}
      </div>
    `;
  }
}
