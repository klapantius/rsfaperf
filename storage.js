const configuration = require('./configuration.js')
const flatdb = require('flat-file-db');
const KeySeparator = '#';

var db = flatdb.sync(configuration.dbpath);

function MainKey(pattern){
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

module.exports = { KeySeparator, Save };