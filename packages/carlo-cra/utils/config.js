const fs = require("fs");

const pkgJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const config = pkgJson["carlo-cra"];

const defaultConfig = {
  srcDir: "carlo",
  index: "carlo/index.js"
};

module.exports = { ...defaultConfig, ...config };
