var collection = require('mongoose'),
  Link = new collection.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      trim: true,
      required: true,
    },
  });

var Link = collection.model('Link', Link);
module.exports = Link;
