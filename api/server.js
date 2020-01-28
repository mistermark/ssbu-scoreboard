let express = require("express"),
  path = require("path"),
  createError = require("http-errors"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db");

require("./models/player");
require("./models/gameset");
require("./models/livegame");
require("./models/character");
require("./models/stage");

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log("Database sucessfully connected");
    },
    error => {
      console.log("Database could not connected: " + error);
    }
  );

// Setting up port with express js
const playerRoute = require("../api/routes/player.route");
const gamesetRoute = require("../api/routes/gameset.route");
const liveGameRoute = require("../api/routes/livegame.route");
const characterRoute = require("../api/routes/character.route");
const stageRoute = require("../api/routes/stage.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/", express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/api/players", playerRoute);
app.use("/api/sets", gamesetRoute);
app.use("/api/live", liveGameRoute);
app.use("/api/characters", characterRoute);
app.use("/api/stages", stageRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
