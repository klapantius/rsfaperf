const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const schedule = require('node-schedule');
const log = require('./log.js');
const analyze = require('./durationanalyze.js');
const configuration = require('./configuration.js');
const webui = require('./webui.js');
const storage = require('./storage.js');

console.info('Current status:');
var status = storage.GetLastModuleStatus();
for (var key in status) {
    console.info("\t", key + ": ", status[key].avgtxt);
}
console.info();

var sch = new Date(Date.now() + 1000);
//var timespec = new String(sch.getSeconds() + ' ' + sch.getMinutes() + ' ' + sch.getHours() + ' * * *');
var timespec = '0 * * * *';
var job = schedule.scheduleJob(timespec, function () {
    log.PrintLog('hello');
    analyze.CollectDurations(configuration.buildPatterns, (results) => {
        log.PrintLog("Following results collected:");
        console.group;
        results.forEach(r => { console.log(JSON.stringify(r)); storage.Save(r); });
        console.groupEnd;
    });
});

rl.on('line', (line) => { process.exit(0); });
rl.prompt();