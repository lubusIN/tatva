import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaImageCompare } from '../src/elements/tatva-image-compare.js';

describe('TatvaImageCompare', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-image-compare');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration', () => {
        expect(el.handle).toBe('line');
        expect(el.hover).toBe(false);
        expect(el.hideArrows).toBe(false);
        expect(el.getSliderPosition()).toBe(50);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('clamps slider position between 0 and 100', () => {
        el.setSliderPosition(75);
        expect(el.getSliderPosition()).toBe(75);

        el.setSliderPosition(-10);
        expect(el.getSliderPosition()).toBe(0);

        el.setSliderPosition(120);
        expect(el.getSliderPosition()).toBe(100);
    });

    it('synchronizes properties with attributes', () => {
        el.handle = 'circle';
        expect(el.getAttribute('handle')).toBe('circle');
        expect(el.handle).toBe('circle');

        el.hover = true;
        expect(el.hover).toBe(true);
        expect(el.hasAttribute('hover')).toBe(true);

        el.hover = false;
        expect(el.hover).toBe(false);
        expect(el.hasAttribute('hover')).toBe(false);

        el.hideArrows = true;
        expect(el.hideArrows).toBe(true);
        expect(el.hasAttribute('hide-arrows')).toBe(true);

        el.hideArrows = false;
        expect(el.hideArrows).toBe(false);
        expect(el.hasAttribute('hide-arrows')).toBe(false);
    });

    it('dispatches slider-move custom event on position change', () => {
        let receivedEvent = null;

        el.addEventListener('slider-move', (e) => {
            receivedEvent = e;
        });

        el.setSliderPosition(60);
        expect(receivedEvent).not.toBeNull();
        expect(receivedEvent.detail.percentage).toBe(60);
    });

    it('handles keyboard navigation correctly', () => {
        el.setSliderPosition(50);

        // ArrowRight: +2%
        el.handleKeyboardNavigation({ key: 'ArrowRight', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(52);

        // ArrowLeft: -2%
        el.handleKeyboardNavigation({ key: 'ArrowLeft', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(50);

        // PageUp: +10%
        el.handleKeyboardNavigation({ key: 'PageUp', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(60);

        // PageDown: -10%
        el.handleKeyboardNavigation({ key: 'PageDown', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(50);

        // Home: 0%
        el.handleKeyboardNavigation({ key: 'Home', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(0);

        // End: 100%
        el.handleKeyboardNavigation({ key: 'End', preventDefault() {} });
        expect(el.getSliderPosition()).toBe(100);
    });

    it('generates styles with white-space normal and responsive rules', () => {
        const styles = el.generateStyles();
        expect(styles).toContain('white-space: normal');
        expect(styles).toContain('clip-path: inset');
        expect(styles).toContain('[part="slider-handle"].bar');
    });
});
