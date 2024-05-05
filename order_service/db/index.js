const mongoose = require("mongoose");

mongoose
  .connect("mongodb://order_db:27017/orderdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
