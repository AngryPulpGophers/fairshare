
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('table_name').del(), 

    // Inserts seed entries
    knex('sessions').insert({session_id:'aaa-bbb-ccc-ddd',
                                user_id: 1,
                                token  : 'sfslajflsjglslg'
                            }),

    knex('sessions').insert({session_id:'bbb-ccc-ddd-eee',
                                user_id: 2,
                                token  : 'rtyjprtkyperktyp'
                            }),

    knex('sessions').insert({session_id:'ddd-eee-fff-ggg',
                                user_id: 1,
                                token  : 'sgoeroeroteroute'
                            }),  
  );
};
