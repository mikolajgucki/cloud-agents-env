# Contributing Guide

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure environment variables are set:
   - `AUTH_TOKEN`: Required for database resource allocation
   - `ALLOCATE_URL`: URL for database resource allocation endpoint

## Development Workflow

### Making Changes

1. Write your code in TypeScript following the existing patterns
2. Ensure all files are properly typed (no `any` types)
3. Add tests for new functionality
4. Run type checking: `npm run typecheck`
5. Run linting: `npm run lint`
6. Format code: `npm run format`

### Before Committing

Run the following checks to ensure code quality:

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Format
npm run format

# Build
npm run build

# Test
npm test
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript settings (no implicit any, strict null checks)
- Always define return types for functions
- Use interfaces for object shapes
- Prefer `const` over `let`, avoid `var`
- Use async/await over raw Promises

### Naming Conventions

- **Classes**: PascalCase (e.g., `MessageStore`)
- **Interfaces**: PascalCase (e.g., `DatabaseConfig`)
- **Functions**: camelCase (e.g., `fetchDBConfig`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TABLE_NAME`)
- **Files**: Match the exported class/interface name

### Testing

- Test files should be in `__tests__` directories
- Test file names should match the source file with `.test.ts` suffix
- Group related tests using `describe` blocks
- Use descriptive test names that explain the expected behavior
- Cover main flows, edge cases, and error scenarios

### Example Test Structure

```typescript
describe('ClassName', () => {
  describe('methodName', () => {
    it('should do expected behavior when condition', async () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = await methodName(input);
      
      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

## Project Structure

```
src/
├── __tests__/          # Test files
│   └── *.test.ts
├── types/              # Type definitions
│   └── *.ts
├── utils/              # Utility functions
│   └── *.ts
├── *.ts                # Main source files
└── index.ts           # Public API exports
```

## Commit Messages

Follow conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

Example: `feat: add findById method to MessageStore`

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add a clear description of changes
4. Request review from maintainers
