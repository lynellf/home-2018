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
    type: {
      type: String,
      required: true
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
      type: String,
      required: true,
    },
  });

var Post = collection.model('Post', Post);
module.exports = Post;
