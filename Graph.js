var N = 5;
var M = 4;

var dep = {};

var isFirstLine = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let readLineCount = 0;
rl.on("line", function(line) {
    readLineCount++;

    if (isFirstLine) {
        N = parseInt(line.split(" ")[0]);
        M = parseInt(line.split(" ")[1]);
        isFirstLine = false;
    } else {
        const course = parseInt(line.split(" ")[0]);
        const courseDependsOn = parseInt(line.split(" ")[1]);
        dep[course]
            ? dep[course].push(courseDependsOn)
            : (dep[course] = [courseDependsOn]);

        if (M < readLineCount) {
            calculateMinSemesters();
        }
    }
});

function calculateMinSemesters() {
    let minSemesters = 0;
    let courses = Array.from(Array(N), (x, i) => i + 1);
    while (courses.length > 0) {
        let coursesThisSemester = [];
        let dependencies = { ...dep };

        for (let index = 0; index < courses.length; index++) {
            const element = courses[index];
            if (element === 4) {
            }
            if (!dep[element] || dep[element].length === 0) {
                coursesThisSemester.push(element);
                for (var name in dependencies) {
                    const dependsOn = [...dependencies[name]];
                    if (dependsOn.includes(element)) {
                        let i = dependsOn.indexOf(element);
                        if (i > -1) {
                            dependsOn.splice(i, 1);
                        }
                        dependencies[name] = dependsOn;
                    }

                }
            }


        }
        courses = courses.filter(el => !coursesThisSemester.includes(el));


        dep = { ...dependencies };



        coursesThisSemester = [];


        minSemesters++;
    }

    console.log(minSemesters);
    return minSemesters;
}
