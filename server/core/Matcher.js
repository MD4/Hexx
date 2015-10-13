var Queue = require('./Queue');

module.exports.start = start;

var _matchesLimit = 2;
var _matches = [];

// private

function _match() {
    var match = Queue.match();
    if (match) {
        console.log('match done !', match.a.auth.username, match.b.auth.username);
        match.a.match(match.b.auth);
        match.b.match(match.b.auth);
    }
}

// public

function start() {
    setInterval(_match.bind(this), 5000);
}