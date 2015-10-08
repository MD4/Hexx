(function() {

    Hexx.controllers.Auth = Class.extend({

        init: function(container) {
            this.$buttonAuth = container.querySelector('#button-auth');
            this.$labelAuthResult = container.querySelector('#label-auth-result');
            this.$inputUsername = container.querySelector('#input-username');

            this.$buttonAuth.onclick = this.authClick.bind(this);
            this.$inputUsername.onkeypress = this.usernameKeyPress.bind(this);

            Hexx.services.Sockets.onAuthFail(this.onAuthFail.bind(this));
            Hexx.services.Sockets.onAuthSuccess(this.onAuthSuccess.bind(this));
        },

        authClick: function() {
            var username = this.$inputUsername.value;
            Hexx.services.Sockets.auth(username);
        },

        usernameKeyPress: function(e) {
            if (e.keyCode === 13) {
                this.authClick();
            }
        },

        onAuthFail: function() {
            Hexx.auth = null;

            this.$labelAuthResult.innerHTML = 'Auth failed !';
        },

        onAuthSuccess: function(auth) {
            Hexx.auth = auth;

            this.$labelAuthResult.innerHTML = 'Auth succeed !';
        }

    });

})();