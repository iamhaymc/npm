/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node', // or 'jsdom'
  testMatch: ["**/*.(test|spec).ts"],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    "^.+\\.m?tsx?$": "ts-jest",
    "^.+\\.m?jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!.)"],
  moduleFileExtensions: ["ts", "tsx", "mts", "js", "jsx", "mjs", "json", "node"],
};