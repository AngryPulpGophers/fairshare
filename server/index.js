var express    = require('express');
var bodyParser = require('body-parser');
var Path       = require('path');
// var browserify = require('browserify-middleware');
// var passport   = require('passport');

var routes     = require('./routes/index.js');
var auth       = require('./routes/auth.js');
var users      = require('./routes/users.js');
var groups     = require('./routes/groups.js');

var assetFolder = Path.resolve(__dirname, '../client');

if (process.env.NODE_ENV !== 'test') {
  // We're in development or production mode
  // create and run a real server.
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( bodyParser.json() );
  app.use( express.static(assetFolder) );

  // app.get('/groups', function(){
  //   console.log("pj");
  // });

  // Mount our routes
  app.use('/', routes);
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/groups', groups);

  
  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
