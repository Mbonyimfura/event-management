const express = require('express')
const router = express.Router()

const {createEventBooking,getEventBookings,updateTotalTickets,getSingleBooking,deleteBooking} = require('../controller/booking')

router.post('/', createEventBooking)
router.get('/', getEventBookings)
router.get('/:id', getSingleBooking)    
router.patch('/:id', updateTotalTickets)
router.delete('/:id', deleteBooking)



module.exports = router