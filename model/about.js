var collection = require('mongoose'),
  About = new collection.Schema({
    post: {
      type: String,
      required: true,
      unique: true
    }
  });

var About = collection.model('About', About);
module.exports = About;
