/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('index.html', () => {
    let htmlContent;

    beforeAll(() => {
        const htmlPath = path.join(__dirname, '../../../index.html');
        htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Parse and load the HTML into the jsdom environment
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Copy parsed document into global document
        document.documentElement.innerHTML = doc.documentElement.innerHTML;
        
        // Also copy the head content
        while (document.head.firstChild) {
            document.head.removeChild(document.head.firstChild);
        }
        Array.from(doc.head.childNodes).forEach(node => {
            document.head.appendChild(node.cloneNode(true));
        });
    });

    describe('HTML Structure', () => {
        test('should have proper DOCTYPE', () => {
            expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
        });

        test('should have html element with lang attribute', () => {
            expect(htmlContent).toContain('lang="en"');
        });

        test('should have proper meta charset', () => {
            const charset = document.querySelector('meta[charset]');
            expect(charset).toBeTruthy();
            expect(charset.getAttribute('charset')).toBe('UTF-8');
        });

        test('should have viewport meta tag', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            expect(viewport).toBeTruthy();
            expect(viewport.getAttribute('content')).toContain('width=device-width');
            expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
        });

        test('should have title element', () => {
            const title = document.querySelector('title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('Hello world');
        });
    });

    describe('Content', () => {
        test('should have container div', () => {
            const container = document.querySelector('.container');
            expect(container).toBeTruthy();
        });

        test('should display "Hello world!" text', () => {
            const helloText = document.querySelector('.hello-text');
            expect(helloText).toBeTruthy();
            expect(helloText.textContent).toBe('Hello world!');
        });

        test('should have hello-text inside container', () => {
            const container = document.querySelector('.container');
            const helloText = container.querySelector('.hello-text');
            expect(helloText).toBeTruthy();
        });
    });

    describe('Styling', () => {
        test('should include Inter font link', () => {
            const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
            expect(fontLinks.length).toBeGreaterThan(0);
            
            // Check if any link contains Inter in the href
            const interFontLink = Array.from(fontLinks).find(
                link => link.getAttribute('href').includes('Inter')
            );
            expect(interFontLink).toBeTruthy();
        });

        test('should have preconnect links for fonts', () => {
            const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
            expect(preconnectLinks.length).toBeGreaterThan(0);
            
            const googleFontsPreconnect = Array.from(preconnectLinks).some(
                link => link.getAttribute('href') === 'https://fonts.googleapis.com'
            );
            expect(googleFontsPreconnect).toBe(true);
        });

        test('should have inline styles', () => {
            const styleElement = document.querySelector('style');
            expect(styleElement).toBeTruthy();
            expect(styleElement.textContent.length).toBeGreaterThan(0);
        });

        test('should define container styles', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('.container');
            expect(styles).toContain('width: 393px');
            expect(styles).toContain('height: 852px');
            expect(styles).toContain('background-color: #ffffff');
        });

        test('should define hello-text styles matching Figma design', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('.hello-text');
            expect(styles).toContain('left: 163px');
            expect(styles).toContain('top: 399px');
            expect(styles).toContain('font-size: 12px');
            expect(styles).toContain('color: #000000');
            expect(styles).toContain('font-weight: 400');
        });

        test('should have responsive styles for mobile', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('@media');
            expect(styles).toContain('max-width: 430px');
        });
    });

    describe('Design Specifications', () => {
        test('should match Figma frame dimensions', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            // Container should be 393x852 (iPhone 14 & 15 Pro dimensions)
            expect(styles).toContain('width: 393px');
            expect(styles).toContain('height: 852px');
        });

        test('should use Inter font family', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('Inter');
        });

        test('should have white background for container', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('background-color: #ffffff');
        });

        test('should have black text color', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            expect(styles).toContain('color: #000000');
        });
    });

    describe('Accessibility', () => {
        test('should have semantic HTML structure', () => {
            const body = document.querySelector('body');
            expect(body).toBeTruthy();
            
            const head = document.querySelector('head');
            expect(head).toBeTruthy();
        });

        test('should have proper character encoding', () => {
            const metaCharset = document.querySelector('meta[charset="UTF-8"]');
            expect(metaCharset).toBeTruthy();
        });
    });

    describe('Edge Cases', () => {
        test('should not have broken links', () => {
            const links = document.querySelectorAll('link[href]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                expect(href).toBeTruthy();
                expect(href).not.toBe('');
            });
        });

        test('should have valid CSS syntax', () => {
            const styleElement = document.querySelector('style');
            const styles = styleElement.textContent;
            
            // Check for balanced braces
            const openBraces = (styles.match(/{/g) || []).length;
            const closeBraces = (styles.match(/}/g) || []).length;
            expect(openBraces).toBe(closeBraces);
        });

        test('should not have empty elements', () => {
            const container = document.querySelector('.container');
            expect(container.children.length).toBeGreaterThan(0);
        });
    });
});
