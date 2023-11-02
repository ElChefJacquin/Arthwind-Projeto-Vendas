const {Model} = require("objection");

class Categoria extends Model{
    static get tableName(){
        return "categoria";
    }
    static get idColumn(){
        return "id";
    }
    static get categoriaColumn(){
        return "categoria";
    }
    static get relationMappings(){
        const Usuario = require("./user");
        return{
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:Usuario,
                join:{
                    from: "categoria.usuario",
                    to: "usuario.id"
                }
            }
        }
    }
}

module.exports = Categoria;