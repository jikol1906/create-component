const program = require('commander');
const fs = require('fs');


program
    .version('1.0.0')
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




/*
function range(val) {
    return val.split('..').map(Number);
}

function list(val) {
    return val.split(',');
}

function collect(val, memo) {
    memo.push(val);
    return memo;
}

function increaseVerbosity(v, total) {
    return total + 1;
}

program
    .version('0.1.0')
    .usage('[options] <file ...>')
    .option('-i, --integer <n>', 'An integer argument', parseInt)
    .option('-f, --float <n>', 'A float argument', parseFloat)
    .option('-r, --range <a>..<b>', 'A range', range)
    .option('-l, --list <items>', 'A list', list)
    .option('-o, --optional [value]', 'An optional value')
    .option('-c, --collect [value]', 'A repeatable value', collect, [])
    .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
    .parse(process.argv);

console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' collect: %j', program.collect);
console.log(' verbosity: %j', program.verbose);
console.log(' args: %j', program.args);*/
