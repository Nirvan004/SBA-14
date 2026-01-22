const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const passport = require('passport');
require("dotenv").config();
require("./config/passport");


const app = express();
const PORT = process.env.PORT || 2004;

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/bookmarks', require('./routes/api/bookmarkRoutes'));

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
