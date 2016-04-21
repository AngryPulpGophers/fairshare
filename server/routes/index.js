var express = require('express');
var router  = express.Router();
var Path    = require('path');

var assetFolder = Path.resolve(__dirname, '../../client');


//
// The Catch-all Route
// This is for supporting browser history pushstate.
// NOTE: Make sure this route is always LAST.
//

router.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
});

module.exports = router;
