const {Model} = require("objection");

class Usuario extends Model{
    static get tableName(){
        return "usuario";
    }
    static get passColumn(){
        return "senha";
    }
    static get userColumn(){
        return "usuario";
    }
    static get emailColumn(){
        return "email";
    }
}


module.exports = Usuario;