const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('index.html', () => {
  let dom;
  let document;
  let window;

  beforeAll(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../index.html'),
      'utf8'
    );
    dom = new JSDOM(html);
    document = dom.window.document;
    window = dom.window;
  });

  describe('HTML Structure', () => {
    test('should have proper DOCTYPE declaration', () => {
      const html = fs.readFileSync(
        path.resolve(__dirname, '../index.html'),
        'utf8'
      );
      expect(html.trim().startsWith('<!DOCTYPE html>')).toBe(true);
    });

    test('should have html element with lang attribute', () => {
      const html = document.querySelector('html');
      expect(html).toBeTruthy();
      expect(html.getAttribute('lang')).toBe('en');
    });

    test('should have head element with required meta tags', () => {
      const head = document.querySelector('head');
      expect(head).toBeTruthy();

      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();
      expect(charset.getAttribute('charset')).toBe('UTF-8');

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('should have a title element', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBeTruthy();
    });

    test('should have a body element', () => {
      const body = document.querySelector('body');
      expect(body).toBeTruthy();
    });
  });

  describe('Content Requirements', () => {
    test('should contain "Hello world!" text', () => {
      const h1 = document.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent).toBe('Hello world!');
    });

    test('should have h1 element for the main text', () => {
      const h1 = document.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.tagName).toBe('H1');
    });
  });

  describe('Styling Requirements', () => {
    test('should have embedded styles', () => {
      const style = document.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent.length).toBeGreaterThan(0);
    });

    test('should use dark gray background color', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/background-color\s*:\s*#2C2C2E/i);
    });

    test('should use vivid orange text color for h1', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/color\s*:\s*#FF6B35/i);
    });

    test('should use Apple-like font family', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/-apple-system/);
      expect(styles).toMatch(/BlinkMacSystemFont/);
    });

    test('should center content using flexbox', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/display\s*:\s*flex/);
      expect(styles).toMatch(/justify-content\s*:\s*center/);
      expect(styles).toMatch(/align-items\s*:\s*center/);
    });

    test('should use full viewport height', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/min-height\s*:\s*100vh/);
    });
  });

  describe('Visual Design', () => {
    test('should have appropriate font size for h1', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/font-size\s*:\s*4rem/);
    });

    test('should have text-align center for h1', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/text-align\s*:\s*center/);
    });

    test('should include responsive design with media query', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/@media.*max-width.*768px/);
    });

    test('should have proper box-sizing reset', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/box-sizing\s*:\s*border-box/);
    });

    test('should reset margin and padding', () => {
      const styles = document.querySelector('style').textContent;
      expect(styles).toMatch(/margin\s*:\s*0/);
      expect(styles).toMatch(/padding\s*:\s*0/);
    });
  });

  describe('Edge Cases', () => {
    test('should have only one h1 element', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    test('should not have inline styles on elements', () => {
      const h1 = document.querySelector('h1');
      expect(h1.getAttribute('style')).toBeFalsy();
      
      const body = document.querySelector('body');
      expect(body.getAttribute('style')).toBeFalsy();
    });

    test('should have valid color codes', () => {
      const styles = document.querySelector('style').textContent;
      const colorRegex = /#[0-9A-Fa-f]{6}/g;
      const colors = styles.match(colorRegex);
      expect(colors).toBeTruthy();
      expect(colors.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    test('should have semantic HTML with h1 for main heading', () => {
      const h1 = document.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1.textContent).toBe('Hello world!');
    });

    test('should have proper document language', () => {
      const html = document.querySelector('html');
      expect(html.getAttribute('lang')).toBeTruthy();
    });
  });

  describe('Color Contrast', () => {
    test('should use sufficiently contrasting colors', () => {
      const styles = document.querySelector('style').textContent;
      const hasDarkBackground = styles.includes('#2C2C2E');
      const hasBrightText = styles.includes('#FF6B35');
      expect(hasDarkBackground && hasBrightText).toBe(true);
    });
  });
});
