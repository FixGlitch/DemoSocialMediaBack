require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const router = require("./routes/index");

const app = express();
const secret = crypto.randomBytes(64).toString("hex");

app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

app.use("/sm-backend", router);

module.exports = app;
