var Sess = require('./models/sessions');

var MiddleWare = module.exports;


MiddleWare.checkAuth = function(req,res,next){
  //console.log('req in midware:', req)
	if(req.isAuthenticated()) {return next();}
	res.status(401).send('user not authenticated');
};

MiddleWare.checkSession = function(req,res,next){
  Sess.getById(req.sessionID)
  .then(function(session){
  	if(session[0]){
  	 return next();
    }else{
    	res.status(401).send('invalid session');
    }
  });
};
