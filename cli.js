#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const config = require('./package');


program
    .version(config.version)
    .option('-n, --name <name>', 'The name of your component')
    .option('-f, --folder', 'Put component files in a folder with the same name')
    .option('-t, --test', 'Create test folder')
    .option('-c, --class', 'Create a class based component')
    .option('-s, --style <type>', 'Add style sheet', /^(css|scss)$/i)
    .parse(process.argv);


const cmpType = `${__dirname}/templates/${program.class ? 'class-based-component' : 'functional-component'}`;

const basePath =
    path.join(
        process.cwd(), //Go to current directory
        `${program.folder ? `/${program.name}` : ''}` //Add files in folder if -f option is set)
    );

fs.readFile(cmpType, 'utf8', ((err, data) => {

    //Create folder if -f option is set
    if (program.folder) fs.mkdirSync(program.name);

    data = data.replace(/__COMPONENT_NAME__/g, program.name);
    data = program.style ? addStyleSheet(data) : data.replace('__CSS_IMPORT__', '');

    fs.writeFile(path.join(basePath,`/${program.name}.js` ), data, err1 => {})
}));

function addStyleSheet(data) {
    fs.writeFile( path.join(basePath,`/${program.name}.${program.style}`), '', (err) => {});
    return data.replace('__CSS_IMPORT__', `import './${program.name}.${program.style}`)
}




