const express = require('express');
const jsonwebtoken = require("jsonwebtoken");

const User = require('../models/user');
const Tweet = require('../models/tweet');

const tweetRouter = express.Router();

// Create new tweet
tweetRouter.post('/', (req, res) =>{
    
    // TODO move to middleware
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json('Unauthorize user')

    try{
        const decoded = jsonwebtoken.verify(token, req.app.locals.JWT_SECRET);
        req.jwtInfo = decoded

        console.log(decoded);
        // next() -> cuando esté en middleware

    }catch(e){
        console.log(e);
        res.status(400).json('Token not valid')
        return
    }
    // TODO hasta aquí

    if (!req.body.text) {
        res.sendStatus(400)
        return
    }

    console.log('successfully validated JWT')
    const newTweet = new Tweet({
        text: req.body.text,
        publishDate: req.body.publishDate || Date.now(),
        author: req.jwtInfo.user_id
    })
        
    newTweet.save()
        .then(tweet => res.json(tweet))
        .catch(err => res.status(500).json(err))
});

// Create new tweet
tweetRouter.get('/', (req, res) =>{
    
    // TODO move to middleware
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return publicFeed(req, res);

    try{
        const decoded = jsonwebtoken.verify(token, req.app.locals.JWT_SECRET);
        req.jwtInfo = decoded

        console.log(decoded);
        // next() -> cuando esté en middleware

    }catch(e){
        console.log(e);
        res.status(400).json('Token not valid')
        return
    }
    // TODO hasta aquí

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
//     const name = req.query.name;
//     const minPrice = req.query.minPrice;
//     const maxPrice = req.query.maxPrice;
//     const tagList = req.query.tags;
    const order = req.query.order || 'desc';

//     const query = {};
//     if (name) query.name = {$text: {$search: name}};
//     if (minPrice) query.price = {$gte: minPrice};
//     if (maxPrice) query.price = {$lte: minPrice};
//     if (tagList) query.tags = {$in : tagList.split(',')};

    var options = {
        page,
        limit
    };
    options.sort = {'publishDate' : order};

    Tweet.paginate({}, options, (err, result) =>{
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

const publicFeed = (req, res) => {

}

module.exports = tweetRouter