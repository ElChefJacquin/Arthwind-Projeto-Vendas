const { Model } = require("objection");

class Venda extends Model {
    static get tableName() {
        return "venda";
    }

    static get idColumn() {
        return "id";
    }

    static get precototalColumnName() {
        return "precototal";
    }

    static get lucrototalColumnName() {
        return "lucrototal";
    }

    static get quantidadeColumnName() {
        return "quantidade";
    }

    static get relationMappings(){
        const Usuario = require("./user");
        return{
            usuario_relacao:{
                relation:Model.BelongsToOneRelation,
                modelClass:Usuario,
                join:{
                    from:"venda.usuario",
                    to:"usuario.id"
                }
            }
        }
    }
}

module.exports = Venda;
