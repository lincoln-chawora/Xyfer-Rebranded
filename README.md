# Jekyll Starter Tailwind
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

A starter kit for using [Tailwind](https://tailwindcss.com) with [Jekyll](https://jekyllrb.com/) that includes:
* A barebones Jekyll starter theme
* A Gulpfile that does the following:

    * Compiles Tailwind
    * Strips out unused CSS using Tailwind's `purge` option
    * Runs [Autoprefixer](https://github.com/postcss/autoprefixer)
    * Minifies your CSS
    * Compiles Jekyll
    * Runs [Browsersync](https://www.browsersync.io/) for local development

## What is Tailwind?
>"Tailwind is a utility-first CSS framework for rapidly building custom user interfaces."
–[Tailwind](https://tailwindcss.com)

## What is Jekyll?
>"Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity. Jekyll takes your content, renders Markdown and Liquid templates, and spits out a complete, static website ready to be served by Apache, Nginx or another web server. Jekyll is the engine behind GitHub Pages, which you can use to host sites right from your GitHub repositories."
–[Jekyll](https://jekyllrb.com/)

## Requirements
* [Bundler](http://bundler.io/)
* [Jekyll](https://jekyllrb.com/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)

## Get started
* `bundle install` to install Ruby gems
* `composer install` to install libraries
* `npm ci` to install npm packages listed in `package-lock.json`
* `npm run build` or `npm run watch` to compile the site with development settings and run BrowserSync

## Build site
* `npm run build` to compile the site with development settings
* `npm run build-prod`

## How you can help
Enjoying Jekyll Starter Tailwind and want to help? You can:
* [Create an issue](https://github.com/taylorbryant/jekyll-starter-tailwind/issues/new) with some constructive criticism
* [Submit a pull request](https://github.com/taylorbryant/jekyll-starter-tailwind/compare) with some improvements to the project
