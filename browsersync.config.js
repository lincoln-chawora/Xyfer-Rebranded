const SITE_ROOT = "./_site";

module.exports = {
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
  watchEvents: ['add', 'change', 'unlink', 'addDir', 'unlinkDir'],
  reloadDebounce: 500,
};
