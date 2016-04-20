
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user_groups').del(), 

    // Inserts seed entries
    knex('user_groups').insert({user_id: 1, 
    	                       group_id: 1
    	                   }),
    
    knex('user_groups').insert({user_id: 2, 
    	                       group_id: 1 
    	                    }),

    knex('user_groups').insert({user_id: 2, 
    	                       group_id: 3 
    	                    }),

    knex('user_groups').insert({user_id: 3, 
    	                       group_id: 2 
    	                    }),

    knex('user_groups').insert({user_id: 1, 
    	                       group_id: 3 
    	                    }),

  );
};
