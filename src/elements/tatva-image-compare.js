/**
 * TatvaImageCompare - A custom web component for comparing two images with an interactive slider
 */
class TatvaImageCompare extends HTMLElement {
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
     * Constructor initializes the component
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });

        // Initialize component state
        this.isDragging = false;
        this.resizeObserver = null;

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

    /**
     * Converts attribute values to boolean
     */
    static convertAttributeToBoolean(value) {
        return value === '' || value === 'true' || value === true;
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.init();
            this._isInitialized = true;
        }
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        this._isInitialized = false;
        this.removeEventListeners();
        this.cleanupResizeObserver();
        this.removeSlotListeners();
    }

    /**
    * Re-renders component when observed attributes change
    */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || !this.isConnected) return;
        if (this._isInitialized) {
            this.init(); // Re-render component when attributes change
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

        return {
            handle: this.getAttribute('handle') || defaults.handle,
            hover: TatvaImageCompare.convertAttributeToBoolean(this.getAttribute('hover')) || defaults.hover,
            hideArrows: TatvaImageCompare.convertAttributeToBoolean(this.getAttribute('hide-arrows')) || defaults.hideArrows,
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
                }

                [part="image-compare"] {
                    width: 100%;
                    height: 100%;
                }

                [part="image-container"] {
                    position: relative;
                    overflow: hidden;
                    height: 100%;
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
                }

                [part="slider-overlay"] {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    inset: 0;
                    z-index: 12;
                    cursor: pointer;
                }

                [part="slider-overlay"]:focus-visible {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }

                [part="slider-handle"] {
                    cursor: ew-resize;
                    width: 4px;
                    height: 100%;
                    background: white;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    touch-action: none;
                    transform: translateX(-50%);
                }

                /* Line handle style (default) */
                [part="slider-handle"].line::before,
                [part="slider-handle"].line::after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: white;
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
                    border: 5px solid white;
                    color: white;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-sizing: border-box;
                    align-items: center;
                    justify-content: center;
                }

                /* Circle handle style */
                [part="slider-handle"].circle [part="handle-controls"] {
                    display: flex;
                    border-radius: 50%;
                }

                /* Rectangle handle style */
                [part="slider-handle"].rectangle [part="handle-controls"] {
                    display: flex;
                }

                /* Arrow handle style */
                [part="slider-handle"].arrow [part="handle-controls"] {
                    display: flex;
                    border: none;
                }

                /* Hide arrows when hide-arrows attribute is present */
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
                }

                [part="arrow-left"],
                [part="arrow-right"],
                ::slotted(.arrow-left),
                ::slotted(.arrow-right) {
                    width: 20px;
                    height: 20px;
                }

                /* Style slotted arrow content */
                ::slotted([slot="arrow-left"]),
                ::slotted([slot="arrow-right"]) {
                    width: 20px;
                    height: 20px;
                    color: white;
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
                         aria-valuemin="0" 
                         aria-valuemax="100" 
                         aria-valuenow="50"
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

        // Get slots
        this.beforeImageSlot = this.shadowRoot.querySelector('slot[name="before-image"]');
        this.afterImageSlot = this.shadowRoot.querySelector('slot[name="after-image"]');

        // Extract configuration from cached elements
        this.handleType = this.imageContainer.dataset.handleType;
        this.hoverEnabled = TatvaImageCompare.convertAttributeToBoolean(this.imageContainer.dataset.hoverEnabled);
    }

    /**
     * Gets the actual image element from the before image slot
     */
    getBeforeImageElement() {
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
        const handleStyles = ['line', 'circle', 'rectangle', 'arrow'];

        // Remove all existing handle style classes
        this.sliderHandle.classList.remove(...handleStyles);

        // Apply current handle type class
        if (this.handleType) {
            this.sliderHandle.classList.add(this.handleType);
        }
    }

    /**
     * Attaches all event listeners
     */
    attachEventListeners() {
        this.removeEventListeners(); // Prevent duplicate listeners

        // Primary interaction events
        this.sliderHandle.addEventListener('pointerdown', this.handlePointerDown);
        this.sliderOverlay.addEventListener('click', this.handleOverlayClick);
        this.sliderOverlay.addEventListener('keydown', this.handleKeyboardNavigation);

        // Optional hover interaction
        if (this.hoverEnabled) {
            this.sliderOverlay.addEventListener('pointermove', this.handleOverlayHover);
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
            const events = ['click', 'keydown', 'pointermove', 'pointerup', 'pointercancel', 'pointerleave'];
            events.forEach(event => {
                this.sliderOverlay.removeEventListener(event, this.handlePointerMove);
                this.sliderOverlay.removeEventListener(event, this.handlePointerUp);
                this.sliderOverlay.removeEventListener(event, this.handleOverlayClick);
                this.sliderOverlay.removeEventListener(event, this.handleOverlayHover);
                this.sliderOverlay.removeEventListener(event, this.handleKeyboardNavigation);
            });
        }

        // Remove image load listeners from both slotted and default images
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
        if (!beforeImg) return;

        beforeImg.addEventListener('load', this.handleBeforeImageLoad);

        // Handle case where image is already loaded
        if (beforeImg.complete && (beforeImg.naturalWidth > 0 || beforeImg.tagName !== 'IMG')) {
            this.handleBeforeImageLoad();
        }
    }

    /**
     * Sets up resize observer to handle container size changes
     */
    setupResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => {
            if (!this.sliderOverlay) return;
            const containerRect = this.sliderOverlay.getBoundingClientRect();
            const currentLeft = parseFloat(this.sliderHandle.style.left) || containerRect.width / 2;
            this.updateSliderPosition(currentLeft);
        });
        this.resizeObserver.observe(this.imageContainer);
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
     * Handles initial image load to set default position
     */
    handleBeforeImageLoad() {
        const beforeImg = this.getBeforeImageElement();
        if (!beforeImg) return;
        this.updateSliderPosition(beforeImg.getBoundingClientRect().width / 2);
    }

    /**
     * Handles pointer down events to start dragging
     */
    handlePointerDown(event) {
        event.preventDefault();
        this.isDragging = true;

        // Capture pointer for smooth dragging
        this.sliderHandle.setPointerCapture(event.pointerId);
        ['pointermove', 'pointerup', 'pointercancel', 'pointerleave']
            .forEach(ev => this.sliderOverlay.addEventListener(ev, this[ev === 'pointermove' ? 'handlePointerMove' : 'handlePointerUp']));
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
        this.isDragging = false;

        // Release pointer capture
        try {
            this.sliderHandle.releasePointerCapture(e.pointerId);
        } catch (error) {
            // Ignore errors when releasing pointer capture
        }

        // Remove move and end event listeners
        ['pointermove', 'pointerup', 'pointercancel', 'pointerleave']
            .forEach(ev => this.sliderOverlay.removeEventListener(ev, this[ev === 'pointermove' ? 'handlePointerMove' : 'handlePointerUp']));
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
     * Handles keyboard navigation (arrow keys)
     */
    handleKeyboardNavigation(e) {
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        const step = Math.max(1, Math.round(containerRect.width * 0.02)); // 2% step
        let currentLeft = parseFloat(this.sliderHandle.style.left) || containerRect.width / 2;

        const moves = {
            ArrowLeft: () => { currentLeft = Math.max(0, currentLeft - step); },
            ArrowRight: () => { currentLeft = Math.min(containerRect.width, currentLeft + step); },
            Home: () => { currentLeft = 0; },
            End: () => { currentLeft = containerRect.width; }
        };

        if (moves[e.key]) {
            moves[e.key]();
            this.updateSliderPosition(currentLeft);
            e.preventDefault();
        }
    }

    /**
     * Calculates slider position from pointer/mouse event
     */
    calculatePositionFromEvent(e) {
        if (!this.sliderOverlay) return;
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        this.updateSliderPosition(e.clientX - containerRect.left);
    }

    /**
     * Updates slider position and applies clipping to before image
     */
    updateSliderPosition(offsetX) {
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        const clampedPosition = Math.max(0, Math.min(containerRect.width, offsetX));

        // Position the slider handle
        this.sliderHandle.style.left = `${clampedPosition}px`;

        // Clip the before image wrapper to reveal the after image
        const rightInset = Math.max(0, containerRect.width - clampedPosition);
        this.beforeImageWrapper.style.clipPath = `inset(0px ${rightInset}px 0px 0px)`;

        // Update accessibility attributes
        const percentage = containerRect.width ? Math.round((clampedPosition / containerRect.width) * 100) : 50;
        this.sliderOverlay.setAttribute('aria-valuenow', String(percentage));

        // Dispatch custom event for external listeners
        this.dispatchEvent(new CustomEvent('slider-move', {
            detail: {
                position: clampedPosition,
                percentage: percentage,
                containerWidth: containerRect.width
            }
        }));
    }

    /**
     * Public API: Get current slider position as percentage (0-100)
     */
    getSliderPosition() {
        const containerRect = this.sliderOverlay?.getBoundingClientRect();
        const currentLeft = parseFloat(this.sliderHandle?.style.left) || 0;

        if (!containerRect || containerRect.width === 0) return 50;

        return Math.round((currentLeft / containerRect.width) * 100);
    }

    /**
     * Public API: Set slider position by percentage (0-100)
     */
    setSliderPosition(percentage) {
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        const containerRect = this.sliderOverlay?.getBoundingClientRect();

        if (!containerRect) return;

        const position = (clampedPercentage / 100) * containerRect.width;
        this.updateSliderPosition(position);
    }
}

// Expose class globally for external access
window.TatvaImageCompare = TatvaImageCompare;

// Register the custom element
if (!window.customElements.get('tatva-image-compare')) {
    window.customElements.define('tatva-image-compare', TatvaImageCompare);
}