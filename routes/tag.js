// const express = require('express');

// const Product = require('../models/product');

// const tagRouter = express.Router();

// tagRouter.get('/', (req, res) =>{
//     Product.distinct('tags', (err, result) =>{
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             res.json(result);
//         }
//     });
// });

// module.exports = tagRouter