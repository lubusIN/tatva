/**
 * Tatva: Infotip web component
 */
export class TatvaInfotip extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            content: 'Hello world',
            underline: false,
            iconEnabled: false,
            iconPosition: 'left',
            iconType: 'info',
            offset: 6,
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

    static convertAttributeToBoolean(value) {
        return value === '' || value === 'true' || value === true;
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
     * Constructor initializes the component
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.isOpen = false;
        this.attachShadow({ mode: 'open' });

        // Pre-bind event handlers
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleReposition = this.handleReposition.bind(this);
    }

    // Property getters and setters
    get content() {
        return this.getAttribute('content') || TatvaInfotip.DEFAULT_CONFIG.content;
    }

    set content(val) {
        if (val) this.setAttribute('content', val);
        else this.removeAttribute('content');
    }

    get underline() {
        return TatvaInfotip.convertAttributeToBoolean(this.getAttribute('underline'));
    }

    set underline(val) {
        if (val) this.setAttribute('underline', '');
        else this.removeAttribute('underline');
    }

    get iconEnabled() {
        return TatvaInfotip.convertAttributeToBoolean(this.getAttribute('icon-enabled'));
    }

    set iconEnabled(val) {
        if (val) this.setAttribute('icon-enabled', '');
        else this.removeAttribute('icon-enabled');
    }

    get iconPosition() {
        return this.getAttribute('icon-position') || TatvaInfotip.DEFAULT_CONFIG.iconPosition;
    }

    set iconPosition(val) {
        if (val) this.setAttribute('icon-position', val);
        else this.removeAttribute('icon-position');
    }

    get iconType() {
        return this.getAttribute('icon-type') || TatvaInfotip.DEFAULT_CONFIG.iconType;
    }

    set iconType(val) {
        if (val) this.setAttribute('icon-type', val);
        else this.removeAttribute('icon-type');
    }

    get iconColor() {
        return this.getAttribute('icon-color') || TatvaInfotip.DEFAULT_CONFIG.iconColor;
    }

    set iconColor(val) {
        if (val) this.setAttribute('icon-color', val);
        else this.removeAttribute('icon-color');
    }

    get offset() {
        const val = parseInt(this.getAttribute('offset'), 10);
        return Number.isFinite(val) ? val : TatvaInfotip.DEFAULT_CONFIG.offset;
    }

    set offset(val) {
        if (val != null) this.setAttribute('offset', String(val));
        else this.removeAttribute('offset');
    }

    get overlayPlacement() {
        return this.getAttribute('overlay-placement') || TatvaInfotip.DEFAULT_CONFIG.overlayPlacement;
    }

    set overlayPlacement(val) {
        if (val) this.setAttribute('overlay-placement', val);
        else this.removeAttribute('overlay-placement');
    }

    get overlayTextColor() {
        return this.getAttribute('overlay-text-color') || TatvaInfotip.DEFAULT_CONFIG.overlayTextColor;
    }

    set overlayTextColor(val) {
        if (val) this.setAttribute('overlay-text-color', val);
        else this.removeAttribute('overlay-text-color');
    }

    get overlayBackgroundColor() {
        return this.getAttribute('overlay-background-color') || TatvaInfotip.DEFAULT_CONFIG.overlayBackgroundColor;
    }

    set overlayBackgroundColor(val) {
        if (val) this.setAttribute('overlay-background-color', val);
        else this.removeAttribute('overlay-background-color');
    }

    connectedCallback() {
        if (!this._isInitialized) {
            this.initializeComponent();
        } else {
            this.initEvents();
        }
    }

    /**
     * Initialize the component
     */
    initializeComponent() {
        if (this._isInitialized) return;

        this.renderComponent();
        this._isInitialized = true;
        this.updateIcon();
        this.initEvents();
        this.hideTooltip();
    }

    /**
     * Cleanup when element is removed from DOM to prevent memory leaks
     */
    disconnectedCallback() {
        this.removeEvents();
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
        const offsetVal = parseInt(this.getAttribute('offset'), 10);

        return {
            content: this.getAttribute('content') || defaults.content,
            underline: TatvaInfotip.convertAttributeToBoolean(this.getAttribute('underline')),
            iconEnabled: TatvaInfotip.convertAttributeToBoolean(this.getAttribute('icon-enabled')),
            iconPosition: this.getAttribute('icon-position') || defaults.iconPosition,
            iconType: this.getAttribute('icon-type') || defaults.iconType,
            offset: Number.isFinite(offsetVal) ? offsetVal : defaults.offset,
            overlayPlacement: this.getAttribute('overlay-placement') || defaults.overlayPlacement,
            iconColor: this.getAttribute('icon-color') || defaults.iconColor,
            overlayTextColor: this.getAttribute('overlay-text-color') || defaults.overlayTextColor,
            overlayBackgroundColor: this.getAttribute('overlay-background-color') || defaults.overlayBackgroundColor,
        };
    }

    /**
     * Generates raw CSS styles
     * @param {Object} config - Component configuration object
     * @returns {string} Raw CSS string
     */
    generateCSS(config) {
        let css = `
            :host {
                display: inline-flex;
                position: relative;
                vertical-align: middle;
                white-space: normal;
            }
            .wrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                white-space: normal;
            }
            .text {
                text-decoration: ${config.underline ? 'dotted underline' : 'none'};
                cursor: pointer;
                display: inline-flex;
                vertical-align: bottom;
                gap: 4px;
                flex-direction: ${config.iconPosition === 'right' ? 'row-reverse' : 'row'};
                align-items: center;
                outline: none;
                white-space: normal;
            }
            .text:focus-visible {
                outline: 2px solid var(--tatva-focus-color, #3b82f6);
                outline-offset: 2px;
                border-radius: 2px;
            }
            .infotip {
                display: none;
                width: max-content;
                max-width: var(--tatva-infotip-max-width, 300px);
                position: fixed;
                top: 0px;
                left: 0px;
                background: var(--tatva-infotip-bg, ${config.overlayBackgroundColor});
                color: var(--tatva-infotip-color, ${config.overlayTextColor});
                padding: var(--tatva-infotip-padding, 8px 12px);
                border-radius: var(--tatva-infotip-radius, 4px);
                font-size: var(--tatva-infotip-font-size, 0.85rem);
                line-height: 1.4;
                z-index: 1000;
                text-align: center;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                pointer-events: auto;
            }
            .infotip .arrow {
                position: absolute;
                background: var(--tatva-infotip-bg, ${config.overlayBackgroundColor});
                width: 8px;
                height: 8px;
                transform: rotate(45deg);
            }
            .icon {
                display: ${config.iconEnabled ? 'inline-flex' : 'none'};
                align-items: center;
                flex-shrink: 0;
            }
            .icon svg {
                width: 18px;
                height: 18px;
                fill: var(--tatva-infotip-icon-color, ${config.iconColor});
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
        return `<span class="wrapper" part="wrapper"><span class="text" part="trigger" tabindex="0" role="button" aria-describedby="infotip-popover"><span class="icon" part="icon"></span><slot></slot></span><div class="infotip" part="popover" id="infotip-popover" role="tooltip" aria-hidden="true"><div class="infotip-popover-content" part="content"><slot name="content">${config.content}</slot></div><div class="arrow" part="arrow"></div></div></span>`;
    }

    /**
     * Updates the icon based on current attributes
     */
    updateIcon() {
        const config = this.getComponentConfig();
        const icon = this.shadowRoot.querySelector('.icon');
        if (!icon) return;

        icon.style.display = config.iconEnabled ? 'inline-flex' : 'none';
        icon.innerHTML = config.iconEnabled
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img">
                ${TatvaInfotip.ICONS[config.iconType] || TatvaInfotip.ICONS.info}
            </svg>`
            : '';
    }

    /**
     * Updates the infotip overlay position
     */
    updatePosition() {
        const config = this.getComponentConfig();
        const anchor = this.shadowRoot.querySelector('.text');
        const tooltip = this.shadowRoot.querySelector('.infotip');
        if (!anchor || !tooltip) return;

        const arrow = tooltip.querySelector('.arrow');

        if (typeof window !== 'undefined' && window.FloatingUIDOM) {
            this.updatePositionWithFloatingUI(anchor, tooltip, arrow, config);
        } else {
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
        }
    }

    /**
     * Enhanced positioning using FloatingUI
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
                    this.updatePositionWithFallback(anchor, tooltip, arrow, config);
                });
        } catch (error) {
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
        }
    }

    /**
     * Fallback positioning system that works reliably in all environments
     */
    updatePositionWithFallback(anchor, tooltip, arrow, config) {
        // Temporarily ensure tooltip has measurable dimensions
        const prevDisplay = tooltip.style.display;
        const prevVisibility = tooltip.style.visibility;
        tooltip.style.display = 'block';
        tooltip.style.visibility = 'hidden';

        const position = this.calculatePosition(anchor, tooltip, config);

        tooltip.style.display = prevDisplay;
        tooltip.style.visibility = prevVisibility;

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

        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
        x = Math.max(5, Math.min(x, viewportWidth - tooltipRect.width - 5));
        y = Math.max(5, Math.min(y, viewportHeight - tooltipRect.height - 5));

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
                x = anchorCenterX - tooltipX - 4;
                break;
            case 'left':
            case 'right':
                y = anchorCenterY - tooltipY - 4;
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

        Object.assign(arrow.style, {
            top: '',
            right: '',
            bottom: '',
            left: '',
        });

        const arrowOffset = isFloatingUI ? (arrowData.x || 0) : arrowData.x;
        const arrowOffsetY = isFloatingUI ? (arrowData.y || 0) : arrowData.y;

        const positions = {
            top: { bottom: '-4px', left: `${arrowOffset}px` },
            bottom: { top: '-4px', left: `${arrowOffset}px` },
            left: { right: '-4px', top: `${arrowOffsetY}px` },
            right: { left: '-4px', top: `${arrowOffsetY}px` }
        };

        if (positions[side]) {
            Object.assign(arrow.style, positions[side]);
        }
    }

    showTooltip() {
        const tooltip = this.shadowRoot.querySelector('.infotip');
        if (!tooltip) return;

        this.isOpen = true;
        tooltip.style.display = 'block';
        tooltip.style.visibility = 'visible';
        tooltip.setAttribute('aria-hidden', 'false');
        this.updatePosition();

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleReposition, { passive: true });
            window.addEventListener('resize', this.handleReposition, { passive: true });
        }
    }

    hideTooltip() {
        const tooltip = this.shadowRoot.querySelector('.infotip');
        if (!tooltip) return;

        this.isOpen = false;
        tooltip.style.display = 'none';
        tooltip.style.visibility = 'hidden';
        tooltip.setAttribute('aria-hidden', 'true');

        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleReposition);
            window.removeEventListener('resize', this.handleReposition);
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.hideTooltip();
            e.stopPropagation();
        }
    }

    handleReposition() {
        if (this.isOpen) {
            this.updatePosition();
        }
    }

    /**
     * Sets up mouse and keyboard event listeners
     */
    initEvents() {
        this.removeEvents();

        this.addEventListener('mouseenter', this.showTooltip);
        this.addEventListener('mouseleave', this.hideTooltip);

        // focusin/focusout bubble across Shadow DOM
        this.addEventListener('focusin', this.showTooltip);
        this.addEventListener('focusout', this.hideTooltip);
        this.addEventListener('keydown', this.handleKeyDown);

        const tooltip = this.shadowRoot.querySelector('.infotip');
        if (tooltip) {
            tooltip.addEventListener('mouseenter', this.showTooltip);
            tooltip.addEventListener('mouseleave', this.hideTooltip);
        }
    }

    /**
     * Removes all event listeners to prevent memory leaks
     */
    removeEvents() {
        this.removeEventListener('mouseenter', this.showTooltip);
        this.removeEventListener('mouseleave', this.hideTooltip);
        this.removeEventListener('focusin', this.showTooltip);
        this.removeEventListener('focusout', this.hideTooltip);
        this.removeEventListener('keydown', this.handleKeyDown);

        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this.handleReposition);
            window.removeEventListener('resize', this.handleReposition);
        }

        const tooltip = this.shadowRoot ? this.shadowRoot.querySelector('.infotip') : null;
        if (tooltip) {
            tooltip.removeEventListener('mouseenter', this.showTooltip);
            tooltip.removeEventListener('mouseleave', this.hideTooltip);
        }
    }

    /**
     * Handles attribute changes cleanly without forcing tooltip to show
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.shadowRoot || oldValue === newValue || !this._isInitialized) return;

        const updateActions = {
            content: () => {
                const contentEl = this.shadowRoot.querySelector('.infotip-popover-content slot');
                if (contentEl) {
                    contentEl.textContent = newValue;
                }
            },
            'icon-enabled': () => this.updateIcon(),
            'icon-type': () => this.updateIcon(),
            'icon-color': () => this.updateIcon(),
            underline: () => {
                const config = this.getComponentConfig();
                const styleEl = this.shadowRoot.querySelector('style');
                if (styleEl) styleEl.textContent = this.generateCSS(config);
            },
            'overlay-placement': () => {
                if (this.isOpen) this.updatePosition();
            },
            offset: () => {
                if (this.isOpen) this.updatePosition();
            },
        };

        if (updateActions[name]) {
            updateActions[name]();
        }

        // Update styles if appearance changed
        if (['overlay-background-color', 'overlay-text-color', 'icon-position'].includes(name)) {
            const config = this.getComponentConfig();
            const styleEl = this.shadowRoot.querySelector('style');
            if (styleEl) styleEl.textContent = this.generateCSS(config);
        }

        if (this.isOpen) {
            this.updatePosition();
        }
    }
}

// Expose class globally for external access in browser environments
if (typeof window !== 'undefined') {
    window.TatvaInfotip = TatvaInfotip;
    if (typeof window.customElements !== 'undefined' && !window.customElements.get('tatva-infotip')) {
        window.customElements.define('tatva-infotip', TatvaInfotip);
    }
}

export default TatvaInfotip;
