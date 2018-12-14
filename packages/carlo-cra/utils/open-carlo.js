const path = require("path");
const os = require("os");
const carlo = require("carlo");
const { rpc } = require("carlo/rpc");

const openCarlo = async ({
  url = "/index.html",
  backend = {},
  appName = "app",
  icon = null
} = {}) => {
  let app;
  try {
    app = await carlo.launch({
      title: appName,
      icon: icon,
      localDataDir: path.join(os.homedir(), `.${appName}`),
      // width: 1000,
      // height: 500,
      channel: ["canary", "stable"],
      args: ["--allow-insecure-localhost", "--allow-running-insecure-content"]
    });
  } catch (e) {
    console.error(e);
    return;
  }

  const isDev = url !== "/index.html";

  if (!isDev) {
    app.serveFolder("build");
  }

  app.on("exit", () => process.exit());
  // New windows are opened when this app is started again from command line.
  app.on("window", window => window.load(url, rpc.handle(backend)));
  app.load(url, rpc.handle(backend));
};

module.exports = openCarlo;
