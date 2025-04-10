const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: {  // Hall Name
    type: String,
    required: true,
    unique: true,
  },
  institution: {  // Institution (Kongu Engineering College, Kongu Polytechnic College, or Kongu School of Architecture)
    type: String,
    required: true,
    enum: ['Kongu Engineering College', 'Kongu Polytechnic College', 'Kongu School of Architecture']
  },
  capacity: {  // Seating Capacity
    type: Number,
    required: true,
  },  
  amenities: {  // Available Amenities
    type: String,
    required: true,
  },  
  description: {  // Hall Description
    type: String,
    required: true,
  },
  price: {  // Booking Price
    type: Number,
    required: true,
  },
  hallCreater: {  // Creator's Email
    type: String,
    required: true,
  },
  location: {  // Building/Block Location
    type: String,
    required: true,
  }
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
