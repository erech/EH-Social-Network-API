const mongoose = require("mongoose");

mongoose.connect("mongodb://my-server:27017/my-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false, 
  debug: true
});

module.exports = mongoose.connection;