(function() {

    var Controller = Hexx.core.Controller,
        Sockets = Hexx.services.Sockets;

    var QueueController = Controller.extend({

        init: function(container) {
            this._super(container);

            this.$labelPosition = container.querySelector('#label-position');

            Sockets.onQueuePosition(this.onQueuePosition.bind(this));
        },

        shown: function() {
            Sockets.queue();
        },

        onQueuePosition: function(position) {
            this.refreshPosition(position);
        },

        refreshPosition: function(position) {
            this.$labelPosition.innerHTML = 'Your position : ' + position;
        }

    });

    Hexx.controllers.Queue = QueueController;

})();