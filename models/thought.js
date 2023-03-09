const { Schema, model, Types } = require("mongoose");

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "Thought Required",
        minlength: 1,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const thought = model("thought", thoughtSchema);