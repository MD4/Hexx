(function() {

    Hexx.controllers.Main = Hexx.core.Controller.extend({

        init: function(container) {
            this._super(container);

            this.authController = new Hexx.controllers.Auth(container.querySelector('#auth'));
            this.gameController = new Hexx.controllers.Game(container.querySelector('#game'));

            Hexx.services.Sockets.onConnect(function() {
                console.log('connected');

                this.authController.show();
            }.bind(this));

            Hexx.services.Sockets.onDisconnect(function() {
                console.log('disconnected');
            }.bind(this));
        }

    });

})();