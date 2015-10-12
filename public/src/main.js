(function () {

    var mainController = new Hexx.controllers.Main(document.body);

    Hexx.services.Sockets.connect();

    Hexx.services.Sockets.onConnect(function() {
        mainController.show();
    });

})();