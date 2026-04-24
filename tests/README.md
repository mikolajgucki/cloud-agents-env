# Tests for index.html

This directory contains automated tests for the `index.html` file.

## Running Tests

From the root directory:

```bash
npm install
npm test
```

To run only the HTML tests:

```bash
npm run test:html
```

## Test Coverage

The test suite includes 22 comprehensive tests covering:

### Document Structure
- HTML5 doctype validation
- Language attribute verification
- Meta tags (charset, viewport)
- Title element presence

### Content
- "Hello world!" text verification
- Semantic HTML structure (h1 usage)
- Proper heading hierarchy

### Styling
- Dark gray background color (#2d2d2d)
- Vivid orange text color (#ff6b35)
- Apple-like system font stack
- Flexbox centering implementation
- Full viewport height
- CSS reset for cross-browser consistency

### Typography
- Font size configuration
- Font weight specification
- Letter spacing (Apple-like styling)

### Accessibility
- Semantic HTML validation
- Document language attributes
- Proper heading structure

### Responsiveness
- Viewport meta tag
- Relative/responsive units usage

## Test Framework

- **Jest**: Testing framework
- **JSDOM**: DOM implementation for Node.js
- **TypeScript**: Type-safe test code
- **ts-jest**: TypeScript preprocessor for Jest

## Requirements

- Node.js 18+ recommended
- npm or yarn package manager
