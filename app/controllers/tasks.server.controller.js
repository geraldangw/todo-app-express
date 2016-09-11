var Task = require('mongoose').model('Task');

module.exports = {
  index: function(req, res, next) {
    Task.find({})
    .populate('user')
    .exec(function(err, tasks) {
      if (err) res.status(400).send(err);
      res.json(tasks);
    });
},
  create: function(req, res, next) {
    var task = new Task(req.body);
    task.save(function(err) {
      if (err) return next (err);
      res.json(task);
    });
  },
  show: function(req, res) {
    res.json(req.task);
  },
  update: function(req, res, next) {
    Task.findbyIdAndUpdate(req.task.id, req.body, function(err, task) {
      if(err) {
        return next(err);
      } else {
        res.json(task);
      }
    });
  },
  destroy: function(req, res, next) {
    req.task.remove(function(err) {
      if(err) {
        return next(err);
      } else {
      res.json(req.task);
      }
    });
  },
  task_by_id: function (req, res, next, id) {
    Task.findOne({
      _id: id
    }, 'name, category',
    function(err, task) {
      if(err) {
        return next(err);
      } else {
        req.task = task;
        next();
      }
    });
  }
};
