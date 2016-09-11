module.exports = function(app) {

var express = require('express'),
    router = express.Router();

var User = require('../models/user.server.model');
var userController = require('../controllers/users.server.controller');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/api/users')
  .get(userController.index)
  .post(userController.create);

app.route('/api/users/:user_id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.destroy);

app.param('user_id', userController.user_by_id);

};
