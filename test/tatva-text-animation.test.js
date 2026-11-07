import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaTextAnimation } from '../src/elements/tatva-text-animation.js';

describe('TatvaTextAnimation', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-text-animation');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration', () => {
        expect(el.type).toBe('typing');
        expect(el.words).toEqual(['Hello Lubus', 'From Tatva']);
        expect(el.speed).toBe(100);
        expect(el.repeat).toBe(false);
        expect(el.shadowRoot).not.toBeNull();
    });

    it('synchronizes properties with attributes', () => {
        el.type = 'flyin';
        expect(el.getAttribute('type')).toBe('flyin');
        expect(el.type).toBe('flyin');

        el.words = ['Word 1', 'Word 2'];
        expect(el.words).toEqual(['Word 1', 'Word 2']);

        el.speed = 150;
        expect(el.getAttribute('speed')).toBe('150');
        expect(el.speed).toBe(150);

        el.repeat = true;
        expect(el.repeat).toBe(true);

        el.repeat = false;
        expect(el.repeat).toBe(false);
    });

    it('defensively handles invalid or empty words inputs', () => {
        el.setAttribute('words', '[]');
        const config = el.getComponentConfig();
        expect(Array.isArray(config.words) && config.words.length > 0).toBe(true);

        el.setAttribute('words', 'Apple, Banana, Orange');
        const parsed = el.getComponentConfig().words;
        expect(parsed).toEqual(['Apple', 'Banana', 'Orange']);
    });

    it('tracks active timers and cleans them up without memory leaks', () => {
        let executed = false;
        el._safeTimeout(() => { executed = true; }, 1000);
        expect(el._activeTimers.size).toBe(1);

        el.clearIntervals();
        expect(el._activeTimers.size).toBe(0);
        expect(executed).toBe(false);
    });

    it('provides accessible text and hides animated characters from screen readers', () => {
        const markup = el.generateMarkup(el.getComponentConfig());

        expect(markup).toContain('<span class="sr-only">');
        expect(markup).toContain('aria-hidden="true"');
    });

    it('dispatches animationComplete custom event', () => {
        let eventFired = false;

        el.addEventListener('animationComplete', (e) => {
            eventFired = true;
            expect(e.detail.component).toBe(el);
        });

        el.dispatchAnimationComplete();
        expect(eventFired).toBe(true);
    });

    it('falls back to textContent when words attribute is missing', () => {
        const customEl = document.createElement('tatva-text-animation');
        customEl.textContent = 'Inline Text';
        const config = customEl.getComponentConfig();
        expect(config.words).toEqual(['Inline Text']);
    });

    it('inherits typography and aligns to baseline for inline usage', () => {
        const css = el.generateCSS();

        expect(css).toMatch(/:host\s*\{[^}]*vertical-align:\s*baseline;/);
        expect(css).toMatch(/\.textcontainer\s*\{[^}]*vertical-align:\s*baseline;/);
        expect(css).toContain('font-size: var(--tatva-font-size, inherit);');
        expect(css).toContain('font-weight: var(--tatva-font-weight, inherit);');
        expect(css).toContain('color: var(--tatva-text-color, inherit);');
        expect(css).toContain('line-height: inherit;');
    });
});
