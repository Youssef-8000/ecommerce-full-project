const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Payment = new Schema(
    {
        userId: { type: String, required: true },
        total_price: Number ,
    

    },
    { timestamps: true },
)

module.exports = mongoose.model('payments', Payment)