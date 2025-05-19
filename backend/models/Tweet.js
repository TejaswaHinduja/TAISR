const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tweetId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  originalContent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tweet', tweetSchema);