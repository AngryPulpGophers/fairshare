exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('groups').del(), 

    // Inserts seed entries
    knex('groups').insert({
      name: 'high school brunch crew', 
    	desc: 'mimosas and bloodies at the aiport'
    }),
    knex('groups').insert({
      name: 'weekend warriors', 
    	desc: 'cocaine and vodka are our M.O.'
    }),
    knex('groups').insert({
      name: 'stay-cation bunch', 
    	desc: 'delivery pizza, the couch and netflix.'
    })
  );
};
