var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HeroSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        default: ''
    }
});

HeroSchema.methods.toJSON = function() {
  return {
    id: this.id,
    name: this.name
  }
}

module.exports = mongoose.model('Hero', HeroSchema);

