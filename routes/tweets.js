const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
const authMiddleware = require('../authMiddleware');

const User = require('../models/user');
const Tweet = require('../models/tweet');

const tweetRouter = express.Router();

// Create new tweet
tweetRouter.post('/', authMiddleware, (req, res) =>{
   
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

// Delete tweet
tweetRouter.delete('/:tweetId', authMiddleware, (req, res) =>{
    
    Tweet.deleteOne({ $and: [
        {_id: req.params.tweetId},
        {author: req.jwtInfo.user_id}
    ]})
        .then(result => {
            if (!result.deletedCount) {
                res.sendStatus(404)
                return
            }
            res.sendStatus(200)
        })
        .catch(err => res.status(500).json(err))
});

// Listar tweet
tweetRouter.get('/', (req, res) =>{
    feed(req, res)
});
tweetRouter.get('/private', authMiddleware, (req, res) =>{

    User.findOne({
        _id: req.jwtInfo.user_id,
    }, function (err, user) {
        if (err || !user) {
            res.sendStatus(404) 
            return
        }

        feed(req, res, user.following)
      });
});

tweetRouter.post('/:tweetId/kudos', authMiddleware, (req, res) =>{
    
    Tweet.updateOne({_id: req.params.tweetId},
        {
            $addToSet: {kudos: req.jwtInfo.user_id}
        })
        .then(tweet => res.sendStatus(200))
        .catch(err => res.status(500).json(err))
});

tweetRouter.delete('/:tweetId/kudos',authMiddleware, (req, res) =>{
    
    Tweet.updateOne({_id: req.params.tweetId},
        {
            $pull: {kudos: req.jwtInfo.user_id}
        })
        .then(tweet => res.sendStatus(200))
        .catch(err => res.status(500).json(err))
});

const feed = (req, res, followedAuthors) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const order = req.query.order || 'desc';
    const search = req.query.search;

    const query = {
        publishDate: { $lte: new Date() }
    };
    if (search) query.$text = {$search: search};
    if (followedAuthors) query.author = {$in: followedAuthors};

    var options = {
        page,
        limit
    };
    options.sort = {'publishDate' : order};

    aggregate = Tweet.aggregate([
        {
            $match: query
        },
        {
            $project: {
                text: 1,
                publishDate: 1,
                author: 1,
                kudos: { $size: "$kudos" }
            }
        }
    ]);
    Tweet.aggregatePaginate(aggregate, options, (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {

            Tweet.populate(
                result.docs,
                {
                    path: 'author',
                    select: '_id username'
                },
                (err, populateResult) =>{
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        result.docs = populateResult
                        res.json(result);
                    }
                }
            );
        }
    });  
}

module.exports = tweetRouter