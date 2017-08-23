var LINQ = require('node-linq').LINQ;
const configuration = require('./configuration.js')
const flatdb = require('flat-file-db');
const KeySeparator = '#';

var db = flatdb.sync(configuration.dbpath);

function MainKey(pattern) {
    return pattern.replace(/\*/g, "");
}

function KeyOf(record) {
    var result = MainKey(record.pattern) + KeySeparator + record.timestamp;
    return result;
}

function Save(record) {
    if (!record) return;
    db.put(KeyOf(record), record);
    db.put(MainKey(record.pattern), record);
}

function GetLastModuleStatus() {
    var result = [];
    configuration.buildPatterns.forEach(pattern => {
        var key = MainKey(pattern);
        result[key]=db.get(key);
    });
    return result;
}

function GetHistoricalData(pattern) {
    return new LINQ(db.keys()).Where(k => k.startsWith(pattern)).ToArray();
}

module.exports = { KeySeparator, Save, GetLastModuleStatus, GetHistoricalData };