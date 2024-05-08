const express = require('express');
const CartCtrl = require('../controllers/cart-controller');
const router = express.Router();

router.post('/cart', CartCtrl.addProductsToCart);
router.get('/cart/:userId', CartCtrl.getProductsFromCart);
router.delete('/cart/:cartId',CartCtrl.deleteCart);
router.get('/', CartCtrl.checkServiceRunning);

module.exports = router;