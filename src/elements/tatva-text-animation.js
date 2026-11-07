/**
 * TatvaTextAnimation: A custom web component for rendering animated text with multiple effects
 * (such as typing, fly-in, and letter-fade).
 */
export class TatvaTextAnimation extends HTMLElement {
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
        this._activeTimers = new Set();
        this.animationComplete = false;
    }

    // Property getters and setters
    get type() {
        return this.getAttribute('type') || TatvaTextAnimation.DEFAULT_CONFIG.type;
    }

    set type(val) {
        if (val) this.setAttribute('type', val);
        else this.removeAttribute('type');
    }

    get words() {
        const config = this.getComponentConfig();
        return config.words;
    }

    set words(val) {
        if (Array.isArray(val)) {
            this.setAttribute('words', JSON.stringify(val));
        } else if (typeof val === 'string') {
            this.setAttribute('words', val);
        } else {
            this.removeAttribute('words');
        }
    }

    get speed() {
        const val = Number(this.getAttribute('speed'));
        return Number.isFinite(val) && val > 0 ? val : TatvaTextAnimation.DEFAULT_CONFIG.speed;
    }

    set speed(val) {
        if (val != null) this.setAttribute('speed', String(val));
        else this.removeAttribute('speed');
    }

    get repeat() {
        const repeatAttr = this.getAttribute('repeat');
        if (repeatAttr !== null) {
            return repeatAttr !== 'false' && repeatAttr !== '0';
        }
        return TatvaTextAnimation.DEFAULT_CONFIG.repeat;
    }

    set repeat(val) {
        if (val) this.setAttribute('repeat', '');
        else this.setAttribute('repeat', 'false');
    }

    /**
     * Sets up shadow DOM and renders the initial component
     */
    connectedCallback() {
        if (!this._isInitialized) {
            this.renderComponent();
            this.init();
            this._isInitialized = true;
        } else {
            // Reconnected: restart cleanly
            this.clearIntervals();
            this.animationComplete = false;
            this.init();
        }
    }

    /**
     * Cleanup when element is removed from DOM to prevent any memory leaks
     */
    disconnectedCallback() {
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
     * Safe timer helper that tracks active timeouts and automatically cleans up
     */
    _safeTimeout(callback, delay) {
        let timerId;
        timerId = setTimeout(() => {
            this._activeTimers.delete(timerId);
            callback();
        }, delay);
        this._activeTimers.add(timerId);
        return timerId;
    }

    /**
     * Clear all active intervals and timeouts to prevent memory leaks and zombie execution
     */
    clearIntervals() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }

        if (this._activeTimers) {
            this._activeTimers.forEach(id => clearTimeout(id));
            this._activeTimers.clear();
        }
    }

    /**
     * Initialization method
     */
    init() {
        const config = this.getComponentConfig();

        // Check for reduced motion preference
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.initReducedMotion(config);
            return;
        }

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
     * Renders full text immediately for users with prefers-reduced-motion
     */
    initReducedMotion(config) {
        const visualEl = this.shadowRoot.querySelector('.textcontainer');
        if (!visualEl) return;
        const text = Array.isArray(config.words) ? config.words.join(' ') : String(config.words);
        visualEl.textContent = text;
        this.animationComplete = true;
        this.dispatchAnimationComplete();
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

        // Parse words attribute - handle JSON array, string, comma-separated, with fallback
        let words = null;
        const wordsAttr = this.getAttribute('words');
        if (wordsAttr) {
            try {
                const parsed = JSON.parse(wordsAttr);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    words = parsed.map(String);
                } else if (parsed != null) {
                    words = [String(parsed)];
                }
            } catch (e) {
                const split = wordsAttr
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
                if (split.length > 0) {
                    words = split;
                }
            }
        }

        // Check textContent if words attribute is absent or empty
        if ((!words || words.length === 0) && this.textContent && this.textContent.trim()) {
            words = [this.textContent.trim()];
        }

        // Final fallback to defaults
        if (!Array.isArray(words) || words.length === 0) {
            words = defaults.words;
        }

        const speedAttr = Number(this.getAttribute('speed'));
        const speed = Number.isFinite(speedAttr) && speedAttr > 0 ? speedAttr : defaults.speed;

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
     * Accessible text is maintained in a screen-reader element so typing doesn't spam screen readers
     * @param {Object} config - Component configuration object
     * @returns {string} Complete HTML structure
     */
    generateMarkup(config) {
        const fullAccessibleText = Array.isArray(config.words) ? config.words.join(', ') : String(config.words);
        return `<span class="sr-only">${fullAccessibleText}</span><div class="textcontainer" part="textcontainer" aria-hidden="true"></div><slot style="display: none;"></slot>`;
    }

    /**
     * Generates raw CSS styles
     * @returns {string} Raw CSS string
     */
    generateCSS() {
        return `
            :host {
                display: inline-block;
                vertical-align: baseline;
                white-space: normal;
                line-height: inherit;
            }

            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }

            .textcontainer {
                position: relative;
                display: inline-block;
                vertical-align: baseline;
                line-height: inherit;
                font-size: var(--tatva-font-size, inherit);
                font-weight: var(--tatva-font-weight, inherit);
                color: var(--tatva-text-color, inherit);
                padding: var(--tatva-text-padding, 0);
                margin: 0;
                width: max-content;
                white-space: normal;
                min-height: 1.2em;
            }
            
            .textcontainer .char {
                display: inline-block;
                white-space: pre;
                transform: scale(5);
                opacity: 0;
                transition: transform 0.4s ease, opacity 0.5s ease;
                vertical-align: baseline;
            }

            .textcontainer .char.letter-fade {
                transform: scale(1);
                opacity: 0;
                transition: opacity var(--tatva-fade-duration, 0.5s) ease;
            }

            .textcontainer .char.letter-fade.show {
                opacity: 1;
            }

            .textcontainer.blinking {
                border-right: var(--tatva-caret-width, 2px) solid var(--tatva-caret-color, currentColor);
                animation: tatva-caret-blink 1.1s infinite;
            }

            .textcontainer.no-repeat {
                border-right: none;
                animation: none;
            }

            @keyframes tatva-caret-blink {
                0%, 50% { border-right-color: var(--tatva-caret-color, currentColor); }
                51%, 100% { border-right-color: transparent; }
            }

            @media (prefers-reduced-motion: reduce) {
                .textcontainer {
                    animation: none !important;
                    border-right: none !important;
                }
                .textcontainer .char {
                    transform: none !important;
                    opacity: 1 !important;
                    transition: none !important;
                }
            }
        `;
    }

    /**
     * Generates the CSS styles for the component
     * @returns {string} Complete CSS styles wrapped in <style> tags
     */
    generateStyles() {
        return `<style>${this.generateCSS()}</style>`;
    }

    /**
     * Common setup for character-based animations (flyin and fade)
     * @param {Object} config - Component configuration object
     * @returns {Array} Array of character spans
     */
    setupCharacterAnimation(config) {
        const element = this.shadowRoot.querySelector('.textcontainer');
        if (!element) return [];

        const text = Array.isArray(config.words) ? config.words.join(' ') : String(config.words);
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
            composed: true,
            detail: { component: this }
        }));
    }

    /**
     * Initializes typing animation with typewriter effect
     * @param {Object} config - Component configuration object
     */
    initTyping(config) {
        const element = this.shadowRoot.querySelector('.textcontainer');
        if (!element) return;

        this.words = config.words;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isForward = true;
        this.skipCharDelay = 15;
        this.cycleCount = 0;

        element.classList.remove('no-repeat');
        element.classList.add('blinking');

        this.typingInterval = setInterval(() => {
            if (this.animationComplete || !this.isConnected) return;

            const currentWord = this.words[this.wordIndex] || '';

            if (this.isForward) {
                this.charIndex++;
            } else {
                this.charIndex--;
            }

            // Check if we've finished typing the current word
            if (this.charIndex >= currentWord.length + this.skipCharDelay) {
                if (!config.repeat && this.wordIndex === this.words.length - 1) {
                    this.animationComplete = true;
                    clearInterval(this.typingInterval);
                    this.typingInterval = null;

                    // Display full word cleanly
                    element.textContent = currentWord;
                    this.dispatchAnimationComplete();
                    return;
                }

                // Start erasing
                this.isForward = false;
            } else if (this.charIndex <= 0) {
                // Move to next word
                this.isForward = true;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;

                if (this.wordIndex === 0) {
                    this.cycleCount++;
                }
            }

            element.textContent = currentWord.slice(0, Math.max(0, this.charIndex));
        }, config.speed);
    }

    /**
     * Initializes fly-in animation where characters scale and fade in
     * @param {Object} config - Component configuration object
     */
    initFlyin(config) {
        const charSpans = this.setupCharacterAnimation(config);
        if (charSpans.length === 0) return;

        let completedAnimations = 0;

        charSpans.forEach((span, index) => {
            this._safeTimeout(() => {
                if (this.animationComplete || !this.isConnected) return;

                span.style.transform = "scale(1)";
                span.style.opacity = "1";
                completedAnimations++;

                // Check if all character animations are complete
                if (completedAnimations === charSpans.length) {
                    if (!config.repeat) {
                        this.animationComplete = true;
                        this.dispatchAnimationComplete();
                    } else {
                        // Restart after delay if repeat is true
                        this._safeTimeout(() => {
                            if (!this.animationComplete && this.isConnected) {
                                this.resetAndRestart(config);
                            }
                        }, 2000);
                    }
                }
            }, index * config.speed);
        });
    }

    /**
     * Initializes letter fade animation where characters fade in sequentially
     * @param {Object} config - Component configuration object
     */
    initLetterFade(config) {
        const charSpans = this.setupCharacterAnimation(config);
        if (charSpans.length === 0) return;

        let completedAnimations = 0;

        charSpans.forEach((span, index) => {
            span.classList.add('letter-fade');

            this._safeTimeout(() => {
                if (this.animationComplete || !this.isConnected) return;

                span.classList.add('show');
                completedAnimations++;

                // Check if all character animations are complete
                if (completedAnimations === charSpans.length) {
                    if (!config.repeat) {
                        this.animationComplete = true;
                        this.dispatchAnimationComplete();
                    } else {
                        // Restart after delay if repeat is true
                        this._safeTimeout(() => {
                            if (!this.animationComplete && this.isConnected) {
                                this.resetAndRestart(config);
                            }
                        }, 2000);
                    }
                }
            }, index * config.speed);
        });
    }

    /**
     * Resets and restarts the animation cleanly
     * @param {Object} config - Component configuration object
     */
    resetAndRestart(config) {
        this.clearIntervals();

        const charSpans = this.shadowRoot.querySelectorAll('.char');
        charSpans.forEach(span => {
            if (config.type === 'flyin') {
                span.style.transform = "scale(5)";
                span.style.opacity = "0";
            } else if (config.type === 'fade') {
                span.classList.remove('show');
                span.style.opacity = "0";
            }
        });

        this._safeTimeout(() => {
            if (this.isConnected) {
                if (config.type === 'flyin') {
                    this.initFlyin(config);
                } else if (config.type === 'fade') {
                    this.initLetterFade(config);
                }
            }
        }, 500);
    }
}

// Expose class globally for external access in browser environments
if (typeof window !== 'undefined') {
    window.TatvaTextAnimation = TatvaTextAnimation;
    if (typeof window.customElements !== 'undefined' && !window.customElements.get('tatva-text-animation')) {
        window.customElements.define('tatva-text-animation', TatvaTextAnimation);
    }
}

export default TatvaTextAnimation;
