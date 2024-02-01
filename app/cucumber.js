const config = {
  paths: ["tests/e2e/**/*.feature"],
  require: ["tests/e2e/**/*.ts"],
  requireModule: ["ts-node/register"],
  format: ["summary", "progress-bar"],
  formatOptions: { snippetInterface: "async-await" },
};

module.exports = {
  default: config,
};
