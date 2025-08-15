/**
 * TatvaImageCompare - A custom web component for comparing two images with an interactive slider
 */
class TatvaImageCompare extends HTMLElement {
    static get observedAttributes() {
        return ['handle', 'hover', 'before', 'after', 'arrow-left', 'arrow-right'];
    }

    constructor() {
        super();

        // Create shadow DOM for encapsulation
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
    }

    /**
     * Converts attribute values to boolean
     */
    static convertAttributeToBoolean(value) {
        return value === '' || value === 'true' || value === true;
    }

    /**
     * Called when element is added to DOM
     */
    connectedCallback() {
        this.renderComponent();
        this.cacheElementReferences();
        this.configureHandleAppearance();
        this.attachEventListeners();
        this.initializeSliderPosition();
        this.setupResizeObserver();
    }

    /**
     * Called when element is removed from DOM
     */
    disconnectedCallback() {
        this.removeEventListeners();
        this.cleanupResizeObserver();
    }

    /**
     * Called when observed attributes change
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || !this.isConnected) return;

        // Re-render component when attributes change
        this.renderComponent();
        this.cacheElementReferences();
        this.configureHandleAppearance();
        this.attachEventListeners();
        this.initializeSliderPosition();
    }

    /**
     * Renders the complete component HTML and CSS
     */
    renderComponent() {
        const config = this.getComponentConfiguration();

        const template = document.createElement('template');
        template.innerHTML = `
            ${this.generateStyles()}
            <div class="image-compare">
                <div class="image-container" data-handle-type="${config.handleType}" data-hover-enabled="${config.hoverEnabled}">
                    <img class="before-image" alt="Before" src="${config.beforeImageSrc}" />
                    <div class="slider-overlay" 
                         role="slider" 
                         aria-label="Image compare slider" 
                         aria-valuemin="0" 
                         aria-valuemax="100" 
                         aria-valuenow="50"
                         tabindex="0">
                        <div class="slider-handle">
                            <div class="handle-controls" aria-hidden="true">
                                ${config.leftArrow}
                                ${config.rightArrow}
                            </div>
                        </div>
                    </div>
                    <img class="after-image" alt="After" src="${config.afterImageSrc}" />
                </div>
            </div>
        `;

        this.shadowRoot.replaceChildren(template.content.cloneNode(true));
    }

    /**
     * Extracts component configuration from attributes
     */
    getComponentConfiguration() {
        return {
            handleType: this.getAttribute('handle') || 'line',
            hoverEnabled: TatvaImageCompare.convertAttributeToBoolean(this.getAttribute('hover')),
            beforeImageSrc: this.getAttribute('before') || 'assets/before.png',
            afterImageSrc: this.getAttribute('after') || 'assets/after.png',
            leftArrow: this.getAttribute('arrow-left') || this.getDefaultLeftArrow(),
            rightArrow: this.getAttribute('arrow-right') || this.getDefaultRightArrow()
        };
    }

    /**
     * Returns default left arrow SVG
     */
    getDefaultLeftArrow() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="arrow-left" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>`;
    }

    /**
     * Returns default right arrow SVG
     */
    getDefaultRightArrow() {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="arrow-right" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
        </svg>`;
    }

    /**
     * Generates component CSS styles
     */
    generateStyles() {
        return `
            <style>
                :host {
                    display: block;
                }

                .image-compare {
                    width: 100%;
                    height: 100%;
                }

                .image-container {
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    background-color: #94a3b8;
                    display: block;
                }

                .before-image {
                    position: absolute;
                    inset: 0;
                }

                .slider-overlay {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    inset: 0;
                    z-index: 12;
                    cursor: pointer;
                }

                .slider-overlay:focus-visible {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }

                .slider-handle {
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
                .slider-handle.line::before,
                .slider-handle.line::after {
                    content: '';
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .slider-handle.line::before {
                    top: -10px;
                }

                .slider-handle.line::after {
                    bottom: -10px;
                }

                .handle-controls {
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
                .slider-handle.circle .handle-controls {
                    display: flex;
                    border-radius: 50%;
                }

                /* Rectangle handle style */
                .slider-handle.rectangle .handle-controls {
                    display: flex;
                }

                /* Arrow handle style */
                .slider-handle.arrow .handle-controls {
                    display: flex;
                    border: none;
                }

                .arrow-left,
                .arrow-right {
                    width: 20px;
                    height: 20px;
                }
            </style>
        `;
    }

    /**
     * Caches references to frequently used DOM elements
     */
    cacheElementReferences() {
        this.imageContainer = this.shadowRoot.querySelector('.image-container');
        this.sliderOverlay = this.shadowRoot.querySelector('.slider-overlay');
        this.sliderHandle = this.shadowRoot.querySelector('.slider-handle');
        this.handleControls = this.shadowRoot.querySelector('.handle-controls');
        this.beforeImage = this.shadowRoot.querySelector('.before-image');
        this.afterImage = this.shadowRoot.querySelector('.after-image');

        // Extract configuration from cached elements
        this.handleType = this.imageContainer.dataset.handleType;
        this.hoverEnabled = TatvaImageCompare.convertAttributeToBoolean(this.imageContainer.dataset.hoverEnabled);
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

        if (this.beforeImage) {
            this.beforeImage.removeEventListener('load', this.handleBeforeImageLoad);
        }
    }

    /**
     * Sets up initial slider position when image loads
     */
    initializeSliderPosition() {
        this.beforeImage.addEventListener('load', this.handleBeforeImageLoad);

        // Handle case where image is already loaded
        if (this.beforeImage.complete && this.beforeImage.naturalWidth > 0) {
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
        const imageRect = this.beforeImage.getBoundingClientRect();
        const centerPosition = imageRect.width / 2;
        this.updateSliderPosition(centerPosition);
    }

    /**
     * Handles pointer down events to start dragging
     */
    handlePointerDown(event) {
        event.preventDefault();
        this.isDragging = true;

        // Capture pointer for smooth dragging
        this.sliderHandle.setPointerCapture(event.pointerId);

        // Attach move and end event listeners
        this.sliderOverlay.addEventListener('pointermove', this.handlePointerMove);
        this.sliderOverlay.addEventListener('pointerup', this.handlePointerUp);
        this.sliderOverlay.addEventListener('pointercancel', this.handlePointerUp);
        this.sliderOverlay.addEventListener('pointerleave', this.handlePointerUp);
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
    handlePointerUp(event) {
        this.isDragging = false;

        // Release pointer capture
        try {
            this.sliderHandle.releasePointerCapture(event.pointerId);
        } catch (error) {
            // Ignore capture release errors
        }

        // Remove move and end event listeners
        this.sliderOverlay.removeEventListener('pointermove', this.handlePointerMove);
        this.sliderOverlay.removeEventListener('pointerup', this.handlePointerUp);
        this.sliderOverlay.removeEventListener('pointercancel', this.handlePointerUp);
        this.sliderOverlay.removeEventListener('pointerleave', this.handlePointerUp);
    }

    /**
     * Handles click events on the overlay to jump to position
     */
    handleOverlayClick(event) {
        // Ignore clicks on the handle itself
        if (event.target === this.sliderHandle || this.sliderHandle.contains(event.target)) {
            return;
        }
        this.calculatePositionFromEvent(event);
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
    handleKeyboardNavigation(event) {
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        const stepSize = Math.max(1, Math.round(containerRect.width * 0.02)); // 2% step
        const currentLeft = parseFloat(this.sliderHandle.style.left) || containerRect.width / 2;

        let newLeft = currentLeft;

        switch (event.key) {
            case 'ArrowLeft':
                newLeft = Math.max(0, currentLeft - stepSize);
                this.updateSliderPosition(newLeft);
                event.preventDefault();
                break;

            case 'ArrowRight':
                newLeft = Math.min(containerRect.width, currentLeft + stepSize);
                this.updateSliderPosition(newLeft);
                event.preventDefault();
                break;

            case 'Home':
                this.updateSliderPosition(0);
                event.preventDefault();
                break;

            case 'End':
                this.updateSliderPosition(containerRect.width);
                event.preventDefault();
                break;
        }
    }

    /**
     * Calculates slider position from pointer/mouse event
     */
    calculatePositionFromEvent(event) {
        if (!this.sliderOverlay) return;

        const containerRect = this.sliderOverlay.getBoundingClientRect();
        const offsetX = event.clientX - containerRect.left;
        this.updateSliderPosition(offsetX);
    }

    /**
     * Updates slider position and applies clipping to before image
     */
    updateSliderPosition(offsetX) {
        const containerRect = this.sliderOverlay.getBoundingClientRect();
        const clampedPosition = Math.max(0, Math.min(containerRect.width, offsetX));

        // Position the slider handle
        this.sliderHandle.style.left = `${clampedPosition}px`;

        // Clip the before image to reveal the after image
        // Using inset() instead of deprecated clip: rect()
        const rightInset = Math.max(0, containerRect.width - clampedPosition);
        this.beforeImage.style.clipPath = `inset(0px ${rightInset}px 0px 0px)`;

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