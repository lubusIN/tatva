import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaPulse } from '../src/elements/tatva-pulse.js';

describe('TatvaPulse', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-pulse');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration', () => {
        expect(el.size).toBe('0.75rem');
        expect(el.color).toBe('#000000');
        expect(el.animationDuration).toBe('1s');
        expect(el.gap).toBe('10px');
        expect(el.position).toBe('left');
        expect(el.superscriptOffset).toBe('-0.5em');
        expect(el.shadowRoot).not.toBeNull();
    });

    it('synchronizes properties with attributes', () => {
        el.size = '1.25rem';
        expect(el.getAttribute('size')).toBe('1.25rem');
        expect(el.size).toBe('1.25rem');

        el.color = '#10b981';
        expect(el.getAttribute('color')).toBe('#10b981');
        expect(el.color).toBe('#10b981');

        el.gap = '15px';
        expect(el.getAttribute('gap')).toBe('15px');
        expect(el.gap).toBe('15px');

        el.position = 'superscript';
        expect(el.getAttribute('position')).toBe('superscript');
        expect(el.position).toBe('superscript');

        el.superscriptOffset = '-0.8em';
        expect(el.getAttribute('superscript-offset'), '-0.8em');
        expect(el.superscriptOffset).toBe('-0.8em');

        el.animationDuration = '2.5s';
        expect(el.getAttribute('animation-duration')).toBe('2.5s');
        expect(el.animationDuration).toBe('2.5s');
    });

    it('observes animation-duration attribute', () => {
        expect(TatvaPulse.observedAttributes).toContain('animation-duration');
    });

    it('renders clean markup without newlines around slot', () => {
        const markup = el.generateMarkup();

        expect(markup.includes('\n')).toBe(false);
        expect(markup).toContain('<div class="content-wrapper" part="content"><slot></slot></div>');
        expect(markup).toContain('aria-hidden="true"');
    });

    it('includes white-space normal and accessibility media queries in styles', () => {
        const config = el.getComponentConfig();
        const styles = el.generateStyles(config);

        expect(styles).toContain('white-space: normal');
        expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
        expect(styles).toContain('@media (prefers-contrast: high)');
    });

    it('uses inline layout and vertical-align baseline to prevent layout shift', () => {
        const config = el.getComponentConfig();
        const css = el.generateCSS(config);

        expect(css).toMatch(/:host\s*\{[^}]*display:\s*inline;/);
        expect(css).toMatch(/\.pulse-container\s*\{[^}]*vertical-align:\s*baseline;/);
        expect(css).toMatch(/\.content-wrapper\s*\{[^}]*vertical-align:\s*baseline;/);
        expect(css).toMatch(/\.content-wrapper\s*\{[^}]*line-height:\s*inherit;/);
    });
});
