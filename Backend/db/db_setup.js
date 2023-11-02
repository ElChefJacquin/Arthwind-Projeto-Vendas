const knex = require('knex');
const {Model} = require('objection');
const knexfile = require('./knex');

function setupDB(){
    const db = knex(knexfile.development);
    Model.knex(db);
}

module.exports = setupDB;