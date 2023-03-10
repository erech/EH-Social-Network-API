//require express + connection + routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const userControl = require('../controllers/user.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/users', userControl.getUsers);

(async () => {
    try {
      await db.once("open");
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
      });
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
      process.exit(1);
    }
  })();