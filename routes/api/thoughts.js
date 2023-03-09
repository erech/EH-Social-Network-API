const router = express.Router();
const express = require("express");
const 
{
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
  } = require("../controllers/thoughts.js")

  // Get all thoughts and create new thought
  router.route("/")
  .get(getAllThought)
  .post(createThought);

//Get, update, and delete thought
router.route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Add a reaction
router.route("/thoughts/:thoughtId")
  .post(addReaction);

// Remove reaction
router.route("/thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;