const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret2;

function validartoken(token) {
    const decoded = jwt.verify(token, secret);
    return decoded;
}

module.exports = validartoken;