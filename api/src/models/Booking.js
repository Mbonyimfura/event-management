const mongoose = require('mongoose')

const eventBookingSchema = new mongoose.Schema({

    event:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'Event' },
    user:{type: mongoose.Schema.Types.ObjectId, required: true},
    // dateOfEvent: {type:Date, required:true},
    numberOfTickets: {type: Number, required: true},
    name:{type:String, required: true},
    phone: {type:String, required:true},
    price: Number

})

const EventBooking = mongoose.model('EventBooking', eventBookingSchema)

module.exports = EventBooking