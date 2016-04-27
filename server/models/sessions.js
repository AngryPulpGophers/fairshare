var db = require('../db.js');

var Sess = module.exports;

Sess.getById = function(sessID){
	return db('sessions')
	  .select()
	  .where('sid', '=', sessID);
};
