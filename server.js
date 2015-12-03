var express = require('express');
var app = express();
var databasecontroller = require('./server/controllers/DatabaseController');
var devicepiechartcontroller = require('./server/controllers/DevicePieChartController');
var eventscontroller = require('./server/controllers/EventDataController');


app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/home.html');
});

app.get('/analytics', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/analytics/devices', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/analytics/cities', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/analytics/retention', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/analytics/events', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/analytics/eventscompare', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(__dirname + '/mainpage.html');
});

app.get('/database/usersplit', databasecontroller.usersplit);

app.get('/database/sessioncounts', databasecontroller.sessioncounts);

app.get('/database/sessionduration', databasecontroller.sessionduration);

app.get('/database/returninguserretention', databasecontroller.returninguserretention);

app.get('/database/newuserretention', databasecontroller.newuserretention);

app.get('/database/ticker', databasecontroller.ticker);

app.get('/database/devicepiecharts', devicepiechartcontroller.devicepiecharts);

app.get('/database/eventsdata', eventscontroller.eventsdata);

app.get('/database/events', eventscontroller.events);

app.get('/database/eventscomparisiondata', eventscontroller.eventscomparisiondata);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname));