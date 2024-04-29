const Booking = require('../models/Booking')
const Event = require('../models/Event')
const jwt = require('jsonwebtoken')

//@desc GET user data from request 
function getUserDataFromReq(req) {
    return new Promise((resolve,reject)=>{
      jwt.verify(req.cookies.token,process.env.JWT_SECRET, {}, async (error,userData)=>{
        if (error) throw error;
        resolve(userData)
      })
    })
}

//@desc Create event booking
const createEventBooking = async(req,res) => {
    const userData = await getUserDataFromReq(req);
    const {
      event,dateOfEvent,numberOfTickets,name,phone,price,
    } = req.body;
    await Booking.create({
      event,dateOfEvent,numberOfTickets,name,phone,price,
      user:userData.id,
    }).then((doc) => {
      res.json(doc);
    }).catch((err) => {
      throw err;
    });
}
//@desc Update total tickets
const updateTotalTickets = async(req, res) => {
  const eventId = req.params.id;
  const { numberOfTickets } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.numberOfTickets -= numberOfTickets;
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
//@desc Get event bookings
const getEventBookings =  async(req,res) => {
  const userData = await getUserDataFromReq(req);
  res.send(await Booking.find({user: userData.id}).populate('event'))
}
//@desc Get single booking
const getSingleBooking = async(req,res) => {
  const userData = await getUserDataFromReq(req);
  const {id} = req.params;
  console.log(id)
  const booking = await Booking.findById(id).populate('event').populate('user');
  console.log(booking)
  if (!booking) {
    return res.status(404).json({error: 'Booking not found'});
  }
  if (booking.user.toString() !== userData.id) {
    return res.status(403).json({error: 'Unauthorized'});
  }
  res.json(booking);
}
//@desc All bookings
const getAllBookings =  async(req,res) => {
  const userData = await getUserDataFromReq(req);

  // Check if the user is an admin
  if (userData.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const bookings = await Booking.find().populate('event').populate('user');
    res.status(200).send(bookings)
  } catch (error) {
    console.log(error)
  }
}
//@desc Delete booking
const deleteBooking = async(req,res) => {
  const userData = await getUserDataFromReq(req);
  const {id} = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    return res.status(404).json({error: 'Booking not found'});
  }
  if (booking.user.toString() !== userData.id) {
    return res.status(403).json({error: 'Unauthorized'});
  }
  await Booking.deleteOne({_id: id}); 
  res.json({message: 'Booking removed'});
}

module.exports ={
createEventBooking, getEventBookings, updateTotalTickets, getSingleBooking, getAllBookings,deleteBooking
}