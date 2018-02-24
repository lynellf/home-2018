var express = require('express');
var fs = require('fs');
var path = require('path');
var config = require('../config');
var User = require('../model/user');
var router = express.Router();

var dir = './public/uploads';


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

router.get('/files', function(req, res, next) {

    // List files in directory. Runs in async, requires
    // promise to remain in sync.

    var listFiles = function() { 
        return new Promise(function (resolve, reject) {
             fs.readdir(dir, function(err, items) {
                 (err) ? reject(err) : resolve(items);
             });
         });
     };

    if (!req.session.userId) {
      var err = new Error('You are not authorized to view this page.');
      err.status = 403;
      res.render('login', { title: 'Login', active: 'Login' });
    }

    // List files in directory. Pass array to pug.

    listFiles()
        .then(function(result) {
            var files = result;
            res.render('files', { title: 'File Manager', active: 'File Manager', files: files });
        },
        function(err) {
            console.log(err);
        });
});

module.exports = router;
