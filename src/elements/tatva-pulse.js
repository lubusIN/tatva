/**
 * TatvaPulse - A lightweight, reusable web component for rendering an animated pulse effect. Supports optional text and full customization of size, color, and animation speed.
 */
class TatvaPulse extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            size: '0.75rem',
            color: '#000000',
            animationDuration: '1s',
            gap: '10px',
            position: 'right',
            superscriptOffset: '-0.5em',
        };
    }

    // Define observed attributes for reactivity
    static get observedAttributes() {
        return ['size', 'color', 'position', 'gap', 'superscript-offset'];
    }

    /**
    * Constructor initializes the component
    */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.render();
            this._isInitialized = true;
        }
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        this._isInitialized = false;
    }

    /**
     * Re-renders component when observed attributes change
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot && this._isInitialized) {
            this.render();
        }
    }

    /**
     * Main render method - creates and applies the complete component template
     */
    render() {
        const template = this.createTemplate();
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Creates the complete HTML template with styles and structure
     * @returns {HTMLTemplateElement} The populated template element
     */
    createTemplate() {
        const config = this.getComponentConfig();
        const template = document.createElement('template');

        template.innerHTML = `
            ${this.generateStyles(config)}
            ${this.generateMarkup()}
        `;

        return template;
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
            animationDuration: defaults.animationDuration,
            gap: this.getAttribute('gap') || defaults.gap,
            position: this.getAttribute('position') || defaults.position,
            superscriptOffset: this.getAttribute('superscript-offset') || defaults.superscriptOffset,
        };
    }

    /**
     * Generates the CSS styles for the component based on position
     * @param {Object} config - Component configuration object
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles(config) {
        return `
            <style>
                :host {
                    display: inline-flex;
                    position: relative;
                }

                .content-wrapper {
                    display: inline-flex;
                    align-items: center;
                    z-index: 1; /* Ensure content is above pulse */
                }

                .pulse-container{
                    display: inline-flex;
                    flex-direction: row-reverse;
                    align-items: center;
                    position: relative;
                    gap: ${config.gap};
                }

                /* Pulse indicator wrapper - base positioning */
                .pulse-wrapper {
                    display: flex;
                    position: relative;
                    width: ${config.size};
                    height: ${config.size};
                    flex-shrink: 0;
                }

                /* Animated spreading circle that grows and fades */
                .pulse-spread {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0.75;
                    border-radius: 50%;
                    background-color: ${config.color};
                    animation: pulse-animation ${config.animationDuration} cubic-bezier(0, 0, 0.2, 1) infinite;
                }

                .pulse-dot {
                    position: relative;
                    width: ${config.size};
                    height: ${config.size};
                    border-radius: 50%;
                    background-color: ${config.color};
                    display: inline-flex;
                }
                
                :host([position="background"]) .pulse-wrapper {
                    position: absolute !important;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                :host([position="left"]) .pulse-container {
                    flex-direction: row;
                }
                
                :host([position="superscript"]) .pulse-container {
                    align-items: flex-start;
                }

                :host([position="superscript"]) .pulse-wrapper {
                    position: absolute !important;
                    top: ${config.superscriptOffset};
                    right: -${config.gap};
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
                        outline: 1px solid;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .pulse-spread {
                        animation: none;
                        opacity: 0.5;
                    }
                }
            </style>
        `;
    }

    /**
     * Generates the HTML markup structure based on position
     * @returns {string} Complete HTML structure
     */
    generateMarkup() {
        return `
            <div class="pulse-container">
                <div class="content-wrapper" part="content">
                    <slot></slot>
                </div>
                <div class="pulse-wrapper" part="wrapper">
                    <div class="pulse-spread" part="spread"></div>
                    <div class="pulse-dot" part="dot"></div>
                </div>
            </div>
        `;
    }
}

// Export class for potential module usage
window.TatvaPulse = TatvaPulse;

// Register the custom element if not already registered
if (!window.customElements.get('tatva-pulse')) {
    window.customElements.define('tatva-pulse', TatvaPulse);
}