exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('expenses').del(),

    // Inserts seed entries
    knex('expenses').insert({
      title: 'drinks',
      amount : 120.50,
      group_id: 1,
      paid_by:  1,
      img_url: 'http://www.image.com',
      note: 'Happy-hour 12/23'
    }),

    knex('expenses').insert({
      title: 'food',
      amount : 159.70,
      group_id: 1,
      paid_by:  2,
      img_url: 'http://www.image.com',
      note: 'Fine Dining 12/23'
    }),

    knex('expenses').insert({
      title: 'food',
      amount : 46.20,
      group_id: 1,
      paid_by:  3,
      img_url: 'http://www.image.com',
      note: 'Dessert'
    }),

    knex('expenses').insert({
      title: 'lunch',
    	amount : 56.80,
    	group_id: 2,
    	paid_by:  1,
    	img_url: 'http://www.image.com',
    	note: 'lunch 12/23'
    }),

    knex('expenses').insert({
      title: 'food',
      amount : 135.50,
      group_id: 2,
      paid_by:  2,
      img_url: 'http://www.image.com',
      note: 'dinner 12/23'
    }),

    knex('expenses').insert({ title: 'food',
    	amount : 100.75,
    	group_id: 3,
    	paid_by:  3,
    	img_url: 'http://www.image.com',
    	note: 'lunch 12/23'
    }),

    knex('expenses').insert({ title: 'party',
      amount : 300.75,
      group_id: 3,
      paid_by:  1,
      img_url: 'http://www.image.com',
      note: 'Birthday party'
    })
  );
};
