var serveStatic = require('serve-static');
// above added by sam to bring in r3 boilerplate

var express    = require('express');
var bodyParser = require('body-parser');
var Path       = require('path');
var db = require('./db.js');
// var browserify = require('browserify-middleware');

var auth       = require('./routes/auth.js');
var users      = require('./routes/users.js');
var groups     = require('./routes/groups.js');
var routes     = require('./routes/index.js');
var app = express();

console.log("NODE_ENV", process.env.NODE_ENV);
// using webpack-dev-server and middleware in development environment

if (process.env.NODE_ENV === 'production'){
  console.log("trying to connect to db");
  console.log("db url", process.env.DATABASE_URL);

  var pg = require('pg');

  pg.defaults.ssl = true;
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client
      .query('SELECT table_schema,table_name FROM information_schema.tables;')
      .on('row', function(row) {
        console.log(JSON.stringify(row));
      });
  });
}

if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('../webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

if (process.env.NODE_ENV !== 'test') {
  // We're in development or production mode
  // create and run a real server.
  var authConfig = require('./config/passport.js')(app,express);

  // Parse incoming request bodies as JSON
  // app.use(session({secret: 'kitkat'}));
  app.use( bodyParser.urlencoded ({extended:true}) );
  app.use( bodyParser.json() );
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

  // Mount our routes
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/groups', groups);
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || process.env.WEBPACK_PORT || 3000;
  app.listen(port);
  console.log('Listening on port', port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
