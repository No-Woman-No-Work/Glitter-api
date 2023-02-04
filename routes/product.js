// const express = require('express');

// const Product = require('../models/product');

// const productRouter = express.Router();

// productRouter.get('/', (req, res) =>{
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const name = req.query.name;
//     const minPrice = req.query.minPrice;
//     const maxPrice = req.query.maxPrice;
//     const tagList = req.query.tags;
//     const sort = req.query.sort;
//     const order = req.query.order || 'asc';

//     const query = {};
//     if (name) query.name = {$text: {$search: name}};
//     if (minPrice) query.price = {$gte: minPrice};
//     if (maxPrice) query.price = {$lte: minPrice};
//     if (tagList) query.tags = {$in : tagList.split(',')};

//     var options = {
//         page,
//         limit
//     };

//     if (sort) {
//         options.sort = [[sort, order]];
//     }

//     Product.paginate(query, options, (err, result) =>{
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             res.json(result);
//         }
//     });
// });

// productRouter.post('/', (req, res) =>{
//     console.log(req.body);
//     const newProduct = new Product({
//         name: req.body.name,
//         type: req.body.type,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         tags: req.body.tags
//     })

//     newProduct.save()
//         .then(product => res.json(product))
//         .catch(err => res.status(500).json(err))
// });

// module.exports = productRouter