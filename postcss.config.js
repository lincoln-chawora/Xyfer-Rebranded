const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

// Custom extractor for purgeCSS to avoid stripping classes with `:` prefixes.
class TailwindExtractor {
  static extract(content) {
    // eslint-disable-next-line no-useless-escape
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

module.exports = {
  plugins: {
    tailwindcss: './tailwind.js',
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': process.env.NODE_ENV === 'production' ? {
      content: [
        './**/*.html',
        '.*.html',
        './assets/js/*.js',
        './assets/styles/**/*.scss',

      ],
      extractors: [
        {
          extensions: ['html', 'scss', 'js'],
          extractor: TailwindExtractor,
        },
      ],
    } : false,
  }
}