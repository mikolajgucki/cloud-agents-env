/**
 * Tests for index.html
 * Validates that the HTML file meets all requirements
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('index.html', () => {
    let dom;
    let document;
    let window;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, 'index.html');
        const html = fs.readFileSync(htmlPath, 'utf-8');
        dom = new JSDOM(html);
        document = dom.window.document;
        window = dom.window;
    });

    describe('Document structure', () => {
        test('should be valid HTML5 document', () => {
            expect(document.doctype).toBeTruthy();
            expect(document.doctype.name).toBe('html');
        });

        test('should have proper meta tags', () => {
            const charset = document.querySelector('meta[charset]');
            expect(charset).toBeTruthy();
            expect(charset.getAttribute('charset')).toBe('UTF-8');

            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
        });

        test('should have a title', () => {
            const title = document.querySelector('title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBeTruthy();
        });

        test('should have lang attribute', () => {
            const html = document.documentElement;
            expect(html.getAttribute('lang')).toBe('en');
        });
    });

    describe('Content requirements', () => {
        test('should contain "Hello world!" text', () => {
            const message = document.querySelector('.message');
            expect(message).toBeTruthy();
            expect(message.textContent).toBe('Hello world!');
        });

        test('should use semantic HTML (h1 tag)', () => {
            const h1 = document.querySelector('h1');
            expect(h1).toBeTruthy();
            expect(h1.textContent).toBe('Hello world!');
        });
    });

    describe('Styling requirements', () => {
        let styles;
        let bodyStyles;
        let messageStyles;

        beforeAll(() => {
            const styleTag = document.querySelector('style');
            expect(styleTag).toBeTruthy();
            styles = styleTag.textContent;

            bodyStyles = extractAllBodyStyles(styles);
            messageStyles = extractStyles(styles, '.message');
        });

        test('should have dark gray background', () => {
            expect(bodyStyles).toContain('background-color');
            expect(bodyStyles.toLowerCase()).toMatch(/#1c1c1e|#2c2c2e|#1a1a1a|rgb\(28,\s*28,\s*30\)/i);
        });

        test('should have vivid orange text color', () => {
            expect(messageStyles).toContain('color');
            expect(messageStyles.toLowerCase()).toMatch(/#ff6b00|#ff6600|#ff7000|orange|rgb\(255,\s*10[0-9],\s*0\)/i);
        });

        test('should use Apple-like font family', () => {
            expect(bodyStyles).toContain('font-family');
            const fontFamilyMatch = bodyStyles.match(/font-family:\s*([^;]+)/i);
            expect(fontFamilyMatch).toBeTruthy();
            const fontFamily = fontFamilyMatch[1].toLowerCase();
            
            expect(
                fontFamily.includes('-apple-system') ||
                fontFamily.includes('sf pro') ||
                fontFamily.includes('system-ui')
            ).toBe(true);
        });

        test('should center content using flexbox', () => {
            expect(bodyStyles).toContain('display: flex');
            expect(bodyStyles).toContain('justify-content: center');
            expect(bodyStyles).toContain('align-items: center');
        });

        test('should have proper text alignment', () => {
            expect(messageStyles).toContain('text-align: center');
        });

        test('should have appropriate font size', () => {
            expect(messageStyles).toMatch(/font-size:\s*\d+(\.\d+)?(rem|px|em)/);
        });
    });

    describe('Responsive design', () => {
        test('should have mobile responsive styles', () => {
            const styleTag = document.querySelector('style');
            const styles = styleTag.textContent;
            
            expect(styles).toContain('@media');
            expect(styles).toMatch(/@media\s*\([^)]*max-width/i);
        });

        test('should have viewport meta tag for mobile', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
        });
    });

    describe('Accessibility', () => {
        test('should use semantic heading', () => {
            const h1 = document.querySelector('h1');
            expect(h1).toBeTruthy();
        });

        test('should have proper font smoothing', () => {
            const styleTag = document.querySelector('style');
            const styles = styleTag.textContent;
            
            expect(
                styles.includes('-webkit-font-smoothing') ||
                styles.includes('-moz-osx-font-smoothing')
            ).toBe(true);
        });
    });

    describe('Best practices', () => {
        test('should reset margin and padding', () => {
            const styleTag = document.querySelector('style');
            const styles = styleTag.textContent;
            
            expect(styles).toMatch(/\*\s*\{[^}]*margin:\s*0/);
            expect(styles).toMatch(/\*\s*\{[^}]*padding:\s*0/);
        });

        test('should use box-sizing border-box', () => {
            const styleTag = document.querySelector('style');
            const styles = styleTag.textContent;
            
            expect(styles).toContain('box-sizing: border-box');
        });

        test('should set html and body to full height', () => {
            const styleTag = document.querySelector('style');
            const styles = styleTag.textContent;
            const htmlBodyStyles = extractStyles(styles, 'html, body');
            
            expect(htmlBodyStyles).toContain('height: 100%');
        });
    });
});

/**
 * Helper function to extract styles for a specific selector
 */
function extractStyles(cssText, selector) {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSelector + '\\s*\\{([^}]*)\\}', 'is');
    const match = cssText.match(regex);
    return match ? match[1] : '';
}

/**
 * Helper function to extract all body-related styles (from all selectors containing body)
 */
function extractAllBodyStyles(cssText) {
    let allStyles = '';
    
    const bodyRegex = /(?:^|[,\s])body(?:\s*,\s*\w+|\s*)\{([^}]*)\}/gis;
    const matches = cssText.matchAll(bodyRegex);
    
    for (const match of matches) {
        allStyles += match[1];
    }
    
    return allStyles;
}
