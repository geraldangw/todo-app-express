var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-za-z_]+?\.[a-za-z]{2,3}$/
  },
  password: {
    type: String,
    required: true,
    //custom validator for password
    validate: [
      function(password) {
        return password.length >= 6;
      },
      'Password should be at least 6 characters.'
    ]
  },
  task: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }]
});

userSchema.pre('save', function(next) {
  var user = this;
  // generate a bcrypt sale
  bcrypt.genSalt(5, function(err, salt) {
    if(err) return next (err);
    //create the hash ==> plain password plus salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.auth = function(posted_password, callback) {
  console.log('posted_password is' + posted_password);
bcrypt.compare(posted_password, this.password, function(err, is_match) {
  callback(null, is_match);
});
};

var User = mongoose.model('User', userSchema);

module.exports = User;
