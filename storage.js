const configuration = require('./configuration.js')
const flatdb = require('flat-file-db');
const KeySeparator = '#';

var db = flatdb.sync(configuration.dbpath);

function KeyOf(record) {
    var result = record.pattern.replace(/\*/g, "") + KeySeparator + record.timestamp;
    return result;
}

function Save(record) {
    var key = KeyOf(record);
    db.put(key, record);
}

module.exports = { KeySeparator, Save };