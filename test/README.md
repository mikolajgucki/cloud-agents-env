# index.html Tests

This directory contains comprehensive tests for the `index.html` file.

## Running Tests

```bash
cd test
npm install
npm test
```

Or with ES module support:

```bash
NODE_OPTIONS=--experimental-vm-modules npm test
```

## Test Coverage

The test suite includes:

- **Document Structure**: Validates HTML5 doctype, language attributes, and basic structure
- **Meta Tags**: Checks charset, viewport, and title tags
- **Font Loading**: Verifies Google Fonts integration and Inter font loading
- **Styles**: Tests CSS properties, color scheme, typography, and layout
- **Content**: Validates the "Hello world!" text and container structure
- **Accessibility**: Ensures semantic HTML and screen reader compatibility
- **Performance**: Checks for optimizations like font-display swap
- **Design Compliance**: Verifies adherence to Figma specifications
- **Edge Cases**: Tests resilience and error handling
- **Code Quality**: Validates code formatting and best practices

## Test Results

All 40 tests pass successfully, covering:
- Document structure and semantics
- Design specifications from Figma
- Web performance best practices
- Accessibility standards
- Code quality metrics
