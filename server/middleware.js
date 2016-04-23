

module.exports = function(req,res,next){
	if(req.isAuthenticated()) next();
	res.status(401).send('user not authenticated');
}