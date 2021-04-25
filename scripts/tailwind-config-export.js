/* eslint-disable */

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const jsonfile = require('jsonfile');
const sassExporter = require('sass-export').exporter;

const tailwindConfig = require('./../tailwind.js');

const tailwindPrefix = tailwindConfig.prefix;

const scssOutputPath = path.join(
    process.cwd(),
    'assets/styles/_tailwind-variables.scss',
);

const jsonOutputPath = path.join(
    process.cwd(),
    'assets/data/tailwind-values.json',
);

/**
 * Generate a Tailwind class, including the prefix and accounting for the fact
 * that some default values have unprefixed classes, like shadows: default is
 * used as .u-shadow not .u-shadows-default.
 *
 * @param {string} key
 * @param tailwindClassName
 * @return {string} A Tailwind CSS utility class
 */
function generateClass(key, tailwindClassName) {
  return [
    tailwindPrefix.replace(/-/g, ''),
    tailwindClassName,
    key === 'default' ? undefined : key,
  ]
      .filter(Boolean)
      .join('-');
}

// The keys from the Tailwind config that we are interested in.
const plugins = [
  'colors',
  'screens',
  'fontSize',
  'fontWeights',
  'borderRadius',
  'leading',
  'boxShadow',
  'margin',
  'padding',
];

const scssFileHeader = `/*
  This file is generated automatically, so please do not edit its contents.
  However, feel free to use these variables in any custom SCSS you need to 
  write, or use them to configure third party CSS like Foundation or Bootstrap.
  
  The values are pulled from the theme's Tailwind JS config file.
 */
`;

const jsonExport = {};

// If the file exists, delete it.
fs.unlink(scssOutputPath, err => {
  if (err && err.code !== 'ENOENT') return console.error(err);

  fs.appendFileSync(scssOutputPath, scssFileHeader);

  // Loop through each plugin, e.g. colors, screens, borderRadius.
  _.forEach(plugins, plugin => {
    const utilities = tailwindConfig.theme.extend[plugin];
    const pluginData = {};
    const pluginKeys = [];

    // Loop through each utility within the plugin, e.g. each color or breakpoint.
    Object.keys(utilities).forEach(key => {
      const pluginNameKebab = _.kebabCase(plugin);
      // Create the SCSS representation of the utility value.
      const scssVariableName = `$--${pluginNameKebab}--${key}`;
      const variableValue = `${utilities[key]}`;
      const line = `${scssVariableName}: ${variableValue};\n`;

      // Write the SCSS code for the variable and value to our SCSS file.
      fs.appendFileSync(scssOutputPath, line, err => {
        if (err) return console.error(err);
      });

      // Create the structure for the JSON file containing the values.
      pluginKeys.push(key);
      pluginData[key] = {};
      pluginData[key].key = key;
      pluginData[key].value = variableValue;
      pluginData[key].scssClass = scssVariableName;
      pluginData[key].plugin = plugin;

      if (plugin === 'shadows') {
        const tailwindClassName = 'shadow';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }

      if (plugin === 'textSizes') {
        const tailwindClassName = 'text';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }

      if (plugin === 'fontWeights') {
        const tailwindClassName = 'font';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }

      if (plugin === 'leading') {
        pluginData[key].tailwindClass = generateClass(key, plugin);
      }

      if (plugin === 'borderRadius') {
        const tailwindClassName = 'rounded';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }

      if (plugin === 'margin') {
        const tailwindClassName = 'm';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }

      if (plugin === 'padding') {
        const tailwindClassName = 'p';
        pluginData[key].tailwindClass = generateClass(key, tailwindClassName);
      }
    });

    jsonExport[plugin] = _.sortBy(pluginData, ['key']);

    // Sort the screens (breakpoint) values by the numeric pixel value, not alphabetically
    // by the key like the other plugins.
    if (plugin === 'screens') {
      jsonExport[plugin] = _.sortBy(
          pluginData,
          function sortByBreakpointPxValue(object) {
            // Turn a value like '768px' into 768 so we can sort it.
            return parseInt(object.value, 10);
          },
      );
    }

    // Sort colours by Hue and Saturation
    if (plugin === 'colors') {
      jsonExport[plugin] = _.sortBy(pluginData, function sortColors(object) {
        const colorWeightings = {
          primary: -100,
          secondary: -100,
          tertiary: -100,
          white: -95,
          light: -95,
          black: -94,
          dark: -94,
          linkedin: 100,
          twitter: 100,
          facebook: 100,
          youtube: 100,
          instagram: 100,
          transparent: 200,
        };

        return _.defaultTo(colorWeightings[object.key], 0);
      });
    }

    jsonExport[`${plugin}AllKeys`] = pluginKeys;

    // For the colours, we need to read _03-colour-overrides.scss to work out which colours
    // are also being passed to Bootstrap as theme colours.
    if (plugin === 'colors') {
      const taiwindVariables = path.join(
          process.cwd(),
          'assets/styles/_tailwind-variables.scss',
      );

      const colourOverrides = path.join(
          process.cwd(),
          'assets/styles/overrides/_03-colour-overrides.scss',
      );

      const sassExport = sassExporter({
        inputFiles: [taiwindVariables, colourOverrides],
      }).getStructured();

      const themeColorsFromExport = _.filter(sassExport.variables, {
        name: '$theme-colors',
      })[0].mapValue;

      jsonExport.colorsBootstrapTheme = _.map(themeColorsFromExport, 'name');
    }
  });

  jsonfile.writeFileSync(jsonOutputPath, jsonExport, { spaces: 2 });
});
