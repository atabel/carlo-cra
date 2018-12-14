const fs = require("fs");
const path = require("path");
const openCarlo = require("./utils/open-carlo");
const config = require("./utils/config");

const start = backend => {
  if (!backend) {
    const defaultBackendFilePath = path.join(process.cwd(), config.index);
    const hasDefaultBackendFile = fs.existsSync(defaultBackendFilePath);
    if (hasDefaultBackendFile) {
      backend = require(defaultBackendFilePath);
    }
  }
  const [url] = process.argv.slice(2);

  openCarlo({ url, backend });
};

start();
