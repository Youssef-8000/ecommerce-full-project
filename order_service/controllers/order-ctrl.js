const Order = require("../models/order-model");

getOrdersFromUser = async (req, res) => {
  console.log(req);
  await Order.find({ userId: req.params.userId }, (err, order) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!order) {
      return res.status(404).json({ success: false, error: `Order not found` });
    }
    return res.status(200).json({ success: true, data: order });
  }).catch((err) => console.log(err));
};

addOrderToUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an Order",
    });
  }

  const order = new Order(body);
  console.log("order", order);

  if (!order) {
    return res.status(400).json({ success: false, error: err });
  }

  if (order.productIds.length != 0) {
    order
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: order._id,
          message: "Order created!",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Order not created!",
        });
      });
  } else {
    return res.status(400).json({ success: false, error: err });
  }
};

deleteOrder = (req, res) => {
    const { orderId } = req.params;
    console.log(orderId)
  
    Order.findByIdAndDelete(orderId)
      .then((order) => {
        if (!order) {
          return res.status(404).json({
            success: false,
            error: 'Order not found',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Order deleted successfully',
        });
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          error: 'Server error',
        });
      });
  };

checkServiceRunning = (req, res) => {
  res.send("Hello World! - from order service.");
};

module.exports = {
  getOrdersFromUser,
  addOrderToUser,
  checkServiceRunning,
  deleteOrder
};
