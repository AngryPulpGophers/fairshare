exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sessions').del(), 

    // Inserts seed entries
    knex('sessions').insert({
      sess:'aaa-bbb-ccc-ddd',
      sid: 1,
      expire  : (new Date).toISOString()
    }),
    knex('sessions').insert({
      sess:'bbb-ccc-ddd-eee',
      sid: 2,
      expire  : (new Date).toISOString()
    }),
    knex('sessions').insert({
      sess:'ddd-eee-fff-ggg',
      sid: 1,
      expire : (new Date).toISOString()
    })
  );
};
