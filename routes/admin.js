var express = require('express');
var config = require('../config');
var User = require('../model/user');
var router = express.Router();

// GET/ Control panel
router.get('/', (req, res, next) => {
    console.log(req.session);
    if (! req.session.userId) {
        var err = new Error('You are not authorized to view this page.');
        err.status = 403;
        res.render('login', { title: 'Login' });
    }
    res.render('index', { title: 'Dashboard', active: 'Home' });
});

router.get('/newpost', function(req, res, next) {
    if (!req.session.userId) {
      var err = new Error('You are not authorized to view this page.');
      err.status = 403;
      res.render('login', { title: 'Login' });
    }
  res.render('newpost', { title: 'New Post', active: 'New Post' });
});

router.get('/images', function(req, res, next) {
    if (!req.session.userId) {
      var err = new Error('You are not authorized to view this page.');
      err.status = 403;
      res.render('login', { title: 'Images', active: 'Images' });
    }
  res.render('images', { title: 'New Post', active: 'New Post' });
});

module.exports = router;
