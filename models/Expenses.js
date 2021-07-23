const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    do: {
        type: Date
    },
    item: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
    },
    
  });

module.exports = mongoose.model('Expense', expenseSchema);
