import express    from 'express';
import passport   from 'passport';
import bodyParser from 'body-parser';
import path       from 'path';


var app = express();

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port', port);
