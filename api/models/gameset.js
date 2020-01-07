const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    game: {
      type: String
    },
    player_1: {
      type: String
    },
    player_2: {
      type: String
    }
  },
  {
    collection: "gameset"
  }
);

var gameset = new mongoose.model("Gameset", schema);

module.exports = gameset;
