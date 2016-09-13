var User = require('mongoose').model('User');

var jwt = require('jsonwebtoken');
var jwt_secret = 'onetwothreefourfiveonesixsevenseven';


module.exports = {
  index: function(req, res, next) {
    User.find({})
    .populate('task')
    .exec(function(err, users) {
      if (err) res.status(400).send(err);
      res.json(users);
    });
  },
  create: function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) return next (err);
      res.json(user);
    });
  },
  show: function(req, res) {
    res.json(req.user);
  },
  update: function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
      if(err) {
        return next(err);
      } else {
        res.json(user);
      }
    });
  },
  login: function(req, res) {
    var input_user = req.body;

    User.findOne({ email: input_user.email }, function (err, db_user) {
      if(err) res.send(err);

      // if(db_user) {
      //   db_user.auth( input_user.password, function(err, is_match_password) {
      //
      //     if(err) return res.status(500).send(err);

          if(db_user.password === input_user.password) {
            var payload = {
              id: db_user.id,
              email: db_user.email
            };
            var expiryObj = {
              expiresIn: '3h'
            };
            var jwt_token = jwt.sign(payload, jwt_secret, expiryObj);


            return res.status(200).send({token: jwt_token, id: db_user.id});
          } else {
            return res.status(401).send({ message: 'login failed' });
          }
        });
      // } else {
      //   return res.status(401).send({ message: 'user not found in database' });
      // }
    // });

  },
  destroy: function(req, res, next) {
    req.user.remove(function(err) {
      if(err) {
        return next(err);
      } else {
      res.json(req.user);
      }
    });
  },
  user_by_id: function(req, res, next, id) {
    User.findOne({
      _id: id
    },
    function(err, user) {
      if (err) {
        return next(err);
      } else {
        req.user = user;
        next();
      }
    })
    .populate('task');    
}

};
