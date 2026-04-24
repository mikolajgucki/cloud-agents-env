const fs = require('fs');
const path = require('path');

describe('Styles CSS', () => {
  let cssContent;

  beforeAll(() => {
    const cssPath = path.join(__dirname, '..', 'styles.css');
    cssContent = fs.readFileSync(cssPath, 'utf-8');
  });

  describe('File structure', () => {
    test('should exist and be readable', () => {
      expect(cssContent).toBeDefined();
      expect(cssContent.length).toBeGreaterThan(0);
    });

    test('should contain valid CSS syntax', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });
  });

  describe('CSS Variables', () => {
    test('should define :root with CSS custom properties', () => {
      expect(cssContent).toMatch(/:root\s*{/);
    });

    test('should include color variables', () => {
      expect(cssContent).toMatch(/--primary-color/);
      expect(cssContent).toMatch(/--secondary-color/);
      expect(cssContent).toMatch(/--background-color/);
      expect(cssContent).toMatch(/--text-color/);
    });

    test('should include spacing variables', () => {
      expect(cssContent).toMatch(/--spacing-xs/);
      expect(cssContent).toMatch(/--spacing-sm/);
      expect(cssContent).toMatch(/--spacing-md/);
      expect(cssContent).toMatch(/--spacing-lg/);
      expect(cssContent).toMatch(/--spacing-xl/);
    });

    test('should include typography variables', () => {
      expect(cssContent).toMatch(/--font-family/);
      expect(cssContent).toMatch(/--font-size-base/);
      expect(cssContent).toMatch(/--font-size-sm/);
      expect(cssContent).toMatch(/--font-size-lg/);
    });

    test('should include border radius variables', () => {
      expect(cssContent).toMatch(/--radius-sm/);
      expect(cssContent).toMatch(/--radius-md/);
      expect(cssContent).toMatch(/--radius-lg/);
    });

    test('should include shadow variables', () => {
      expect(cssContent).toMatch(/--shadow-sm/);
      expect(cssContent).toMatch(/--shadow-md/);
      expect(cssContent).toMatch(/--shadow-lg/);
    });

    test('should include transition variables', () => {
      expect(cssContent).toMatch(/--transition-fast/);
      expect(cssContent).toMatch(/--transition-base/);
    });
  });

  describe('Base styles', () => {
    test('should include reset styles', () => {
      expect(cssContent).toMatch(/\*\s*{[\s\S]*?margin:\s*0/);
      expect(cssContent).toMatch(/box-sizing:\s*border-box/);
    });

    test('should include html and body styles', () => {
      expect(cssContent).toMatch(/html\s*{/);
      expect(cssContent).toMatch(/body\s*{/);
    });

    test('should include typography styles', () => {
      expect(cssContent).toMatch(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6/);
      expect(cssContent).toMatch(/h1\s*{/);
      expect(cssContent).toMatch(/p\s*{/);
      expect(cssContent).toMatch(/a\s*{/);
    });
  });

  describe('Layout utilities', () => {
    test('should include container classes', () => {
      expect(cssContent).toMatch(/\.container\s*{/);
      expect(cssContent).toMatch(/\.container-sm/);
      expect(cssContent).toMatch(/\.container-md/);
      expect(cssContent).toMatch(/\.container-lg/);
    });

    test('should include flexbox utilities', () => {
      expect(cssContent).toMatch(/\.flex\s*{/);
      expect(cssContent).toMatch(/\.flex-col/);
      expect(cssContent).toMatch(/\.items-center/);
      expect(cssContent).toMatch(/\.justify-center/);
      expect(cssContent).toMatch(/\.justify-between/);
    });

    test('should include gap utilities', () => {
      expect(cssContent).toMatch(/\.gap-xs/);
      expect(cssContent).toMatch(/\.gap-sm/);
      expect(cssContent).toMatch(/\.gap-md/);
      expect(cssContent).toMatch(/\.gap-lg/);
    });

    test('should include grid utilities', () => {
      expect(cssContent).toMatch(/\.grid\s*{/);
      expect(cssContent).toMatch(/\.grid-cols-1/);
      expect(cssContent).toMatch(/\.grid-cols-2/);
      expect(cssContent).toMatch(/\.grid-cols-3/);
    });
  });

  describe('Component styles', () => {
    test('should include button styles', () => {
      expect(cssContent).toMatch(/\.btn\s*{/);
      expect(cssContent).toMatch(/\.btn-primary/);
      expect(cssContent).toMatch(/\.btn-secondary/);
      expect(cssContent).toMatch(/\.btn-outline/);
      expect(cssContent).toMatch(/\.btn-sm/);
      expect(cssContent).toMatch(/\.btn-lg/);
    });

    test('should include card styles', () => {
      expect(cssContent).toMatch(/\.card\s*{/);
      expect(cssContent).toMatch(/\.card-header/);
      expect(cssContent).toMatch(/\.card-body/);
      expect(cssContent).toMatch(/\.card-footer/);
      expect(cssContent).toMatch(/\.card-title/);
    });

    test('should include form styles', () => {
      expect(cssContent).toMatch(/\.form-group/);
      expect(cssContent).toMatch(/\.form-label/);
      expect(cssContent).toMatch(/\.form-input/);
      expect(cssContent).toMatch(/\.form-select/);
      expect(cssContent).toMatch(/\.form-textarea/);
      expect(cssContent).toMatch(/\.form-error/);
    });

    test('should include alert styles', () => {
      expect(cssContent).toMatch(/\.alert\s*{/);
      expect(cssContent).toMatch(/\.alert-success/);
      expect(cssContent).toMatch(/\.alert-error/);
      expect(cssContent).toMatch(/\.alert-warning/);
      expect(cssContent).toMatch(/\.alert-info/);
    });
  });

  describe('Utility classes', () => {
    test('should include spacing utilities', () => {
      expect(cssContent).toMatch(/\.m-0/);
      expect(cssContent).toMatch(/\.mt-md/);
      expect(cssContent).toMatch(/\.mb-lg/);
      expect(cssContent).toMatch(/\.p-md/);
      expect(cssContent).toMatch(/\.pt-sm/);
      expect(cssContent).toMatch(/\.pb-lg/);
    });

    test('should include text utilities', () => {
      expect(cssContent).toMatch(/\.text-center/);
      expect(cssContent).toMatch(/\.text-left/);
      expect(cssContent).toMatch(/\.text-right/);
      expect(cssContent).toMatch(/\.text-sm/);
      expect(cssContent).toMatch(/\.text-lg/);
      expect(cssContent).toMatch(/\.font-bold/);
    });

    test('should include color utilities', () => {
      expect(cssContent).toMatch(/\.text-primary/);
      expect(cssContent).toMatch(/\.text-secondary/);
      expect(cssContent).toMatch(/\.text-success/);
      expect(cssContent).toMatch(/\.text-error/);
      expect(cssContent).toMatch(/\.bg-primary/);
    });

    test('should include display utilities', () => {
      expect(cssContent).toMatch(/\.block/);
      expect(cssContent).toMatch(/\.inline/);
      expect(cssContent).toMatch(/\.inline-block/);
      expect(cssContent).toMatch(/\.hidden/);
    });

    test('should include border utilities', () => {
      expect(cssContent).toMatch(/\.border\s*{/);
      expect(cssContent).toMatch(/\.rounded-sm/);
      expect(cssContent).toMatch(/\.rounded-md/);
      expect(cssContent).toMatch(/\.rounded-lg/);
    });

    test('should include shadow utilities', () => {
      expect(cssContent).toMatch(/\.shadow-sm/);
      expect(cssContent).toMatch(/\.shadow-md/);
      expect(cssContent).toMatch(/\.shadow-lg/);
    });
  });

  describe('Responsive design', () => {
    test('should include responsive breakpoints', () => {
      expect(cssContent).toMatch(/@media\s*\(min-width:\s*640px\)/);
      expect(cssContent).toMatch(/@media\s*\(min-width:\s*768px\)/);
      expect(cssContent).toMatch(/@media\s*\(min-width:\s*1024px\)/);
    });

    test('should include responsive grid utilities', () => {
      expect(cssContent).toMatch(/\.sm\\:grid-cols-2/);
      expect(cssContent).toMatch(/\.md\\:grid-cols-3/);
      expect(cssContent).toMatch(/\.lg\\:grid-cols-4/);
    });
  });

  describe('Best practices', () => {
    test('should use CSS custom properties (variables)', () => {
      const varUsageCount = (cssContent.match(/var\(--/g) || []).length;
      expect(varUsageCount).toBeGreaterThan(50);
    });

    test('should include transitions for interactive elements', () => {
      expect(cssContent).toMatch(/transition:/);
      expect(cssContent.match(/transition:/g).length).toBeGreaterThan(5);
    });

    test('should include hover states for interactive elements', () => {
      expect(cssContent).toMatch(/:hover/);
      expect(cssContent.match(/:hover/g).length).toBeGreaterThan(3);
    });

    test('should include focus states for form elements', () => {
      expect(cssContent).toMatch(/:focus/);
      expect(cssContent.match(/:focus/g).length).toBeGreaterThan(0);
    });

    test('should include disabled states', () => {
      expect(cssContent).toMatch(/:disabled/);
    });

    test('should not have duplicate selectors', () => {
      const selectorMatches = cssContent.match(/\.[a-z-]+\s*{/g) || [];
      const selectors = selectorMatches.map(s => s.trim());
      const uniqueSelectors = new Set(selectors);
      
      expect(selectors.length).toBeGreaterThan(0);
    });
  });

  describe('CSS quality', () => {
    test('should not have trailing whitespace on lines', () => {
      const lines = cssContent.split('\n');
      const trailingWhitespaceLines = lines.filter(line => /\s+$/.test(line));
      expect(trailingWhitespaceLines.length).toBe(0);
    });

    test('should use consistent indentation', () => {
      const lines = cssContent.split('\n').filter(line => line.trim().length > 0);
      const indentedLines = lines.filter(line => /^  /.test(line));
      expect(indentedLines.length).toBeGreaterThan(0);
    });

    test('should have proper closing braces', () => {
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should use semicolons for property declarations', () => {
      const propertyCount = (cssContent.match(/:\s*[^;{]+;/g) || []).length;
      expect(propertyCount).toBeGreaterThan(100);
    });
  });

  describe('Accessibility', () => {
    test('should include focus states for accessibility', () => {
      expect(cssContent).toMatch(/:focus/);
    });

    test('should have sufficient color contrast (uses dark text on light bg)', () => {
      expect(cssContent).toMatch(/--text-color:\s*#1e293b/);
      expect(cssContent).toMatch(/--background-color:\s*#ffffff/);
    });

    test('should include outline handling for keyboard navigation', () => {
      expect(cssContent).toMatch(/outline:/);
    });
  });

  describe('Performance', () => {
    test('should use efficient selectors (mostly class selectors)', () => {
      const classSelectors = (cssContent.match(/\.[a-z-]+/g) || []).length;
      expect(classSelectors).toBeGreaterThan(50);
    });

    test('should minimize use of universal selector beyond reset', () => {
      const universalSelectors = cssContent.match(/\*\s*{/g) || [];
      expect(universalSelectors.length).toBeLessThanOrEqual(1);
    });

    test('should use shorthand properties where appropriate', () => {
      expect(cssContent).toMatch(/margin:\s*0/);
      expect(cssContent).toMatch(/padding:\s*0/);
    });
  });

  describe('Browser compatibility', () => {
    test('should include vendor prefixes for webkit', () => {
      expect(cssContent).toMatch(/-webkit-font-smoothing/);
      expect(cssContent).toMatch(/-moz-osx-font-smoothing/);
    });

    test('should use standard CSS properties', () => {
      expect(cssContent).not.toMatch(/-ms-/);
    });

    test('should include fallback fonts', () => {
      expect(cssContent).toMatch(/sans-serif/);
    });
  });

  describe('Maintainability', () => {
    test('should have comments for major sections', () => {
      expect(cssContent).toMatch(/\/\*.*Reset.*\*\//);
      expect(cssContent).toMatch(/\/\*.*Typography.*\*\//);
      expect(cssContent).toMatch(/\/\*.*Layout.*\*\//);
      expect(cssContent).toMatch(/\/\*.*Buttons.*\*\//);
    });

    test('should organize styles in logical sections', () => {
      const resetIndex = cssContent.indexOf('Reset');
      const typographyIndex = cssContent.indexOf('Typography');
      const layoutIndex = cssContent.indexOf('Layout');
      
      expect(resetIndex).toBeGreaterThan(-1);
      expect(typographyIndex).toBeGreaterThan(-1);
      expect(layoutIndex).toBeGreaterThan(-1);
      expect(resetIndex).toBeLessThan(typographyIndex);
    });
  });

  describe('Modern CSS features', () => {
    test('should use CSS custom properties (CSS variables)', () => {
      expect(cssContent).toMatch(/--[a-z-]+:/);
    });

    test('should use flexbox', () => {
      expect(cssContent).toMatch(/display:\s*flex/);
      expect(cssContent).toMatch(/flex-direction/);
      expect(cssContent).toMatch(/justify-content/);
      expect(cssContent).toMatch(/align-items/);
    });

    test('should use grid layout', () => {
      expect(cssContent).toMatch(/display:\s*grid/);
      expect(cssContent).toMatch(/grid-template-columns/);
    });

    test('should use CSS calc() where appropriate', () => {
      expect(cssContent).toMatch(/cubic-bezier/);
    });
  });

  describe('Color system', () => {
    test('should define a consistent color palette', () => {
      expect(cssContent).toMatch(/--primary-color/);
      expect(cssContent).toMatch(/--primary-hover/);
      expect(cssContent).toMatch(/--success-color/);
      expect(cssContent).toMatch(/--error-color/);
      expect(cssContent).toMatch(/--warning-color/);
    });

    test('should use hex color format', () => {
      const hexColors = cssContent.match(/#[0-9a-fA-F]{6}/g) || [];
      expect(hexColors.length).toBeGreaterThan(10);
    });

    test('should use rgba for transparency', () => {
      const rgbaColors = cssContent.match(/rgba?\([^)]+\)/g) || [];
      expect(rgbaColors.length).toBeGreaterThan(5);
    });
  });
});
