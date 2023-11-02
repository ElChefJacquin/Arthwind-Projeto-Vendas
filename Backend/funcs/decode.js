const jwt = require("jsonwebtoken");
const secret = require("./secrets").secret;

function decodificar(payload) {
  var decoded = jwt.verify(payload, secret);
  return decoded;
}

module.exports = decodificar;
