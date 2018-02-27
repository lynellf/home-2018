var express = require('express');
// var fs = require('fs');
var path = require('path');
var config = require('../config');
var User = require('../model/user');
var router = express.Router();

// var dir = './public/uploads';

// GET/ Control panel
router.get('/', (req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login' });
  }
  res.render('index', { title: 'Dashboard', active: 'Dashboard' });
});

router.get('/newpost', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login' });
  }
  res.render('newpost', { title: 'New Post', active: 'New Post' });
});

router.get('/edit::id', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login' });
  }
  res.render('editpost', {
    title: 'Edit Post',
    active: 'Edit Post',
    id: req.params.id,
    postAction: '/post/update:' + req.params.id,
  });
});

router.get('/files', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login', active: 'Login' });
  }

  res.render('files', {
    title: 'File Manager',
    active: 'File Manager',
  });
});

router.get('/projects', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login', active: 'Login' });
  }

  res.render('projects', {
    title: 'Projects',
    active: 'Projects',
  });
});

router.get('/posts', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login', active: 'Login' });
  }

  res.render('posts', {
    title: 'Posts',
    active: 'Posts',
  });
});

router.get('/skills', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login', active: 'Login' });
  }

  res.render('skills', {
    title: 'Skills',
    active: 'Skills',
  });
});

router.get('/sections', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('You are not authorized to view this page.');
    err.status = 403;
    res.render('login', { title: 'Login', active: 'Login' });
  }

  res.render('sections', { title: 'Sections', active: 'Sections' });
});

module.exports = router;
