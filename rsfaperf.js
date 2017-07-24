const { exec } = require('child_process');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const patterns = ['Torus', 'Cube', 'Foundations', 'Core', 'DataStorage', 'Workflow', 'Dicom', 'LCO', 'Imaging', 'CIP', 'ITF', 'Organizer', 'Service'];
const timer = require('timers');

function startScan(pattern, length) {
    console.log("starting scan");
    exec(
        'rsfainstanalyzer -sd -path:\\\\build-sy.healthcare.siemens.com\\DropNative$\\*Imaging*main*GC* -days:1',
        (error, stdout, stderr) => {
            if (error) {
                console.error("error happened: " + error);
                console.log(stderr);
                return;
            }
            console.info('succeeeded: ', stdout);
        });
}

rl.on('line', (line) => { process.exit(0); });
rl.prompt();

startScan('', 0);

timer.setInterval(() => { console.log(new Date().toLocaleString()); }, 1000);
