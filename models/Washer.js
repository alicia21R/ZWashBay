const mongoose = require('mongoose');

const washerSchema = new mongoose.Schema({
    id: {
      type: String,
      trim: true,
    },
    fullName: {
        type: String,
        trim: true,
      },
    dob: {
        type: Date,
            },
    phoneNumber: {
        type: Number,
    },
    nin: {
        type: String,
        trim: true,
    },
    homeAddress: {
        type: String,
        trim: true,
    },
  });

module.exports = mongoose.model('Washer', washerSchema);
