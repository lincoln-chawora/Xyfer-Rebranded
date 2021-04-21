import spawn from "cross-spawn";
import { series, task } from "gulp";

const SITE_ROOT = "./_site";

// Fix for Windows compatibility
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

const isDevelopmentBuild = process.env.NODE_ENV === "development";

task("buildJekyll", () => {
  const args = ["exec", jekyll, "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

const buildSite = series("buildJekyll");

exports.serve = series(buildSite);
exports.default = series(buildSite);
