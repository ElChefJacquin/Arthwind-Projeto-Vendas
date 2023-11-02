const {Model} = require("objection");

class Produto extends Model{
    static get tableName(){
        return "produto";
    }
    static get idColumn(){
        return "id";
    }
    static get nomeColumn(){
        return "nome";
    }
    static get quantidadeColumn(){
        return "quantidade";
    }
    static get precocompraColumn(){
        return "precocompra";
    }
    static get precovendaColumn(){
        return "precovenda";
    }
    static get relationMappings(){
        const Categoria = require("./categoria");
        const Usuario = require("./user");
        return{
            categoria_relacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Categoria,
                join: {
                  from: "produto.categoria",
                  to: "categoria.id",
                },
              },
              usuario_relacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Usuario,
                join: {
                  from: "produto.usuario",
                  to: "usuario.id",
                }
            }
        }
    }
}


module.exports = Produto;