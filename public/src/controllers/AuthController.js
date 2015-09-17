(function() {

    Hexx.controllers.Auth = Class.extend({

        init: function(container) {
            this.$buttonAuth = container.querySelector('#button-auth');
            this.$labelAuthResult = container.querySelector('#label-auth-result');

            this.$buttonAuth.onclick = this.authClick.bind(this);

            Hexx.services.Sockets.onAuthFail(this.onAuthFail.bind(this));
            Hexx.services.Sockets.onAuthSuccess(this.onAuthSuccess.bind(this));
        },

        authClick: function() {
            Hexx.services.Sockets.auth('lol');
        },

        onAuthFail: function() {
            this.$labelAuthResult.innerHTML = 'Auth failed !';
        },

        onAuthSuccess: function() {
            this.$labelAuthResult.innerHTML = 'Auth succeed !';
        }

    });

})();