const Payment = require("../models/payment-model");
const Cart = require('../../cart_service/models/cart-model')

payUserCart = async (req, res) => {
  console.log(req);

  const body = req.body;
  await Cart.find({ userId: req.params.userId }, (err, carts) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    const payment = new Payment(body);
    var total = 0;
    carts.forEach((e) => {
      total += e.product.price;
    });
    payment.total = total;

    Cart.deleteMany({ userId:req.params.userId }, (err) => {
        if (err) {
        console.error(err);
        } else {
          // Deletion was successful
        console.log('Cart deleted successfully.');
        }
      });



    if (!Cart) {
      return res.status(404).json({ success: false, error: `There is no items in cart` });
    }
    return res.status(200).json({ success: true, data: payment });
  }).catch((err) => console.log(err));
};



getPayments = async (req, res) => {
    await Payment.find({}, (err, payments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        
        return res.status(200).json({ success: true, data: payments });
    }).catch(err => console.log(err));
};


getTotal = async (req, res) => {
    await Payment.find({}, (err, payments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        
        var total = 0;
        payments.forEach((e)=>{
            total+=e.total;
        });
            

        return res.status(200).json({ success: true, data: total });
    }).catch(err => console.log(err));


};

  
