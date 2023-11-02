/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function(table) {
        table
          .increments('id')
          .primary()
          .unsigned();
        table
            .string('usuario')
            .notNullable()
            .unique();
        table
          .string('senha')
          .notNullable();
        table
            .string('email')
            .notNullable()
            .unique();
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
