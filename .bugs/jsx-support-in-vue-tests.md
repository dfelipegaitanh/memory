# JSX Support in Vue Tests

## Issue Description

When running test coverage on untested files, the following error occurred:

```
Failed to collect coverage from /Users/felipegaitan/projects/frontend/beginner/memory-2/src/App.vue
ERROR: /Users/felipegaitan/projects/frontend/beginner/memory-2/src/App.vue: Support for the experimental syntax 'jsx' isn't currently enabled (1:1)
```

This error occurred because the testing configuration didn't properly support JSX syntax in Vue components.

## Root Cause

The root cause of the issue was twofold:

1. **Missing Babel Configuration**: The Babel configuration (`babel.config.js`) had an empty presets array, which meant it wasn't configured to handle JSX syntax in Vue components.

2. **Incomplete Jest Configuration**: The Jest configuration (`jest.config.js`) was set to use the "node" environment and didn't have a transformer for .vue files.

## Solution

The issue was resolved by making the following changes:

1. **Updated Babel Configuration**: Added the necessary presets to handle JSX syntax in Vue components.

```javascript
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@vue/babel-preset-jsx"],
};
```

2. **Updated Jest Configuration**: Changed the test environment to "jsdom" and added a transformer for .vue files.

```javascript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  // ... other configuration ...
};
```

3. **Added Missing Dependency**: Added the @vue/babel-preset-jsx dependency to package.json and installed it.

```json
"@vue/babel-preset-jsx": "^1.4.0"
```

## Lessons Learned

1. **Proper Configuration for Vue Testing**: When testing Vue components, it's important to have the correct Babel and Jest configuration to handle Vue-specific syntax, including JSX.

2. **Environment Matters**: Using the correct test environment ("jsdom" instead of "node") is crucial for testing components that rely on browser APIs.

3. **Dependency Management**: Ensure all necessary dependencies are installed, especially when working with specific syntax features like JSX.

## Related Documentation

- [Vue Test Utils Documentation](https://test-utils.vuejs.org/)
- [Jest Configuration for Vue](https://jestjs.io/docs/configuration)
- [Babel Configuration for Vue](https://babeljs.io/docs/en/configuration)
