const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  timestamp: Number,
  message: String
});
const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    defualt: ''
  },

  email: {
    type: mongoose.Schema.Types.String,
    ref: 'User'
      
  },

  detail: [messageSchema]
});

mongoose.model('Email', emailSchema);