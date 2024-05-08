const Payment = require("../models/payment-model");
const Cart = require("../../cart_service/models/cart-model");

payUserCart = async (req, res) => {
  try {
    console.log(req);

    const body = req.body;
    const carts = await Cart.find({ userId: req.params.userId }).exec();

    if (!carts || carts.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: `There are no items in the cart` });
    }

    const payment = new Payment(body);
    let total = 0;
    carts.forEach((e) => {
      total += e.product.price;
    });
    payment.total = total;

    await Cart.deleteMany({ userId: req.params.userId }).exec();

    console.log("Cart deleted successfully.");

    return res.status(200).json({ success: true, data: payment });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err });
  }
};

getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).json({ success: true, data: payments });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err });
  }
};

getTotal = async (req, res) => {
  try {
    const payments = await Payment.find({}).exec();

    let total = 0;
    payments.forEach((e) => {
      total += e.total;
    });

    return res.status(200).json({ success: true, data: total });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err });
  }
};

checkServiceRunning = (req,res)=> {
  res.send('User Service running');
}

module.exports = { payUserCart, getPayments, getTotal, checkServiceRunning };
