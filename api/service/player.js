var mongoose = require("mongoose");
var player = mongoose.model("Player");

exports.createPlayer = function(data, callback) {
  player.create(data).then(
    response => {
      callback(null, response);
    },
    error => {
      callback(error, null);
    }
  );
};

exports.getPlayers = function(data, callback) {
  player.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      return response;
    }
  });
};
