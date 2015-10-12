(function() {

    var Controller = Hexx.core.Controller,
        Sockets = Hexx.services.Sockets;

    var AuthController = Controller.extend({

        init: function(container) {
            this._super(container);

            this.$buttonAuth = container.querySelector('#button-auth');
            this.$labelAuthResult = container.querySelector('#label-auth-result');
            this.$inputUsername = container.querySelector('#input-username');

            this.$buttonAuth.onclick = this.authClick.bind(this);
            this.$inputUsername.onkeypress = this.usernameKeyPress.bind(this);

            Sockets.onAuthFail(this.onAuthFail.bind(this));
            Sockets.onAuthSuccess(this.onAuthSuccess.bind(this));
        },

        authClick: function() {
            var username = this.$inputUsername.value;
            Sockets.auth(username);
        },

        usernameKeyPress: function(e) {
            if (e.keyCode === 13) {
                this.authClick();
            }
        },

        onAuthFail: function() {
            Hexx.auth = null;

            this.$labelAuthResult.innerHTML = 'Auth failed !';

            this.trigger(AuthController.AUTH_FAIL);
        },

        onAuthSuccess: function(auth) {
            Hexx.auth = auth;

            this.$labelAuthResult.innerHTML = 'Auth succeed !';

            this.trigger(AuthController.AUTH_SUCCESS);
        }

    });

    AuthController.AUTH_SUCCESS = 'auth:success';
    AuthController.AUTH_FAIL = 'auth:fail';

    Hexx.controllers.Auth = AuthController;

})();