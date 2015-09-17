var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var HexxServer = require('./handlers/HexxServer');

app.use(express.static('public'));

http.listen(3000, function(){
    console.log('listening on *:3000');
});

var hexxServer = new HexxServer(io);

hexxServer.start();