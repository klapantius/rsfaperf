const restflat = require('rest-flat-file-db');
const flatdb = require('flat-file-db');
 
const app = restflat(flatdb.sync('/tmp/mydatabase'));
 
// this is just a normal koa2 app and it is ready to launch. 
 
app.listen();