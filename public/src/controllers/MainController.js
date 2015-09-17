(function() {

    Hexx.controllers.Main = Class.extend({

        init: function(container) {
            this.authController = new Hexx.controllers.Auth(container.querySelector('#auth'));
            this.gameController = new Hexx.controllers.Game(container.querySelector('#game'));

            Hexx.services.Sockets.onConnect(function() {
                console.log('connected');
            });

            Hexx.services.Sockets.onDisconnect(function() {
                console.log('disconnected');
            });
        }

    });

})();