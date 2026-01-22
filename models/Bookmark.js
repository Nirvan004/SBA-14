const { Schema, model } = require("mongoose");

const bookmarkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = model('Bookmark', bookmarkSchema);

module.exports = Bookmark;