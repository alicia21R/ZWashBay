const mongoose = require('mongoose');

const cartrackerSchema = new mongoose.Schema({
    checkIn: {
      type: String,
      trim: true,
    },
    doa: {
        type: Date,
        trim: true,
      },
    carPlate: {
        type: String,
        trim: true,
    },
    carColor: {
        type: String,
        trim: true,
    },
    carType: {
        type: String,
        trim: true,
    },
    package: {
      type: String,
      trim: true,
    },
    packagePrice: {
      type: Number,
    },
    washerFee: {
      type: Number,
    },
    washer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Washer',
    },
  });

module.exports = mongoose.model('CarTracker', cartrackerSchema);
