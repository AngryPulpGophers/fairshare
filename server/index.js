var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
//var serveStatic = require('serve-static');
// above added by sam to bring in r3 boilerplate

var express    = require('express');
var bodyParser = require('body-parser');
var Path       = require('path');
// var browserify = require('browserify-middleware');
// var passport   = require('passport');

var auth       = require('./routes/auth.js');
var users      = require('./routes/users.js');
var groups     = require('./routes/groups.js');
var routes     = require('./routes/index.js');


if (process.env.NODE_ENV !== 'test') {
  // We're in development or production mode
  // create and run a real server.
  var app = express();
  var authConfig = require('./config/passport.js')(app,express);
  var compiler = webpack(config);
  // Parse incoming request bodies as JSON
  // app.use(session({secret: 'kitkat'}));
  app.use(bodyParser.urlencoded ({extended:true}));
  app.use( bodyParser.json() );
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

  //webpack middleware for dev/debugging
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  // Mount our routes
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/groups', groups);
  app.use('/', routes);

  // Start the server!
  var port = process.env.WEBPACK_PORT || 3000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
