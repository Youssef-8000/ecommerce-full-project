const express = require('express');
const UserCtrl = require('../controllers/user_controller');
const router = express.Router();

router.post('/user/auth', UserCtrl.checkUserAuth);
router.post('/user/register', UserCtrl.registerUser)
router.get('/', UserCtrl.checkServiceRunning);

module.exports = router;