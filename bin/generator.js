#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs-extra');
const color = require('cli-color');
const program = require('commander');
const pkg = require('../package.json');

const version = pkg.version;
const cwd = process.cwd();

program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ zhike-generator myapp');
  console.log('    $ zhike-generator -t express myapp');
  console.log('    $ zhike-generator -t koa myapp');
  console.log('');
  console.log();
});

let name;
program
  .version(version)
  .usage('[options] <name>')
  .option('-t, --template <template>', 'specify the template to use. Default express')
  .option('-l, --list', 'list all templates')
  .action(function(name_) {
    name = typeof name_ === 'string' ? name_ : null;
  })
  .parse(process.argv);

let template = program.template || 'express';
let templates = loadTemplates(path.join(__dirname, '../templates'));

if (program.list) {
  console.log('Available ' + color.cyan('templates:'));
  Object.keys(templates).forEach(function(temp) {
    console.log();
    console.log(color.cyan('- ' + temp));
  });
  console.log();
  return;
}

if (!name) {
  program.help();
  return;
}

if (!templates[template]) {
  console.log(color.red(`  Template "${program.template}" is not available now. Please run 'zhike-generator -l' to show all available templates for now.`));
  console.log();
  return;
}

let projectPath = path.join(cwd, name);

console.log(color.magenta(`  Creating project "${name}" at ${projectPath}`));
console.log();
console.log(`  ${projectPath}  ${color.green('OK')}`);
console.log();
console.log('  Creating project files...');
console.log();
console.log('  ' + [
  color.yellow('[D] Ensure directory'),
  color.green('[F] Copy file'),
].join('    '));
console.log();

applyTemplate(templates[template], projectPath, 1);

console.log();
console.log(color.magenta(`  Project "${name}" is created.`));
console.log(color.magenta('  Please read the \'README.md\' first.'));
console.log();

function applyTemplate(source, destination, indent) {
  fs.ensureDirSync(destination);
  console.log(color.yellow('  '.repeat(indent) + '[D] ' + path.relative(cwd, destination)));
  const files = fs.readdirSync(source).filter(filterSystemFile);
  files.forEach(function(filename) {
    const file = path.join(source, filename);
    let fileDest = path.join(destination, filename);
    if (fs.statSync(file).isDirectory()) {
      applyTemplate(file, fileDest, indent + 1);
    } else {
      fileDest = fileDest.replace('.npmignore', '.gitignore');
      fs.copySync(file, fileDest);
      console.log(color.green('  '.repeat(indent + 1) + '[F] ' + path.relative(cwd, fileDest)));
    }
  });
}

function loadTemplates(dir) {
  const templates = {};
  const templateNames = fs.readdirSync(dir).filter(filterSystemFile);
  templateNames.map(function(temp) {
    templates[temp] = path.join(dir, temp);
  });
  return templates;
}

function filterSystemFile(name) {
  const SYSTEM_FILES = ['.DS_Store'];
  return SYSTEM_FILES.map(sf => sf !== name).reduce((a, b) => a && b, true);
}
