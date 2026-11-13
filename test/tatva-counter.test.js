import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaCounter } from '../src/elements/tatva-counter.js';

describe('TatvaCounter', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-counter');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration and attaches shadow root', () => {
        expect(el.duration).toBe(1200);
        expect(el.animation).toBe('odometer');
        expect(el.onScroll).toBe(true);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('synchronizes properties with attributes', () => {
        el.target = '500';
        expect(el.getAttribute('target')).toBe('500');
        expect(el.target).toBe('500');

        el.duration = 2000;
        expect(el.getAttribute('duration')).toBe('2000');
        expect(el.duration).toBe(2000);

        el.animation = 'linear';
        expect(el.getAttribute('animation')).toBe('linear');
        expect(el.animation).toBe('linear');

        el.onScroll = false;
        expect(el.onScroll).toBe(false);

        el.onScroll = true;
        expect(el.onScroll).toBe(true);
    });

    it('renders odometer reels when animation is odometer', () => {
        el.animation = 'odometer';
        el.onScroll = false;
        el.target = '1,500';

        const container = el.shadowRoot.querySelector('.container');
        expect(container).not.toBeNull();
        const odo = container.querySelector('.odometer');
        expect(odo).not.toBeNull();

        const digits = odo.querySelectorAll('.digit');
        expect(digits.length).toBe(4);

        const symbols = odo.querySelectorAll('.symbol');
        expect(symbols.length).toBe(1);
        expect(symbols[0].textContent).toBe(',');
    });

    it('renders numeric container when animation is linear', () => {
        el.animation = 'linear';
        el.onScroll = false;
        el.target = '250';

        const container = el.shadowRoot.querySelector('.container');
        expect(container).not.toBeNull();
        const num = container.querySelector('.numeric');
        expect(num).not.toBeNull();
    });

    it('reads slotted text as target number when target attribute is not set', () => {
        const slottedEl = document.createElement('tatva-counter');
        slottedEl.onScroll = false;
        slottedEl.textContent = '999';
        document.body.appendChild(slottedEl);

        const container = slottedEl.shadowRoot.querySelector('.container');
        expect(container).not.toBeNull();
        const digits = container.querySelectorAll('.digit');
        expect(digits.length).toBe(3);

        slottedEl.remove();
    });

    it('sets aria-label attribute for accessibility', () => {
        el.onScroll = false;
        el.target = '1,250';
        expect(el.getAttribute('aria-label')).toBe('1,250');
    });

    it('cleans up resources on disconnectedCallback', () => {
        expect(() => {
            el.disconnectedCallback();
        }).not.toThrow();
    });
});
