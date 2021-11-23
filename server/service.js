// service.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(username) {
    var playload = {
        sub: username,
        iat: moment().unix(),
        exp: moment().add(10, "minutes").unix()
    };
    return jwt.encode(playload, config.TOKEN_SECRET);
};