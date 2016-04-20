var express    = require('express');
var bodyParser = require('body-parser');
var browserify = require('browserify-middleware');
var Path       = require('path');
// var passport   = require('passport');

var routes     = express.Router();

routes.get('/app-bundle.js', browserify('./client/app.js'));

routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'react', 'postgresql']);
});

var assetFolder = Path.resolve(__dirname, '../client');
routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' );
  });

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( bodyParser.json() );

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
