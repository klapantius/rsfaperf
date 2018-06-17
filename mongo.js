const mc = require('mongodb').MongoClient;
const flat = require('./storage');
const log = require('single-line-log').stdout;

// Database access constants
let database = process.env.DATABASE || "@localhost:27017";
const url = `mongodb://${database}`
const dbName = 'helloworld-database';
const RSFA_COLLECTION = "rsfa";

async function UploadDataToMongoDB(params) {
    log(`connecting to ${url}`);
    const client = await mc.connect(url);
    log(`Connected successfully to ${url}`);
    log.clear();

    const db = client.db(dbName);
    const collection = db.collection(RSFA_COLLECTION);

    const data = flat.GetHistoricalData(params);
    const count = data.length;
    log(`Loaded ${count} entries from the flat db.`);
    log.clear();

    let result = { newItems: 0, skipped: 0 };
    for (let i = 0; i < data.length; i++) {
        log(`Processing entry ${i} of ${count} [${Math.floor(100 * i / count)}%]: ${JSON.stringify(result)}`);
        const found = await collection.find({ pattern: data[i].pattern, timestamp: data[i].timestamp }).limit(1).toArray();
        if (found.length === 0) {
            collection.insertOne(data[i]);
            ++result.newItems;
        }
        else ++result.skipped;
    };
    log(`Processed ${data.length} entries: ${JSON.stringify(result)}`);
    log.clear();

    client.close();
}

module.exports = { UploadDataToMongoDB };