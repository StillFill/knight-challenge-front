module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transformIgnorePatterns: ["/node_modules/(?!(vue3-table-lite)/)"],
  coverageProvider: "v8",
};
