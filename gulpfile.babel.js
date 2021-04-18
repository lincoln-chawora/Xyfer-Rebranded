import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import spawn from "cross-spawn";
import cssnano from "cssnano";
import { dest, series, src, task, watch } from "gulp";
import postcss from "gulp-postcss";
import atimport from "postcss-import";
import tailwindcss from "tailwindcss";
import sass from "gulp-sass";
import uglify from "gulp-uglify";
import purgecss from "@fullhuman/postcss-purgecss";

const SITE_ROOT = "./_site";
const POST_BUILD_STYLESHEET = `${SITE_ROOT}/assets/css/`;
const POST_BUILD_SCRIPT = `${SITE_ROOT}/assets/js/`;
const PRE_BUILD_STYLESHEET = "./assets/styles/style.css";
const TAILWIND_CONFIG = "./tailwind.js";

// Fix for Windows compatibility
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

const isDevelopmentBuild = process.env.NODE_ENV === "development";

task("buildJekyll", () => {
  browserSync.notify("Building Jekyll site...");

  const args = ["exec", jekyll, "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

task("processStyles", () => {
  browserSync.notify("Compiling styles...");

  return src(PRE_BUILD_STYLESHEET)
    .pipe(
      postcss([
        atimport(),
        tailwindcss(TAILWIND_CONFIG),
        ...(process.env.NODE_ENV === "production" ?
                [
                purgecss({
                  content: [
                    "**/*.html",
                  ],
                  defaultExtractor: content =>
                      content.match(/[\w-/:]+(?<!:)/g) || []
                })
            ] : []
        ),
      ])
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(POST_BUILD_STYLESHEET));
});

task('move-libraries-to-assets', () => {
  return src("libraries/vue/dist/vue.js")
      .pipe(dest(POST_BUILD_SCRIPT));
});

task('compress', () => {
  return src(`${POST_BUILD_SCRIPT}/*.js`)
      .pipe(uglify())
      .pipe(dest(POST_BUILD_SCRIPT));
});

task("startServer", () => {
  browserSync.init({
    files: [SITE_ROOT + "/**"],
    open: "local",
    port: 4000,
    server: {
      baseDir: SITE_ROOT,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    codeSync: false,
  });

  watch(
    [
      "**/**/*.scss",
      "**/*.css",
      "**/*.html",
      "**/*.js",
      "**/*.md",
      "**/*.markdown",
      "!_site/**/*",
      "!node_modules/**/*",
    ],
    { interval: 500 },
    buildSite
  );
});

const buildSite = series("buildJekyll", "processStyles", "move-libraries-to-assets", "compress");

exports.serve = series(buildSite, "startServer");
exports.default = series(buildSite);
