/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('produto_venda', function(table) {
        table
          .increments('id')
          .primary()
        table
            .integer('produto_fk')
            .unsigned()
            .index()
            .references('id')
            .inTable('produto')
            .onDelete('SET NULL');
        table
            .integer('venda_fk')
            .unsigned()
            .index()
            .references('id')
            .inTable('venda')
            .onDelete('SET NULL');
        table
          .integer('usuario')
          .unsigned();
        table
          .foreign('usuario')
          .references('id')
          .inTable('usuario');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
