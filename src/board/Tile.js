(function () {
    Hexx.board.Tile = Class.extend({

        position: {
            x: 0,
            y: 0,
            z: 0
        },

        radius: 20,

        title: '#',

        type: 0,

        init: function (x, y, z, radius, type, title) {
            this.position = {
                x: x,
                y: y,
                z: z
            };
            this.radius = radius;
            this.title = title;
            this.type = type;
        },

        computePoly: function (origin) {
            var points = [];

            for (var a = 0; a < 6; a++) {
                var angle = ((Math.PI * 2) / 6) * a;

                points.push(
                    Hexx.utils.Geo.isoProjection(
                        {
                            x: this.position.x + Math.cos(angle) * this.radius,
                            y: this.position.y + Math.sin(angle) * this.radius
                        },
                        origin,
                        this.radius
                    )
                );
            }

            return points;
        },

        update: function (game, time, delta) {
            var origin = {
                x: game.width / 2,
                y: game.height / 2
            };
            this.poly = this.computePoly(origin);
            this.hovered = Math.isPointInPoly(
                this.poly,
                game.getMousePosition()
            );
        },

        draw: function (context, time, elapsedTime, delta) {
            var origin = {
                x: context.canvas.clientWidth / 2,
                y: context.canvas.clientHeight / 2
            };
            var isoPos = Hexx.utils.Geo.isoProjection(
                this.position,
                origin,
                this.radius
            );

            context.beginPath();
            context.moveTo(
                this.poly[0].x,
                this.poly[0].y
            );
            for (var i = 1; i < this.poly.length; i++) {
                context.lineTo(
                    this.poly[i].x,
                    this.poly[i].y
                );
            }
            context.closePath();


            context.lineWidth = 2;
            context.strokeStyle = '#333';
            context.fillStyle = this.hovered ? '#6F889C' : '#505d6f';
            context.fillStyle = [
                '#456',
                '#567',
                '#678',
                '#789',
                '#89A',
                '#9AB',
                '#ABC'
            ][this.type];
            context.fill();
            context.stroke();

            context.font = "20px sans";

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.textSize = 30;

            context.fillStyle = '#B9C6E6';

            context.fillText(
                this.title,
                isoPos.x,
                isoPos.y
            );

            context.textAlign = "left";
            context.textBaseline = "top";
        }

    });
}());