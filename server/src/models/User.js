const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return Buffer.from(v, 'base64').length <= 1024 * 1024;
      },
      message: 'Avatar image exceeds 1MB limit'
    }
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
