var collection = require('mongoose'),
  Skill = new collection.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    rating: {
        type: String,
        trim: true,
        required: true
    }
  });

var Skill = collection.model('Skill', Skill);
module.exports = Skill;
