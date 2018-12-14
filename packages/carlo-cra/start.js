const path = require("path");
const nodemon = require("nodemon");
const config = require("./utils/config");

const carloSrcDir = config.srcDir;
const nodemonOptions = `-w ${carloSrcDir} `;

nodemon(
  `${nodemonOptions}${path.join(__dirname, "_start.js")} ${process.argv
    .slice(2)
    .join(" ")}`
).on("quit", () => {
  process.exit();
});
