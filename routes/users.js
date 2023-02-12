const express = require("express");
const authMiddleware = require("../authMiddleware");
// const { response } = require('../app'); // comenté esta linea porque no encuentra el modulo

const User = require("../models/user");

const userRouter = express.Router();

// Follow new user
userRouter.post("/:userId/follow", authMiddleware, (req, res) => {
  User.updateOne(
    { _id: req.jwtInfo.user_id },
    {
      $addToSet: { following: req.params.userId },
    }
  )
    .then((result) => res.sendStatus(200))
    .catch((err) => res.status(500).json(err));
});

//To unfollow
userRouter.delete("/:userId/unfollow", authMiddleware, (req, res) => {
  User.updateOne(
    { _id: req.jwtInfo.user_id },
    {
      $pull: { following: req.params.userId },
    }
  )
    .then((result) => res.sendStatus(200))
    .catch((err) => res.status(500).json(err));
});

//Retrieve user data
userRouter.get("/:userId", authMiddleware, (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = userRouter;
