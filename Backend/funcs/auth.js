const decodificar = require("./decode");

function autenticar(token) {
    const payload = decodificar(token);

    if (payload) {
        return payload.payload;
    } else {
        throw new Error("Token inválido");
    }
}


module.exports = autenticar;