module.exports.add = add;
module.exports.remove = remove;

var _queue = [];

// public

function _notifyAll() {
    _queue.forEach(function(client) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(client);
        _notify.apply(this, args);
    });
}

function _notify(client, event) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    client[event] && client[event].apply(client, args);
}

function _notifyAllPositions() {
    _queue.forEach(function(client) {
        _notify(client, 'onQueuePositionChanged', _getPosition(client) + 1);
    });
}

function _getPosition(client) {
    return _queue.indexOf(client);
}

function _match() {
    if (_queue.length >= 2) {
        _notify(_queue[0], 'onMatch', _queue[1]);
        _notify(_queue[1], 'onMatch', _queue[0]);

        remove(_queue[0]);
        remove(_queue[1]);
    }
}


// private

function add(client) {
    _queue.push(client);
    _notifyAllPositions();
}

function remove(client) {
    _queue.splice(_getPosition(client), 1);
    _notifyAllPositions();
}
