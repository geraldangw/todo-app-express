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
  status: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateentered: {
    type: Date,
    default: Date.now
  }
});

taskSchema.set('timestamps', {});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
