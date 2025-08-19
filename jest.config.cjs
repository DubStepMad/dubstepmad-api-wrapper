/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$", // <-- reliable for ESM + TS
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // make sure TS files are recognized
};
