var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./storage.js');
var LINQ = require('node-linq').LINQ;

app.get('/', function (req, res) {

    var status = db.GetLastModuleStatus();
    var tps = db.GetAllTimePoints();
    var html = `
    <html>
    <head>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Time'`;
    var last = [];
    for (var key in status) {
        html += ",'" + key + "'";
        last[key] = 0;
    }
    html += `]`;
    for (var time in db.GetAllTimePoints()) {
        var row = [];
        row.push("'" + time + "'");
        for (mainkey in status) {
            var record = db.GetRecord(mainkey + db.KeySeparator + time);
            var val = record && record.avgraw ? record.avgraw : last[mainkey];
            row.push(val);
            last[mainkey] = val;
        }
        html += `,
                [` + row + `]`;
    }
    html += `
            ]);

            var options = {
                title: 'Histrory',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
        </script>
    </head>
    <body>
        <table>
            <tr>
                <th>Build</th>
                <th>Duration</th>
            </tr>
            `;
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
        <div id="curve_chart" style="width: 900px; height: 500px"></div>
    </body>
    </html>
    `;
    res.send(html);
});


http.listen(3000, function () {
    console.info("http://localhost:3000")
});
