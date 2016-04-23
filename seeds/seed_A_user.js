exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
      name: 'posdnuos',
    	username: 'plugOne', 
    	password: 'delasoulisdead',
    	email: 'blah@blah.com',
    	img_url: 'http://www.url.com',
    }),
    knex('users').insert({
      name: 'Maceo',
    	username: 'plugTwo', 
    	password: 'peaseporridge',
    	email: 'blahblah@blah.com',
    	img_url: 'http://www.url2.com',
    }),
    knex('users').insert({
      name: 'Dave',
    	username: 'princepaul', 
    	password: 'oodlesofos',
    	email: 'blahblahblah@blah.com',
    	img_url: 'http://www.url3.com',
    })
  );
};
