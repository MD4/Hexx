var Queue = require('./Queue');

module.exports.start = start;

var _matchesLimit = 2;
var _matches = [];

// private

function _match() {
    var match = Queue.match();
    if (match) {
        var uuid = _guid();
        console.log('match done !', match.a.auth.username, '<->', match.b.auth.username);
        match.a.match(match.b.auth, uuid);
        match.b.match(match.b.auth, uuid);
    }
}

function _guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

// public

function start() {
    setInterval(_match.bind(this), 5000);
}