const express = require('express')
const router = express.Router();
const {getAllBookings} = require('../controller/booking')

router.get('/',getAllBookings);

module.exports = router;