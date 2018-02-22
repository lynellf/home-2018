var collection = require('mongoose'),
  Post = new collection.Schema({
    title: {
      type: String,
      trim: true,
      required: true,
    },
    date: { type: Date, default: Date.now },
    body: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    preview: {
      type: String,
      required: false,
    },
    projectUrl: {
      type: String,
      required: false,
    },
    gitHub: {
      type: String,
      required: false,
    },
    draft: {
      type: Boolean,
      required: true,
    },
  });

var Post = collection.model('Post', Post);
module.exports = Post;
