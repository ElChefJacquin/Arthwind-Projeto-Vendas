const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret;


function codificar(payload) {
    const token = jwt.sign(payload, secret);
    return token;
}

module.exports = codificar;