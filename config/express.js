// This file is an initializer for an express application.
var jwt_secret = 'onetwothreefourfiveonesixsevenseven';
//1) Requiring necessary modules.
var express = require('express'), // Express module.
    morgan = require('morgan'), // Logging middleware for express to log requests and response.
    compress = require('compression'), //compression middleware for web performance.
    bodyParser = require('body-parser'), // Parses the body of a request stream in desired format (urlencoded/json defined below) and makes it readable under req.body method.
    methodOverride = require('method-override'), //Middleware function to override req.method property and allow other syntax to be used.(i.e. lets you use http verbs).
    expressLayouts = require('express-ejs-layouts'), //Allow for ejs layouts and syntax. (e.g. <%- body %>).
    expressJWT = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    blacklist = require('express-jwt-blacklist'),
    cookieParser = require('cookie-parser');

//2) Creating a module exports function that specifies app structure and module usage across production/development.

module.exports = function() {
  var app = express(); //Defining this to be an express app.

  //initialize required modules.
  if (process.env.NODE_ENV === 'development') {//process.env.NODE_ENV specifies current environment of app.
    app.use(morgan('dev')); //use morgan in dev.
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress()); // use compress in prod.
  }
  app.use(bodyParser.urlencoded({extended: true})); //use bodyparser in urlencoded format.
  app.use(bodyParser.json()); //use bodyparser in json format
  app.use(methodOverride()); //use method override.

  app.set('views', './app/views'); // set views to be in app/views folder.
  app.set('view engine', 'ejs'); //set views to use ejs.
  app.use(expressLayouts);

  blacklist.configure ({
      tokenId: 'id'
  });

  app.use(
    expressJWT({
      secret: jwt_secret,
      isRevoked: blacklist.isRevoked
    })
    .unless({
      path: [
      '/login'
    ]
    })
  );

  app.get('/logout', function(req, res) {
    blacklist.revoke(req.user);
    res.redirect('/');
  });


  require('../app/routes/user.server.routes')(app);
  require('../app/routes/task.server.routes')(app);

  app.use(express.static('./public')); // links public folder w assets.

  return app; //app returns with above specifications and runs!
};
