const express = require('express');
const cors = require('cors')
// const mongoose = require('mongoose');

require('./lib/connectMongoose') // david, agregué la conexión a mongoose en un módulo aparte

// mongoose.connect('mongodb://127.0.0.1:27017/flitter', {useNewUrlParser: true})

const app = express();

app.locals.JWT_SECRET = 'flitter'

app.use(express.json())

app.use(cors())

app.use('/auth', require('./routes/auth'));
app.use('/tweets', require('./routes/tweet'));
app.use('/users', require('./routes/user'));
// app.use('/products', require('./routes/product'));
// app.use('/tags', require('./routes/tag'));

// const response = require('./lib/response'); // añadido ?? 
// app.use(response);

app.listen(3000, () => console.log('Flitter is listening in 3000'));

module.exports = app;