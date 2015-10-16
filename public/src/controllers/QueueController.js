(function() {

    var Controller = Hexx.core.Controller,
        Sockets = Hexx.services.Sockets;

    var QueueController = Controller.extend({

        init: function(container) {
            this._super(container);

            this.$labelPosition = container.querySelector('#label-position');

            Sockets.onQueuePosition(this.onQueuePosition.bind(this));
            Sockets.onQueueMatch(this.onQueueMatch.bind(this));
        },

        shown: function() {
            Sockets.queue();
        },

        onQueuePosition: function(position) {
            this.refreshPosition(position);
        },

        onQueueMatch: function(player) {
            this.$labelPosition.innerHTML = 'Player found : ' + player.username + ' !';

            setTimeout(function() {
                this.trigger(QueueController.QUEUE_MATCH, player);
            }.bind(this), 1500);
        },

        refreshPosition: function(position) {
            this.$labelPosition.innerHTML = 'Your position : ' + position;
        }

    });

    QueueController.QUEUE_MATCH = 'queue:match';

    Hexx.controllers.Queue = QueueController;

})();