exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('expenses').del(), 

    // Inserts seed entries
    knex('expenses').insert({
      title: 'drinks', 
    	amount : 120.50,
      group_id: 1,
      user_id:  1,
      img_url: 'http://www.image.com',
      note: 'Happy-hour 12/23'
    }),
    
    knex('expenses').insert({
      title: 'food', 
    	amount : 135.50,
    	group_id: 2,
    	user_id:  2,
    	img_url: 'http://www.image.com',
    	note: 'dinner 12/23'
    }),
    
    knex('expenses').insert({ title: 'food', 
    	amount : 100.75,
    	group_id: 3,
    	user_id:  3,
    	img_url: 'http://www.image.com',
    	note: 'lunch 12/23'
    })
  );
};
