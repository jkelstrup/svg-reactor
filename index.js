#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

program
  .version('0.1.0')
  .option('-D, --delete', 'delete the original SVG file')
  .arguments('<svg-file>')
  .action((svgFile) => {
    var original = fs.readFileSync(svgFile,'utf8');
    var template = fs.readFileSync(__dirname + '/template', 'utf8');

    var componentName = path
      .basename(svgFile,'.svg')
      .replace(/^[a-zA-Z]/g, (g) => (g[0].toUpperCase())) // Uppercase first letter
      .replace(/-([a-z])/g, (g) => (g[1].toUpperCase())); // Convert dashes to camelCase

    var svgContent = original
      .replace(/"/gm, '\'')                               // Replace double quotes with single quotes
      .replace(/-([a-z])/g, (g) => (g[1].toUpperCase()))  // Convert dashes to camelCase
      .replace(/^/gm,'  ');                               // Add indentation

    var output = template                                 // Combine template with:
      .replace(/SVG_CONTENT/gm, svgContent)               //  - SVG content
      .replace(/COMPONENT_NAME/gm, componentName);        //  - Component name

    fs.mkdir(componentName, (error) => {
      if (error) throw error;

      fs.writeFile(componentName + '/index.js', output, (error) => {
        if (error) throw error;

        console.log('React component ' + componentName + ' successfully created!');

        if (program.delete) {
          fs.unlink(svgFile, (error) => {
            if (error) throw error;
            console.log('And ' + svgFile + ' deleted.');
          });
        }
      });
    });
  })
  .parse(process.argv);
