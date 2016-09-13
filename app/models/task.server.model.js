var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
  task: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  priority: {
    type: Boolean,
    default: false
  },
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  dateentered: {
    type: Date,
    default: Date.now
  }
});

taskSchema.set('timestamps', {});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
