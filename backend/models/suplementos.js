const mongoose = require('mongoose');

const postScheme = mongoose.Schema({
  marca: {type: String, required: true},
  nombre: {type: String, require: true},
  descripcion: {type: String, require: true},
  precio: {type: String, require: true},
  imagePath: {type: String, require: true}

  });

module.exports = mongoose.model('Suplementos', postScheme);

