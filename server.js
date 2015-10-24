var express = require('express');
var app = express();

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
// app.get('/analytics', function (req, res) {
//   // res.send('Hello World!');
//   res.sendFile(__dirname + '/mainpage.html');
// });

// app.get('/analytics/*', function (req, res) {
//   // res.send('Hello World!');
//   res.sendFile(__dirname + '/mainpage.html');
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname));