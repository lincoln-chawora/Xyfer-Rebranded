const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

// Custom extractor for purgeCSS to avoid stripping classes with `:` prefixes.
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

module.exports = {
  plugins: {
    tailwindcss: './tailwind.js',
    autoprefixer: {},
  }
}