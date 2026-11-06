import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaMarker } from '../src/elements/tatva-marker.js';

describe('TatvaMarker', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-marker');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration and attaches shadow root', () => {
        expect(el.type).toBe('circle');
        expect(el.color).toBe('#ff0000');
        expect(el.animation).toBe(true);
        expect(el.animationDuration).toBe('5s');
        expect(el.animationFunction).toBe('ease-in');
        expect(el.shadowRoot).not.toBeNull();
    });

    it('synchronizes properties with attributes', () => {
        el.type = 'curly';
        expect(el.getAttribute('type')).toBe('curly');
        expect(el.type).toBe('curly');

        el.color = '#3b82f6';
        expect(el.getAttribute('color')).toBe('#3b82f6');
        expect(el.color).toBe('#3b82f6');

        el.animation = false;
        expect(el.animation).toBe(false);

        el.animation = true;
        expect(el.animation).toBe(true);

        el.animationDuration = '2s';
        expect(el.getAttribute('animation-duration')).toBe('2s');
        expect(el.animationDuration).toBe('2s');

        el.animationFunction = 'linear';
        expect(el.getAttribute('animation-function')).toBe('linear');
        expect(el.animationFunction).toBe('linear');
    });

    it('updates SVG path when type changes', () => {
        el.type = 'strikethrough';
        const svg = el.shadowRoot.querySelector('svg');
        expect(svg.innerHTML).toContain('d="M3,75h493.5"');
    });

    it('contains all documented marker SVG path definitions', () => {
        const types = [
            'circle', 'curly', 'underline', 'double',
            'double-underline', 'underline-zigzag', 'strikethrough', 'cross', 'strike'
        ];
        types.forEach(t => {
            expect(TatvaMarker.PATHS[t]).toBeDefined();
            expect(TatvaMarker.PATHS[t]).toContain('<path');
        });
    });

    it('identifies bottom types correctly', () => {
        const bottomTypes = ['underline-zigzag', 'double-underline', 'underline', 'curly'];
        bottomTypes.forEach(t => {
            expect(TatvaMarker.BOTTOM_TYPES.has(t)).toBe(true);
        });
        expect(TatvaMarker.BOTTOM_TYPES.has('circle')).toBe(false);
        expect(TatvaMarker.BOTTOM_TYPES.has('cross')).toBe(false);
    });

    it('prevents Verse block line breaks by eliminating newlines around slot', () => {
        const config = el.getComponentConfig();
        const markup = el.generateMarkup(config);

        // Crucial test: Markup must not contain newlines or indentation around the slot
        expect(markup.includes('\n')).toBe(false);
        expect(markup).toContain('<span class="text" part="text"><slot></slot></span>');
    });

    it('resets white-space to normal in CSS for Verse and pre blocks', () => {
        const config = el.getComponentConfig();
        const css = el.generateCSS(config);

        expect(css).toContain('white-space: normal');
    });

    it('provides vertical alignment and line-height inheritance to prevent multi-line spacing while supporting padding override', () => {
        const config = el.getComponentConfig();
        const css = el.generateCSS(config);

        expect(css).toContain('padding-block: var(--tatva-marker-padding-block, 0)');
        expect(css).toContain('vertical-align: baseline');
        expect(css).toContain('line-height: inherit');
    });

    it('implements prefers-reduced-motion for WCAG 2.3.3 accessibility', () => {
        const config = el.getComponentConfig();
        const css = el.generateCSS(config);

        expect(css).toContain('@media (prefers-reduced-motion: reduce)');
        expect(css).toContain('animation: none !important');
        expect(css).toContain('stroke-dashoffset: 0 !important');
    });

    it('generateCSS does not include style tags', () => {
        const css = el.generateCSS(el.getComponentConfig());
        expect(css.includes('<style>')).toBe(false);
        expect(css.includes('</style>')).toBe(false);
    });
});
