(function () {

    Hexx.utils.Geo = {

        isoProjection: function (position, origin, radius) {
            var ang = Math.angle(origin, position) + Math.PI / 4;
            var dst = Math.distance(origin, position);

            return	{
                x: (origin.x + Math.cos(ang) * dst),
                y: (origin.y - Math.sin(ang) * dst) / 2
            };
        }

    };

}());