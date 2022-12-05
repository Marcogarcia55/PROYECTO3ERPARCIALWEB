const mongoose = require('mongoose');

const postScheme = mongoose.Schema({
  nombre: {type: String, required: true},
  suscripcion: {type: String, require: true},
  direccion: {type: String, require: true},
  fechaInicio: {type: String, require: true},
  fechaFin: {type: String, require: true},
  imagePath: {type: String, require: true}

  });

module.exports = mongoose.model('Post', postScheme);

