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

        init: function (x, y, z, coords, radius, type, title) {
            this.position = {
                x: x,
                y: y,
                z: z
            };
            this.coords = coords;
            this.radius = radius;
            this.title = title;
            this.type = type;
        },

        computePoly: function (origin, radius, isoAngle) {
            var points = [];

            for (var a = 0; a < 6; a++) {
                var angle = ((Math.PI * 2) / 6) * a;

                points.push(
                    Hexx.utils.Geo.isoProjection(
                        {
                            x: this.position.x + Math.cos(angle) * radius,
                            y: this.position.y + Math.sin(angle) * radius
                        },
                        origin,
                        isoAngle
                    )
                );
            }

            return points;
        },

        update: function (game, time, delta) {
            var origin = {
                x: 0,
                y: 0
            };
            this.poly = this.computePoly(origin, this.radius, game.camera.angle);
            this.polyLight = this.computePoly(origin, this.radius * 1.25, game.camera.angle);
            this.polyPotential = this.computePoly(origin, this.radius * 0.5, game.camera.angle);

            this.hovered = Math.isPointInPoly(
                this.poly,
                game.getRealMousePosition()
            );

            if (this.hovered) {
                game.hoveredTile = this;
            }
        },

        polyToPath: function (context, poly) {
            context.beginPath();
            context.moveTo(
                poly[0].x,
                poly[0].y
            );
            for (var i = 1; i < poly.length; i++) {
                context.lineTo(
                    poly[i].x,
                    poly[i].y
                );
            }
            context.closePath();
        },

        draw: function (game, context, time, elapsedTime, delta) {
            var origin = {
                x: 0,
                y: 0
            };
            var isoPos = Hexx.utils.Geo.isoProjection(
                this.position,
                origin,
                game.camera.angle
            );

            this.polyToPath(context, this.poly);

            var color = this.hovered && this.type === 0 ?
                game.turn ? '#2C4BB8' : '#B84A2C' :
                [
                    '#4A5A6A',
                    '#2C4BB8',
                    '#B84A2C',
                    '#666'
                ][this.type];

            context.lineWidth = 2;
            context.lineJoin = 'round';
            context.strokeStyle = '#303540';
            context.fillStyle = color;

            context.fill();
            context.stroke();

            context.font = "20px sans";

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.textSize = 30;

            context.fillStyle = '#B9C6E6';

            /*context.fillText(
             this.title,
             isoPos.x,
             isoPos.y
             );*/

            context.textAlign = "left";
            context.textBaseline = "top";
        },

        drawLight: function (game, context, time, elapsedTime, delta) {
            var origin = {
                x: 0,
                y: 0
            };

            if (this.type === 1 || this.type === 2) {
                context.fillStyle = [
                    '#456',
                    'rgba(44, 75, 184, 0.33)',
                    'rgba(184, 74, 44, 0.33)',
                    '#666'  
                ][this.type];

                this.polyToPath(context, this.polyLight);

                context.globalCompositeOperation = "color";
                context.fill();
                context.globalCompositeOperation = "source-over";
            }
        },

        drawPotential: function (player, game, context, time, elapsedTime, delta) {
            context.fillStyle = [
                '#456',
                'rgba(44, 75, 184, 0.33)',
                'rgba(184, 74, 44, 0.33)',
                '#666'
            ][player];

            this.polyToPath(context, this.polyPotential);

            context.globalCompositeOperation = "lighter";
            context.fill();
            context.globalCompositeOperation = "source-over";
        }

    });
}());