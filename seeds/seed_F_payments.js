exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('payments').del(), 

    // Inserts seed entries
    knex('payments').insert({
      payee: 1, 
    	recipient: 2,
    	amount: 20.00,
    	note: 'twenty spot'
    }),
    knex('payments').insert({
      payee: 2, 
    	recipient: 1,
    	amount: 40.00,
    	note: 'sorry--slipped my mind'
    }),
    knex('payments').insert({
      payee: 3, 
    	recipient: 1,
    	amount: 25.00,
    	note: 'To your health!'
    })
  );
};
