exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('payments').del(),

    // Inserts seed entries
    knex('payments').insert({
      payee: 3,
    	recipient: 2,
    	amount: 20.00,
    	note: 'twenty spot',
      group_id: 1
    }),
    knex('payments').insert({
      payee: 1,
      recipient: 2,
      amount: 10.00,
      note: 'some for food',
      group_id: 1
    }),
    knex('payments').insert({
      payee: 1,
      recipient: 2,
      amount: 20.00,
      note: 'For food',
      group_id: 2,
    }),
    knex('payments').insert({
      payee: 3,
    	recipient: 1,
    	amount: 40.00,
    	note: 'sorry--slipped my mind, for the party',
      group_id: 3
    })
  );
};
