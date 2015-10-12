var Queue = require('../queue/Queue');

var HexxClient = function (socket) {
    console.log('User connected');

    this.socket = socket;
    this.auth = null;

    /*this.timeout = setTimeout(function () {
        if (this.socket.connected && !this.auth) {
            this.socket.disconnect();
        }
    }.bind(this), 5000);*/

    socket.on('auth', this.onAuth.bind(this));
    socket.on('queue', this.onQueue.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
};

HexxClient.prototype.onAuth = function (username) {
    if (username.match(/^[a-z0-9_-]{3,16}$/)) {
        this.auth = {
            username: username,
            connectionDate: new Date()
        };

        this.socket.emit('auth:success', this.auth);
    } else {
        this.socket.emit('auth:fail');
    }
};

HexxClient.prototype.onQueue = function () {
    if (this.auth) {
        Queue.add(this);
    } else {
        this.socket.emit('queue:fail');
    }
};

HexxClient.prototype.onDisconnect = function () {
    //clearTimeout(this.timeout);
    Queue.remove(this);
    console.log('User disconnected');
};

HexxClient.prototype.onQueuePositionChanged = function(position) {
    this.socket.emit('queue:position', position);
};

module.exports = HexxClient;