var Match = require('./Match');

module.exports.add = add;
module.exports.remove = remove;
module.exports.match = match;

var _queue = [];

// private

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

// public

function add(client) {
    _queue.push(client);
    _notifyAllPositions();
}

function remove(client) {
    var position = _getPosition(client);
    if (position === -1) {
        return;
    }
    _queue.splice(_getPosition(client), 1);
    _notifyAllPositions();
}

function match() {
    if (_queue.length >= 2) {
        var match = new Match(
            _queue.shift(),
            _queue.shift()
        );
        _notifyAllPositions();
        return match;
    }
    return null;
}