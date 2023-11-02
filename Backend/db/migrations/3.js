/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria', function(table) {
        table
          .increments('id')
          .primary()
          .unsigned();
        table.string('categoria').notNullable();
        table
          .integer('usuario')
          .unsigned();
        table
          .foreign('usuario')
          .references('id')
          .inTable('usuario');
      });      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
