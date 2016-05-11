var Users      = require('../models/users.js');
var Identity   = require('../models/Identity');
var Middleware = require('../middleware');
var nodemailer = require('nodemailer');
var wellknown  = require('nodemailer-wellknown');
var express    = require('express');
var router     = express.Router();

module.exports = router;

if (process.env.NODE_ENV !== 'test'){
  router.use(function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      res.status(401).send('user not authenticated');
    }
  });
}

router.param('username',function(req, res, next, username){

  req.username = username;
	next();
});

router.get('/', function(req, res){
  if(req.query.notCurr){
    Users.getAllButCurr(req.user)
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
  } else {
    Users.getAll()
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(err){
      res.status(400).send({err: err});
    });
  }
});

router.get('/id', function(req, res){
  Users.getById(req.user)
    .then(function(data){
      if(data[0]){
        res.status(200).send(data[0]);
      }else{
        res.status(400).send('incorrect username or username doesn\'t exist');
      }
    })
    .catch(function(err){
      res.status(400).send(err);
    });
});

router.get('/:username', function(req, res){
  Users.getByUsername(req.username)
    .then(function(data){
			if(data[0]){
		    res.status(200).send(data[0]);
		  }else{
		    res.status(400).send('incorrect username or username doesn\'t exist');
		  }
	  })
	  .catch(function(err){
	    console.error(err);
	  });
});

router.post('/', function(req, res){
	var profile = req.body;

	Users.getByUsername(profile.username)
	  .then(function(data){
	    if(data[0]){
	    	res.status(400).send('username already exists');
	    }else{
	    	Users.create(profile)
	    	  .then(function(id){
	    	  	res.status(200).send('user created');
	    	  })
	    	  .catch(function(err){
	    	  	res.status(400).send({err:err});
	    	  });
	    }
	  })
	  .catch(function(err){
	  	res.status(400).send({err:err});
	  });
});

router.post('/invite', function(req, res, next){
  var config = wellknown('GandiMail');
  config.auth = {
    user: 'info@fairshare.cloud',
    pass: 'AeK6yxhT'
  };
  var transporter = nodemailer.createTransport(config);

  var mailOptions = {
    from: '"Info" <info@fairshare.cloud>',
    to: '<' + req.body.email + '>',
    subject: "You've been invited to join Fairshare.",
    text: 'Please visit fairshare.cloud to create an account.',
    html: "Please visit <a href='http://www.fairshare.cloud'>fairshare.cloud</a> to create an account."
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.end();
  });
});

router.put('/username', function(req, res){
	Users.editProfile(req.body)
	  .then(function(data){
      Users.getById({ id: JSON.parse(data)})
      .then(function (data) {
        res.status(200).send(data[0]);
      });

	  })
	  .catch(function(err){
	  	res.status(400).send({err:err});
	  });
});

router.post('/unlinkAccount',function(req,res){
  console.log('in unlink endpoint with following:', req.body);
  Identity.unlink(req.body)
    .then(function(){
      delete req.body.provider;
      Users.editProfile(req.body)
        .then(function(data){
          Users.getById({id:JSON.parse(data)})
            .then(function(data){
            res.status(200).send(data[0]);
            })
            .catch(function(err){
            res.status(400).send(err);
            });
        })
        .catch(function(err){
          res.status(400).send(err);
        });
    })
    .catch(function(err){
      res.status(400).send(err);
    });
});
