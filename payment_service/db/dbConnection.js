const mongoose = require("mongoose");

mongoose
  .connect("mongodb://Payment_db-1:27017/Paymentdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
