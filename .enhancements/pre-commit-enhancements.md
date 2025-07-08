# Pre-commit Hook Enhancements

This document explains the enhancements made to the pre-commit hook to make it more strict and improve code quality.

## Added Checks

### 1. Merge Conflict Detection
```sh
# Check for merge conflicts
echo "Checking for merge conflicts..."
if grep -r "<<<<<<< HEAD" --include="*.js" --include="*.ts" --include="*.php" --include="*.json" .; then
  echo "❌ Error: Merge conflicts detected. Please resolve them before committing."
  exit 1
fi
```
**Benefits:**
- Prevents committing files with unresolved merge conflicts
- Avoids breaking the codebase with conflict markers
- Ensures clean, working code in the repository

### 2. Large File Detection
```sh
# Check for large files
echo "Checking for large files..."
if find . -type f -not -path "./node_modules/*" -not -path "./vendor/*" -size +1M | grep -q .; then
  echo "❌ Error: Large files detected (>1MB). Please remove them or add to .gitignore."
  find . -type f -not -path "./node_modules/*" -not -path "./vendor/*" -size +1M
  exit 1
fi
```
**Benefits:**
- Prevents accidentally committing large files that should be in .gitignore
- Keeps the repository size manageable
- Improves clone and fetch times for all developers

### 3. TypeScript Type Checking
```sh
# Run TypeScript type checking
echo "Running TypeScript type checking..."
if [ -f "tsconfig.json" ] && ! npx tsc --noEmit; then
  echo "❌ Error: TypeScript type checking failed. Please fix the type errors before committing."
  exit 1
fi
```
**Benefits:**
- Catches type errors before they reach the codebase
- Enforces type safety across the project
- Prevents runtime errors caused by type mismatches

### 4. Test Coverage Threshold
```sh
# Check test coverage (if tests exist)
if [ -d "tests" ] || [ -d "__tests__" ] || [ -d "src/__tests__" ]; then
  echo "Checking test coverage..."
  if ! npm run test:coverage -- --coverageThreshold='{"global":{"statements":70,"branches":70,"functions":70,"lines":70}}'; then
    echo "❌ Error: Test coverage is below the threshold. Please add more tests."
    exit 1
  fi
fi
```
**Benefits:**
- Ensures adequate test coverage for new code
- Encourages developers to write tests for their code
- Reduces the likelihood of bugs and regressions

### 5. PHP Static Analysis
```sh
# Run PHP static analysis if PHPStan is available
if [ -f "vendor/bin/phpstan" ]; then
  echo "Running PHP static analysis..."
  if ! composer analyze; then
    echo "❌ Error: PHP static analysis failed. Please fix the issues before committing."
    exit 1
  fi
fi
```
**Benefits:**
- Detects potential bugs and errors in PHP code
- Enforces type safety in PHP
- Improves code quality and reduces technical debt

### 6. PHP Code Quality Checks
```sh
# Run PHP code quality checks if Rector is available
if [ -f "vendor/bin/rector" ]; then
  echo "Running PHP code quality checks..."
  if ! composer rector:dry-run; then
    echo "❌ Error: PHP code quality checks failed. Please fix the issues before committing."
    exit 1
  fi
fi
```
**Benefits:**
- Ensures PHP code follows best practices
- Identifies potential improvements to code structure
- Maintains consistent code quality across the project

### 7. PHP Code Formatting
```sh
# Run PHP code formatting if Laravel Pint is available
if [ -f "vendor/bin/pint" ]; then
  echo "Running PHP code formatting..."
  if ! composer pint:test; then
    echo "❌ Error: PHP code formatting check failed. Please run 'composer pint' to fix the issues before committing."
    exit 1
  fi
fi
```
**Benefits:**
- Ensures consistent code style across PHP files
- Enforces PSR-12 coding standards as specified in the project guidelines
- Automates formatting to reduce manual effort and code review comments
- Improves code readability and maintainability

### 8. Security Vulnerability Checks
```sh
# Check for security vulnerabilities in dependencies
echo "Checking for security vulnerabilities..."
if command -v npm > /dev/null && ! npm audit --production --audit-level=high; then
  echo "⚠️ Warning: Security vulnerabilities detected in npm dependencies."
  # Not exiting with error as this might be too strict for some projects
fi

if command -v composer > /dev/null && [ -f "composer.lock" ]; then
  if ! composer audit --no-dev; then
    echo "⚠️ Warning: Security vulnerabilities detected in Composer dependencies."
    # Not exiting with error as this might be too strict for some projects
  fi
fi
```
**Benefits:**
- Identifies security vulnerabilities in dependencies
- Raises awareness of potential security issues
- Encourages regular dependency updates

## Conditional Execution

All checks are designed to run conditionally based on the project's configuration:

- TypeScript type checking only runs if a tsconfig.json file exists
- Test coverage check only runs if test directories exist
- PHP static analysis only runs if PHPStan is installed
- PHP code quality checks only run if Rector is installed
- PHP code formatting checks only run if Laravel Pint is installed
- Security vulnerability checks only run if the respective package managers are available

This makes the pre-commit hook adaptable to different project configurations and ensures it only runs relevant checks.

## Alignment with Project Guidelines

These enhancements align with the project's development guidelines:

- Enforces SOLID principles through static analysis and code quality checks
- Supports effective testing practices by requiring adequate test coverage
- Ensures code follows modern JavaScript/TypeScript conventions
- Maintains PSR-12 compliance for PHP code
- Promotes good security practices by checking for vulnerabilities

## Customization

The pre-commit hook can be further customized by:

- Adjusting the test coverage thresholds
- Adding or removing file types for merge conflict detection
- Changing the size threshold for large file detection
- Adding more specific checks for your project's requirements
