const connect = require("./config/database");

const dotenv = require("dotenv").config();
const express = require("express");
connect();
const app = express();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
