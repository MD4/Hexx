(function() {

    Hexx.controllers.Game = Class.extend({

        init: function(container) {
            this.game = new Hexx.core.Game(
                container,
                {
                    debugMode: true
                }
            );

            this.game.onPlay = function(x, y) {
                Hexx.services.Sockets.play(x, y);
            };
        },

        startGame: function() {
            this.game.start();
        },

        stopGame: function() {
            this.game.stop();
        }

    });

})();

