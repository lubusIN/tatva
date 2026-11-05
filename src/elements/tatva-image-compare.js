/**
 * TatvaImageCompare - A custom web component for comparing two images with an interactive slider
 */
export class TatvaImageCompare extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            handle: 'line',
            hover: false,
            hideArrows: false,
        };
    }

    static get observedAttributes() {
        return ['handle', 'hover', 'hide-arrows'];
    }

    /**
     * Converts attribute values to boolean
     */
    static convertAttributeToBoolean(value) {
        return value === '' || value === 'true' || value === true;
    }

    /**
     * Constructor initializes the component
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });

        // Component state
        this._position = 50; // Current slider position in percentage (0 to 100)
        this.isDragging = false;
        this.resizeObserver = null;
        this._boundPointerMove = null;
        this._boundPointerUp = null;

        // Pre-bind event handlers to maintain consistent function references
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.handleOverlayHover = this.handleOverlayHover.bind(this);
        this.handleBeforeImageLoad = this.handleBeforeImageLoad.bind(this);
        this.handleKeyboardNavigation = this.handleKeyboardNavigation.bind(this);
        this.initializeSliderPosition = this.initializeSliderPosition.bind(this);
    }

    // Property getters and setters for framework interoperability
    get handle() {
        return this.getAttribute('handle') || TatvaImageCompare.DEFAULT_CONFIG.handle;
    }

    set handle(value) {
        if (value) {
            this.setAttribute('handle', value);
        } else {
            this.removeAttribute('handle');
        }
    }

    get hover() {
        const attr = this.getAttribute('hover');
        return attr !== null ? (attr !== 'false' && attr !== '0') : TatvaImageCompare.DEFAULT_CONFIG.hover;
    }

    set hover(value) {
        if (value) {
            this.setAttribute('hover', '');
        } else {
            this.removeAttribute('hover');
        }
    }

    get hideArrows() {
        const attr = this.getAttribute('hide-arrows');
        return attr !== null ? (attr !== 'false' && attr !== '0') : TatvaImageCompare.DEFAULT_CONFIG.hideArrows;
    }

    set hideArrows(value) {
        if (value) {
            this.setAttribute('hide-arrows', '');
        } else {
            this.removeAttribute('hide-arrows');
        }
    }

    get position() {
        return this.getSliderPosition();
    }

    set position(value) {
        this.setSliderPosition(Number(value));
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.init();
            this._isInitialized = true;
        } else {
            // Reconnected: re-attach observers and listeners without destroying DOM
            this.setupResizeObserver();
            this.attachEventListeners();
            this.setupSlotListeners();
            this.applyPosition();
        }
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        this.removeEventListeners();
        this.cleanupResizeObserver();
        this.removeSlotListeners();
    }

    /**
     * Handles observed attribute changes without destroying DOM
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || !this.isConnected || !this._isInitialized) return;

        if (name === 'handle') {
            this.handleType = newValue || TatvaImageCompare.DEFAULT_CONFIG.handle;
            this.configureHandleAppearance();
        } else if (name === 'hover') {
            this.hoverEnabled = TatvaImageCompare.convertAttributeToBoolean(newValue);
            this.attachEventListeners();
        } else if (name === 'hide-arrows') {
            // Handled via CSS selectors :host([hide-arrows]) / :host([hide-arrows="true"])
        }
    }

    /**
     * Initialization method
     */
    init() {
        this.renderComponent();
        this.cacheElementReferences();
        this.configureHandleAppearance();
        this.attachEventListeners();
        this.initializeSliderPosition();
        this.setupResizeObserver();
        this.setupSlotListeners();
    }

    /**
     * Renders the complete component HTML and CSS
     */
    renderComponent() {
        const config = this.getComponentConfig();
        const template = document.createElement('template');

        template.innerHTML = `
            ${this.generateStyles()}
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
        const defaults = TatvaImageCompare.DEFAULT_CONFIG;
        const hoverAttr = this.getAttribute('hover');
        const hideArrowsAttr = this.getAttribute('hide-arrows');

        return {
            handle: this.getAttribute('handle') || defaults.handle,
            hover: hoverAttr !== null ? (hoverAttr !== 'false' && hoverAttr !== '0') : defaults.hover,
            hideArrows: hideArrowsAttr !== null ? (hideArrowsAttr !== 'false' && hideArrowsAttr !== '0') : defaults.hideArrows,
        };
    }

    /**
     * Generates the CSS styles for the component
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles() {
        return `
            <style>
                :host {
                    display: block;
                    height: 100%;
                    position: relative;
                    white-space: normal;
                    user-select: none;
                    -webkit-user-select: none;
                }

                [part="image-compare"] {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                [part="image-container"] {
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                    width: 100%;
                }

                [part="before-image-wrapper"],
                [part="after-image-wrapper"] {
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                [part="before-image-wrapper"] {
                    z-index: 2;
                    position: relative;
                    clip-path: inset(0px 50% 0px 0px);
                    will-change: clip-path;
                }

                [part="after-image-wrapper"] {
                    z-index: 1;
                    position: absolute;
                }

                /* Style slotted images and default images */
                ::slotted(img),
                [part="default-before-image"],
                [part="default-after-image"] {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background-color: #94a3b8;
                    display: block;
                    pointer-events: none;
                }

                [part="slider-overlay"] {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    inset: 0;
                    z-index: 12;
                    cursor: pointer;
                    touch-action: pan-y;
                }

                [part="slider-overlay"]:focus-visible {
                    outline: 2px solid var(--tatva-focus-color, #3b82f6);
                    outline-offset: 2px;
                }

                [part="slider-handle"] {
                    cursor: ew-resize;
                    width: var(--tatva-handle-width, 4px);
                    height: 100%;
                    background: var(--tatva-handle-color, white);
                    position: absolute;
                    top: 0;
                    left: 50%;
                    touch-action: none;
                    transform: translateX(-50%);
                    will-change: left;
                }

                /* Line handle style (default) */
                [part="slider-handle"].line::before,
                [part="slider-handle"].line::after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: var(--tatva-handle-color, white);
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                [part="slider-handle"].line::before {
                    top: -10px;
                }

                [part="slider-handle"].line::after {
                    bottom: -10px;
                }

                [part="handle-controls"] {
                    display: none;
                    width: 45px;
                    height: 45px;
                    border: 5px solid var(--tatva-handle-color, white);
                    color: var(--tatva-handle-color, white);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-sizing: border-box;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
                }

                /* Circle handle style */
                [part="slider-handle"].circle [part="handle-controls"] {
                    display: flex;
                    border-radius: 50%;
                }

                /* Rectangle handle style */
                [part="slider-handle"].rectangle [part="handle-controls"] {
                    display: flex;
                    border-radius: 4px;
                }

                /* Arrow handle style */
                [part="slider-handle"].arrow [part="handle-controls"] {
                    display: flex;
                    border: none;
                    box-shadow: none;
                }

                /* Bar handle style */
                [part="slider-handle"].bar [part="handle-controls"] {
                    display: flex;
                    width: 28px;
                    height: 56px;
                    border-radius: 14px;
                    border: none;
                    background: var(--tatva-handle-color, white);
                    color: #1e293b;
                }

                [part="slider-handle"].bar [part="arrow-left"],
                [part="slider-handle"].bar [part="arrow-right"] {
                    color: #1e293b;
                    fill: currentColor;
                }

                /* Hide arrows when hide-arrows attribute is present */
                :host([hide-arrows]) [part="arrow-left"],
                :host([hide-arrows]) [part="arrow-right"],
                :host([hide-arrows]) ::slotted([slot="arrow-left"]),
                :host([hide-arrows]) ::slotted([slot="arrow-right"]),
                :host([hide-arrows="true"]) [part="arrow-left"],
                :host([hide-arrows="true"]) [part="arrow-right"],
                :host([hide-arrows="true"]) ::slotted([slot="arrow-left"]),
                :host([hide-arrows="true"]) ::slotted([slot="arrow-right"]) {
                    display: none !important;
                }

                [part="arrow-left"],
                [part="arrow-right"] {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }

                /* Style slotted arrow content */
                ::slotted([slot="arrow-left"]),
                ::slotted([slot="arrow-right"]) {
                    width: 20px;
                    height: 20px;
                    color: white;
                    flex-shrink: 0;
                }
            </style>
        `;
    }

    /**
     * Generates the HTML markup structure
     * @param {Object} config - Component configuration object
     * @returns {string} Complete HTML structure
     */
    generateMarkup(config) {
        return `
            <div part="image-compare">
                <div part="image-container" data-handle-type="${config.handle}" data-hover-enabled="${config.hover}">
                    <div part="before-image-wrapper">
                        <slot name="before-image">
                            <img part="default-before-image" alt="Before" src="assets/before.png" />
                        </slot>
                    </div>
                    <div part="slider-overlay" 
                         role="slider" 
                         aria-label="Image compare slider" 
                         aria-orientation="horizontal"
                         aria-valuemin="0" 
                         aria-valuemax="100" 
                         aria-valuenow="50"
                         aria-valuetext="50%"
                         tabindex="0">
                        <div part="slider-handle">
                            <div part="handle-controls" aria-hidden="true">
                                <slot name="arrow-left">
                                   <svg part="arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                                    </svg>
                                </slot>
                                <slot name="arrow-right">
                                    <svg part="arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                                    </svg>
                                </slot>
                            </div>
                        </div>
                    </div>
                    <div part="after-image-wrapper">
                        <slot name="after-image">
                            <img part="default-after-image" alt="After" src="assets/after.png" />
                        </slot>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Caches references to frequently used DOM elements
     */
    cacheElementReferences() {
        this.imageContainer = this.shadowRoot.querySelector('[part="image-container"]');
        this.sliderOverlay = this.shadowRoot.querySelector('[part="slider-overlay"]');
        this.sliderHandle = this.shadowRoot.querySelector('[part="slider-handle"]');
        this.handleControls = this.shadowRoot.querySelector('[part="handle-controls"]');
        this.beforeImageWrapper = this.shadowRoot.querySelector('[part="before-image-wrapper"]');
        this.afterImageWrapper = this.shadowRoot.querySelector('[part="after-image-wrapper"]');

        this.beforeImageSlot = this.shadowRoot.querySelector('slot[name="before-image"]');
        this.afterImageSlot = this.shadowRoot.querySelector('slot[name="after-image"]');

        const config = this.getComponentConfig();
        this.handleType = config.handle;
        this.hoverEnabled = config.hover;
    }

    /**
     * Gets the actual image element from the before image slot
     */
    getBeforeImageElement() {
        if (!this.beforeImageSlot) return null;
        const slottedElements = this.beforeImageSlot.assignedElements();
        if (slottedElements.length > 0) {
            return slottedElements.find(el => el.tagName === 'IMG') || slottedElements[0];
        }
        return this.shadowRoot.querySelector('[part="default-before-image"]');
    }

    /**
     * Sets up slot change listeners
     */
    setupSlotListeners() {
        this.removeSlotListeners();
        [this.beforeImageSlot, this.afterImageSlot].forEach(slot => {
            if (slot) {
                slot.addEventListener('slotchange', this.initializeSliderPosition);
            }
        });
    }

    /**
     * Removes slot change listeners
     */
    removeSlotListeners() {
        [this.beforeImageSlot, this.afterImageSlot].forEach(slot => {
            if (slot) {
                slot.removeEventListener('slotchange', this.initializeSliderPosition);
            }
        });
    }

    /**
     * Applies the appropriate handle styling based on handle type
     */
    configureHandleAppearance() {
        if (!this.sliderHandle) return;
        const handleStyles = ['line', 'circle', 'rectangle', 'arrow', 'bar'];
        this.sliderHandle.classList.remove(...handleStyles);

        if (this.handleType) {
            this.sliderHandle.classList.add(this.handleType);
        }
    }

    /**
     * Attaches all event listeners
     */
    attachEventListeners() {
        this.removeEventListeners();

        if (this.sliderHandle) {
            this.sliderHandle.addEventListener('pointerdown', this.handlePointerDown);
        }

        if (this.sliderOverlay) {
            this.sliderOverlay.addEventListener('click', this.handleOverlayClick);
            this.sliderOverlay.addEventListener('keydown', this.handleKeyboardNavigation);

            if (this.hoverEnabled) {
                this.sliderOverlay.addEventListener('pointermove', this.handleOverlayHover);
            }
        }
    }

    /**
     * Removes all event listeners to prevent memory leaks
     */
    removeEventListeners() {
        if (this.sliderHandle) {
            this.sliderHandle.removeEventListener('pointerdown', this.handlePointerDown);
        }

        if (this.sliderOverlay) {
            this.sliderOverlay.removeEventListener('click', this.handleOverlayClick);
            this.sliderOverlay.removeEventListener('keydown', this.handleKeyboardNavigation);
            this.sliderOverlay.removeEventListener('pointermove', this.handleOverlayHover);
        }

        if (this._boundPointerMove) {
            window.removeEventListener('pointermove', this._boundPointerMove);
            this._boundPointerMove = null;
        }

        if (this._boundPointerUp) {
            window.removeEventListener('pointerup', this._boundPointerUp);
            window.removeEventListener('pointercancel', this._boundPointerUp);
            this._boundPointerUp = null;
        }

        const beforeImg = this.getBeforeImageElement();
        if (beforeImg) {
            beforeImg.removeEventListener('load', this.handleBeforeImageLoad);
        }
    }

    /**
     * Sets up initial slider position when image loads
     */
    initializeSliderPosition() {
        const beforeImg = this.getBeforeImageElement();
        if (!beforeImg) {
            this.applyPosition();
            return;
        }

        beforeImg.removeEventListener('load', this.handleBeforeImageLoad);
        beforeImg.addEventListener('load', this.handleBeforeImageLoad, { once: true });

        if (beforeImg.complete && (beforeImg.naturalWidth > 0 || beforeImg.tagName !== 'IMG')) {
            this.handleBeforeImageLoad();
        } else {
            this.applyPosition();
        }
    }

    /**
     * Sets up resize observer to maintain fluid percentage positioning
     */
    setupResizeObserver() {
        this.cleanupResizeObserver();
        if (typeof ResizeObserver === 'undefined') return;

        this.resizeObserver = new ResizeObserver(() => {
            if (!this.sliderOverlay) return;
            // With fluid percentage styling, percentage stays rock solid across resizes
            this.applyPosition();
        });

        if (this.imageContainer) {
            this.resizeObserver.observe(this.imageContainer);
        }
    }

    /**
     * Cleans up resize observer
     */
    cleanupResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    /**
     * Handles initial image load
     */
    handleBeforeImageLoad() {
        this.applyPosition();
    }

    /**
     * Handles pointer down events to start dragging
     */
    handlePointerDown(event) {
        if (event.button !== 0) return; // Only primary button
        event.preventDefault();
        this.isDragging = true;

        try {
            this.sliderHandle.setPointerCapture(event.pointerId);
        } catch (e) {
            // Ignore pointer capture errors if unsupported
        }

        this._boundPointerMove = (e) => this.handlePointerMove(e);
        this._boundPointerUp = (e) => this.handlePointerUp(e);

        window.addEventListener('pointermove', this._boundPointerMove);
        window.addEventListener('pointerup', this._boundPointerUp);
        window.addEventListener('pointercancel', this._boundPointerUp);
    }

    /**
     * Handles pointer movement during dragging
     */
    handlePointerMove(event) {
        if (!this.isDragging) return;
        this.calculatePositionFromEvent(event);
    }

    /**
     * Handles pointer up events to end dragging
     */
    handlePointerUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        try {
            if (this.sliderHandle && e && e.pointerId != null) {
                this.sliderHandle.releasePointerCapture(e.pointerId);
            }
        } catch (error) {
            // Ignore errors
        }

        if (this._boundPointerMove) {
            window.removeEventListener('pointermove', this._boundPointerMove);
            this._boundPointerMove = null;
        }

        if (this._boundPointerUp) {
            window.removeEventListener('pointerup', this._boundPointerUp);
            window.removeEventListener('pointercancel', this._boundPointerUp);
            this._boundPointerUp = null;
        }
    }

    /**
     * Handles click events on the overlay to jump to position
     */
    handleOverlayClick(e) {
        if (e.target !== this.sliderHandle && !this.sliderHandle.contains(e.target)) {
            this.calculatePositionFromEvent(e);
        }
    }

    /**
     * Handles hover movement when hover mode is enabled
     */
    handleOverlayHover(event) {
        if (this.isDragging) return;
        this.calculatePositionFromEvent(event);
    }

    /**
     * Handles keyboard navigation (arrow keys, home, end, page up/down)
     */
    handleKeyboardNavigation(e) {
        let currentPercentage = this._position;
        const step = 2; // 2% step
        const pageStep = 10; // 10% step

        const moves = {
            ArrowLeft: () => { currentPercentage = Math.max(0, currentPercentage - step); },
            ArrowDown: () => { currentPercentage = Math.max(0, currentPercentage - step); },
            ArrowRight: () => { currentPercentage = Math.min(100, currentPercentage + step); },
            ArrowUp: () => { currentPercentage = Math.min(100, currentPercentage + step); },
            PageDown: () => { currentPercentage = Math.max(0, currentPercentage - pageStep); },
            PageUp: () => { currentPercentage = Math.min(100, currentPercentage + pageStep); },
            Home: () => { currentPercentage = 0; },
            End: () => { currentPercentage = 100; },
        };

        if (moves[e.key]) {
            e.preventDefault();
            moves[e.key]();
            this.setSliderPosition(currentPercentage);
        }
    }

    /**
     * Calculates slider position from pointer/mouse event
     */
    calculatePositionFromEvent(e) {
        if (!this.sliderOverlay) return;
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        if (containerRect.width === 0) return;

        const offsetX = e.clientX - containerRect.left;
        const clampedOffset = Math.max(0, Math.min(containerRect.width, offsetX));
        const percentage = (clampedOffset / containerRect.width) * 100;

        this.setSliderPosition(percentage);
    }

    /**
     * Updates slider position and applies fluid percentage clipping
     */
    applyPosition() {
        if (!this.sliderHandle || !this.beforeImageWrapper) return;

        const percentage = Math.max(0, Math.min(100, this._position));

        // Use percentage for fluid, resolution-independent layout
        this.sliderHandle.style.left = `${percentage}%`;
        this.beforeImageWrapper.style.clipPath = `inset(0px ${100 - percentage}% 0px 0px)`;

        // Accessibility attributes
        const roundedPercentage = Math.round(percentage);
        if (this.sliderOverlay) {
            this.sliderOverlay.setAttribute('aria-valuenow', String(roundedPercentage));
            this.sliderOverlay.setAttribute('aria-valuetext', `${roundedPercentage}%`);
        }

        const containerRect = this.sliderOverlay ? this.sliderOverlay.getBoundingClientRect() : null;
        const containerWidth = containerRect ? containerRect.width : 0;
        const clampedPixels = (percentage / 100) * containerWidth;

        // Dispatch custom event for external listeners
        this.dispatchEvent(new CustomEvent('slider-move', {
            detail: {
                position: clampedPixels,
                percentage: roundedPercentage,
                containerWidth: containerWidth,
            },
            bubbles: true,
            composed: true,
        }));
    }

    /**
     * Public API: Get current slider position as percentage (0-100)
     */
    getSliderPosition() {
        return Math.round(this._position);
    }

    /**
     * Public API: Set slider position by percentage (0-100)
     */
    setSliderPosition(percentage) {
        if (typeof percentage !== 'number' || isNaN(percentage)) return;
        this._position = Math.max(0, Math.min(100, percentage));
        this.applyPosition();
    }
}

// Expose class globally for external access in browser environments
if (typeof window !== 'undefined') {
    window.TatvaImageCompare = TatvaImageCompare;
    if (typeof window.customElements !== 'undefined' && !window.customElements.get('tatva-image-compare')) {
        window.customElements.define('tatva-image-compare', TatvaImageCompare);
    }
}

export default TatvaImageCompare;
