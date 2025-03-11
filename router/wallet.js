const express = require('express');
const { deposit, getBalance } = require('../controller/wallet');
const { authMiddleware } = require('../helper/common');

const router = express.Router();

router.post('/deposit', authMiddleware, deposit);
router.get('/getBalance', authMiddleware, getBalance)



module.exports = router;
