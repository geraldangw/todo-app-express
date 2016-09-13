var Task = require('mongoose').model('Task');
var User = require('mongoose').model('User');

module.exports = {
  index: function(req, res, next) {
    Task.find({})
    .populate('user')
    .exec(function(err, tasks) {
      if (err) res.status(400).send(err);
      res.json(tasks);
    });
},
  create: function(req, res) {

    var task = new Task({
      task: req.body.task,
      description: req.body.description,
      deadline: req.body.deadline,
      priority: req.body.priority,
      status: false,
      deleted: false,
      user: req.body.user
    });

    task.save(function(err) {
      if (!err) {
        console.log(req.body.user);
        User.findOne( {_id: req.body.user }, function (err, user){
          if (!err) {
            console.log(task);
            console.log(user);
            user.task.push(task._id);
            console.log(user);
            user.save(function(err) {
              if(!err) {
                return console.log('saved task to user');
              } else {
                console.log(err);
              }
            });
          }
        });
        return console.log('created task');
      } else {
        return console.log(err);
      }
    });
    return res.send(task);

  },
  show: function(req, res) {
    res.json(req.task);
  },
  update: function(req, res, next) {
    Task.findByIdAndUpdate(req.task.id, req.body, function(err, task) {
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
    },
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
