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
    socket.on('disconnect', this.onDisconnect.bind(this));
};

HexxClient.prototype.onAuth = function (username) {
    if (username.match(/^[a-z0-9_-]{3,16}$/)) {
        this.socket.emit('auth:success');
    } else {
        this.socket.emit('auth:fail');
    }
};

HexxClient.prototype.onDisconnect = function () {
    //clearTimeout(this.timeout);
    console.log('User disconnected');
};

module.exports = HexxClient;