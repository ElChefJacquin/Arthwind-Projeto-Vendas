/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('venda', function(table) {
        table
          .increments('id')
          .primary()
          .unsigned();
        table.decimal('precototal', 8, 2).notNullable();
        table.decimal('lucrototal', 8, 2).notNullable();
        table.integer('quantidade').notNullable();
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
