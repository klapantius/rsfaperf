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

function SplitDatabase() {
    console.info('SplitDatabase started...')
    var key2tgt = (key) => {
        var name = key.includes(KeySeparator) ? key.substring(0, key.indexOf(KeySeparator)) : key;
        var item;
        for (var idx = 0; idx < configuration.buildPatterns2.length; idx++) {
            if (configuration.buildPatterns2[idx].mainkey === name) {
                item = idx;
                break;
            }
        }
        return item < configuration.buildPatterns2.length ?
            configuration.buildPatterns2[item] :
            null;
    }
    // Add mainkeys to the configuration in order to work efficienter.
    // Create database files too and add them to the configuration. as well
    configuration.buildPatterns2.forEach(i => {
        i.mainkey = MainKey(i.pattern);
        i.dbname = `${configuration.dbfolder}\\${i.name}.rsfa.db`;
        console.log(`${i.pattern} => ${i.mainkey} / ${configuration.dbfolder}\\${i.name}.rsfa.db`);
    });
    db.keys().forEach(srckey => {
        var record = db.get(srckey);
        var idx = srckey.indexOf(KeySeparator);
        var tgtkey = idx > 0 ? srckey.substring(idx + 1) : srckey;
        var target = key2tgt(srckey);
        if (target) {
            console.log(`${srckey} => ${tgtkey} will be written into ${target.dbname}`)
            var targetdb = flatdb.sync(target.dbname);
            targetdb.put(tgtkey, record);
        }
    });
    console.info('SplitDatabase finished.')
}

module.exports = { KeySeparator, Save, GetLastModuleStatus, GetHistoricalData, GetAllTimePoints, GetRecord, DumpHistoricalData, SplitDatabase };