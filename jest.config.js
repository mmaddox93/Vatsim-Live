module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [
    '<rootDir>/tests/jest.stub.js',
  ],
};
