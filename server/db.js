var config      = require('../knexfile.js');
var env         = process.env.NODE_ENV;
if (!env) { env = 'development'; }
var knex        = require('knex')(config[env]);

module.exports  = knex;

knex.migrate.latest([config]);
