const express = require('express')
const router = express.Router();
const multer=require('../config/multer');
const {postEvent,getAllEvents,
    getEventById,deleteEvent,
    updateEvent} = require('../controller/event')  
// Import the missing function

router.post('/create',multer.upload.single('photo'),postEvent);
router.get('/all',getAllEvents);
router.delete('/:id', deleteEvent);
router.put('/:id',multer.upload.single('photo'), updateEvent);
router.get('/:id', getEventById);



module.exports = router;