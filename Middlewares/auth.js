const jwt = require('jsonwebtoken');
const configs = require('../Config/config');

const auth = (req,res,next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({ error: 'Autenticação inválida'});

    jwt.verify(token_header, configs.jwt_pass, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token inválido!' });
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;