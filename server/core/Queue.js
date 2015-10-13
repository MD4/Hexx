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
    console.log(1, _queue.length);
    _queue.push(client);
    _notifyAllPositions();
}

function remove(client) {
    _queue.splice(_getPosition(client), 1);
    _notifyAllPositions();
}

function match() {
    if (_queue.length >= 2) {
        console.log(3, _queue.length);
        var match = {
            a: _queue[0],
            b: _queue[1]
        };
        _queue.splice(0, 2);
        _notifyAllPositions();

        console.log(2, _queue.length);

        return match;
    }
    return null;
}