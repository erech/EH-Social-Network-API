const { thought, user } = require("../models");

const thoughtControl = {
    async getAllThought(req, res) {
      try {
        const dbThoughtData = await Thought.find({})
          .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 });
  
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.sendStatus(400);
      }
    },

    async getThoughtById({ params }, res) {
        try {
          const dbThoughtData = await Thought.findById(params.id)
            .populate({
              path: "reactions",
              select: "-__v"
            })
            .select("-__v");
      
          if (!dbThoughtData) {
            return res.status(404).json({ message: "404 thougths empty" });
          }
      
          res.json(dbThoughtData);
        } catch (err) {
          console.log(err);
          res.sendStatus(400);
        }
      },

      async createThought({ params, body }, res) {
        try {
          const newThought = await Thought.create(body);
          const user = await User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: newThought._id } },
            { new: true }
          );
          if (!user) {
            return res.status(404).json({ message: "404 user empty" });
          }
          res.json({ message: "Thought created!" });
        } catch (err) {
          res.json(err);
        }
      },

      async updateThought(req, res) {
        try {
          const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
          )
            .select('-__v')
            .populate({ path: 'reactions', select: '-__v' });
      
          if (!updatedThought) {
            return res.status(404).json({ message: '404 Thoughts empty2' });
          }
      
          res.json(updatedThought);
        } catch (error) {
          res.json(error);
        }
      }, 


      async deleteThought({ params }, res) {
        try {
          const deletedThought = await Thought.findOneAndDelete({ _id: params.id });
          if (!deletedThought) {
            return res.status(404).json({ message: "404 empty user 2" });
          }
          await User.updateMany(
            { thoughts: params.id },
            { $pull: { thoughts: params.id } }
          );
          res.json({ message: "Thought deleted." });
        } catch (err) {
          res.json(err);
        }
      },

      async addReaction({ params, body }, res) {
        try {
          const updatedThought = await Thought.findByIdAndUpdate(
            params.thoughtId,
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
          ).populate({ path: "reactions", select: "-__v" });
      
          if (!updatedThought) {
            return res.status(404).json({ message: "404 Thoughts empty 3" });
          }
      
          res.json(thought);
        } catch (err) {
          res.json(err);
        }
      }, 

      removeReaction({ params }, res) {
        Thought.findByIdAndUpdate(
          params.thoughtId,
          { $pull: { reactions: { _id: params.reactionId } } },
          { new: true }
        )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought with this id" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
      }

  };


module.exports = thoughtControl;