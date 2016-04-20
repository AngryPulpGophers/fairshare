
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user_expenses').del(), 

    // Inserts seed entries
    knex('user_expenses').insert({expense_id: 1, 
    	                            user_id : 2
    	                        }),

     knex('user_expenses').insert({expense_id: 2, 
    	                            user_id  : 1
    	                        }),

      knex('user_expenses').insert({expense_id: 3, 
    	                            user_id   : 3
    	                        }),  
  );
};
