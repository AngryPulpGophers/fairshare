//This function is invoked immediately and gets express passed in from server.js
var db          = require('../db.js');
var Promise     = require('bluebird');
var uuid        = require('uuid');
var bcrypt      = require('bcryptjs');

var compare = Promise.promisify(bcrypt.compare);
var hash    = Promise.promisify(bcrypt.hash);

var Auth = module.exports;
