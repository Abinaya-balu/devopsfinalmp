const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  { userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true
  },
  institution:{
    type: String,
    required: true,
    enum: ['Kongu Engineering College', 'Kongu Polytechnic College', 'Kongu School of Architecture']
  },
    department:{
      type: String,
      required: true
    },
    eventManager: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true,
      enum: ['Conference', 'Seminar', 'Workshop', 'Cultural Event', 'Technical Event', 'Meeting', 'Other']
    },
    eventName: {
      type: String,
      required: true
    },
    eventDate: {
      type: Date,
    },
    eventDateType: {
      type: String,
      required: true
    },
    eventStartDate: {
      type: Date,
    },
    eventEndDate: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    email: {
      type: String,
      required: true
    },
    bookedHallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hall',
      required: true
    },
    bookedHall: {
      type: Object,
      required: true,
    },
    bookedHallName: {
      type: String,
      required: true
    },
    organizingClub: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    altNumber: {
      type: Number
    },
    expectedAttendees: {
      type: Number,
      required: true
    },
    equipmentNeeded: {
      type: String
    },
    specialRequirements: {
      type: String
    },
    rejectionReason: {
      type: String,
    },
    isApproved: {
      default: "Request Sent",
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// bookingSchema.index({ eventDate: 1 }, { expireAfterSeconds: 86400 });
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
