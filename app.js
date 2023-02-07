const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/flitter', {useNewUrlParser: true})

const app = express();

app.locals.JWT_SECRET = 'flitter'

app.use(express.json())

app.use(cors())

app.use('/auth', require('./routes/auth'));
app.use('/tweets', require('./routes/tweet'));
app.use('/users', require('./routes/user'));
// app.use('/products', require('./routes/product'));
// app.use('/tags', require('./routes/tag'));

app.listen(3000, () => console.log('Flitter is listening in 3000'));

module.exports = app;