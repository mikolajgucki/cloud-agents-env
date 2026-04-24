import * as fs from 'fs';
import * as path from 'path';

describe('index.html', () => {
  let html: string;
  let document: Document;

  beforeAll(() => {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '..', 'index.html');
    html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Parse the HTML
    document = new DOMParser().parseFromString(html, 'text/html');
  });

  describe('Document Structure', () => {
    test('should have valid HTML5 doctype', () => {
      expect(html.trim().startsWith('<!DOCTYPE html>')).toBe(true);
    });

    test('should have lang attribute on html element', () => {
      const htmlElement = document.querySelector('html');
      expect(htmlElement).not.toBeNull();
      expect(htmlElement?.getAttribute('lang')).toBe('en');
    });

    test('should have proper meta tags', () => {
      const charsetMeta = document.querySelector('meta[charset="UTF-8"]');
      expect(charsetMeta).not.toBeNull();

      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta).not.toBeNull();
      expect(viewportMeta?.getAttribute('content')).toContain('width=device-width');
      expect(viewportMeta?.getAttribute('content')).toContain('initial-scale=1.0');
    });

    test('should have a title element', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title?.textContent).toBeTruthy();
    });
  });

  describe('Content', () => {
    test('should contain "Hello world!" text', () => {
      const h1 = document.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1?.textContent).toBe('Hello world!');
    });

    test('should use h1 tag for the main heading', () => {
      const h1 = document.querySelector('h1');
      expect(h1).not.toBeNull();
    });

    test('should have exactly one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });
  });

  describe('Styling', () => {
    test('should have embedded style tag', () => {
      const style = document.querySelector('style');
      expect(style).not.toBeNull();
      expect(style?.textContent).toBeTruthy();
    });

    test('should have dark gray background color', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for dark gray background
      expect(styleContent).toContain('background-color');
      expect(styleContent).toMatch(/#2[d-f]2[d-f]2[d-f]/i);
    });

    test('should have orange text color for h1', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for orange color in h1 styles
      expect(styleContent).toContain('color');
      // Looking for orange hex colors (ff6b35 or similar vivid orange)
      expect(styleContent).toMatch(/#ff[0-9a-f]{4}/i);
    });

    test('should use Apple-like system font', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for Apple system fonts
      expect(styleContent).toContain('-apple-system');
      expect(styleContent).toMatch(/font-family.*-apple-system/i);
    });

    test('should have flexbox centering', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for flexbox properties
      expect(styleContent).toContain('display: flex');
      expect(styleContent).toContain('justify-content: center');
      expect(styleContent).toContain('align-items: center');
    });

    test('should have full viewport height', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for viewport height
      expect(styleContent).toMatch(/min-height.*100vh/i);
    });

    test('should have CSS reset for consistent rendering', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for basic CSS reset
      expect(styleContent).toContain('margin: 0');
      expect(styleContent).toContain('padding: 0');
      expect(styleContent).toContain('box-sizing: border-box');
    });
  });

  describe('Typography', () => {
    test('should have appropriate font size for h1', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for font-size in h1 styles
      expect(styleContent).toMatch(/h1\s*{[^}]*font-size/s);
    });

    test('should have font weight defined for h1', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for font-weight in h1 styles
      expect(styleContent).toMatch(/h1\s*{[^}]*font-weight/s);
    });
  });

  describe('Accessibility', () => {
    test('should have semantic HTML structure', () => {
      const body = document.querySelector('body');
      const h1 = document.querySelector('h1');
      
      expect(body).not.toBeNull();
      expect(h1).not.toBeNull();
      expect(body?.contains(h1 as Node)).toBe(true);
    });

    test('should have proper document language', () => {
      const htmlElement = document.querySelector('html');
      expect(htmlElement?.getAttribute('lang')).toBe('en');
    });
  });

  describe('Color Values', () => {
    test('should use the exact vivid orange color #ff6b35', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for exact orange color
      expect(styleContent.toLowerCase()).toContain('#ff6b35');
    });

    test('should use the exact dark gray color #2d2d2d', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for exact dark gray color
      expect(styleContent.toLowerCase()).toContain('#2d2d2d');
    });
  });

  describe('Responsiveness', () => {
    test('should have viewport meta tag for mobile responsiveness', () => {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      expect(viewportMeta).not.toBeNull();
    });

    test('should use relative units or viewport units', () => {
      const style = document.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check for responsive units (rem, em, vh, vw, %)
      expect(styleContent).toMatch(/\d+(rem|em|vh|vw|%)/);
    });
  });
});
