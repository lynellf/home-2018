var collection = require('mongoose'),
  User = new collection.Schema({
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  });

var User = collection.model('User', User);
module.exports = User;
