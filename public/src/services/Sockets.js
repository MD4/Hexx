(function () {
    Hexx.services.Sockets = {

        socket: io(
            window.location.protocol + '//' + window.location.hostname + ':3000',
            {
                reconnection: false
            }
        ),

        connect: function () {
            this.socket.connect();
        },

        disconnect: function () {
            if (this.socket && this.socket.connected) {
                this.socket.disconnect();
            }
        },

        auth: function (username) {
            this.socket.emit('auth', username);
        },

        play: function (x, y) {
            this.socket.emit('play', x, y);
        },

        onAuthFail: function (callback) {
            this.socket.on('auth:fail', callback);
        },

        onAuthSuccess: function (callback) {
            this.socket.on('auth:success', callback);
        },

        onConnect: function (callback) {
            this.socket.on('connect', callback);
        },

        onDisconnect: function (callback) {
            this.socket.on('disconnect', callback);
        }

    };
}());