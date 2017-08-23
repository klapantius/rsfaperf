var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var { GetLastModuleStatus } = require('./storage.js');

app.get('/', function(req, res){
    var html = `
    <html>
    <body>
        <table>
            <tr>
                <th>Build</th>
                <th>Duration</th>
            </tr>
            `;
    var status = GetLastModuleStatus();
    for (var key in status) {
        html += `
            <tr>
                <td>` + key + `</td>
                <td>` + status[key].avgtxt + `</td>
            </tr>
        `;
    }
    html += `
        </table>
    </body>
    </html>
    `;
    res.send(html);
});

console.info("http://localhost:3000")

http.listen(3000, function(){
  console.log('listening on *:3000');
});
