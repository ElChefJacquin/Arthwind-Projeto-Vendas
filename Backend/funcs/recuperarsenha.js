const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret2;

function gerartoken(payload) {
    const token = jwt.sign({usuario: payload}, secret, { expiresIn: "10m" });
    return token;
}

module.exports = gerartoken
