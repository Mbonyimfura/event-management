const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    tickets: { type: Number, required: true },
    photo: { type: String},
    price: { type: Number, required: true },
    provider: {
    
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
});

module.exports = mongoose.model("Event", EventSchema);