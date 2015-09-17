(function () {
    Hexx.board.Board = Class.extend({

        _tiles: [],

        nearEven: [
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: -1, y: -1},
            {x: 0, y: 1}
        ],

        nearOdd: [
            {x: -1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: 1},
            {x: 1, y: 0},
            {x: -1, y: 1},
            {x: 0, y: 1}
        ],

        boardMap: {},
        boardMapPotential1: {},
        boardMapPotential2: {},

        init: function () {
            this.createNearTiles(0, 0, 5);
            this.getTile(1, 0).type = 1;
            this.getTile(-1, -1).type = 2;

            this.boardMapPotential1 = this.getPotentialMap(1, this.boardMap, 2);
            this.boardMapPotential2 = this.getPotentialMap(2, this.boardMap, 2);
        },

        getPotentialMap: function (player, tiles, n) {
            var potential = {};
            var tileNotUsed = function(tile, boardMap) {
                return (tile && !potential[tile.coords.x + '' + tile.coords.y] && !boardMap[tile.coords.x + '' + tile.coords.y].type);
            };

            if (n === 0)  {
                return potential;
            }

            for (var tileKey in tiles) {
                var tile = tiles[tileKey];

                if (tile.type !== player && n === 2) {
                    continue;
                }
                if (tileNotUsed(tile, this.boardMap)) {
                    potential[tile.coords.x + '' + tile.coords.y] = tile;
                }
                this.getNearTiles(tile.coords.x, tile.coords.y).forEach(function (near) {
                    var nearTile = this.getTile(tile.coords.x + near.x, tile.coords.y + near.y);
                    if (tileNotUsed(nearTile, this.boardMap)) {
                        potential[nearTile.coords.x + '' + nearTile.coords.y] = nearTile;
                    }
                }.bind(this));
                potential = this.objectJoin(potential, this.getPotentialMap(player, potential, n - 1));
            }

            return potential;
        },

        objectJoin: function (o1, o2) {
            for (var key in o2) {
                o1[key] = o2[key];
            }
            return o1;
        },

        getTile: function (x, y) {
            return this.boardMap[x + '' + y];
        },

        getNearTiles: function (x, y) {
            if (x % 2) {
                return this.nearOdd;
            }
            return this.nearEven;
        },

        createNearTiles: function (x, y, n) {
            var rad = 50;
            if (n < 0) {
                return;
            }
            if (!this.boardMap[x + '' + y]) {
                var tile = new Hexx.board.Tile(
                    x * rad * 1.5,
                    (x % 2 ? Math.sin(Math.PI / 3) : 0) * rad + y * rad * Math.sin(Math.PI / 3) * 2,
                    0,
                    {
                        x: x,
                        y: y
                    },
                    rad,
                    0,
                    x + ',' + y
                );
                this._tiles.push(tile);
                this.boardMap[x + '' + y] = tile;
            }
            this.getNearTiles(x, y).forEach(function (near) {
                this.createNearTiles(x + near.x, y + near.y, n - 1);
            }.bind(this));
        },

        play: function (turn, x, y) {
            var tile = this.getTile(x, y);

            if (!tile || tile.type !== 0) {
                return false;
            }

            if (turn) {
                tile.type = 1;
            } else {
                tile.type = 2;
            }

            return true;
        },

        update: function (game, time, delta) {
            game.hoveredTile = null;
            this._tiles.forEach(function (tile) {
                tile.update(game, time, delta);
            });
        },

        draw: function (game, context, time, elapsedTime, delta) {
            this._tiles.forEach(function (tile) {
                tile.draw(game, context, time, elapsedTime, delta);
            });
            this._tiles.forEach(function (tile) {
                tile.drawLight(game, context, time, elapsedTime, delta);
            });

            for (var tileKey in this.boardMapPotential1) {
                var tile = this.boardMapPotential1[tileKey];
                tile.drawPotential(1, game, context, time, elapsedTime, delta);
            }

            for (var tileKey in this.boardMapPotential2) {
                var tile = this.boardMapPotential2[tileKey];
                tile.drawPotential(2, game, context, time, elapsedTime, delta);
            }
        }

    });
}());