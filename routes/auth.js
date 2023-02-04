const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
const crypto = require('crypto')
// const Mailjet = require('node-mailjet');

const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/register', (req, res) =>{
    
    User.findOne({$or: [
        {username: req.body.username},
        {email: req.body.email}
    ]}, function (err, user) {
        if (!err && user) {
            res.sendStatus(500) 
            return
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
      });
});

authRouter.post('/login', (req, res) =>{

    User.findOne({
        'username': req.body.username,
        'password': req.body.password
    }, function (err, user) {
        if (err || !user) {
            res.sendStatus(401) 
            return
        }
        
        return res.json({
            token: jsonwebtoken.sign({ user_id: user._id }, req.app.locals.JWT_SECRET),
        });
      });
});

authRouter.post('/forgot-password', (req, res) =>{
    console.log(req.body);

    User.findOne({
        'email': req.body.email,
    }, function (err, user) {
        if (err || !user) {
            res.sendStatus(404) 
            return
        }

        let hash = crypto.createHash('md5').update(Date.now() + user._id).digest("hex")
        let update = {recoverPasswordToken: hash}

        user.set({recoverPasswordToken: hash})
        user.save()
            .then(user => forgotPasswordSuccess(user))
            .catch(err => res.status(500).json(err))
      });
});

const forgotPasswordSuccess = (user) => {
    
    const recoverPassUrl = 'http://localhost:8080/new-password/' + user.recoverPasswordToken;
    console.log(user.recoverPasswordToken)
    
    // TODO remove
    res.sendStatus(200)

    // TODO uncomment
    // ------> START Email
    // const mailjet = new Mailjet({
    //     apiKey: 'your-api-key',
    //     apiSecret: 'your-api-secret'
    // });

    // const request = mailjet.post('send', { version: 'v3.1' })
    //     .request({
    //     Messages: [
    //         {
    //         From: {
    //             Email: "hello@flitter.com",
    //             Name: "Flitter"
    //         },
    //         To: [
    //             {
    //             Email: user.email,
    //             Name: user.username
    //             }
    //         ],
    //         Subject: "Recover your pass.....",
    //         TextPart: "asdasdasd",
    //         HTMLPart: "asdasdasdasd" // Añadir recoverPassUrl.
    //         }
    //     ]
    //     })

    // request
    //     .then((result) => {
    //         res.sendStatus(200)
    //     })
    //     .catch((err) => {
    //         res.sendStatus(500)
    //     })
    // ------> END Email
};

authRouter.post('/reset-password', (req, res) =>{
    console.log(req.body);
    res.status(200);

    if (!req.body.recoverPasswordToken || !req.body.password) {
        res.sendStatus(404)
        return
    }

    User.findOne({
        'recoverPasswordToken': req.body.recoverPasswordToken,
    }, function (err, user) {
        if (err || !user) {
            res.sendStatus(404) 
            return
        }

        user.set({
            password: req.body.password,
            recoverPasswordToken: ''
        })
        user.save()
            .then(user => res.sendStatus(200))
            .catch(err => res.status(500).json(err))
      });
});

module.exports = authRouter