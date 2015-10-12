(function () {

    var MainController = Hexx.controllers.Main,
        Sockets = Hexx.services.Sockets;

    var mainController = new MainController(document.body);

    Sockets.connect();

    Sockets.onConnect(function() {
        mainController.show();
    });

})();