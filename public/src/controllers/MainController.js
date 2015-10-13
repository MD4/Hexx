(function () {

    var Controller = Hexx.core.Controller,
        AuthController = Hexx.controllers.Auth,
        QueueController = Hexx.controllers.Queue,
        GameController = Hexx.controllers.Game;

    Hexx.controllers.Main = Controller.extend({

        init: function (container) {
            this._super(container);

            this.authController = new AuthController(container.querySelector('#auth'));
            this.queueController = new QueueController(container.querySelector('#queue'));
            this.gameController = new GameController(container.querySelector('#game'));

            Hexx.services.Sockets.onConnect(function () {
                console.log('connected');
                this.authController.show();
            }.bind(this));

            Hexx.services.Sockets.onDisconnect(function () {
                console.log('disconnected');
            }.bind(this));

            this.authController.on(AuthController.AUTH_SUCCESS, function () {
                this.authController.hide();
                this.queueController.show();
            }.bind(this));

            this.queueController.on(QueueController.QUEUE_MATCH, function () {
                this.queueController.hide();
                this.gameController.show();
            }.bind(this));
        }

    });

})();