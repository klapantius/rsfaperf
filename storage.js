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
        result[key] = db.get(key);
    });
    return result;
}

function GetHistoricalData(pattern) {
    return new LINQ(db.keys()).Where(k => k.startsWith(pattern)).Select(k => db.get(k)).ToArray();
}

function DumpHistoricalData(pattern) {
    var data = GetHistoricalData(pattern);
    data.forEach(d => {
        console.info(JSON.stringify(d));
    });
}

function GetRecord(key) {
    if (!db.has(key)) return undefined;
    return db.get(key);
}

function GetAllTimePoints() {
    return new LINQ(db.keys())
        .Where(k => k.includes(KeySeparator))
        .OrderBy(k => k.substring(k.indexOf(KeySeparator) + 1))
        .GroupBy(k => k.substring(k.indexOf(KeySeparator) + 1));
}

function GetRecord(key) {
    if (!db.has(key)) return undefined;
    return db.get(key);
}

module.exports = { KeySeparator, Save, GetLastModuleStatus, GetHistoricalData, GetAllTimePoints, GetRecord, DumpHistoricalData };