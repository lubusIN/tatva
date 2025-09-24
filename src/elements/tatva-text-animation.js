/**
 * TatvaTextAnimation: A custom web component for rendering animated text with multiple effects ( such as typing, fly-in, and letter-fade).
 */
class TatvaTextAnimation extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            type: 'typing',
            words: ["Hello Lubus", "From Tatva"],
            speed: 100,
            repeat: false,
        };
    }

    static get observedAttributes() {
        return ['type', 'words', 'speed', 'repeat'];
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
        this.animationComplete = false;
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
            this.animationComplete = false;
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

        // Parse repeat attribute - handle boolean values
        let repeat = defaults.repeat;
        const repeatAttr = this.getAttribute('repeat');
        if (repeatAttr !== null) {
            repeat = repeatAttr !== 'false' && repeatAttr !== '0';
        }

        return {
            type: this.getAttribute('type') || defaults.type,
            words: words,
            speed: speed,
            repeat: repeat,
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
                    width: max-content;
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

                .textcontainer.no-repeat {
                    border-right: none;
                    animation: none;
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
     * Dispatches animation complete event
     */
    dispatchAnimationComplete() {
        this.dispatchEvent(new CustomEvent('animationComplete', {
            bubbles: true,
            detail: { component: this }
        }));
    }

    /**
     * Initializes typing animation with typewriter effect
     * @param {Object} config - Component configuration object
     */
    initTyping(config) {
        const element = this.shadowRoot.querySelector('.textcontainer');

        if (config.repeat) {
            // Repeat mode: cycle through array of words
            this.words = config.words;
            this.wordIndex = 0;
            this.charIndex = 0;
            this.isForward = true;
            this.skipCharDelay = 15;

            // Enable CSS-based caret blinking for repeat mode
            element.classList.add('blinking');

            this.typingInterval = setInterval(() => {
                if (this.animationComplete) return;

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
        } else {
            // Non-repeat mode: show all words as single merged text with typing effect
            const mergedText = config.words.join(' ');
            this.charIndex = 0;

            // Enable blinking during typing, will be removed when complete
            element.classList.add('blinking');

            this.typingInterval = setInterval(() => {
                if (this.animationComplete) return;

                this.charIndex++;
                element.textContent = mergedText.slice(0, this.charIndex);

                // Check if we've typed the entire merged text
                if (this.charIndex >= mergedText.length) {
                    this.animationComplete = true;
                    element.classList.remove('blinking');
                    element.classList.add('no-repeat');
                    clearInterval(this.typingInterval);
                    this.typingInterval = null;
                    this.dispatchAnimationComplete();
                }
            }, config.speed);
        }
    }

    /**
     * Initializes fly-in animation where characters scale and fade in
     * @param {Object} config - Component configuration object
     */
    initFlyin(config) {
        const charSpans = this.setupCharacterAnimation(config);
        let completedAnimations = 0;

        const handleAnimationStep = (span, index) => {
            setTimeout(() => {
                if (this.animationComplete) return;

                span.style.transform = "scale(1)";
                span.style.opacity = "1";
                completedAnimations++;

                // Check if all animations are complete
                if (completedAnimations === charSpans.length) {
                    if (!config.repeat) {
                        this.animationComplete = true;
                        this.dispatchAnimationComplete();
                    } else {
                        // Reset and restart animation if repeat is true
                        setTimeout(() => {
                            if (!this.animationComplete) {
                                this.resetAndRestart(config);
                            }
                        }, 2000); // Wait 2 seconds before restarting
                    }
                }
            }, index * config.speed);
        };

        charSpans.forEach(handleAnimationStep);
    }

    /**
     * Initializes letter fade animation where characters fade in sequentially
     * @param {Object} config - Component configuration object
     */
    initLetterFade(config) {
        const charSpans = this.setupCharacterAnimation(config);
        let completedAnimations = 0;

        charSpans.forEach((span, index) => {
            // Apply letter-fade class for different styling
            span.classList.add('letter-fade');

            // Create staggered fade-in effect
            const timeout = setTimeout(() => {
                if (this.animationComplete) return;

                span.classList.add('show');
                completedAnimations++;

                // Check if all animations are complete
                if (completedAnimations === charSpans.length) {
                    if (!config.repeat) {
                        this.animationComplete = true;
                        this.dispatchAnimationComplete();
                    } else {
                        // Reset and restart animation if repeat is true
                        setTimeout(() => {
                            if (!this.animationComplete) {
                                this.resetAndRestart(config);
                            }
                        }, 2000); // Wait 2 seconds before restarting
                    }
                }
            }, index * config.speed);

            this.letterFadeTimeouts.push(timeout);
        });
    }

    /**
     * Resets and restarts the animation (for character-based animations with repeat)
     * @param {Object} config - Component configuration object
     */
    resetAndRestart(config) {
        this.clearIntervals();

        // Reset all character states
        const charSpans = this.shadowRoot.querySelectorAll('.char');
        charSpans.forEach(span => {
            if (config.type === 'flyin') {
                span.style.transform = "scale(5)";
                span.style.opacity = "0";
            } else if (config.type === 'fade') {
                span.classList.remove('show');
            }
        });

        // Restart the animation
        setTimeout(() => {
            if (config.type === 'flyin') {
                this.initFlyin(config);
            } else if (config.type === 'fade') {
                this.initLetterFade(config);
            }
        }, 500); // Short delay before restarting
    }
}

// Expose class globally for external access
window.TatvaTextAnimation = TatvaTextAnimation;

// Register the custom element
if (!window.customElements.get('tatva-text-animation')) {
    window.customElements.define('tatva-text-animation', TatvaTextAnimation);
}