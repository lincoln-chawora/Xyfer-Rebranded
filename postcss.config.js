const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: {
    tailwindcss: './tailwind.js',
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': process.env.NODE_ENV === "production" ? {
      content: [
          '_site/**/*.html',
          '_site/*.html'
      ],
      extractors: [
        {
          extractor: content => {
            return content.match(/[A-z0-9-:\/]+/g) || [];
          },
          extensions: ['css', 'scss', 'html']
        }
      ]
    } : false,
  }
}