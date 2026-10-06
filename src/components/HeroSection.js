/**
 * HeroSection Component
 * 
 * Renders the primary hero typography with balanced wrapping and clear hierarchy.
 */

export class HeroSection {
  /**
   * @param {Object} props
   * @param {Object} props.content - Content configuration
   */
  constructor({ content = {} } = {}) {
    this.content = content;
  }

  /**
   * Renders the Hero section HTML.
   * @returns {string}
   */
  render() {
    const { headline, subheadline, description } = this.content;

    const subheadlineHtml = subheadline
      ? `<p id="hero-subheadline" class="hero-subheadline">${subheadline}</p>`
      : '';

    const descriptionHtml = description
      ? `<p id="hero-description" class="hero-description">${description}</p>`
      : '';

    return `
      <section class="hero-typography" aria-label="Introduction">
        <h1 id="hero-headline" class="hero-headline">${headline || ''}</h1>
        ${subheadlineHtml}
        ${descriptionHtml}
      </section>
    `;
  }
}
