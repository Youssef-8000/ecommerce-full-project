const express = require('express');
const Payment = require('../controllers/payment_crtl');
const router = express.Router();

router.post('/payment/:userId', Payment.payUserCart );
router.get('/payments', Payment.getPayments);
router.get('/payments/total', Payment.getTotal);

module.exports = router;