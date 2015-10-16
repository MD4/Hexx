
var Match = function (playerA, playerB) {
    console.log(
        'match done !',
        playerA.auth.username,
        '<->',
        playerB.auth.username
    );

    this._playerA = playerA;
    this._playerB = playerB;

    this._socket = this._playerA.socket;

    this._id = _guid();

    this._notifyMatch();
};

Match.prototype._notifyMatch = function() {
    this._playerA.match(this._playerB.auth, this._id);
    this._playerB.match(this._playerA.auth, this._id);
};

Match.prototype.start = function() {
    setInterval(function() {
        this._socket.to(this._id).emit('game:start');
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