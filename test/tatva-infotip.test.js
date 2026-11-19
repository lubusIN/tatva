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

    it('uses inline layout and vertical-align baseline to prevent paragraph layout shifts', () => {
        const config = el.getComponentConfig();
        const css = el.generateCSS(config);

        expect(css).toMatch(/:host\s*\{[^}]*display:\s*inline;/);
        expect(css).toMatch(/\.wrapper\s*\{[^}]*display:\s*inline;/);
        expect(css).toMatch(/\.text\s*\{[^}]*display:\s*inline;/);
        expect(css).toMatch(/\.wrapper\s*\{[^}]*vertical-align:\s*baseline;/);
        expect(css).toMatch(/\.text\s*\{[^}]*vertical-align:\s*baseline;/);
    });

    it('positions arrow accurately relative to anchor and tooltip boundaries', () => {
        const pos = el.calculateArrowPosition('top', { left: 100, top: 100, width: 40, height: 20 }, { width: 100, height: 50 }, { offsetWidth: 8 }, 70, 40);
        expect(pos.mainProp).toBe('left');
        expect(pos.pinProp).toBe('bottom');
        // Anchor center is 120. Tooltip left is 70. Center is 120 - 70 - 4 = 46.
        expect(pos.center).toBe(46);
    });

    it('correctly compensates tooltip position when inside a transformed containing block', () => {
        const tooltip = el.shadowRoot.querySelector('.infotip');

        // Without containing block
        el.applyTooltipStyles(tooltip, 150, 200);
        expect(tooltip.style.left).toBe('150px');
        expect(tooltip.style.top).toBe('200px');

        // Mock a transformed container
        const mockCb = document.createElement('div');
        mockCb.getBoundingClientRect = () => ({ left: 50, top: 80, width: 300, height: 200 });
        Object.defineProperty(mockCb, 'clientLeft', { value: 2, configurable: true });
        Object.defineProperty(mockCb, 'clientTop', { value: 4, configurable: true });
        Object.defineProperty(mockCb, 'scrollLeft', { value: 10, configurable: true });
        Object.defineProperty(mockCb, 'scrollTop', { value: 20, configurable: true });

        // Spy or mock getContainingBlock
        const origGetCb = el.getContainingBlock;
        el.getContainingBlock = () => mockCb;

        el.applyTooltipStyles(tooltip, 150, 200);
        // expected x: 150 - (50 + 2) + 10 = 108
        // expected y: 200 - (80 + 4) + 20 = 136
        expect(tooltip.style.left).toBe('108px');
        expect(tooltip.style.top).toBe('136px');

        el.getContainingBlock = origGetCb;
    });

    it('escapes content in generateMarkup to prevent stored XSS injection', () => {
        const payload = '<img src=x onerror=alert(document.domain)>';
        el.setAttribute('content', payload);
        const markup = el.generateMarkup(el.getComponentConfig());

        expect(markup).not.toContain('<img');
        expect(markup).toContain('&lt;img src=x onerror=alert(document.domain)&gt;');
    });

    it('ensures author-supplied content reaches the DOM as text on first render', () => {
        const testEl = document.createElement('tatva-infotip');
        const payload = '<img src=x onerror=alert(document.domain)>';
        testEl.setAttribute('content', payload);
        document.body.appendChild(testEl);

        const imgInShadow = testEl.shadowRoot.querySelector('img');
        expect(imgInShadow).toBeNull();

        const slot = testEl.shadowRoot.querySelector('.infotip-popover-content slot');
        expect(slot).not.toBeNull();
        expect(slot.children.length).toBe(0);
        expect(slot.textContent).toBe(payload);

        testEl.remove();
    });

    it('updates content as text without creating HTML elements on attribute change', () => {
        const payload = '<script>alert(1)</script>';
        el.setAttribute('content', payload);

        expect(el.shadowRoot.querySelector('script')).toBeNull();
        const slot = el.shadowRoot.querySelector('.infotip-popover-content slot');
        expect(slot.children.length).toBe(0);
        expect(slot.textContent).toBe(payload);
    });

    it('reverts content to default when content attribute is removed', () => {
        el.setAttribute('content', 'Temporary text');
        expect(el.shadowRoot.querySelector('.infotip-popover-content slot').textContent).toBe('Temporary text');

        el.removeAttribute('content');
        expect(el.shadowRoot.querySelector('.infotip-popover-content slot').textContent).toBe(TatvaInfotip.DEFAULT_CONFIG.content);
    });

    it('prevents style breakout when CSS custom properties or colors contain closing style tag', () => {
        const payload = 'red</style><img src=x onerror=alert(1)>';
        el.setAttribute('overlay-background-color', payload);
        const styles = el.generateStyles(el.getComponentConfig());

        expect(styles.toLowerCase()).not.toContain('</style><img');
        expect(styles).toContain('<\\/style');
    });

    it('safely handles non-existent or prototype icon types in updateIcon', () => {
        el.setAttribute('icon-enabled', 'true');
        el.setAttribute('icon-type', 'constructor');
        el.updateIcon();

        const icon = el.shadowRoot.querySelector('.icon');
        expect(icon.innerHTML).toContain('<svg');
        expect(icon.innerHTML).not.toContain('function Object');
    });
});
