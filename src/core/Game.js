(function () {
    Hexx.core.Game = MAGE.core.Game.extend({

        initialize: function () {
            this.clearColor = "#fff";
            this.debugColor = "#666";
            this.board = new Hexx.board.Board();
        },

        update: function (time, delta) {
            this.board.update(this, time, delta);
        },

        draw: function (context, time, elapsedTime, delta) {
            this.board.draw(context, time, elapsedTime, delta);
        }

    });
}());