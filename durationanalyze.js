const { exec } = require('child_process');
const log = require('./log.js');
const configuration = require('./configuration.js');


function DurationAnalyze(pattern, days, callback) {
    var cmd = 'rsfainstanalyzer -sd -json -days:' + days + ' -path:' + configuration.dropfolder + pattern;
    // log.PrintLog('starting scan: ' + cmd);
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            log.PrintError("error happened: " + error);
            log.PrintLog(stderr);
            return;
        }
        var result = stdout.substring(stdout.lastIndexOf('{'), stdout.lastIndexOf('}') + 1);
        log.PrintLog(pattern + ' succeeeded: ' + result);
        callback(result ? JSON.parse(result) : undefined);
    });
}

function CollectDurations(patterns, callback) {
    log.PrintLog('starting a new rsfa duration analyze');
    var results = [];
    var timestamp = Date.now();
    var d = new Date();
    var pad = function (value) { return ("00" + value).slice(-2); }
    Promise.all(patterns.map(p =>
        new Promise(resolve => {
            DurationAnalyze(p, 1, (r) => {
                resolve(Object.assign({}, r, {
                    pattern: p,
                    timestamp,
                    timestr: `${d.getFullYear() % 1000}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`}));
            });
        })
    )).then(callback);
}

module.exports = { CollectDurations };