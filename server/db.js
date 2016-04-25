var config      = require('../knexfile.js');
var env         = process.env.NODE_ENV || 'development';
var knex        = require('knex')(config[env]);
var Promise     = require('bluebird');

module.exports  = knex;

// Function for your testing suite
knex.deleteEverything = function () {
  if (env !== 'test') { return Promise.reject(); }

  // TODO: Delete data from all tables (useful for testing)
  knex('users').del().then();
  knex('groups').del().then();
  knex('user_groups').del().then();
  knex('expenses').del().then();
  knex('user_expenses').del().then();
  knex('payments').del().then();
  return knex('sessions').del().then();
};

knex.migrate.latest([config]);
