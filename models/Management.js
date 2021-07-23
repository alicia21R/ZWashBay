const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const managementSchema = new mongoose.Schema({
    firstname: {
      type: String,
      trim: true,
      required: "Please provide first name",
    },
    lastname: {
      type: String,
      required: "Please provide last name",
      trim: true,
    },
    username: {
        type: String,
        required: "Please provide user name",
        unique: true,
        trim: true,
      },
    password: {
        type: String
          },

  });

managementSchema.plugin(passportLocalMongoose);
  // managerSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
module.exports = mongoose.model('Management', managementSchema);
