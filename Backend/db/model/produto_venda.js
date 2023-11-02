const { Model } = require("objection");

class ProdutoVenda extends Model {
    static get tableName() {
        return "produto_venda";
    }

    static get relationMappings() {
        const Produto = require("./produto");
        const Venda = require("./venda");
        const Usuario = require("./user")

        return {
            produtos: {
                relation: Model.ManyToManyRelation,
                modelClass: Produto,
                join: {
                    from: "produto_venda.produto_fk",
                    through: {
                        from: "produto_venda.produto_fk",
                        to: "produto_venda.venda_fk"
                    },
                    to: "produto.id"
                }
            },
            vendas: {
                relation: Model.ManyToManyRelation,
                modelClass: Venda,
                join: {
                    from: "produto_venda.venda_fk",
                    through: {
                        from: "produto_venda.produto_fk",
                        to: "produto_venda.venda_fk"
                    },
                    to: "venda.id"
                }
            },
            usuario_relacao:{
                relation:Model.BelongsToOneRelation,
                modelClass:Usuario,
                join:{
                    from:"produto_venda.usuario",
                    to:"usuario.id"
                }
            }
        };
    }
}

module.exports = ProdutoVenda;