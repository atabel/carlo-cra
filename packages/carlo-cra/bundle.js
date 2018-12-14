#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const pkg = require("pkg");
const config = require("./utils/config");

const defaultBackendFilePath = path.resolve(config.index);
const hasDefaultBackendFile = fs.existsSync(defaultBackendFilePath);

const backendFilePath = defaultBackendFilePath;

(async () => {
  console.log("building...");

  let iconFileName = null;
  let iconFilePath = null;

  const manifest = JSON.parse(
    fs.readFileSync(path.join("build", "manifest.json"), "utf8")
  );

  const name = manifest.short_name || manifest.name || "app";
  console.log("App name:", name);

  if (manifest.icons && manifest.icons.length > 0) {
    iconFileName = manifest.icons[0].src;
    const iconFileOrigPath = path.join("build", iconFileName);
    if (iconFileName && fs.existsSync(iconFileOrigPath)) {
      console.log("App icon:", iconFileName);
      iconFilePath = path.join(__dirname, iconFileName);
      fs.copyFileSync(iconFileOrigPath, iconFilePath);
    }
  }

  let file = fs
    .readFileSync(path.join(__dirname, "bundle.template.js"), "utf8")
    .replace(/__BACKEND__/g, JSON.stringify(backendFilePath))
    .replace(/__NAME__/g, JSON.stringify(name))
    .replace(/__ICON__/g, JSON.stringify(iconFileName));

  const appFilePath = path.join(__dirname, "app.js");

  fs.writeFileSync(appFilePath, file);

  const binName = name.replace(/\s+/g, "-").toLowerCase();

  pkg.exec([appFilePath, "--target", "host", "--output", binName]).then(() => {
    fs.unlinkSync(appFilePath);
    if (iconFilePath) {
      fs.unlinkSync(iconFilePath);
    }
    console.log("Done!");
    console.log("Excutable file:", binName);
  });
})();
