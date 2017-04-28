var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        default: ''
    },
    complete: {
        type: Boolean,
        default: false
    }
});

TodoSchema.methods.toJSON = function() {
  return {
    id: this.id,
    title: this.title,
    complete: this.complete
  }
}

module.exports = mongoose.model('Todo', TodoSchema);

