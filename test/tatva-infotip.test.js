import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TatvaInfotip } from '../src/elements/tatva-infotip.js';

describe('TatvaInfotip', () => {
    let el;

    beforeEach(() => {
        el = document.createElement('tatva-infotip');
        document.body.appendChild(el);
    });

    afterEach(() => {
        el.remove();
    });

    it('initializes with default configuration', () => {
        expect(el.content).toBe('Hello world');
        expect(el.underline).toBe(false);
        expect(el.iconEnabled).toBe(false);
        expect(el.iconPosition).toBe('left');
        expect(el.iconType).toBe('info');
        expect(el.offset).toBe(6);
        expect(el.overlayPlacement).toBe('top');
        expect(el.iconColor).toBe('#000');
        expect(el.overlayTextColor).toBe('#fff');
        expect(el.overlayBackgroundColor).toBe('#000');
        expect(el.shadowRoot).not.toBeNull();
    });

    it('synchronizes properties with attributes', () => {
        el.content = 'Custom tip';
        expect(el.getAttribute('content')).toBe('Custom tip');
        expect(el.content).toBe('Custom tip');

        el.underline = true;
        expect(el.underline).toBe(true);
        el.underline = false;
        expect(el.underline).toBe(false);

        el.iconEnabled = true;
        expect(el.iconEnabled).toBe(true);
        el.iconEnabled = false;
        expect(el.iconEnabled).toBe(false);

        el.offset = 12;
        expect(el.getAttribute('offset')).toBe('12');
        expect(el.offset).toBe(12);

        el.overlayPlacement = 'bottom-start';
        expect(el.getAttribute('overlay-placement')).toBe('bottom-start');
        expect(el.overlayPlacement).toBe('bottom-start');
    });

    it('handles boolean attributes according to HTML standards', () => {
        el.setAttribute('underline', '');
        expect(el.underline).toBe(true);

        el.setAttribute('underline', 'true');
        expect(el.underline).toBe(true);

        el.setAttribute('underline', 'false');
        expect(el.underline).toBe(false);

        el.removeAttribute('underline');
        expect(el.underline).toBe(false);
    });

    it('contains all documented icon SVG definitions', () => {
        const icons = ['info', 'help', 'caution', 'error', 'notAllowed', 'starEmpty'];
        icons.forEach(name => {
            expect(TatvaInfotip.ICONS[name]).toBeDefined();
            expect(TatvaInfotip.ICONS[name]).toContain('<path');
        });
    });

    it('manages tooltip open/closed state correctly', () => {
        expect(el.isOpen).toBe(false);

        el.showTooltip();
        expect(el.isOpen).toBe(true);

        el.hideTooltip();
        expect(el.isOpen).toBe(false);
    });

    it('closes tooltip when Escape key is pressed (WCAG 2.1 SC 1.4.13)', () => {
        el.showTooltip();
        expect(el.isOpen).toBe(true);

        let stopped = false;
        el.handleKeyDown({ key: 'Escape', stopPropagation() { stopped = true; } });
        expect(el.isOpen).toBe(false);
        expect(stopped).toBe(true);
    });

    it('renders clean markup without newlines and supports rich content slot', () => {
        const markup = el.generateMarkup(el.getComponentConfig());

        expect(markup.includes('\n')).toBe(false);
        expect(markup).toContain('<slot name="content">');
        expect(markup).toContain('role="tooltip"');
    });

    it('resets white-space to normal in styles', () => {
        const css = el.generateCSS(el.getComponentConfig());
        expect(css).toContain('white-space: normal');
    });
});
