/**
 * TatvaTextAnimation: A custom web component for rendering animated text with multiple effects ( such as typing, fly-in, and letter-fade).
 */
class TatvaTextAnimation extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            type: 'typing',
            words: ["Hello Lubus", "From Tatva"],
            speed: 100,
        };
    }

    static get observedAttributes() {
        return ['type', 'words', 'speed'];
    }

    /**
     * Constructor initializes the component
     */
    constructor() {
        super();
        this._isInitialized = false;
        this.attachShadow({ mode: 'open' });
        this.typingInterval = null;
        this.letterFadeTimeouts = [];
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.renderComponent();
            this.init();
            this._isInitialized = true;
        }
    }

    /**
     * Cleanup when element is removed from DOM
     */
    disconnectedCallback() {
        this._isInitialized = false;
        this.clearIntervals();
    }

    /**
     * Re-renders component when observed attributes change
     */
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot && this._isInitialized) {
            this.clearIntervals();
            this.renderComponent();
            this.init();
        }
    }

    /**
     * Initialization method
     */
    init() {
        const config = this.getComponentConfig();

        switch (config.type) {
            case 'typing':
                this.initTyping(config);
                break;
            case 'flyin':
                this.initFlyin(config);
                break;
            case 'fade':
                this.initLetterFade(config);
                break;
            default:
                this.initTyping(config);
        }
    }

    /**
     * Clear all intervals to prevent memory leaks
     */
    clearIntervals() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        // Clear letter fade timeouts
        if (this.letterFadeTimeouts) {
            this.letterFadeTimeouts.forEach(timeout => clearTimeout(timeout));
            this.letterFadeTimeouts = [];
        }
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
        const defaults = TatvaTextAnimation.DEFAULT_CONFIG;

        // Parse words attribute - handle both string and array formats
        let words = defaults.words;
        const wordsAttr = this.getAttribute('words');
        if (wordsAttr) {
            try {
                // Try parsing as JSON array first
                words = JSON.parse(wordsAttr);
                if (!Array.isArray(words)) {
                    words = [String(words)];
                }
            } catch (e) {
                // If JSON parsing fails, treat as comma-separated list
                words = wordsAttr
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
            }
        }

        const speedAttr = Number(this.getAttribute('speed'));
        const speed = Number.isFinite(speedAttr) && speedAttr > 0 ? speedAttr : defaults.speed;

        return {
            type: this.getAttribute('type') || defaults.type,
            words: words,
            speed: speed,
        };
    }

    /**
     * Generates the HTML markup structure
     * @param {Object} config - Component configuration object
     * @returns {string} Complete HTML structure
     */
    generateMarkup(config) {
        return `
            <div
                class="textcontainer"
                part="textcontainer"
                role="text"
                aria-live="${config.type === 'typing' ? 'polite' : 'off'}"
            >
            </div>
        `;
    }

    /**
     * Generates the CSS styles for the component
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles() {
        return `
            <style>
                .textcontainer {
                    margin: auto;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    font-size: 2rem;
                    font-weight: 800;
                    line-height: initial;
                    color: var(--tatva-text-color, #000);
                    padding: 0px 5px;
                }
                
                .textcontainer .char {
                    white-space: pre;
                    transform: scale(5);
                    opacity: 0;
                    transition: transform 0.5s ease, opacity 1s ease;
                }

                .textcontainer .char.letter-fade {
                    transform: scale(1);
                    opacity: 0;
                    transition: opacity 5s ease;
                }

                .textcontainer .char.letter-fade.show {
                    opacity: 1;
                }

                .textcontainer.blinking {
                    border-right: var(--tatva-caret-width, 6px) solid currentColor;
                    animation: blink 1.1s infinite;
                }

                @keyframes blink {
                    0%, 50% { border-right-color: currentColor; }
                    51%, 100% { border-right-color: transparent; }
                }
            </style>
        `;
    }

    /**
     * Common setup for character-based animations (flyin and fade)
     * @param {Object} config - Component configuration object
     * @returns {Array} Array of character spans
     */
    setupCharacterAnimation(config) {
        const element = this.shadowRoot.querySelector('.textcontainer');
        // Use the first word or join all words
        const text = Array.isArray(config.words) ? config.words.join(' ') : config.words;
        const chars = text.split('');

        element.innerHTML = '';

        return chars.map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('char');
            element.appendChild(span);
            return span;
        });
    }

    /**
     * Initializes typing animation with typewriter effect
     * @param {Object} config - Component configuration object
     */
    initTyping(config) {
        const element = this.shadowRoot.querySelector('.textcontainer');
        this.words = config.words;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isForward = true;
        this.skipCharDelay = 15;

        // Enable CSS-based caret blinking
        element.classList.add('blinking');

        this.typingInterval = setInterval(() => {
            if (this.isForward) {
                this.charIndex++;
            } else {
                this.charIndex--;
            }

            if (this.charIndex >= this.words[this.wordIndex].length + this.skipCharDelay) {
                this.isForward = false;
            } else if (this.charIndex <= 0) {
                this.isForward = true;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
            }

            element.textContent = this.words[this.wordIndex].slice(0, Math.max(0, this.charIndex));
        }, config.speed);
    }

    /**
     * Initializes fly-in animation where characters scale and fade in
     * @param {Object} config - Component configuration object
     */
    initFlyin(config) {
        const charSpans = this.setupCharacterAnimation(config);

        charSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transform = "scale(1)";
                span.style.opacity = "1";
            }, index * config.speed);
        });
    }

    /**
     * Initializes letter fade animation where characters fade in sequentially
     * @param {Object} config - Component configuration object
     */
    initLetterFade(config) {
        const charSpans = this.setupCharacterAnimation(config);

        charSpans.forEach((span, index) => {
            // Apply letter-fade class for different styling
            span.classList.add('letter-fade');

            // Create staggered fade-in effect
            const timeout = setTimeout(() => {
                span.classList.add('show');
            }, index * config.speed);

            this.letterFadeTimeouts.push(timeout);
        });
    }
}

// Expose class globally for external access
window.TatvaTextAnimation = TatvaTextAnimation;

// Register the custom element
if (!window.customElements.get('tatva-text-animation')) {
    window.customElements.define('tatva-text-animation', TatvaTextAnimation);
}