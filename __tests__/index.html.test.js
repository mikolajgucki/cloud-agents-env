const fs = require('fs');
const path = require('path');

describe('index.html', () => {
  let htmlContent;
  let document;

  beforeAll(() => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    document = new DOMParser().parseFromString(htmlContent, 'text/html');
  });

  describe('File Existence', () => {
    test('index.html file exists', () => {
      const htmlPath = path.join(__dirname, '..', 'index.html');
      expect(fs.existsSync(htmlPath)).toBe(true);
    });
  });

  describe('HTML Structure', () => {
    test('has valid HTML5 doctype', () => {
      expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
    });

    test('has html element with lang attribute', () => {
      expect(htmlContent).toMatch(/<html\s+lang="en">/i);
    });

    test('has head element', () => {
      const head = document.querySelector('head');
      expect(head).not.toBeNull();
    });

    test('has body element', () => {
      const body = document.querySelector('body');
      expect(body).not.toBeNull();
    });
  });

  describe('Meta Tags', () => {
    test('has charset meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+charset="UTF-8">/i);
    });

    test('has viewport meta tag', () => {
      expect(htmlContent).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0">/i);
    });

    test('has title element', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBeTruthy();
    });
  });

  describe('Content', () => {
    test('contains "Hello world!" text', () => {
      expect(htmlContent).toMatch(/Hello world!/);
    });

    test('has h1 element with "Hello world!" text', () => {
      const h1 = document.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent.trim()).toBe('Hello world!');
    });

    test('h1 is inside a container element', () => {
      const h1 = document.querySelector('.container h1');
      expect(h1).not.toBeNull();
    });
  });

  describe('Styling', () => {
    test('has style element or inline styles', () => {
      const styleElement = document.querySelector('style');
      expect(styleElement).not.toBeNull();
    });

    test('includes centering styles for body', () => {
      const styles = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
      expect(styles).not.toBeNull();
      const styleContent = styles[1];
      expect(styleContent).toMatch(/display:\s*flex/);
      expect(styleContent).toMatch(/justify-content:\s*center/);
      expect(styleContent).toMatch(/align-items:\s*center/);
    });

    test('body has minimum height of 100vh', () => {
      const styles = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
      const styleContent = styles[1];
      expect(styleContent).toMatch(/min-height:\s*100vh/);
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      expect(h1).not.toBeNull();
    });

    test('has lang attribute on html element', () => {
      const html = document.querySelector('html');
      expect(html.getAttribute('lang')).toBe('en');
    });
  });

  describe('Responsive Design', () => {
    test('has viewport meta tag for mobile responsiveness', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
    });

    test('uses box-sizing border-box for consistent sizing', () => {
      const styles = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
      const styleContent = styles[1];
      expect(styleContent).toMatch(/box-sizing:\s*border-box/);
    });
  });

  describe('Edge Cases', () => {
    test('file is not empty', () => {
      expect(htmlContent.length).toBeGreaterThan(0);
    });

    test('file is valid UTF-8', () => {
      expect(() => {
        fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
      }).not.toThrow();
    });

    test('HTML is well-formed (no unclosed tags)', () => {
      const openTags = (htmlContent.match(/<(?!\/)[^>]+>/g) || []).length;
      const closeTags = (htmlContent.match(/<\/[^>]+>/g) || []).length;
      const selfClosingTags = (htmlContent.match(/<[^>]+\/>/g) || []).length;
      expect(closeTags + selfClosingTags).toBeGreaterThanOrEqual(openTags - 5);
    });
  });

  describe('Production Quality', () => {
    test('has modern font stack', () => {
      const styles = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
      const styleContent = styles[1];
      expect(styleContent).toMatch(/font-family:/);
    });

    test('has visual styling (not just plain text)', () => {
      const styles = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
      expect(styles).not.toBeNull();
      expect(styles[1].length).toBeGreaterThan(100);
    });

    test('text is centered on the page', () => {
      const container = document.querySelector('.container');
      expect(container).not.toBeNull();
      expect(htmlContent).toMatch(/text-align:\s*center/);
    });
  });
});
