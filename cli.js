#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const config = require('./package');


program
    .version(config.version)
    .option('-n, --name <name>', 'The name of your component')
    .option('-c, --class', 'Create a class based component')
    .option('-s --style <type>', 'Add style sheet', /^(css|scss)$/i)
    .parse(process.argv);



const cmpType = `${__dirname}/templates/${program.class ? 'class-based-component' : 'functional-component'}`;

fs.readFile(cmpType,'utf8',((err, data) => {
    data = data.replace(/__COMPONENT_NAME__/g, program.name);
    data = program.style ? addStyleSheet(data) : data.replace('__CSS_IMPORT__','');

    fs.writeFile(process.cwd() + `/${program.name}.js`,data,(err1 => {}))

}));




function addStyleSheet(data) {
    fs.writeFile(process.cwd() + `/${program.name}.${program.style}`,'',(err) => {});
    return data.replace('__CSS_IMPORT__',`import './${program.name}.${program.style}`)
}





