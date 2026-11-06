/**
 * TatvaMarker - A custom web component for rendering animated SVG marker highlights (such as underline, curly, strikethrough, etc.) around slotted text content.
 */
export class TatvaMarker extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            type: 'circle',
            animation: true,
            animationDuration: '5s',
            animationFunction: 'ease-in',
            color: '#ff0000',
        };
    }

    static get observedAttributes() {
        return [
            'type',
            'animation',
            'animation-duration',
            'animation-function',
            'color',
        ];
    }

    static PATHS = {
        curly: `<path part="path" d="M3,146.1c17.1-8.8,33.5-17.8,51.4-17.8c15.6,0,17.1,18.1,30.2,18.1c22.9,0,36-18.6,53.9-18.6 c17.1,0,21.3,18.5,37.5,18.5c21.3,0,31.8-18.6,49-18.6c22.1,0,18.8,18.8,36.8,18.8c18.8,0,37.5-18.6,49-18.6c20.4,0,17.1,19,36.8,19 c22.9,0,36.8-20.6,54.7-18.6c17.7,1.4,7.1,19.5,33.5,18.8c17.1,0,47.2-6.5,61.1-15.6"></path>`,
        underline: `<path part="path" d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path>`,
        double: `<path part="path" d="M8.4,143.1c14.2-8,97.6-8.8,200.6-9.2c122.3-0.4,287.5,7.2,287.5,7.2"></path><path part="path" d="M8,19.4c72.3-5.3,162-7.8,216-7.8c54,0,136.2,0,267,7.8"></path>`,
        'double-underline': `<path part="path" d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6"></path><path part="path" d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"></path>`,
        'underline-zigzag': `<path part="path" d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path>`,
        strikethrough: `<path part="path" d="M3,75h493.5"></path>`,
        cross: `<path part="path" d="M497.4,23.9C301.6,40,155.9,80.6,4,144.4"></path><path part="path" d="M14.1,27.6c204.5,20.3,393.8,74,467.3,111.7"></path>`,
        strike: `<path part="path" d="M13.5,15.5c131,13.7,289.3,55.5,475,125.5"></path>`,
        circle: `<path part="path" d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5, 273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"></path>`,
    };

    static BOTTOM_TYPES = new Set([
        'underline-zigzag',
        'double-underline',
        'underline',
        'curly',
    ]);

    /**
     * Converts attribute values to boolean
     */
    static convertAttributeToBoolean(value) {
        if (value === null || value === undefined) {
            return null; // Return null so the ?? operator can use the default
        }
        return value === '' || value === 'true' || value === true;
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
    get type() {
        return this.getAttribute('type') || TatvaMarker.DEFAULT_CONFIG.type;
    }

    set type(value) {
        if (value) this.setAttribute('type', value);
        else this.removeAttribute('type');
    }

    get color() {
        return this.getAttribute('color') || TatvaMarker.DEFAULT_CONFIG.color;
    }

    set color(value) {
        if (value) this.setAttribute('color', value);
        else this.removeAttribute('color');
    }

    get animation() {
        return TatvaMarker.convertAttributeToBoolean(this.getAttribute('animation')) ?? TatvaMarker.DEFAULT_CONFIG.animation;
    }

    set animation(value) {
        if (value) this.setAttribute('animation', '');
        else this.setAttribute('animation', 'false');
    }

    get animationDuration() {
        return this.getAttribute('animation-duration') || TatvaMarker.DEFAULT_CONFIG.animationDuration;
    }

    set animationDuration(value) {
        if (value) this.setAttribute('animation-duration', value);
        else this.removeAttribute('animation-duration');
    }

    get animationFunction() {
        return this.getAttribute('animation-function') || TatvaMarker.DEFAULT_CONFIG.animationFunction;
    }

    set animationFunction(value) {
        if (value) this.setAttribute('animation-function', value);
        else this.removeAttribute('animation-function');
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.renderComponent();
            this._isInitialized = true;
        }
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        // Keeps state ready for reconnection
    }

    /**
     * Re-renders styles and SVG cleanly when observed attributes change
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot && this._isInitialized) {
            const config = this.getComponentConfig();

            if (attributeName === 'type') {
                const svg = this.shadowRoot.querySelector('svg');
                if (svg) {
                    svg.innerHTML = TatvaMarker.PATHS[config.type] || TatvaMarker.PATHS.circle;
                }
            }

            // Update styles cleanly without nesting <style> tags
            const styleEl = this.shadowRoot.querySelector('style');
            if (styleEl) {
                styleEl.textContent = this.generateCSS(config);
            }
        }
    }

    /**
     * Renders the complete component HTML and CSS
     */
    renderComponent() {
        const config = this.getComponentConfig();
        const template = document.createElement('template');

        template.innerHTML = `
            <style>${this.generateCSS(config)}</style>
            ${this.generateMarkup(config)}
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * Gets component configuration from attributes with fallback to defaults
     * @returns {Object} Configuration object with all settings
     */
    getComponentConfig() {
        const defaults = TatvaMarker.DEFAULT_CONFIG;

        return {
            type: this.getAttribute('type') || defaults.type,
            color: this.getAttribute('color') || defaults.color,
            animation: TatvaMarker.convertAttributeToBoolean(this.getAttribute('animation')) ?? defaults.animation,
            animationDuration: this.getAttribute('animation-duration') || defaults.animationDuration,
            animationFunction: this.getAttribute('animation-function') || defaults.animationFunction,
        };
    }

    /**
     * Generates raw CSS styles without <style> tags
     * @param {Object} config - Component configuration object
     * @returns {string} Raw CSS string
     */
    generateCSS(config) {
        let css = `
            :host {
                display: inline;
                position: relative;
                white-space: normal;
            }

            .wrapper {
                position: relative;
                display: inline-block;
                overflow: visible;
                white-space: normal;
                padding-block: var(--tatva-marker-padding-block, 0);
                padding-inline: var(--tatva-marker-padding-inline, 0.15em);
                vertical-align: baseline;
                line-height: inherit;
            }

            .text {
                position: relative;
                z-index: 1;
                white-space: normal;
            }

            .marker {
                fill: none;
                position: absolute;
                overflow: visible;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                stroke-width: var(--tatva-marker-stroke-width, 9);
                stroke-linecap: round;
                stroke-linejoin: round;
                pointer-events: none;
                transform: translate(-50%, -50%);
            }

            .marker path {
                stroke: var(--tatva-marker-color, ${config.color});
                stroke-dasharray: 1500;
            }
        `;

        if (TatvaMarker.BOTTOM_TYPES.has(config.type)) {
            css += `
                .marker {
                    top: 0;
                    transform: translateX(-50%);
                }
            `;
        }

        if (config.animation) {
            css += `
                .marker path {
                    stroke-dashoffset: 1500;
                    animation: tatva-marker-dash ${config.animationDuration} ${config.animationFunction} infinite;
                }
                .marker path:nth-of-type(2) {
                    animation-delay: 0.3s;
                }
                @keyframes tatva-marker-dash {
                    0% { stroke-dashoffset: 1500; }
                    15% { stroke-dashoffset: 0; }
                    85% { opacity: 1; }
                    90% { stroke-dashoffset: 0; opacity: 0; }
                    100% { stroke-dashoffset: 1500; opacity: 0; }
                }
            `;
        }

        css += `
            @media (prefers-reduced-motion: reduce) {
                .marker path {
                    animation: none !important;
                    stroke-dashoffset: 0 !important;
                    opacity: 1 !important;
                }
            }
        `;

        return css;
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
     * @param {Object} config - Component configuration object
     * @returns {string} Complete HTML structure
     */
    generateMarkup(config) {
        return `<span class="wrapper" part="wrapper"><span class="text" part="text"><slot></slot></span><svg class="marker" part="marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">${TatvaMarker.PATHS[config.type] || TatvaMarker.PATHS.circle}</svg></span>`;
    }
}

// Expose class globally for external access in browser environments
if (typeof window !== 'undefined') {
    window.TatvaMarker = TatvaMarker;
    if (typeof window.customElements !== 'undefined' && !window.customElements.get('tatva-marker')) {
        window.customElements.define('tatva-marker', TatvaMarker);
    }
}

export default TatvaMarker;
