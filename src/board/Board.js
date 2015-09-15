(function () {
    Hexx.board.Board = Class.extend({

        _tiles: [],

        /*boardMap: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0],
            [0, 0, 0, 4, 4, 0, 0],
            [0, 0, 4, 3, 4, 0, 0],
            [0, 0, 4, 3, 3, 4, 0],
            [0, 0, 3, 2, 3, 0, 0],
            [0, 0, 4, 2, 2, 4, 0],
            [0, 0, 3, 1, 3, 0, 0],
            [0, 0, 4, 2, 2, 4, 0],
            [0, 0, 3, 2, 3, 0, 0],
            [0, 0, 4, 3, 3, 4, 0],
            [0, 0, 4, 3, 4, 0, 0],
            [0, 0, 0, 4, 4, 0, 0],
            [0, 0, 0, 4, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ],*/

        near: [
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 1}
        ],

        init: function () {
            var width = 2000;
            var rad = 50;

            /*for (var y = 0; y < this.boardMap.length; y++) {
                for (var x = 0; x < this.boardMap[y].length; x++) {
                    if (!this.boardMap[y][x]) {
                        continue;
                    }
                    this._tiles.push(new Hexx.board.Tile(
                        (y % 2 ? rad * 2.5 : rad) + rad * 3 * x,
                        rad + rad * Math.sin(Math.PI / 3) * y,
                        0,
                        rad,
                        this.boardMap[y][x],
                        x + '' + y
                    ));
                }
            }*/

            this.boardMap = [];
            for (var i = 0; i < 22; i++) {
                this.boardMap.push([]);
                for (var j = 0; j < 22; i++) {
                    this.boardMap[i].push(0);
                }
            }

            this.createNearTiles(11, 11);

            console.log(this.boardMap);
        },

        createNearTiles: function(x, y) {
            this.boardMap[y][x] = 1;
            this.near.forEach(function(near) {
                this.boardMap[y + near.y][x + near.x] = 1;
            }.bind(this));
        },

        update: function (game, time, delta) {
            this._tiles.forEach(function (tile) {
                tile.update(game, time, delta);
            });
        },

        draw: function (context, time, elapsedTime, delta) {
            this._tiles.forEach(function (tile) {
                tile.draw(context, time, elapsedTime, delta);
            });
        }

    });
}());