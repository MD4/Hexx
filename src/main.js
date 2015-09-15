(function (global) {

    var game = new Hexx.core.Game(
        document.getElementById("display"),
        {
            debugMode: true
        }
    );

    game.start();

})(window);