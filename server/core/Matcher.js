var Queue = require('./Queue');

module.exports.start = start;

var _matchesLimit = 2;
var _matches = [];

// private

function _match() {
    if (_matches.length >= _matchesLimit) {
        return;
    }
    var match = Queue.match();
    if (match) {
        match.start();
        _matches.push(match);
    }
}

// public

function start() {
    setInterval(_match.bind(this), 5000);
}