const path = require("path");
const openCarlo = require("./utils/open-carlo");

const backend = require(__BACKEND__);
const appName = __NAME__;
const icon = __ICON__ ? path.join(__dirname, __ICON__) : null;

openCarlo({ backend, appName, icon });
