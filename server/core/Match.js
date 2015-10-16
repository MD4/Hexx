
var Match = function (playerA, playerB) {
    console.log(
        'match done !',
        playerA._auth.username,
        '<->',
        playerB._auth.username
    );

    this._playerA = playerA;
    this._playerB = playerB;

    this._io = this._playerA._io;

    this._id = _guid();

    this._notifyMatch();
};

Match.prototype._notifyMatch = function() {
    this._playerA.match(this._playerB._auth, this._id);
    this._playerB.match(this._playerA._auth, this._id);
};

Match.prototype.start = function() {
    setTimeout(function() {
        this._io.sockets.in(this._id).emit('game:start');
    }.bind(this), 3000);
};

module.exports = Match;



function _guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}