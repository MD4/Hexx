var Queue = require('../core/Queue');

var HexxClient = function (io, socket) {
    console.log('User connected');

    this._io = io;
    this._socket = socket;
    this._auth = null;
    this._matchId = null;

    this._socket.on('auth', this.onAuth.bind(this));
    this._socket.on('queue', this.onQueue.bind(this));
    this._socket.on('disconnect', this.onDisconnect.bind(this));
};

HexxClient.prototype.match = function(player, matchId) {
    this._matchId = matchId;
    this._socket.join(matchId);
    this._socket.emit('queue:match', player, matchId);
};

HexxClient.prototype.onAuth = function (username) {
    if (username.match(/^[a-z0-9_-]{3,16}$/)) {
        this._auth = {
            username: username,
            connectionDate: new Date()
        };

        this._socket.emit('auth:success', this._auth);
    } else {
        this._socket.emit('auth:fail');
    }
};

HexxClient.prototype.onQueue = function () {
    if (this._auth) {
        Queue.add(this);
    } else {
        this._socket.emit('queue:fail');
    }
};

HexxClient.prototype.onDisconnect = function () {
    Queue.remove(this);
    console.log('User disconnected');
};

HexxClient.prototype.onQueuePositionChanged = function(position) {
    this._socket.emit('queue:position', position);
};

module.exports = HexxClient;