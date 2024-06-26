const Payment = require("../models/payment-model");

payUserCart = async (req, res) => {
  try {
    console.log(req);

    const body = req.body;

    const payment = new Payment(body);
    payment.total = req.body.total;

    try {
      const savedPayment = await payment.save();
      return res.status(201).json({
        success: true,
        id: savedPayment._id,
        total: savedPayment.total,
        message: 'payment created!',
      });
    }catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: error.message || 'payment not created!',
      });
    }

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
  res.send('payment Service running');
}

module.exports = { payUserCart, getPayments, getTotal, checkServiceRunning };
