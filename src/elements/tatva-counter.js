/**
 * TatvaCounter - A custom web component for rendering animated numbers and rolling odometer reels.
 */
export class TatvaCounter extends HTMLElement {
    static get DEFAULT_CONFIG() {
        return {
            target: null,
            duration: 1200,
            animation: 'odometer',
            onScroll: true,
        };
    }

    static get observedAttributes() {
        return ['target', 'duration', 'animation', 'on-scroll'];
    }

    static convertAttributeToBoolean(value) {
        if (value === null || value === undefined) {
            return null;
        }
        return value === '' || value === 'true' || value === true;
    }

    constructor() {
        super();
        this._isInitialized = false;
        this._hasAnimated = false;
        this._observer = null;
        this._rafId = null;
        this.attachShadow({ mode: 'open' });
    }

    get target() {
        return this.getAttribute('target');
    }

    set target(val) {
        if (val !== null && val !== undefined) {
            this.setAttribute('target', String(val));
        } else {
            this.removeAttribute('target');
        }
    }

    get duration() {
        const val = parseInt(this.getAttribute('duration'), 10);
        return Number.isFinite(val) && val > 0 ? val : TatvaCounter.DEFAULT_CONFIG.duration;
    }

    set duration(val) {
        if (val) this.setAttribute('duration', String(val));
        else this.removeAttribute('duration');
    }

    get animation() {
        return this.getAttribute('animation') || TatvaCounter.DEFAULT_CONFIG.animation;
    }

    set animation(val) {
        if (val) this.setAttribute('animation', val);
        else this.removeAttribute('animation');
    }

    get onScroll() {
        return (
            TatvaCounter.convertAttributeToBoolean(this.getAttribute('on-scroll')) ??
            TatvaCounter.DEFAULT_CONFIG.onScroll
        );
    }

    set onScroll(val) {
        if (val) this.setAttribute('on-scroll', '');
        else this.setAttribute('on-scroll', 'false');
    }

    connectedCallback() {
        if (!this._isInitialized) {
            this.renderComponent();
            this._isInitialized = true;
        }
        this.init();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._isInitialized && oldValue !== newValue) {
            this.cleanup();
            this.init();
        }
    }

    cleanup() {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
    }

    prefersReducedMotion() {
        return (
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );
    }

    renderComponent() {
        const style = document.createElement('style');
        style.textContent = this.generateCSS();

        const container = document.createElement('span');
        container.className = 'container';
        container.setAttribute('part', 'container');

        const slot = document.createElement('slot');
        slot.style.display = 'none';
        slot.addEventListener('slotchange', () => {
            if (this._isInitialized && !this.target) {
                this.init();
            }
        });

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
        this.shadowRoot.appendChild(slot);
    }

    generateCSS() {
        return `
            :host {
                display: inline-block;
                font-variant-numeric: tabular-nums;
                line-height: inherit;
                vertical-align: baseline;
            }

            .container {
                display: inline-flex;
                align-items: baseline;
                vertical-align: baseline;
                line-height: inherit;
            }

            .odometer {
                display: inline-flex;
                align-items: baseline;
                vertical-align: baseline;
                line-height: inherit;
            }

            .digit {
                display: inline-block;
                position: relative;
                overflow: hidden;
                vertical-align: baseline;
                line-height: inherit;
            }

            .spacer {
                visibility: hidden;
                display: block;
                pointer-events: none;
                user-select: none;
                line-height: inherit;
            }

            .ribbon {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                will-change: transform;
                transform: translateY(0%);
            }

            .item {
                display: block;
                text-align: center;
                line-height: inherit;
            }

            .symbol {
                display: inline-block;
                line-height: inherit;
            }

            .numeric {
                display: inline-block;
                line-height: inherit;
            }

            @media (prefers-reduced-motion: reduce) {
                .ribbon {
                    transition: none !important;
                    animation: none !important;
                }
            }
        `;
    }

    init() {
        this.cleanup();
        this._hasAnimated = false;

        if (this.onScroll && typeof IntersectionObserver !== 'undefined') {
            this._observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !this._hasAnimated) {
                            this._hasAnimated = true;
                            if (this._observer) {
                                this._observer.unobserve(this);
                            }
                            this.start();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            this._observer.observe(this);
        } else {
            this.start();
        }
    }

    getRawText() {
        if (this.target !== null && this.target !== undefined && this.target !== '') {
            return String(this.target).trim();
        }
        const slot = this.shadowRoot ? this.shadowRoot.querySelector('slot') : null;
        if (slot) {
            const assigned = slot.assignedNodes();
            if (assigned.length > 0) {
                const text = assigned.map((n) => n.textContent).join('').trim();
                if (text) return text;
            }
        }
        return (this.textContent ?? '').trim();
    }

    start() {
        const container = this.shadowRoot.querySelector('.container');
        if (!container) return;

        const raw = this.getRawText();
        if (!raw) return;

        this.setAttribute('aria-label', raw);

        const clean = raw.replace(/,/g, '');
        const targetNumber = parseFloat(clean);

        if (isNaN(targetNumber)) {
            container.textContent = raw;
            return;
        }

        const mode = (this.animation || 'odometer').toLowerCase();
        const duration = this.duration;
        const reducedMotion = this.prefersReducedMotion();

        if (mode === 'odometer') {
            this.animateOdometer(container, raw, duration, reducedMotion);
        } else {
            const decimals = (clean.split('.')[1] || '').length;
            this.animateNumeric(container, targetNumber, decimals, duration, mode, reducedMotion);
        }
    }

    animateOdometer(container, rawText, duration, reducedMotion) {
        const chars = rawText.split('');
        const odo = document.createElement('span');
        odo.className = 'odometer';

        let digitCount = 0;
        chars.forEach((ch) => {
            if (/\d/.test(ch)) digitCount++;
        });

        let currentDigit = 0;
        const ribbons = [];

        chars.forEach((ch) => {
            if (!/\d/.test(ch)) {
                const sym = document.createElement('span');
                sym.className = 'symbol';
                sym.setAttribute('part', 'symbol');
                sym.textContent = ch;
                odo.appendChild(sym);
                return;
            }

            const targetDigit = parseInt(ch, 10);
            const digitEl = document.createElement('span');
            digitEl.className = 'digit';
            digitEl.setAttribute('part', 'digit');

            const spacer = document.createElement('span');
            spacer.className = 'spacer';
            spacer.textContent = '0';
            digitEl.appendChild(spacer);

            const ribbon = document.createElement('span');
            ribbon.className = 'ribbon';
            ribbon.setAttribute('part', 'ribbon');

            const cycles = 1 + Math.floor((currentDigit / Math.max(1, digitCount - 1)) * 2);
            currentDigit++;

            const items = [0];
            for (let c = 0; c < cycles; c++) {
                for (let d = 0; d <= 9; d++) {
                    items.push(d);
                }
            }
            items.push(targetDigit);

            const totalItems = items.length;
            const targetIndex = totalItems - 1;

            items.forEach((num) => {
                const item = document.createElement('span');
                item.className = 'item';
                item.textContent = String(num);
                ribbon.appendChild(item);
            });

            digitEl.appendChild(ribbon);
            odo.appendChild(digitEl);

            ribbons.push({
                ribbon,
                targetIndex,
                totalItems,
            });
        });

        container.innerHTML = '';
        container.appendChild(odo);

        if (reducedMotion) {
            ribbons.forEach(({ ribbon, targetIndex, totalItems }) => {
                ribbon.style.transform = `translateY(-${(targetIndex / totalItems) * 100}%)`;
            });
            this.dispatchComplete(rawText);
            return;
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ribbons.forEach(({ ribbon, targetIndex, totalItems }, idx) => {
                    const stagger = (idx / Math.max(1, ribbons.length)) * 120;
                    const digitDuration = duration + stagger;
                    ribbon.style.transition = `transform ${digitDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
                    ribbon.style.transform = `translateY(-${(targetIndex / totalItems) * 100}%)`;
                });

                setTimeout(() => {
                    this.dispatchComplete(rawText);
                }, duration + 150);
            });
        });
    }

    animateNumeric(container, target, decimals, duration, mode, reducedMotion) {
        const formatNumber = (val) =>
            Number(val).toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });

        const numEl = document.createElement('span');
        numEl.className = 'numeric';
        container.innerHTML = '';
        container.appendChild(numEl);

        if (reducedMotion) {
            numEl.textContent = formatNumber(target);
            this.dispatchComplete(formatNumber(target));
            return;
        }

        let startTime = null;

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const randomLike = () => {
            const pow = Math.pow(10, decimals);
            const n = Math.random() * Math.max(1, Math.abs(target));
            return Math.round(n * pow) / pow;
        };

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            let current;
            switch (mode) {
                case 'steps': {
                    const steps = 15;
                    const snapped = Math.ceil(progress * steps) / steps;
                    current = target * snapped;
                    break;
                }
                case 'scramble': {
                    current =
                        progress < 0.8
                            ? randomLike()
                            : target * easeOutCubic((progress - 0.8) / 0.2);
                    break;
                }
                case 'linear':
                default:
                    current = target * progress;
                    break;
            }

            if (progress < 1) {
                numEl.textContent = formatNumber(current);
                this._rafId = requestAnimationFrame(step);
            } else {
                numEl.textContent = formatNumber(target);
                this._rafId = null;
                this.dispatchComplete(formatNumber(target));
            }
        };

        numEl.textContent = formatNumber(0);
        this._rafId = requestAnimationFrame(step);
    }

    dispatchComplete(val) {
        this.dispatchEvent(
            new CustomEvent('complete', {
                bubbles: true,
                composed: true,
                detail: { value: val },
            })
        );
    }
}

export class TatvaNumberCounter extends TatvaCounter {}

if (typeof window !== 'undefined') {
    window.TatvaCounter = TatvaCounter;
    window.TatvaNumberCounter = TatvaNumberCounter;
    if (typeof window.customElements !== 'undefined') {
        if (!window.customElements.get('tatva-counter')) {
            window.customElements.define('tatva-counter', TatvaCounter);
        }
        if (!window.customElements.get('tatva-number-counter')) {
            window.customElements.define('tatva-number-counter', TatvaNumberCounter);
        }
    }
}

export default TatvaCounter;
