const mongoose = require('mongoose');

// Schema
const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;