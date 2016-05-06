exports.up = function(knex, Promise){

  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.string('name', 40);
      table.string('username', 20);
      table.string('email');
      table.string('img_url');
      table.integer('facebook');
      table.integer('google');
      table.integer('paypal');
      table.integer('showModal');
    }),

    knex.schema.createTable('groups', function(table){
      table.increments('id').primary();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.string('name');
      table.text('desc', 200);
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
      table.string('title', 40);
      table.decimal('amount', 8, 2);
      table.integer('group_id').references('id').inTable('groups');
      table.integer('paid_by').references('id').inTable('users');
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
      table.string('sess');
      table.string('sid');
      table.timestamp('expire');
    }),

    knex.schema.createTable('identity', function(table){
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.string('provider_id');
      table.string('provider');
      table.string('token');
      table.string('refresh');
      table.integer('expires');
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
