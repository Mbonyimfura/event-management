const { model } = require("mongoose");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary"); 

//@desc Post event

const postEvent = async (req, res) => {
  const { token } = req.cookies;
  const { title, date, location, description, tickets, price } = req.body;
  console.log(req.body);
  console.log(process.env.CLOUDINARY_API_KEY)
  const file = req.file.path;
  const uploadedImage = await cloudinary.uploader.unsigned_upload(
    file,
    'rbtqb2r3'
  );
  const photoUrl = uploadedImage.secure_url;
 jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
  console.log(userData?.role);
  if (error) throw error;
  if (userData?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

    try {
        const event = await Event.create({
          provider: userData.id,
          title,
          date,
          location,
          description,
          tickets,
          photo: photoUrl,
          price,
        });
        await event.save();
      await event.save();
      res.status(201).send(event);
    } catch (error) {
     console.log(error)
      res.status(400).send();
    }

  });
}

//@desc Get all events
const getAllEvents = async (req, res) => {
  try {
      const events = await Event.find();
      res.status(200).send(events);
  } catch (error) {
    res.status(500).send();
  }
};

//@desc Get event by id
const getEventById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    // jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      // if (error) throw error;
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).send();
      }
      res.status(200).send(event);
    //});
  } catch (error) {
    res.status(500).send();
  }
};

//@desc Update event by id
const updateEvent = async (req, res) => {
  const { token } = req.cookies;
  const { title, location, description, tickets, photo, price } = req.body;
  const id = req.params.id;
  
  jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
    if (error) throw error;

    if (userData.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (!title || !location || !description || !tickets || !price) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const eventDoc = await Event.findById(id);
    if (!eventDoc) {
      return res.status(404).json({ error: 'Event not found' });
    }

    eventDoc.set({
      title, location, description, tickets, photo, price
    });

    await eventDoc.save();
    res.send('ok');
  });
};



//@desc Delete event by id

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (error, userData) => {
      if (error) throw error;
      if (userData.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const event = await Event.findByIdAndDelete(id);
      if (!event) {
        res.status(404).send();
      }
      res.status(200).send();
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  postEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};

model.exports = { postEvent };
