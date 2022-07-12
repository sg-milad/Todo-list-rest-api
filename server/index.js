const connect = require("./config/database");
const routerList = require("./routers/router.list");
const routerTask = require("./routers/router.task");

const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

// connect to database
connect();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// routers
app.use("/lists", routerList);
app.use("/lists", routerTask);
// 404
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});
// listen to port
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
