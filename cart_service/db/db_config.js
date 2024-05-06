const mongoose = require("mongoose");

mongoose
    .connect("mongodb://cart_db-1:27017/cartsdb", { useNewUrlParser: true })
    .catch((e) => {
        console.error("Connection error", e.message);
    });

const db = mongoose.connection;

module.exports = db;