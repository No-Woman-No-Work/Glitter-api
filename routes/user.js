const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
// const { response } = require('../app'); // comenté esta linea porque no encuentra el modulo

const User = require('../models/user');

const userRouter = express.Router();


// Follow new user
userRouter.post('/:userId/follow', (req, res) =>{
    
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

    User.updateOne({_id: req.jwtInfo.user_id},
        {
            $addToSet: {following: req.params.userId}
        })
        .then(result => res.sendStatus(200))
        .catch(err => res.status(500).json(err))
});

//To unfollow 
userRouter.delete('/:userId/unfollow', (req, res) =>{
    
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

    User.updateOne({_id: req.jwtInfo.user_id},
        {
            $pull: {following: req.params.userId}
        })
        .then(result => res.sendStatus(200))
        .catch(err => res.status(500).json(err))
});


module.exports = userRouter