# Development Guidelines

This document outlines the development guidelines for this project. It includes information about code style, development practices, and testing.

## Development Information

### DRY (Don't Repeat Yourself)

Avoid code duplication. Centralize logic in reusable functions or classes.

### KISS (Keep It Simple, Stupid)

Keep code as simple and straightforward as possible. Avoid over-engineered or unnecessarily complex solutions.

### YAGNI (You Aren't Gonna Need It)

Don't implement features that haven't been requested or aren't currently necessary.

### LOD (Law of Demeter)

Design code so that objects only communicate with their immediate collaborators, avoiding long call chains.

### SRP (Single Responsibility Principle)

Each class, module, or function should have a single, clearly defined responsibility.

### OCP (Open/Closed Principle)

Code should be open for extension but closed for modification: new functionality can be added without altering existing code.

### LSP (Liskov Substitution Principle)

Subclasses or implementations should be replaceable for their base types without breaking expected behavior.

### ISP (Interface Segregation Principle)

Prefer small, specific interfaces over large, general ones. Avoid forcing clients to implement methods they don't use.

### DIP (Dependency Inversion Principle)

High-level modules should depend on abstractions (e.g., interfaces) rather than low-level modules. This makes swapping dependencies easier without modifying business logic.

## Effective Testing

### Testing Practices

- Write unit tests for business logic.
- Write feature tests for integration and end-to-end testing.
- For typescript, use jest and for php use pest

#### Explanation

- Tests ensure code correctness and prevent regressions.
- Unit tests focus on business logic without external dependencies.
- Integration tests verify that components work together correctly.

## Additional Rules for JavaScript and TypeScript

- ✅ Apply modern JavaScript conventions (ES6+), using `const` and `let` instead of `var`.
- ✅ Use arrow functions (`=>`) where clearer and appropriate.
- ✅ Use destructuring to improve readability.
- ✅ Add short, explanatory, and relevant comments.
- ✅ Follow best practices like modularizing your code into separate files and using `import/export` when appropriate.
- ✅ Prioritize readability and maintainability over premature optimization.
- ✅ Use SOLID principles.

## Additional Rules for PHP

- ✅ Follow PSR-12 as the coding style standard.
- ✅ Use strict typing (`declare(strict_types=1)`).
- ✅ Prefer namespaces and autoloading with Composer.
- ✅ Avoid global functions; prefer classes or pure functions.
- ✅ Use PHPDoc to document methods and classes.
- ✅ Prioritize dependency injection over direct instantiation.
- ✅ Apply good security practices (e.g., input filtering and sanitization).
- ✅ Always use DTOs.
- ✅ Use SOLID principles.

## Git Workflow Process

When starting work on a new feature or bug fix, follow these steps:

- Create a new Git branch before starting any work.
- Record the session start timestamp in yyyy-MM-dd_hh-mm format.
- Before writing any code, create a file named plan-{timestamp}.md (replace {timestamp} with your recorded value).
- In that file, write your detailed, numbered task list.
- Save that list to a separate file named tasks-{timestamp}.md.
- Do the work specified by the user's prompt.
- After finishing each task, mark it as done (✓) in tasks-{timestamp}.md.
- When all tasks are complete, commit your changes to the new branch.

## Important Notes

- This information is intended for an advanced developer; include only information specific to this project.
- Check that the test examples work before writing the information to the file.
- After generation, delete all additional files created except `.junie/guidelines.md`.
