const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const schedule = require('node-schedule');
const log = require('./log.js');
const analyze = require('./durationanalyze.js');
const configuration = require('./configuration.js');
const webui = require('./webui.js');
const storage = require('./storage.js');

var commands = [
    {
        name: "dhd", description: " <pattern e.G. HL7.Main.GC>: dump historical data of the given build",
        todo: function (params) {
            storage.DumpHistoricalData(params);
        }
    },
    {
        name: "x", description: ": terminate the program",
        todo: function (params) {
            process.exit(0);
        }
    },
    {
        name: "help",
        todo: function (params) {
            Help(params);
        }
    },
    {
        name: "split",
        todo: function (params) {
            storage.SplitDatabase(params);
        }
    }
];

var LINQ = require('node-linq').LINQ;
rl.on('line', (line) => {
    var cmd = new LINQ(commands).First(c => line.startsWith(c.name));
    if (cmd) {
        var params = line.substring(cmd.name.length + 1);
        cmd.todo(params);
        return;
    }
    else {
        console.info("command could not be interpreted");
    }
});

Help();
rl.prompt();

console.info('Current status:');
var status = storage.GetLastModuleStatus();
for (var key in status) {
    console.info("\t", key + ": ", status[key].avgtxt);
}
console.info();

var sch = new Date(Date.now() + 1000);
//var timespec = new String(sch.getSeconds() + ' ' + sch.getMinutes() + ' ' + sch.getHours() + ' * * *'); // in 10 seconds
//var timespec = '0 * * * *'; // hourly
var timespec = '17 17 * * *'; // daily
var job = schedule.scheduleJob(timespec, function () {
    log.PrintLog('hello');
    analyze.CollectDurations(configuration.buildPatterns, (results) => {
        log.PrintLog("Following results collected:");
        console.group;
        results.forEach(r => {
            if (r.avgtxt) {
                console.log(JSON.stringify(r));
                storage.Save(r);
            }
            else {
                console.log(`${r.pattern} has no new relevant data`);
            }
        });
        console.groupEnd;
    });
});

function Help(params) {
    if (params) {
        var cmd = new LINQ(commands).First(c => params.startsWith(c.name));
        if (cmd) {
            console.info(`${cmd.name}${cmd.description}`);
            return;
        }
        console.info(`No such command ("${params}").`);
    }
    console.info("Available commands:");
    commands.forEach(c => { console.info(`\t${c.name}${c.description ? c.description : ""}`) });
}