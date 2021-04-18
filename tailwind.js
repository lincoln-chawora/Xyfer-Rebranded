const color = require('color');
const _ = require('lodash');
const shortenCssHex = require('shorten-css-hex');

/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig')()

/*
|-------------------------------------------------------------------------------
| Custom specific changes
|-------------------------------------------------------------------------------
|
| Custom specific modifications.
|
*/
const spacingValue = 8;

/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
|
| Here you can specify the colors used in your project. To get you started,
| we've provided a generous palette of great looking colors that are perfect
| for prototyping, but don't hesitate to change them for your project. You
| own these colors, nothing will break if you change everything about them.
|
| We've used literal color names ("red", "blue", etc.) for the default
| palette, but if you'd rather use functional names like "primary" and
| "secondary", or even a numeric scale like "100" and "200", go for it.
|
*/

const colors = {
  transparent: 'transparent',
  green: '#5CB85C',
  black: '#000',
  'dark-gray': '#3e4444',
  white: '#fff',
  'grey-25': '#f4f4f4',
  'grey-50': '#ebebeb',
  'grey-100': '#afb4b6',
  'grey-200': '#898e91',
  'grey-300': '#64696c',
  'grey-400': '#3c3c3b',
  youtube: '#ee3235',
  twitter: '#00bbf2',
  facebook: '#4d70a8',
  instagram: '#444',
  linkedin: '#0077b5',
  'black-trans': 'rgba(0,0,0,.55)',
};

// Add some aliases, these are used as 'theme colors' for Bootstrap too.
colors.primary = colors['dark-gray'];
colors.secondary = colors.green;
colors.tertiary = colors.white;
colors.success = '#449d44';
colors.danger = '#c9302c';
colors.warning = '#ec971f';
colors.light = colors.white
colors.dark = colors.black

// Generate darker variants of each colour to use for hover/focus states.
_.forEach(colors, (value, key) => {
  if (_.includes(['transparent', 'primary-trans'], key)) {
    return;
  }
  _.assign(colors, {
    [`${key}--dark`]: _.toLower(
        shortenCssHex(
            color(value)
                .darken(0.12)
                .hex(),
        ),
    ),
    [`${key}--light`]: _.toLower(
        shortenCssHex(
            color(value)
                .lighten(0.12)
                .hex(),
        ),
    ),
  });
});

module.exports = {
  purge: [`_site/**/*.html`],
  theme: {
    extend: {
      /*
      |-----------------------------------------------------------------------------
      | Screens                      https://tailwindcss.com/docs/responsive-design
      |-----------------------------------------------------------------------------
      |
      | Screens in Tailwind are translated to CSS media queries. They define the
      | responsive breakpoints for your project. By default Tailwind takes a
      | "mobile first" approach, where each screen size represents a minimum
      | viewport width. Feel free to have as few or as many screens as you
      | want, naming them in whatever way you'd prefer for your project.
      |
      | Tailwind also allows for more complex screen definitions, which can be
      | useful in certain situations. Be sure to see the full responsive
      | documentation for a complete list of options.
      |
      | Class name: .{screen}:u-{utility}
      |
      */
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1920px',
      },
      /*
      |-----------------------------------------------------------------------------
      | Width                                    https://tailwindcss.com/docs/width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your width utility sizes. These can be
      | percentage based, pixels, rems, or any other units. By default
      | we provide a sensible rem based numeric scale, a percentage
      | based fraction scale, plus some other common use-cases. You
      | can, of course, modify these values as needed.
      |
      |
      | It's also worth mentioning that Tailwind automatically escapes
      | invalid CSS class name characters, which allows you to have
      | awesome classes like .w-2/3.
      |
      | Class name: .u-w-{size}
      |
      */
      width: {
        auto: 'auto',
        unset: 'unset',
        '0': '0',
        '1': `${spacingValue * 1}px`,
        '2': `${spacingValue * 2}px`,
        '3': `${spacingValue * 3}px`,
        '4': `${spacingValue * 4}px`,
        '5': `${spacingValue * 5}px`,
        '6': `${spacingValue * 6}px`,
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '5/6': '83.33333%',
        full: '100%',
        screen: '100vw',
        icon: '20px',
        logo: '300px',
      },
      /*
      |-----------------------------------------------------------------------------
      | Text sizes                         https://tailwindcss.com/docs/text-sizing
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your text sizes. Name these in whatever way
      | makes the most sense to you. We use size names by default, but
      | you're welcome to use a numeric scale or even something else
      | entirely.
      |
      | By default Tailwind uses the "rem" unit type for most measurements.
      | This allows you to set a root font size which all other sizes are
      | then based on. That said, you are free to use whatever units you
      | prefer, be it rems, ems, pixels or other.
      |
      | Class name: .u-text-{size}
      |
      */

      fontSize: {
        small: '13px',
        medium: '16px',
        large: '20px',
        h5: '25px',
        h4: '31px',
        h3: '39px',
        h2: '49px',
        h1: '61px',
        sidekick: '76px',
        hero: '95px',
        unset: 'unset',
      },
      /*
      |-----------------------------------------------------------------------------
      | Font weights                       https://tailwindcss.com/docs/font-weight
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your font weights. We've provided a list of
      | common font weight names with their respective numeric scale values
      | to get you started. It's unlikely that your project will require
      | all of these, so we recommend removing those you don't need.
      |
      | Class name: .u-font-{weight}
      |
      */
      fontWeights: {
        thin: 200,
        light: 300,
        normal: 400,
        bold: 600,
        'extra-bold': 800,
        unset: 'unset',
      },

      /*
      |-----------------------------------------------------------------------------
      | Leading (line height)              https://tailwindcss.com/docs/line-height
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your line height values, or as we call
      | them in Tailwind, leadings.
      |
      | Class name: .u-leading-{size}
      |
      */
      leading: {
        none: 1,
        tighter: 0.9,
        tight: 1.25,
        normal: 1.5,
        loose: 2,
        unset: 'unset',
      },

      /*
      |-----------------------------------------------------------------------------
      | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your letter spacing values, or as we call
      | them in Tailwind, tracking.
      |
      | Class name: .u-tracking-{size}
      |
      */

      tracking: {
        tight: '-0.05em',
        normal: '0',
        wide: '0.05em',
      },

      /*
      |-----------------------------------------------------------------------------
      | Text colors                         https://tailwindcss.com/docs/text-color
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your text colors. By default these use the
      | color palette we defined above, however you're welcome to set these
      | independently if that makes sense for your project.
      |
      | Class name: .u-text-{color}
      |
      */
      textColor: colors,

      /*
      |-----------------------------------------------------------------------------
      | Background colors             https://tailwindcss.com/docs/background-color
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your background colors. By default these use
      | the color palette we defined above, however you're welcome to set
      | these independently if that makes sense for your project.
      |
      | Class name: .u-bg-{color}
      |
      */

      backgroundColor: colors,

      /*
      |-----------------------------------------------------------------------------
      | Background sizes               https://tailwindcss.com/docs/background-size
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your background sizes. We provide some common
      | values that are useful in most projects, but feel free to add other sizes
      | that are specific to your project here as well.
      |
      | Class name: .u-bg-{size}
      |
      */

      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
      },

      /*
      |-----------------------------------------------------------------------------
      | Border widths                     https://tailwindcss.com/docs/border-width
      |-----------------------------------------------------------------------------
      |
      | Here is where you define your border widths. Take note that border
      | widths require a special "default" value set as well. This is the
      | width that will be used when you do not specify a border width.
      |
      | Class name: .u-border{-side?}{-width?}
      |
      */

      borderWidth: {
        default: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
    },
  },
  variants: {},
  plugins: [],
  important: true,
  prefix: 'u-',
};
