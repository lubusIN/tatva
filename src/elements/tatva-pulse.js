/**
 * TatvaPulse - A lightweight, reusable web component for rendering an animated pulse effect.
 * Supports optional text and full customization of size, color, and animation speed.
 */
export class TatvaPulse extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            size: '0.75rem',
            color: '#000000',
            animationDuration: '1s',
            gap: '10px',
            position: 'left',
            superscriptOffset: '-0.5em',
        };
    }

    static get observedAttributes() {
        return [
            'size',
            'color',
            'position',
            'gap',
            'superscript-offset',
            'animation-duration',
        ];
    }

    /**
     * Constructor initializes the component
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });
    }

    // Property getters and setters
    get size() {
        return this.getAttribute('size') || TatvaPulse.DEFAULT_CONFIG.size;
    }

    set size(val) {
        if (val) this.setAttribute('size', val);
        else this.removeAttribute('size');
    }

    get color() {
        return this.getAttribute('color') || TatvaPulse.DEFAULT_CONFIG.color;
    }

    set color(val) {
        if (val) this.setAttribute('color', val);
        else this.removeAttribute('color');
    }

    get gap() {
        return this.getAttribute('gap') || TatvaPulse.DEFAULT_CONFIG.gap;
    }

    set gap(val) {
        if (val) this.setAttribute('gap', val);
        else this.removeAttribute('gap');
    }

    get position() {
        return this.getAttribute('position') || TatvaPulse.DEFAULT_CONFIG.position;
    }

    set position(val) {
        if (val) this.setAttribute('position', val);
        else this.removeAttribute('position');
    }

    get superscriptOffset() {
        return this.getAttribute('superscript-offset') || TatvaPulse.DEFAULT_CONFIG.superscriptOffset;
    }

    set superscriptOffset(val) {
        if (val) this.setAttribute('superscript-offset', val);
        else this.removeAttribute('superscript-offset');
    }

    get animationDuration() {
        return this.getAttribute('animation-duration') || TatvaPulse.DEFAULT_CONFIG.animationDuration;
    }

    set animationDuration(val) {
        if (val) this.setAttribute('animation-duration', val);
        else this.removeAttribute('animation-duration');
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.renderComponent();
            this._isInitialized = true;
        }
        this.updateCSSVariables();
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        // Keeps state ready for reconnection
    }

    /**
     * Updates CSS variables cleanly when observed attributes change without re-creating DOM
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot && this._isInitialized) {
            this.updateCSSVariables();
        }
    }

    /**
     * Updates dynamic CSS variables on the component container
     */
    updateCSSVariables() {
        const config = this.getComponentConfig();
        const container = this.shadowRoot.querySelector('.pulse-container');
        if (!container) return;

        container.style.setProperty('--pulse-size', config.size);
        container.style.setProperty('--pulse-color', config.color);
        container.style.setProperty('--pulse-gap', config.gap);
        container.style.setProperty('--pulse-duration', config.animationDuration);
        container.style.setProperty('--pulse-superscript-offset', config.superscriptOffset);
    }

    /**
     * Renders the complete component HTML and CSS
     */
    renderComponent() {
        const config = this.getComponentConfig();
        const template = document.createElement('template');

        template.innerHTML = `
            ${this.generateStyles(config)}
            ${this.generateMarkup()}
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.updateCSSVariables();
    }

    /**
     * Gets component configuration from attributes with fallback to defaults
     * @returns {Object} Configuration object with all settings
     */
    getComponentConfig() {
        const defaults = TatvaPulse.DEFAULT_CONFIG;

        return {
            size: this.getAttribute('size') || defaults.size,
            color: this.getAttribute('color') || defaults.color,
            animationDuration: this.getAttribute('animation-duration') || defaults.animationDuration,
            gap: this.getAttribute('gap') || defaults.gap,
            position: this.getAttribute('position') || defaults.position,
            superscriptOffset: this.getAttribute('superscript-offset') || defaults.superscriptOffset,
        };
    }

    /**
     * Generates raw CSS styles
     * @param {Object} config - Component configuration object
     * @returns {string} Raw CSS string
     */
    generateCSS(config) {
        return `
            :host {
                display: inline;
                position: relative;
                white-space: normal;
            }

            .pulse-container {
                display: inline-flex;
                flex-direction: row-reverse;
                align-items: center;
                position: relative;
                vertical-align: baseline;
                line-height: inherit;
                gap: var(--pulse-gap, ${config.gap});
                white-space: normal;
            }

            .content-wrapper {
                display: inline;
                position: relative;
                z-index: 1; /* Ensure content is above pulse */
                white-space: normal;
                vertical-align: baseline;
                line-height: inherit;
            }

            /* Pulse indicator wrapper - base positioning */
            .pulse-wrapper {
                display: inline-flex;
                position: relative;
                width: var(--pulse-size, ${config.size});
                height: var(--pulse-size, ${config.size});
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                vertical-align: middle;
            }

            /* Animated spreading circle that grows and fades */
            .pulse-spread {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                opacity: 0.75;
                border-radius: 50%;
                background-color: var(--pulse-color, ${config.color});
                animation: pulse-animation var(--pulse-duration, ${config.animationDuration}) cubic-bezier(0, 0, 0.2, 1) infinite;
            }

            .pulse-dot {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: var(--pulse-color, ${config.color});
                display: inline-flex;
            }

            :host([position="background"]) .pulse-wrapper {
                position: absolute !important;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            :host([position="right"]) .pulse-container {
                flex-direction: row;
            }

            :host([position="superscript"]) .pulse-container {
                align-items: flex-start;
            }

            :host([position="superscript"]) .pulse-wrapper {
                position: absolute !important;
                top: var(--pulse-superscript-offset, ${config.superscriptOffset});
                right: calc(-1 * var(--pulse-gap, ${config.gap}));
                transform: translateX(100%);
            }

            /* Pulse animation: scales up and fades out */
            @keyframes pulse-animation {
                75%, 100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            /* Accessibility support */
            @media (prefers-contrast: high) {
                .pulse-spread,
                .pulse-dot {
                    outline: 1px solid currentColor;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .pulse-spread {
                    animation: none;
                    opacity: 0.4;
                }
            }
        `;
    }

    /**
     * Backward-compatible method returning CSS wrapped in <style>
     * @param {Object} config - Component configuration object
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles(config) {
        return `<style>${this.generateCSS(config)}</style>`;
    }

    /**
     * Generates the HTML markup structure
     * @returns {string} Complete HTML structure
     */
    generateMarkup() {
        return `<div class="pulse-container" part="container"><div class="content-wrapper" part="content"><slot></slot></div><div class="pulse-wrapper" part="ping" aria-hidden="true"><div class="pulse-spread" part="spread"></div><div class="pulse-dot" part="dot"></div></div></div>`;
    }
}

// Expose class globally for external access in browser environments
if (typeof window !== 'undefined') {
    window.TatvaPulse = TatvaPulse;
    if (typeof window.customElements !== 'undefined' && !window.customElements.get('tatva-pulse')) {
        window.customElements.define('tatva-pulse', TatvaPulse);
    }
}

export default TatvaPulse;
