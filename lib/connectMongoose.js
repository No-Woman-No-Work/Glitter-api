'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
  console.log('Error de conexión a MongoDB', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1:27017/flitter', {useNewUrlParser: true})


module.exports = mongoose.connection;