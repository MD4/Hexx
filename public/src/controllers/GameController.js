(function() {

    var Controller = Hexx.core.Controller,
        Sockets = Hexx.services.Sockets,
        Game = Hexx.core.Game;

    Hexx.controllers.Game = Controller.extend({

        init: function(container) {
            this._super(container);

            this.game = new Game(
                container,
                {
                    debugMode: true
                }
            );

            this.game.onPlay = function(x, y) {
                Sockets.play(x, y);
            };
        },

        shown: function() {
            this.game && this.game.start();
        },

        hidden: function() {
            this.game && this.game.stop();
        }

    });

})();

