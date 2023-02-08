const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
const crypto = require('crypto')
const Mailjet = require('node-mailjet');

const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/register', (req, res) =>{
    
    User.findOne({$or: [
        {username: req.body.username},
        {email: req.body.email}
    ]}, function (err, user) {
        if (!err && user) {
            res.sendStatus(500).json({ message: 'El nombre de usuario o email ya existe.'}) 
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
            .then(user => forgotPasswordSuccess(req, res, user))
            .catch(err => res.status(500).json(err))
      });
});

const forgotPasswordSuccess = (req, res, user) => {
    const recoverPassUrl = 'http://localhost:8080/new-password/' + user.recoverPasswordToken;
    const mailjet = new Mailjet({
        apiKey: 'cf1b66c0eb365dfc5edefb723c247a97',
        apiSecret: '184a66a1cf03483c9305c0f3fb96d91c'
    });

    const request = mailjet.post('send', { version: 'v3.1' })
        .request({
        Messages: [
            {
            From: {
                Email: "mari_antoniol@hotmail.com",
                Name: "Flitter"
            },
            To: [
                {
                Email: user.email,
                Name: user.username
                }
            ],
            Subject: "Recover your password",
            TextPart: "asdasdasd",
            HTMLPart: "Hi " + user.username + ", <br/><br/>To recover your password click <a href=\"" + recoverPassUrl + "\">here</a> or copy-paste this link in your browser:<br/><br/>" + recoverPassUrl
            }
        ]
        })
        .then((result) => {
            console.log(result)
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500)
        })
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