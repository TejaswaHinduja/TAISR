const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  twitterAccessToken: {
    type: String,
    required: true,
  },
  twitterRefreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);