(function () {

    Hexx.services.Sockets.connect();

    Hexx.services.Sockets.onConnect(function() {
        new Hexx.controllers.Main(document.body);
    });

})();