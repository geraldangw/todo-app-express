module.exports = function(app) {

  var express = require('express'),
      router = express.Router();

var Task = require('../models/task.server.model');
var taskController = require('../controllers/tasks.server.controller');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/api/tasks')
  .get(taskController.index)
  .post(taskController.create);

app.route('/api/tasks/:task_id')
    .get(taskController.show)
    .put(taskController.update)
    .delete(taskController.destroy);

app.param('task_id', taskController.task_by_id);

};
