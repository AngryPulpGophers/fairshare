exports.up = function(knex, Promise){

  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('username', 16).unique();
      table.string('password', 16);
      table.string('email');
      table.string('img_url');
    }),

    knex.schema.createTable('groups', function(table){
      table.increments('id').primary();
      table.string('name');
      table.text('desc', 100);
    }),

    knex.schema.createTable('user_groups', function(table){
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('group_id').references('id').inTable('groups');
    }),

    knex.schema.createTable('expenses', function(table){
      table.increments('id').primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.string('title', 16);
      table.decimal('amount', 8, 2);
      table.integer('group_id').references('id').inTable('groups');
      table.integer('user_id').references('id').inTable('users');
      table.string('img_url');
      table.text('note', 200);
    }),

    knex.schema.createTable('user_expenses', function(table){
      table.increments('id').primary();
      table.integer('expense_id').references('id').inTable('expenses');
      table.integer('user_id').references('id').inTable('users');
    }),

    knex.schema.createTable('payments', function(table){
      table.increments('id').primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.integer('group_id').references('id').inTable('groups');
      table.integer('payee').references('id').inTable('users');
      table.integer('recipient').references('id').inTable('users');
      table.decimal('amount', 8, 2);
      table.text('note', 200);
    }),

    knex.schema.createTable('sessions', function(table){
      table.increments('id').primary();
      table.string('session_id');
      table.integer('user_id').references('id').inTable('users');
      table.string('token');
    })
  ]);
};

exports.down = function(knex, Promise){

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.droptTable('user_expenses'),
    knex.schema.dropTable('user_groups'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('expenses'),
    knex.schema.dropTable('payments'),
    knex.schema.dropTable('sessions')
  ]);
};
