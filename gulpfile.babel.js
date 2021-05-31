import spawn from "cross-spawn";
import { series, task } from "gulp";

const isDevelopmentBuild = process.env.NODE_ENV === "development";

task("buildJekyll", () => {
  const args = ["exec", "jekyll", "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

const buildSite = series("buildJekyll");

exports.serve = series(buildSite);
exports.default = series(buildSite);
