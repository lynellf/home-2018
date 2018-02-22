var collection = require('mongoose'),
  Skill = new collection.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    rating: {
        type: Number,
        trim: true,
        required: true
    }
  });

var Skill = collection.model('Skill', Skill);
module.exports = Skill;
