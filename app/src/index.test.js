const fs = require('fs');
const path = require('path');

describe('index.html', () => {
    let htmlContent;

    beforeAll(() => {
        htmlContent = fs.readFileSync(
            path.join(__dirname, '../../index.html'),
            'utf-8'
        );
    });

    describe('Document structure', () => {
        test('should have correct DOCTYPE', () => {
            expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
        });

        test('should have html element with lang attribute', () => {
            expect(htmlContent).toMatch(/<html\s+lang="en">/i);
        });

        test('should have proper meta tags', () => {
            expect(htmlContent).toMatch(/<meta\s+charset="UTF-8">/i);
            expect(htmlContent).toMatch(/<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0">/i);
        });

        test('should have a title element', () => {
            expect(htmlContent).toMatch(/<title>Hello World<\/title>/);
        });
    });

    describe('Content requirements', () => {
        test('should contain "Hello world!" text', () => {
            expect(htmlContent).toMatch(/Hello world!/);
        });

        test('should have hello world text in a div with class hello-world', () => {
            expect(htmlContent).toMatch(/<div\s+class="hello-world">Hello world!<\/div>/);
        });
    });

    describe('Styling requirements', () => {
        test('should have dark gray background', () => {
            expect(htmlContent).toMatch(/background-color:\s*#2d2d2d/i);
        });

        test('should use Apple-like font family', () => {
            expect(htmlContent).toMatch(/-apple-system/);
            expect(htmlContent).toMatch(/BlinkMacSystemFont/);
            expect(htmlContent).toMatch(/SF Pro/);
        });

        test('should have vivid orange text color', () => {
            expect(htmlContent).toMatch(/color:\s*#ff6b35/i);
        });

        test('should center content with flexbox', () => {
            expect(htmlContent).toMatch(/display:\s*flex/i);
            expect(htmlContent).toMatch(/justify-content:\s*center/i);
            expect(htmlContent).toMatch(/align-items:\s*center/i);
        });

        test('should have full viewport height', () => {
            expect(htmlContent).toMatch(/min-height:\s*100vh/i);
        });

        test('should have proper text styling', () => {
            expect(htmlContent).toMatch(/font-size:\s*3rem/i);
            expect(htmlContent).toMatch(/font-weight:\s*600/i);
            expect(htmlContent).toMatch(/text-align:\s*center/i);
        });
    });

    describe('Visual verification', () => {
        test('should have hello-world element in body', () => {
            const bodyMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/);
            expect(bodyMatch).toBeTruthy();
            expect(bodyMatch[1]).toMatch(/hello-world/);
        });

        test('should have proper CSS reset', () => {
            expect(htmlContent).toMatch(/margin:\s*0/);
            expect(htmlContent).toMatch(/padding:\s*0/);
            expect(htmlContent).toMatch(/box-sizing:\s*border-box/);
        });
    });

    describe('Accessibility', () => {
        test('should have semantic HTML structure', () => {
            expect(htmlContent).toMatch(/<body>/);
            expect(htmlContent).toMatch(/<div\s+class="hello-world">/);
        });

        test('should have viewport meta for responsive design', () => {
            expect(htmlContent).toMatch(/<meta\s+name="viewport"[^>]*content="[^"]*width=device-width[^"]*"/i);
        });
    });

    describe('Edge cases', () => {
        test('should not have any script tags', () => {
            expect(htmlContent).not.toMatch(/<script/i);
        });

        test('should have exactly one style tag', () => {
            const styleMatches = htmlContent.match(/<style>/gi);
            expect(styleMatches).toBeTruthy();
            expect(styleMatches.length).toBe(1);
        });

        test('should not have external stylesheets', () => {
            expect(htmlContent).not.toMatch(/<link[^>]*rel="stylesheet"/i);
        });

        test('should have clean body with only one div element', () => {
            const bodyContent = htmlContent.match(/<body>([\s\S]*)<\/body>/);
            expect(bodyContent).toBeTruthy();
            const divMatches = bodyContent[1].match(/<div/gi);
            expect(divMatches).toBeTruthy();
            expect(divMatches.length).toBe(1);
        });
    });

    describe('Color specifications', () => {
        test('should use specific orange color (#ff6b35)', () => {
            expect(htmlContent).toMatch(/color:\s*#ff6b35/i);
        });

        test('should use specific dark gray background (#2d2d2d)', () => {
            expect(htmlContent).toMatch(/background-color:\s*#2d2d2d/i);
        });
    });

    describe('Responsive design', () => {
        test('should use rem units for font size', () => {
            expect(htmlContent).toMatch(/font-size:\s*3rem/i);
        });

        test('should have width set to 100%', () => {
            expect(htmlContent).toMatch(/width:\s*100%/i);
        });
    });
});
