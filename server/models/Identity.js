var db = require('../db.js');
var Identity = module.exports;

/*profile obj = {
	user_id: integer,
	provider_id: integer,
	provider: string,
	token: string,
	refresh: string,
	expires: integer
}*/


Identity.create = (profile) => {
	return db('identity').insert(profile);
};

Identity.getByProviderID = (id) => {
	return db('identity')
	  .select('user_id')
	  .where('provider_id', '=', id);
};

//provider being the third party-->facebook,google or paypal

Identity.getToken = (id, provider) => {
	return db('identity')
	  .select('token')
	  .where('user_id', '=', id)
	  .andWhere('provider', '=', provider);
};


//obj here will be {token: null}

Identity.unlink = (obj) => {
	return db('identity')
	  .where('user_id', '=', obj.id)
	  .andWhere('provider','=', obj.provider)
	  .delete();
};
