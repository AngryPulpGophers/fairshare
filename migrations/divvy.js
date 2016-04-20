exports.up = function(knex,Promise){

  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('username', 16).unique();
      table.string('password', 16)
      table.string('email');
      table.string('img_url')
    }),

    knex.schema.createTable('groups',function(table){
      table.increments('id').primary();
      table.string('name');
      table.text('desc', 100);
    }),

    knex.schema.createTable('expenses',function(table){
      table.increments('id').primary();
      table.string('name', 16);
      table.decimal('amount', 2);
      table.integer('group_id').references('id').inTable('groups');
      table.integer('user_id').references('id').inTable('users');
      table.string('img_url');
      table.text('note', 200)
    }),

    knex.schema.createTable('payments',function(table){
      table.increments('id').primary();
      table.string('payee').references('id').inTable('users');
      table.string('recipient').references('id').inTable('users');
      table.decimal('amount', 2);
      table.text('note', 200);
    }),

    knex.schema.createTable('sessions',function(table){
      table.increments('id').primary();
      table.string('session_id');
      table.string('user_id').references('user_id').inTable('users');
      table.string('token');
    })
  ]);
}

exports.down = function(knex,Promise){

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('expenses'),
    knex.schema.dropTable('payments'),
    knex.schema.dropTable('sessions')
   ]);
}