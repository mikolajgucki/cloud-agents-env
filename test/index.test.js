import { describe, it, expect, beforeEach } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('index.html', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = join(__dirname, '..', 'index.html');
    const html = readFileSync(htmlPath, 'utf-8');
    dom = new JSDOM(html);
    document = dom.window.document;
    window = dom.window;
  });

  describe('Document Structure', () => {
    it('should have valid HTML5 doctype', () => {
      expect(dom.serialize()).toMatch(/^<!DOCTYPE html>/i);
    });

    it('should have html element with lang attribute', () => {
      const html = document.querySelector('html');
      expect(html).not.toBeNull();
      expect(html.getAttribute('lang')).toBe('en');
    });

    it('should have head element', () => {
      const head = document.querySelector('head');
      expect(head).not.toBeNull();
    });

    it('should have body element', () => {
      const body = document.querySelector('body');
      expect(body).not.toBeNull();
    });
  });

  describe('Meta Tags', () => {
    it('should have charset meta tag set to UTF-8', () => {
      const meta = document.querySelector('meta[charset]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('charset')).toBe('UTF-8');
    });

    it('should have viewport meta tag for responsive design', () => {
      const meta = document.querySelector('meta[name="viewport"]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });

    it('should have a title element', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe('Hello World');
    });
  });

  describe('Font Loading', () => {
    it('should preconnect to Google Fonts', () => {
      const preconnects = document.querySelectorAll('link[rel="preconnect"]');
      expect(preconnects.length).toBeGreaterThanOrEqual(2);
      
      const urls = Array.from(preconnects).map(link => link.getAttribute('href'));
      expect(urls).toContain('https://fonts.googleapis.com');
      expect(urls).toContain('https://fonts.gstatic.com');
    });

    it('should load Inter font from Google Fonts', () => {
      const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
      expect(fontLink).not.toBeNull();
      expect(fontLink.getAttribute('href')).toContain('family=Inter');
      expect(fontLink.getAttribute('href')).toContain('wght@400');
    });

    it('should have crossorigin attribute on gstatic preconnect', () => {
      const gstaticLink = document.querySelector('link[href="https://fonts.gstatic.com"]');
      expect(gstaticLink).not.toBeNull();
      expect(gstaticLink.hasAttribute('crossorigin')).toBe(true);
    });
  });

  describe('Styles', () => {
    it('should have embedded styles', () => {
      const style = document.querySelector('style');
      expect(style).not.toBeNull();
      expect(style.textContent.length).toBeGreaterThan(0);
    });

    it('should reset margin and padding globally', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/\*\s*\{[^}]*margin:\s*0/);
      expect(cssText).toMatch(/\*\s*\{[^}]*padding:\s*0/);
      expect(cssText).toMatch(/\*\s*\{[^}]*box-sizing:\s*border-box/);
    });

    it('should set body background to white', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/body\s*\{[^}]*background-color:\s*#FFFFFF/i);
    });

    it('should use Inter font family', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/font-family:\s*['"']Inter['"']/);
    });

    it('should set correct font properties according to Figma design', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/font-weight:\s*400/);
      expect(cssText).toMatch(/font-size:\s*12px/);
      expect(cssText).toMatch(/color:\s*#000000/i);
    });

    it('should center content using flexbox', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/display:\s*flex/);
      expect(cssText).toMatch(/align-items:\s*center/);
      expect(cssText).toMatch(/justify-content:\s*center/);
    });

    it('should have minimum viewport height', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/min-height:\s*100vh/);
    });
  });

  describe('Content', () => {
    it('should have a container div', () => {
      const container = document.querySelector('.container');
      expect(container).not.toBeNull();
    });

    it('should display "Hello world!" text', () => {
      const text = document.querySelector('.container p');
      expect(text).not.toBeNull();
      expect(text.textContent).toBe('Hello world!');
    });

    it('should have exactly one paragraph element', () => {
      const paragraphs = document.querySelectorAll('.container p');
      expect(paragraphs.length).toBe(1);
    });

    it('should not have any additional content beyond "Hello world!"', () => {
      const container = document.querySelector('.container');
      const textContent = container.textContent.trim();
      expect(textContent).toBe('Hello world!');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const body = document.querySelector('body');
      const container = body.querySelector('.container');
      const paragraph = container.querySelector('p');
      
      expect(body).not.toBeNull();
      expect(container).not.toBeNull();
      expect(paragraph).not.toBeNull();
    });

    it('should have proper heading hierarchy if needed', () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length > 0) {
        expect(headings[0].tagName).toBe('H1');
      }
    });

    it('should have lang attribute for screen readers', () => {
      const html = document.querySelector('html');
      expect(html.hasAttribute('lang')).toBe(true);
    });
  });

  describe('Performance', () => {
    it('should use font-display swap for better performance', () => {
      const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
      expect(fontLink.getAttribute('href')).toContain('display=swap');
    });

    it('should have minimal external resources', () => {
      const externalLinks = document.querySelectorAll('link[href^="http"]');
      expect(externalLinks.length).toBeLessThanOrEqual(3);
    });

    it('should not have inline scripts that could block rendering', () => {
      const scripts = document.querySelectorAll('script:not([async]):not([defer])');
      const inlineScripts = Array.from(scripts).filter(s => !s.hasAttribute('src'));
      expect(inlineScripts.length).toBe(0);
    });
  });

  describe('Design Compliance', () => {
    it('should match Figma text content exactly', () => {
      const text = document.querySelector('.container p');
      expect(text.textContent).toBe('Hello world!');
    });

    it('should use correct color scheme from Figma', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/#FFFFFF/i);
      expect(cssText).toMatch(/#000000/i);
    });

    it('should use Inter font as specified in Figma', () => {
      const fontLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
      expect(fontLink.getAttribute('href')).toContain('Inter');
    });

    it('should use 12px font size as specified in Figma', () => {
      const style = document.querySelector('style');
      expect(style.textContent).toMatch(/font-size:\s*12px/);
    });

    it('should use font-weight 400 as specified in Figma', () => {
      const style = document.querySelector('style');
      expect(style.textContent).toMatch(/font-weight:\s*400/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle window resize gracefully', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;
      expect(cssText).toMatch(/min-height:\s*100vh/);
      expect(cssText).toMatch(/display:\s*flex/);
    });

    it('should not have any broken links', () => {
      const links = document.querySelectorAll('a[href]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).not.toBeNull();
        expect(href).not.toBe('');
        expect(href).not.toBe('#');
      });
    });

    it('should not have any broken images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          expect(src).not.toBe('');
        }
      });
    });

    it('should not have any console errors in well-formed HTML', () => {
      const doctype = dom.serialize().split('\n')[0];
      expect(doctype).toMatch(/<!DOCTYPE html>/i);
    });
  });

  describe('Code Quality', () => {
    it('should have proper indentation', () => {
      const htmlPath = join(__dirname, '..', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      const lines = html.split('\n');
      const indentedLines = lines.filter(line => line.startsWith('    ') || line.startsWith('\t'));
      expect(indentedLines.length).toBeGreaterThan(0);
    });

    it('should not have commented-out code', () => {
      const htmlPath = join(__dirname, '..', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      const hasComments = html.includes('<!--') && html.includes('-->');
      if (hasComments) {
        expect(html).not.toMatch(/<!--\s*<[^>]+>\s*-->/);
      }
    });

    it('should use lowercase for HTML tags', () => {
      const htmlPath = join(__dirname, '..', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      expect(html).not.toMatch(/<[A-Z]+[>\s]/);
    });

    it('should have consistent quote style', () => {
      const htmlPath = join(__dirname, '..', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      const doubleQuotes = (html.match(/="/g) || []).length;
      const singleQuotes = (html.match(/='/g) || []).length;
      expect(doubleQuotes).toBeGreaterThan(singleQuotes);
    });
  });
});
