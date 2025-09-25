/**
 * Tatva: Infotip web component
 */
class TatvaInfotip extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            content: 'Hello world',
            underline: false,
            iconEnabled: false,
            iconPosition: 'left',
            iconType: 'info',
            offset: '6',
            overlayPlacement: 'top',
            iconColor: "#000",
            overlayTextColor: "#fff",
            overlayBackgroundColor: "#000"
        };
    }

    static get observedAttributes() {
        return [
            'content',
            'underline',
            'icon-enabled',
            'icon-position',
            'icon-color',
            'icon-type',
            'offset',
            'overlay-placement',
            'overlay-text-color',
            'overlay-background-color',
        ];
    }

    static ICONS = {
        info: `<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0ZM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4v1.5h-1.5V8h1.5Zm0 8v-5h-1.5v5h1.5Z"/>`,
        help: `<path d="M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"/>`,
        caution: `<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0ZM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-.75 12v-1.5h1.5V16h-1.5Zm0-8v5h1.5V8h-1.5Z"/>`,
        error: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12.218 5.377a.25.25 0 0 0-.436 0l-7.29 12.96a.25.25 0 0 0 .218.373h14.58a.25.25 0 0 0 .218-.372l-7.29-12.96Zm-1.743-.735c.669-1.19 2.381-1.19 3.05 0l7.29 12.96a1.75 1.75 0 0 1-1.525 2.608H4.71a1.75 1.75 0 0 1-1.525-2.608l7.29-12.96ZM12.75 17.46h-1.5v-1.5h1.5v1.5Zm-1.5-3h1.5v-5h-1.5v5Z"/>`,
        notAllowed: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 18.5A6.5 6.5 0 0 1 6.93 7.931l9.139 9.138A6.473 6.473 0 0 1 12 18.5Zm5.123-2.498a6.5 6.5 0 0 0-9.124-9.124l9.124 9.124ZM4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"/>`,
        starEmpty: `<path fill-rule="evenodd" d="M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z" clip-rule="evenodd"/>`,
    };

    /**
     * Constructor initializes the component and loads Floating UI
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (!this._isInitialized) {
            this.initializeComponent();
        }
    }

    /**
     * Initialize the component once Floating UI is loaded
     */
    initializeComponent() {
        if (this._isInitialized) return;

        this.renderComponent();
        this._isInitialized = true;

        requestAnimationFrame(() => {
            this.updateIcon();
            this.updatePosition();
            this.initEvents();
            this.hideTooltip();
        });

        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            // gather all assigned nodes
            const nodes = slot.assignedNodes({ flatten: true });
            const hasText = nodes.some((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    return node.textContent.trim() !== '';
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    return node.textContent.trim() !== '';
                }
                return false;
            });
            if (!hasText) this.remove();
        });
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        this._isInitialized = false;
    }

    /**
     * Renders the complete component HTML and CSS
     */
    renderComponent() {
        const config = this.getComponentConfig();
        const template = document.createElement('template');

        template.innerHTML = `
            ${this.generateStyles(config)}
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
        const defaults = TatvaInfotip.DEFAULT_CONFIG;

        return {
            content: this.getAttribute('content') || defaults.content,
            underline: this.getAttribute('underline') === 'true' || defaults.underline,
            iconEnabled: this.getAttribute('icon-enabled') === 'true' || defaults.iconEnabled,
            iconPosition: this.getAttribute('icon-position') || defaults.iconPosition,
            iconType: this.getAttribute('icon-type') || defaults.iconType,
            offset: parseInt(this.getAttribute('offset') || defaults.offset, 10),
            overlayPlacement: this.getAttribute('overlay-placement') || defaults.overlayPlacement,
            iconColor: this.getAttribute('icon-color') || defaults.iconColor,
            overlayTextColor: this.getAttribute('overlay-text-color') || defaults.overlayTextColor,
            overlayBackgroundColor: this.getAttribute('overlay-background-color') || defaults.overlayBackgroundColor,
        };
    }

    /**
     * Generates the CSS styles for the component
     * @param {Object} config - Component configuration object
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles(config) {
        let css = `
            .wrapper {
                position: relative;
            }
            .text {
                text-decoration: ${config.underline ? 'dotted underline' : 'none'};
                cursor: pointer;
                display: inline-flex;
                vertical-align: bottom;
                gap: 2px;
                flex-direction: ${config.iconPosition === 'right' ? 'row-reverse' : 'row'};
                align-items: center
            }
            .infotip {
                display: none;
                width: 100%;
                max-width: 300px;
                position: fixed;
                top: 0px;
                left: 0px;
                background: ${config.overlayBackgroundColor};
                color: ${config.overlayTextColor};
                padding: 10px;
                border-radius: 4px;
                font-size: 70%;
                z-index: 1000;
                text-align: center;
            }
            .infotip .arrow {
                position: absolute;
                background: ${config.overlayBackgroundColor};
                width: 8px;
                height: 8px;
                transform: rotate(45deg);
            }
        `;

        if (config.iconEnabled) {
            css += `
                .icon {
                    display: inline-flex;
                    align-items: center;
                }
                .icon svg {
                    width: 24px;
                    height: 24px;
                    fill: ${config.iconColor};
                }
            `;
        }

        return `<style>${css}</style>`;
    }

    /**
     * Generates the HTML markup structure
     * @param {Object} config - Component configuration object
     * @returns {string} Complete HTML structure
     */
    generateMarkup(config) {
        return `
            <span class="wrapper">
                <span class="text" tabindex="0" role="button" aria-describedby="infotip-popover">
                    <span class="icon"></span>
                    <slot></slot>
                </span>
                <div class="infotip" id="infotip-popover">
                    <div class="infotip-popover-content">
                        ${config.content}
                    </div>
                    <div class="arrow"></div>
                </div>
            </span>
        `;
    }

    // Updates the icon based on current attributes
    updateIcon() {
        const config = this.getComponentConfig();
        const icon = this.shadowRoot.querySelector('.icon');

        if (!icon) return;

        icon.innerHTML = config.iconEnabled
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img">
                ${TatvaInfotip.ICONS[config.iconType] || TatvaInfotip.ICONS.info}
            </svg>`
            : '';
    }

    // Updates the infotip overlay position using Floating UI
    updatePosition() {
        const config = this.getComponentConfig();
        if (!config.content) {
            this.hideTooltip();
            return;
        }

        const anchor = this.shadowRoot.querySelector('.text');
        const tooltip = this.shadowRoot.querySelector('.infotip');
        const arrow = tooltip.querySelector('.arrow');

        // Try FloatingUI first if available, otherwise use fallback
        if (window.FloatingUIDOM) {
            this.updatePositionWithFloatingUI(anchor, tooltip, arrow, config);
        } else {
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
        }
    }

    /**
     * Enhanced positioning using FloatingUI with better error handling
     */
    updatePositionWithFloatingUI(anchor, tooltip, arrow, config) {
        try {
            const middleware = [
                window.FloatingUIDOM.offset(config.offset),
                window.FloatingUIDOM.flip({
                    crossAxis: false,
                    fallbackPlacements: [
                        'top-start', 'top', 'top-end',
                        'right-start', 'right', 'right-end',
                        'bottom-start', 'bottom', 'bottom-end',
                        'left-start', 'left', 'left-end',
                    ],
                }),
                window.FloatingUIDOM.shift({ padding: 5 }),
                window.FloatingUIDOM.arrow({ element: arrow, padding: 5 }),
            ];

            window.FloatingUIDOM
                .computePosition(anchor, tooltip, {
                    placement: config.overlayPlacement,
                    strategy: 'fixed',
                    middleware,
                })
                .then(({ x, y, placement, middlewareData }) => {
                    this.applyTooltipStyles(tooltip, x, y);
                    this.applyArrowStyles(arrow, placement, middlewareData.arrow, true);
                })
                .catch(() => {
                    // If FloatingUI fails, fall back to custom positioning
                    this.updatePositionWithFallback(anchor, tooltip, arrow, config);
                });
        } catch (error) {
            // If FloatingUI fails, fall back to custom positioning
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
        }
    }

    /**
     * Fallback positioning system that works reliably in all environments
     */
    updatePositionWithFallback(anchor, tooltip, arrow, config) {
        const position = this.calculatePosition(anchor, tooltip, config);
        this.applyTooltipStyles(tooltip, position.x, position.y);
        this.applyArrowStyles(arrow, position.placement, position.arrowData, false);
    }

    calculatePosition(anchor, tooltip, config) {
        const anchorRect = anchor.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const placement = config.overlayPlacement;
        const offset = config.offset;

        let x, y;
        const [side, align] = placement.split('-');

        // Calculate base position
        switch (side) {
            case 'top':
                x = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
                y = anchorRect.top - tooltipRect.height - offset;
                break;
            case 'bottom':
                x = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
                y = anchorRect.bottom + offset;
                break;
            case 'left':
                x = anchorRect.left - tooltipRect.width - offset;
                y = anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
                break;
            case 'right':
                x = anchorRect.right + offset;
                y = anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
                break;
            default:
                x = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
                y = anchorRect.top - tooltipRect.height - offset;
        }

        // Adjust for alignment
        if (align === 'start') {
            if (['top', 'bottom'].includes(side)) {
                x = anchorRect.left;
            } else {
                y = anchorRect.top;
            }
        } else if (align === 'end') {
            if (['top', 'bottom'].includes(side)) {
                x = anchorRect.right - tooltipRect.width;
            } else {
                y = anchorRect.bottom - tooltipRect.height;
            }
        }

        // Keep within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        x = Math.max(5, Math.min(x, viewportWidth - tooltipRect.width - 5));
        y = Math.max(5, Math.min(y, viewportHeight - tooltipRect.height - 5));

        // Calculate arrow position
        const arrowData = this.calculateArrowPosition(anchorRect, x, y, side);

        return { x, y, placement, arrowData };
    }

    calculateArrowPosition(anchorRect, tooltipX, tooltipY, side) {
        const anchorCenterX = anchorRect.left + anchorRect.width / 2;
        const anchorCenterY = anchorRect.top + anchorRect.height / 2;

        let x = 0, y = 0;

        switch (side) {
            case 'top':
            case 'bottom':
                x = anchorCenterX - tooltipX - 4; // 4 is half arrow width
                break;
            case 'left':
            case 'right':
                y = anchorCenterY - tooltipY - 4; // 4 is half arrow height
                break;
        }

        return { x, y };
    }

    applyTooltipStyles(tooltip, x, y) {
        Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
        });
    }

    applyArrowStyles(arrow, placement, arrowData, isFloatingUI) {
        if (!arrow || !arrowData) return;

        const [side] = placement.split('-');

        // Reset all position properties
        Object.assign(arrow.style, {
            top: '',
            right: '',
            bottom: '',
            left: '',
        });

        if (isFloatingUI) {
            // FloatingUI provides x,y coordinates
            const positions = {
                top: { bottom: '-4px', left: `${arrowData.x || 0}px` },
                bottom: { top: '-4px', left: `${arrowData.x || 0}px` },
                left: { right: '-4px', top: `${arrowData.y || 0}px` },
                right: { left: '-4px', top: `${arrowData.y || 0}px` }
            };
            Object.assign(arrow.style, positions[side]);
        } else {
            // Fallback positioning
            const positions = {
                top: { bottom: '-4px', left: `${arrowData.x}px` },
                bottom: { top: '-4px', left: `${arrowData.x}px` },
                left: { right: '-4px', top: `${arrowData.y}px` },
                right: { left: '-4px', top: `${arrowData.y}px` }
            };
            Object.assign(arrow.style, positions[side]);
        }
    }

    showTooltip() {
        this.shadowRoot.querySelector('.infotip').style.display = 'block';
        this.updatePosition();
    }

    hideTooltip() {
        this.shadowRoot.querySelector('.infotip').style.display = 'none';
    }

    // Sets up mouse and keyboard event listeners for showing/hiding the tooltip
    initEvents() {
        const events = [
            ['mouseenter', this.showTooltip],
            ['mouseleave', this.hideTooltip],
            ['focus', this.showTooltip],
            ['blur', this.hideTooltip],
        ];
        events.forEach(([event, handler]) => {
            this.addEventListener(event, handler.bind(this));
        });
    }

    // Handles attribute changes and updates the component accordingly
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.shadowRoot || oldValue === newValue || !this._isInitialized) return;

        this.showTooltip();

        const updateActions = {
            content: () => {
                this.shadowRoot.querySelector(
                    '.infotip-popover-content'
                ).innerHTML = newValue;
                this.updatePosition();
            },
            'icon-enabled': () => this.updateIcon(),
            'icon-type': () => this.updateIcon(),
            'overlay-placement': () => this.updatePosition(),
            offset: () => this.updatePosition(),
        };

        if (updateActions[name]) {
            updateActions[name]();
        }

        // Always update styles
        const config = this.getComponentConfig();
        this.shadowRoot.querySelector('style').textContent = this.generateStyles(config).replace('<style>', '').replace('</style>', '');
    }
}

// Expose class globally for external access
window.TatvaInfotip = TatvaInfotip;

// Register the custom element
if (!window.customElements.get('tatva-infotip')) {
    window.customElements.define('tatva-infotip', TatvaInfotip);
}