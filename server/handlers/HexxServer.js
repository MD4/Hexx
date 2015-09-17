var HexxClient = require('./HexxClient');

var HexxServer = function (io) {
    this.io = io;
};

HexxServer.prototype.start = function () {
    this.io.on('connection', function (socket) {
        new HexxClient(socket);
    });
};


module.exports = HexxServer;