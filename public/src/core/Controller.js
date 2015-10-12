(function() {

    Hexx.core.Controller = Class.extend({

        events: {},

        init: function(container) {
            this.$container = container;

            this.hide();
        },

        hide: function() {
            this.$container.style.display = 'none';
        },

        show: function() {
            this.$container.style.display = 'block';
        },

        on: function(event, callback) {
            if (!this.events[event + ""]) {
                this.events[event + ""] = [];
            }
            this.events[event + ""].push(callback);
        },

        off: function(event, callback) {
            if (!this.events[event + ""]) {
                throw 'Event "' + event + '" is not registered';
            }
            this.events[event + ""].splice(this.events[event + ""].indexOf(callback), 1);
        },

        clear: function(event) {
            if (!this.events[event + ""]) {
                throw 'Event "' + event + '" is not registered';
            }
            delete this.events[event + ""];
        },

        trigger: function(event) {
            if (!this.events[event + ""]) {
                throw 'Event "' + event + '" is not registered';
            }
            this.events[event + ""].forEach(function(callback) {
                callback.apply(this, Array.prototype.slice.call(arguments));
            }.bind(this));
        }

    });

})();