module.exports = {
  testEnvironment: "jsdom",


    setupFiles: [
        "<rootDir>/jest.polyfills.cjs"
    ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};