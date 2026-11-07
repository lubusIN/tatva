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
                display: inline;
                position: relative;
                white-space: normal;
            }
            .wrapper {
                position: relative;
                display: inline;
                white-space: normal;
                vertical-align: baseline;
                line-height: inherit;
            }
            .text {
                text-decoration: ${config.underline ? 'dotted underline' : 'none'};
                cursor: pointer;
                display: inline;
                vertical-align: baseline;
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
                display: ${config.iconEnabled ? 'inline-block' : 'none !important'};
                vertical-align: -0.15em;
                line-height: 1;
                margin-left: ${config.iconEnabled && config.iconPosition === 'right' ? '4px' : '0px'};
                margin-right: ${config.iconEnabled && config.iconPosition !== 'right' ? '4px' : '0px'};
            }
            .icon svg {
                width: 1.1em;
                height: 1.1em;
                fill: var(--tatva-infotip-icon-color, ${config.iconColor});
                vertical-align: -0.1em;
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
        const iconMarkup = `<span class="icon" part="icon"></span>`;
        const triggerContent = config.iconPosition === 'right'
            ? `<slot></slot>${iconMarkup}`
            : `${iconMarkup}<slot></slot>`;

        return `<span class="wrapper" part="wrapper"><span class="text" part="trigger" tabindex="0" role="button" aria-describedby="infotip-popover">${triggerContent}</span><div class="infotip" part="popover" id="infotip-popover" role="tooltip" aria-hidden="true"><div class="infotip-popover-content" part="content"><slot name="content">${config.content}</slot></div><div class="arrow" part="arrow"></div></div></span>`;
    }

    /**
     * Updates the icon based on current attributes
     */
    updateIcon() {
        const config = this.getComponentConfig();
        const icon = this.shadowRoot.querySelector('.icon');
        const text = this.shadowRoot.querySelector('.text');
        if (!icon) return;

        icon.style.display = config.iconEnabled ? 'inline-block' : 'none';
        icon.style.marginLeft = config.iconEnabled && config.iconPosition === 'right' ? '4px' : '0px';
        icon.style.marginRight = config.iconEnabled && config.iconPosition === 'left' ? '4px' : '0px';
        icon.innerHTML = config.iconEnabled
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" role="img">
                ${TatvaInfotip.ICONS[config.iconType] || TatvaInfotip.ICONS.info}
            </svg>`
            : '';

        if (text) {
            if (config.iconPosition === 'right') {
                if (text.lastElementChild !== icon) {
                    text.appendChild(icon);
                }
            } else {
                if (text.firstElementChild !== icon) {
                    text.insertBefore(icon, text.firstChild);
                }
            }
        }
    }

    /**
     * Updates the infotip overlay position
     */
    updatePosition() {
        const config = this.getComponentConfig();
        const anchor = this.shadowRoot.querySelector('.text');
        const tooltip = this.shadowRoot.querySelector('.infotip');
        if (!anchor || !tooltip) return;

        const isHidden = tooltip.style.display === 'none' || (typeof window !== 'undefined' && window.getComputedStyle && window.getComputedStyle(tooltip).display === 'none');
        if (isHidden) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.display = 'block';
        }

        const arrow = tooltip.querySelector('.arrow');

        const restoreHidden = () => {
            if (isHidden && !this.isOpen) {
                tooltip.style.display = 'none';
                tooltip.style.visibility = 'hidden';
            }
        };

        if (typeof window !== 'undefined' && window.FloatingUIDOM) {
            const promise = this.updatePositionWithFloatingUI(anchor, tooltip, arrow, config);
            if (promise && typeof promise.finally === 'function') {
                promise.finally(restoreHidden);
            } else {
                restoreHidden();
            }
        } else {
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
            restoreHidden();
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

            return window.FloatingUIDOM
                .computePosition(anchor, tooltip, {
                    placement: config.overlayPlacement,
                    strategy: 'fixed',
                    middleware,
                })
                .then(({ placement }) => {
                    const { x, y } = this.calculateTooltipPosition(
                        placement,
                        anchor,
                        tooltip,
                        arrow,
                        config.offset
                    );
                    this.applyTooltipStyles(tooltip, x, y);

                    const { mainProp, pinProp, center } =
                        this.calculateArrowPosition(
                            placement,
                            anchor,
                            tooltip,
                            arrow,
                            x,
                            y
                        );
                    this.applyArrowStyles(arrow, mainProp, pinProp, center);
                })
                .catch(() => {
                    this.updatePositionWithFallback(anchor, tooltip, arrow, config);
                });
        } catch (error) {
            this.updatePositionWithFallback(anchor, tooltip, arrow, config);
            return Promise.resolve();
        }
    }

    /**
     * Fallback positioning system that works reliably in all environments
     */
    updatePositionWithFallback(anchor, tooltip, arrow, config) {
        const placement = config.overlayPlacement;
        const { x, y } = this.calculateTooltipPosition(
            placement,
            anchor,
            tooltip,
            arrow,
            config.offset
        );
        this.applyTooltipStyles(tooltip, x, y);

        const { mainProp, pinProp, center } =
            this.calculateArrowPosition(
                placement,
                anchor,
                tooltip,
                arrow,
                x,
                y
            );
        this.applyArrowStyles(arrow, mainProp, pinProp, center);
    }

    calculateTooltipPosition(placement, anchor, tooltip, arrow, offset) {
        const [base, align] = placement.split('-');
        const ref = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : anchor;
        const tip = tooltip.getBoundingClientRect ? tooltip.getBoundingClientRect() : tooltip;

        let x = 0;
        let y = 0;

        if (['top', 'bottom'].includes(base)) {
            if (align === 'start') {
                x = ref.left;
            } else if (align === 'end') {
                x = ref.right - tip.width;
            } else {
                x = ref.left + (ref.width - tip.width) / 2;
            }

            if (base === 'top') {
                y = ref.top - tip.height - offset;
            } else {
                y = ref.bottom + offset;
            }
        } else {
            if (align === 'start') {
                y = ref.top;
            } else if (align === 'end') {
                y = ref.bottom - tip.height;
            } else {
                y = ref.top + (ref.height - tip.height) / 2;
            }

            if (base === 'left') {
                x = ref.left - tip.width - offset;
            } else {
                x = ref.right + offset;
            }
        }

        // Clamp within viewport
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
        x = Math.min(Math.max(5, x), Math.max(5, vw - tip.width - 5));
        y = Math.min(Math.max(5, y), Math.max(5, vh - tip.height - 5));

        return { x, y };
    }

    calculatePosition(anchor, tooltip, config) {
        const arrow = tooltip.querySelector('.arrow');
        const { x, y } = this.calculateTooltipPosition(
            config.overlayPlacement,
            anchor,
            tooltip,
            arrow,
            config.offset
        );
        const arrowData = this.calculateArrowPosition(
            config.overlayPlacement,
            anchor,
            tooltip,
            arrow,
            x,
            y
        );
        return { x, y, placement: config.overlayPlacement, arrowData };
    }

    calculateArrowPosition(placement, anchor, tooltip, arrow, tooltipX, tooltipY) {
        const ref = anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : anchor;
        const tip = tooltip.getBoundingClientRect ? tooltip.getBoundingClientRect() : tooltip;
        const arrowSize = (arrow?.offsetWidth || 8) / 2;
        const [side] = placement.split('-');
        const isHorizontal = ['top', 'bottom'].includes(side);

        const center =
            (isHorizontal
                ? ref.left + ref.width / 2 - tooltipX
                : ref.top + ref.height / 2 - tooltipY) - arrowSize;

        // Keep arrow within tooltip boundaries
        const maxOffset = isHorizontal ? (tip.width - 12) : (tip.height - 12);
        const clampedCenter = Math.max(4, Math.min(center, Math.max(4, maxOffset)));

        const mainProp = isHorizontal ? 'left' : 'top';
        const pinProp = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left',
        }[side] || 'bottom';

        return { mainProp, pinProp, center: clampedCenter };
    }

    /**
     * Finds the containing block for position: fixed elements
     * @param {HTMLElement} el - Element to find containing block for
     * @returns {HTMLElement|null} The containing block element or null if viewport
     */
    getContainingBlock(el) {
        if (typeof window === 'undefined' || !el) return null;
        let node = el.parentElement || (el.getRootNode && el.getRootNode().host);
        while (node && node !== document.body && node !== document.documentElement) {
            if (node.nodeType === 1) {
                const s = window.getComputedStyle(node);
                if (
                    (s.transform && s.transform !== 'none') ||
                    (s.perspective && s.perspective !== 'none') ||
                    (s.filter && s.filter !== 'none') ||
                    (s.backdropFilter && s.backdropFilter !== 'none') ||
                    (s.contain && ['paint', 'layout', 'strict', 'content'].some(c => s.contain.includes(c))) ||
                    (s.willChange && ['transform', 'perspective', 'filter'].some(w => s.willChange.includes(w)))
                ) {
                    return node;
                }
            }
            node = node.parentElement || (node.getRootNode && node.getRootNode().host);
        }
        return null;
    }

    applyTooltipStyles(tooltip, x, y) {
        let finalX = x;
        let finalY = y;
        const cb = this.getContainingBlock(tooltip);
        if (cb && typeof cb.getBoundingClientRect === 'function') {
            const cbRect = cb.getBoundingClientRect();
            finalX = x - (cbRect.left + (cb.clientLeft || 0)) + (cb.scrollLeft || 0);
            finalY = y - (cbRect.top + (cb.clientTop || 0)) + (cb.scrollTop || 0);
        }
        Object.assign(tooltip.style, {
            left: `${finalX}px`,
            top: `${finalY}px`,
        });
    }

    applyArrowStyles(arrow, mainProp, pinProp, center) {
        if (!arrow) return;

        // Support both (arrow, mainProp, pinProp, center) and legacy (arrow, placement, arrowData, isFloatingUI)
        if (typeof mainProp === 'string' && (mainProp === 'left' || mainProp === 'top')) {
            Object.assign(arrow.style, {
                top: '',
                right: '',
                bottom: '',
                left: '',
                [mainProp]: `${center}px`,
                [pinProp]: '-4px',
            });
            return;
        }

        const placement = mainProp || 'top';
        const arrowData = pinProp;
        const isFloatingUI = Boolean(center);
        if (!arrowData) return;

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
            window.addEventListener('scroll', this.handleReposition, { capture: true, passive: true });
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
            window.removeEventListener('scroll', this.handleReposition, { capture: true });
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
            window.removeEventListener('scroll', this.handleReposition, { capture: true });
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
            'icon-position': () => this.updateIcon(),
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
