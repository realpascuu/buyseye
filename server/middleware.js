// middleware.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

// asegurarnos de que se ha autentificado
exports.yaHaSidoAutetificado = function(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Esta petición no tiene cabecera de autentificación" });
    }

    var playload = jwt.decode(req.headers.authorization, config.TOKEN_SECRET);

    if (playload.exp <= moment().unix()) {
        return res.status(401).send({ message: "¡El token ya ha expirado!" });
    }

    req.username = playload.sub;
    next();
};