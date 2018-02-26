var express = require('express');
var router = express.Router();
var Post = require('../model/post');

// POST / New Post Entry
router.post('/new', function(req, res, next) {
  Post.create(
    {
      title: req.body.title,
      date: Date.now(),
      body: req.body.textEditor,
      type: req.body.type,
      tags: req.body.tags.split(','),
      lastUpdated: Date.now(),
      preview: req.body.preview,
      images: req.body.images.split(','),
      gitHub: req.body.github,
      projectUrl: req.body.projectUrl,
      draft: req.body.draft,
    },
    function(err) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.render('admin', { title: 'Dashboard' });
      }
    }
  );
});

// GET / All Projects
router.get('/projects', function(req, res, next) {
  Post.find({ type: 'Project' }, function(err, data) {
    if(!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  });
});

// GET / All Blog Posts
router.get('/journal', function(req, res, next) {
  Post.find({ type: 'Blog Post' }, function(err, data) {
    if(!err) {
      res.send(data)
    } else {
      res.send(err)
    }
  });
});

module.exports = router;
