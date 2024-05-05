const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        userId: { type: String, required: true },
        productIds: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order);
