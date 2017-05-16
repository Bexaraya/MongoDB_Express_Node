var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RestauranteSchema = new Schema({
    id: {
        type: Number
    },
    nombre: {
        type: String,
        default: ''
    },
    direccion: {
        type: String,
        default: ''
    },
    descripcion: {
        type: String,
        default: ''
    },
    precio: {
        //type: Number
        type: String,
        default: ''
    }
});

/*
// Getter
RestauranteSchema.path('precio').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
RestauranteSchema.path('precio').set(function(num) {
  return num * 100;
});
*/

RestauranteSchema.methods.toJSON = function() {
  return {
    id: this.id,
    nombre: this.nombre,
    direccion: this.direccion,
    descripcion: this.descripcion,
    precio: this.precio
  }
}

module.exports = mongoose.model('Restaurante', RestauranteSchema);

