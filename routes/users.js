const express = require("express");
const authMiddleware = require("../authMiddleware");

const User = require("../models/user");

const userRouter = express.Router();


// Follow new user
userRouter.post("/:userId/follow", authMiddleware, (req, res) => {
  if (req.jwtInfo.user_id === req.params.userId) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  User.updateOne(
    { _id: req.jwtInfo.user_id },
    {
      $addToSet: { following: req.params.userId },
    }
  )
    .then((result) => res.sendStatus(200))
    .catch((err) => res.status(500).json(err));
});

//Unfollow user
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
userRouter.get("/", authMiddleware, (req, res) => {
  User.findOne({ _id: req.jwtInfo.user_id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => res.status(500).json(err));
});

//Delete user from database
userRouter.delete("/", authMiddleware, (req, res) => {
  User.deleteOne({ _id: req.jwtInfo.user_id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({ message: "User deleted successfully" });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = userRouter;
