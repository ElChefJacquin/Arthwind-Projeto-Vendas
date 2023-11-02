/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
        table
          .increments('id')
          .primary()
          .unsigned();
        table
          .string('nome')
          .notNullable();
        table
          .integer('quantidade')
          .notNullable();
        table.integer('usuario')
          .unsigned();
        table.decimal('precocompra', 8, 2)
        .notNullable();
        table.decimal('precovenda', 8, 2)
        .notNullable();
        table.integer('categoria')
          .unsigned();
        table.boolean('visivel')
          .defaultTo(true);
        table.foreign('usuario')
          .references('id')
          .inTable('usuario');
        table.foreign('categoria')
          .references('id')
          .inTable('categoria');
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
