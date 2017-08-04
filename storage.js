const restflat = require('rest-flat-file-db');
const flatdb = require('flat-file-db');
 
const app = restflat(flatdb.sync('/tmp/mydatabase'));
     
app.use(ctx => {
});
 
app.listen();