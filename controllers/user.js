const { User, Thought } = require("../models");

const userController = {
    async getAllUser(req, res) {
      try {
        const dbUserData = await User.find({})
          .populate({
            path: "friends",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 });
  
        res.json(dbUserData);
      } catch (err) {
        console.log(err);
        res.sendStatus(400);
      }
    },

    async getUserById({ params }, res) {
        try {
          const dbUserData = await User.findOne({ _id: params.id })
            .populate({
              path: "thoughts",
              select: "-__v",
            })
            .populate({
              path: "friends",
              select: "-__v",
            })
            .select("-__v");
      
          if (!dbUserData) {
            return res.status(404).json({ message: "404 user empty" });
          }
      
          res.json(dbUserData);
        } catch (err) {
          console.log(err);
          res.sendStatus(400);
        }
      }
      
      async createUser({ body }, res) {
        try {
          const dbUserData = await User.create(body);
          res.json(dbUserData);
        } catch (err) {
          res.json(err);
        }
      },

      async updateUser({ params, body }, res) {
        try {
          const dbUserData = await User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
          );
      
          if (!dbUserData) {
            return res.status(404).json({ message: "404 user empty 2" });
          }
      
          res.json(dbUserData);
        } catch (err) {
          res.json(err);
        }
      },

      async deleteUser({ params }, res) {
        try {
          const dbUserData = await User.findOneAndDelete({ _id: params.id });
      
          if (!dbUserData) {
            return res.status(404).json({ message: "404 user empty 3" });
          }
      
          await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      
          res.json({ message: "Deleted user." });
        } catch (err) {
          res.json(err);
        }
      }, 

      async addFriend({ params }, res) {
        try {
          const dbUserData = await User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
          );
          if (!dbUserData) {
            res.status(404).json({ message: "404 user empty 4" });
            return;
          }
          res.json(dbUserData);
        } catch (err) {
          res.json(err);
        }
      }
      
      async removeFriend({ params }, res) {
        try {
          const dbUserData = await User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
          );
          if (!dbUserData) {
            return res.status(404).json({ message: "404 user empty 5" });
          }
          res.json(dbUserData);
        } catch (err) {
          res.json(err);
        }
      }
  };

  module.exports = userControl;