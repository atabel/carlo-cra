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
  const isDev = url !== "/index.html";
  let app;
  try {
    const reactChromeExtension = require("@npm-chrome-extensions/react-devtools");
    app = await carlo.launch({
      title: appName,
      icon: icon,
      localDataDir: path.join(os.homedir(), `.${appName}`),
      channel: ["canary", "stable"],
      args: isDev
        ? [
            `--load-extensions:${reactChromeExtension}`,
            `--disable-extensions-except=${reactChromeExtension}`
          ]
        : []
    });
  } catch (e) {
    console.error(e);
    return;
  }

  if (!isDev) {
    app.serveFolder("build");
  }

  app.on("exit", () => process.exit());
  // New windows are opened when this app is started again from command line.
  app.on("window", window => window.load(url, rpc.handle(backend)));
  app.load(url, rpc.handle(backend));
};

module.exports = openCarlo;
