module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom",
};
