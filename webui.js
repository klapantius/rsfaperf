var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var { GetLastModuleStatus, GetHistoricalData } = require('./storage.js');
var LINQ = require('node-linq').LINQ;

app.get('/', function (req, res) {
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
                <td>`;
        html += new LINQ(GetHistoricalData(key)).Select(r => r.avgraw).ToArray().join();
        html += `</td>
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


http.listen(3000, function () {
    console.info("http://localhost:3000")
});
