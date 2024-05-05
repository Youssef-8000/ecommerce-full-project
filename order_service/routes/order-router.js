const express = require('express');
const OrderCtrl = require('../controllers/order-ctrl');
const router = express.Router();

router.post('/order', OrderCtrl.addOrderToUser);
router.get('/order/:userId', OrderCtrl.getOrdersFromUser);
router.delete('/order/delete/:orderId', OrderCtrl.deleteOrder);
router.get('/', OrderCtrl.checkServiceRunning);

module.exports = router;