require("dotenv").config();

// for dev
module.exports = {
  MONGODB_URI: process.env.DEV_MONGODB_URI,
  TOKEN_SECRET: 'helloworld'
};