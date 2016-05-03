var config      = require('../knexfile.js');
var env         = process.env.NODE_ENV || 'development';
var knex        = require('knex')(config[env]);

module.exports  = knex;

// Function for your testing suite
knex.deleteEverything = function () {
  if (env !== 'test') { return Promise.reject(); }

  // TODO: Delete data from all tables (useful for testing)
  knex('user_groups').del().then();
  knex('user_expenses').del().then();
  knex('expenses').del().then();
  knex('payments').del().then();
  knex('groups').del().then();
  knex('users').del().then();
  knex('knex_migrations_lock').del().then();
  knex('sessions').del().then();
  return Promise.resolve();
};
console.log("migrating...");
console.log("env:", env);
// knex.migrate.latest([config]);
