(function () {
    var Game = MAGE.core.Game,
        Board = Hexx.board.Board;

    Hexx.core.Game = Game.extend({

        board: null,
        camera: {
            x: 0,
            y: 0,
            z: 0,
            angle: 0
        },

        turn: 0,
        hoveredTile: null,

        onPlay: function() {},

        initialize: function () {
            this.clearColor = "#DBDDDF";
            this.debugColor = "#666";
            this.board = new Board();

            this.debug('Mouse position', function() {
                return this.getRealMousePosition();
            }.bind(this));
        },

        update: function (time, delta) {
            this.board.update(this, time, delta);

            //this.camera.angle += (((this.turn ? Math.PI / 2: -Math.PI / 2) - this.camera.angle) / 10) * delta;
            this.camera.angle = -Math.PI / 2;

            if (this.isJustButtonUp(0) && this.hoveredTile) {
                this.onPlay(this.hoveredTile.coords.x, this.hoveredTile.coords.y);
            }
        },

        draw: function (context, time, elapsedTime, delta) {
            context.translate(this.width / 2, this.height / 2);

            this.board.draw(this, context, time, elapsedTime, delta);

            context.translate(-this.width / 2, -this.height / 2);
        },

        play: function(player, x, y) {
            this.board.play(player, x, y);
        },

        getRealMousePosition: function() {
            var position = this.getMousePosition();
            return {
                x: position.x - this.width / 2,
                y: position.y - this.height / 2
            };
        }

    });
}());