var feathers = require('feathers');
//var express = require('express');
//var app = express();
var app = feathers();
var todoService = require('./todos');
var fs = require('fs');

app.configure(feathers.socketio())
    .use(feathers.static(__dirname))
    .use('/todos',new todoService());

var https = require('https');
var server = https.createServer({
  key: fs.readFileSync('ryans-key.pem'),
  cert: fs.readFileSync('ryans-cert.pem')
}, app).listen(4004);

// Call app.setup to initialize all services and SocketIO
app.setup(server);