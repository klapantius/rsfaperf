const configuration = require('./configuration.js')
const flatdb = require('flat-file-db');
const KeySeparator = '#';

var db = flatdb.sync(configuration.dbpath);

function KeyOf(record) {
    var result = record.pattern.replace(/\*/g, "") + KeySeparator + record.timestamp;
    return result;
}

function Save(record) {
    if (!record) return;
    var key = KeyOf(record);
    db.put(key, record);
    var mainkey = key.substr(0, key.charAt(KeySeparator));
    db.put(mainkey, record);
}

module.exports = { KeySeparator, Save };