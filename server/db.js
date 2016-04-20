import config from '../knexfile.js';
var env = 'development';
import knex   from  'knex'(config[env]);

module.exports = knex;

knex.migrate.latest([config]);
