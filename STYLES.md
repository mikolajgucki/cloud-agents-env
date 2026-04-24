# Styles Documentation

A comprehensive, modern CSS framework for building beautiful web applications with a utility-first approach.

## Overview

This CSS framework provides:
- **CSS Custom Properties (Variables)** for easy theming
- **Utility-first classes** for rapid development
- **Component styles** for common UI elements
- **Responsive design** with mobile-first approach
- **Accessibility** features built-in
- **Modern CSS** using Flexbox and Grid

## Quick Start

Include the stylesheet in your HTML:

```html
<link rel="stylesheet" href="styles.css">
```

Then use the classes in your markup:

```html
<div class="container">
  <h1 class="text-4xl font-bold text-primary">Hello World</h1>
  <button class="btn btn-primary">Click Me</button>
</div>
```

## CSS Variables

The framework uses CSS custom properties for easy theming. All variables are defined in the `:root` selector:

### Colors

- `--primary-color`: Main brand color (#3b82f6)
- `--primary-hover`: Hover state for primary color
- `--secondary-color`: Secondary brand color
- `--success-color`: Success state color
- `--error-color`: Error state color
- `--warning-color`: Warning state color
- `--text-color`: Main text color
- `--text-secondary`: Secondary text color
- `--background-color`: Background color
- `--border-color`: Border color

### Spacing

- `--spacing-xs`: 0.25rem
- `--spacing-sm`: 0.5rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 1.5rem
- `--spacing-xl`: 2rem
- `--spacing-2xl`: 3rem

### Typography

- `--font-family`: System font stack
- `--font-size-sm` through `--font-size-4xl`: Font sizes

### Other Variables

- Border radius variables (`--radius-sm` through `--radius-xl`)
- Shadow variables (`--shadow-sm` through `--shadow-xl`)
- Transition variables (`--transition-fast`, `--transition-base`, `--transition-slow`)

## Layout

### Container

Center and constrain content width:

```html
<div class="container">Content</div>
<div class="container-sm">Narrow content</div>
<div class="container-lg">Wide content</div>
```

### Flexbox

```html
<div class="flex items-center justify-between gap-md">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

Available classes:
- `flex`: Display flex
- `flex-col`: Flex direction column
- `flex-wrap`: Flex wrap
- `items-center`, `items-start`, `items-end`: Align items
- `justify-center`, `justify-between`, `justify-around`, etc.: Justify content
- `gap-xs` through `gap-2xl`: Gap spacing

### Grid

```html
<div class="grid grid-cols-3 gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Available classes:
- `grid`: Display grid
- `grid-cols-1` through `grid-cols-4`: Grid columns
- Responsive: `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4`

## Components

### Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">
    <p>Content</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-label" for="input">Label</label>
  <input type="text" id="input" class="form-input" placeholder="Placeholder">
  <span class="form-help">Help text</span>
</div>
```

Form elements:
- `form-group`: Form field wrapper
- `form-label`: Label styling
- `form-input`: Text input
- `form-select`: Select dropdown
- `form-textarea`: Textarea
- `form-error`: Error message
- `form-help`: Help text

### Alerts

```html
<div class="alert alert-success">Success message</div>
<div class="alert alert-error">Error message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-info">Info message</div>
```

## Utilities

### Spacing

Margin and padding utilities follow the pattern: `{property}-{size}`

Margins:
- `m-{size}`: All sides
- `mt-{size}`: Top
- `mb-{size}`: Bottom
- `ml-{size}`: Left
- `mr-{size}`: Right

Padding:
- `p-{size}`: All sides
- `pt-{size}`: Top
- `pb-{size}`: Bottom
- `pl-{size}`: Left
- `pr-{size}`: Right

Sizes: `0`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

### Typography

Text alignment:
- `text-center`, `text-left`, `text-right`

Font sizes:
- `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`

Font weights:
- `font-normal`, `font-medium`, `font-semibold`, `font-bold`

Text colors:
- `text-primary`, `text-secondary`, `text-success`, `text-error`, `text-warning`

### Display

- `block`: Display block
- `inline`: Display inline
- `inline-block`: Display inline-block
- `hidden`: Display none
- `flex`: Display flex
- `grid`: Display grid

### Width

- `w-full`: Width 100%
- `w-auto`: Width auto

### Backgrounds

- `bg-primary`: Primary background
- `bg-secondary`: Secondary background
- `bg-white`: White background

### Borders

Border:
- `border`: 1px solid border
- `border-0`: No border
- `border-t`, `border-b`, `border-l`, `border-r`: Single side borders

Border radius:
- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

### Shadows

- `shadow-sm`: Small shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow
- `shadow-xl`: Extra large shadow
- `shadow-none`: No shadow

## Responsive Design

The framework uses a mobile-first approach with the following breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up

Use responsive prefixes with utilities:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  <!-- Responsive grid -->
</div>
```

## Theming

Customize the framework by overriding CSS variables:

```css
:root {
  --primary-color: #your-color;
  --spacing-md: 1.5rem;
  /* Override other variables */
}
```

## Browser Support

This framework supports:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard CSS properties
- Includes vendor prefixes for font smoothing

## Best Practices

1. **Use utility classes** for one-off styling
2. **Compose components** from utility classes
3. **Override variables** for theming instead of changing core styles
4. **Combine classes** to create complex layouts
5. **Use semantic HTML** with styled classes

## Examples

See `styles-demo.html` for a comprehensive demonstration of all components and utilities.

## Testing

Run the test suite:

```bash
npm install
npm run test:styles
```

The test suite validates:
- CSS syntax correctness
- Presence of all required components
- Proper use of CSS variables
- Accessibility features
- Browser compatibility
- Code quality and best practices
