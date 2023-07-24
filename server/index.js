const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");

// DB setup
mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);