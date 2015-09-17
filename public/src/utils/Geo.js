(function () {

    Hexx.utils.Geo = {

        isoProjection: function (position, origin, angle) {
            var ang = Math.angle(origin, position) + angle;
            var dst = Math.distance(origin, position);

            return {
                x: origin.x + Math.cos(ang) * dst,
                y: origin.y + (Math.sin(ang) * dst) / 2
            };
        }

    };

}());