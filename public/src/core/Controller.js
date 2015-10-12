(function () {

    Hexx.core.Controller = Class.extend({

        events: {},

        init: function (container) {
            this.$container = container;

            this.hide();
        },

        hide: function () {
            this.$container.style.display = 'none';
            this.hidden && this.hidden();
        },

        show: function () {
            this.$container.style.display = 'block';
            this.shown && this.shown();
        },

        hidden: function () {
            // Override this
        },

        shown: function () {
            // Override this
        },

        on: function (event, callback) {
            if (!this.events[event + ""]) {
                this.events[event + ""] = [];
            }
            this.events[event + ""].push(callback);
        },

        off: function (event, callback) {
            if (!this.events[event + ""]) {
                return;
            }
            this.events[event + ""].splice(this.events[event + ""].indexOf(callback), 1);
        },

        clear: function (event) {
            if (!this.events[event + ""]) {
                return;
            }
            delete this.events[event + ""];
        },

        trigger: function (event) {
            if (!this.events[event + ""]) {
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            this.events[event + ""].forEach(function (callback) {
                callback.apply(this, args);
            }.bind(this));
        }

    });

})();