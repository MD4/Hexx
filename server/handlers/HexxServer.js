var HexxClient = require('./HexxClient');
var Matcher = require('../core/Matcher');

var HexxServer = function (io) {
    this.io = io;
};

HexxServer.prototype.start = function () {
    this.io.on('connection', function (socket) {
        new HexxClient(socket);
    });
};

Matcher.start();

module.exports = HexxServer;